from flask import Blueprint, request, jsonify
import random
import requests
import json
from typing import Optional, Dict, Any, List
from config import Config

birth_chart_bp = Blueprint('birth_chart', __name__)

PLANET_SYMBOLS = {
    'Sun': '☀️',
    'Moon': '🌙',
    'Mercury': '☿',
    'Venus': '♀',
    'Mars': '♂',
    'Jupiter': '♃',
    'Saturn': '♄',
    'Rahu': '☊',
    'Ketu': '☋',
}

SIGN_ELEMENTS = {
    'Aries': 'Fire', 'Leo': 'Fire', 'Sagittarius': 'Fire',
    'Taurus': 'Earth', 'Virgo': 'Earth', 'Capricorn': 'Earth',
    'Gemini': 'Air', 'Libra': 'Air', 'Aquarius': 'Air',
    'Cancer': 'Water', 'Scorpio': 'Water', 'Pisces': 'Water',
}

def ai_generate_birth_chart(payload: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    try:
        if not Config.has_api_key('gemini'):
            return None

        name = payload.get('name')
        date = payload.get('date')
        time = payload.get('time')
        place = payload.get('place')
        latitude = payload.get('latitude')
        longitude = payload.get('longitude')

        coords_text = ''
        if latitude and longitude:
            coords_text = f" with coordinates ({latitude}, {longitude})"

        prompt = f"""
        You are an expert Vedic astrologer. Generate a detailed birth chart for:
        Name: {name}
        Date: {date}
        Time: {time}
        Place: {place}{coords_text}

        Return ONLY a JSON object with EXACTLY these fields:
        {{
          "ascendant": "Zodiac sign",
          "sunSign": "Zodiac sign",
          "moonSign": "Zodiac sign",
          "planetaryPositions": [
            {{"name":"Sun|Moon|Mercury|Venus|Mars|Jupiter|Saturn|Rahu|Ketu","symbol":"emoji or ascii","element":"Fire|Earth|Air|Water|Shadow","degree": number (0-30),"house": number (1-12),"status":"Strong|Weak","sign":"Zodiac sign"}},
            ... include all 9 bodies listed above ...
          ],
          "housePositions": [
            {{"number":1,"name":"Ascendant","area":"short description","sign":"Zodiac sign"}},
            ... include all houses 1 through 12 ...
          ]
        }}

        Ensure numbers are proper numbers, and status is exactly Strong or Weak.
        """

        headers = {
            'X-goog-api-key': Config.get_api_key("gemini"),
            'Content-Type': 'application/json'
        }
        data = {
            'contents': [
                {
                    'parts': [
                        {
                            'text': prompt
                        }
                    ]
                }
            ]
        }
        resp = requests.post(Config.get_api_endpoint('gemini_api'), headers=headers, json=data, timeout=20)
        if resp.status_code != 200:
            return None
        result = resp.json()
        content = result['candidates'][0]['content']['parts'][0]['text'].strip()
        if content.startswith('```json'):
            content = content[7:]
        if content.endswith('```'):
            content = content[:-3]
        content = content.strip()
        obj = json.loads(content)

        # Normalize fields and provide fallbacks
        ascendant = str(obj.get('ascendant', '')).strip()
        sun_sign = str(obj.get('sunSign', '')).strip()
        moon_sign = str(obj.get('moonSign', '')).strip()

        def norm_planet(p: Dict[str, Any]) -> Dict[str, Any]:
            name = str(p.get('name', '')).strip().title()
            sign = str(p.get('sign', '')).strip().title()
            degree_raw = p.get('degree', 0)
            try:
                degree = int(degree_raw)
            except Exception:
                try:
                    degree = int(float(degree_raw))
                except Exception:
                    degree = 0
            house_raw = p.get('house', 1)
            try:
                house = int(house_raw)
            except Exception:
                house = 1
            status_raw = str(p.get('status', 'Strong')).strip().title()
            status = 'Strong' if status_raw not in ('Weak',) else 'Weak'
            symbol = str(p.get('symbol') or PLANET_SYMBOLS.get(name, '')).strip()
            element = str(p.get('element', '')).strip()
            if not element and sign in SIGN_ELEMENTS:
                element = SIGN_ELEMENTS[sign]
            return {
                'name': name or 'Sun',
                'symbol': symbol or PLANET_SYMBOLS.get(name or 'Sun', ''),
                'element': element or 'Fire',
                'degree': degree,
                'house': max(1, min(12, house)),
                'status': status,
                'sign': sign or 'Aries',
            }

        planet_list_in = obj.get('planetaryPositions') or []
        planetary_positions: List[Dict[str, Any]] = [norm_planet(p) for p in planet_list_in]

        # Ensure all 9 standard bodies exist; fill missing with sensible defaults
        expected_planets = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Rahu', 'Ketu']
        by_name = {p['name']: p for p in planetary_positions}
        for pname in expected_planets:
            if pname not in by_name:
                # Create a default using ascendant sign as base
                base_sign = (ascendant or 'Aries').title()
                default = {
                    'name': pname,
                    'symbol': PLANET_SYMBOLS.get(pname, ''),
                    'element': SIGN_ELEMENTS.get(base_sign, 'Fire') if pname not in ['Rahu', 'Ketu'] else 'Shadow',
                    'degree': 0,
                    'house': 1,
                    'status': 'Strong',
                    'sign': base_sign,
                }
                planetary_positions.append(default)

        def norm_house(h: Dict[str, Any]) -> Dict[str, Any]:
            number_raw = h.get('number', 1)
            try:
                number = int(number_raw)
            except Exception:
                number = 1
            name = str(h.get('name', '')).strip() or 'Ascendant'
            area = str(h.get('area', '')).strip() or 'General matters'
            sign = str(h.get('sign', '')).strip().title() or 'Aries'
            return {
                'number': max(1, min(12, number)),
                'name': name,
                'area': area,
                'sign': sign,
            }

        houses_in = obj.get('housePositions') or []
        house_positions: List[Dict[str, Any]] = [norm_house(h) for h in houses_in]

        # Ensure houses 1..12 exist; fill missing with defaults
        present = {h['number'] for h in house_positions}
        default_house_names = {
            1: 'Ascendant', 2: 'Wealth', 3: 'Siblings', 4: 'Mother', 5: 'Children', 6: 'Enemies',
            7: 'Spouse', 8: 'Longevity', 9: 'Dharma', 10: 'Career', 11: 'Income', 12: 'Moksha'
        }
        default_house_areas = {
            1: 'Self, personality, appearance', 2: 'Finances, family, speech', 3: 'Communication, courage, short journeys',
            4: 'Home, property, vehicles', 5: 'Intelligence, creativity, romance', 6: 'Health, service, obstacles',
            7: 'Partnership, marriage, business', 8: 'Mystery, research, sudden events', 9: 'Religion, guru, higher learning',
            10: 'Profession, authority, reputation', 11: 'Gains, friends, elder siblings', 12: 'Expenses, foreign travel, liberation'
        }
        base_sign = (ascendant or 'Aries').title()
        for num in range(1, 13):
            if num not in present:
                house_positions.append({
                    'number': num,
                    'name': default_house_names[num],
                    'area': default_house_areas[num],
                    'sign': base_sign,
                })

        # Sort houses by number
        house_positions = sorted(house_positions, key=lambda h: h['number'])

        return {
            'ascendant': ascendant or 'Aries',
            'sunSign': sun_sign or 'Aries',
            'moonSign': moon_sign or 'Cancer',
            'planetaryPositions': planetary_positions,
            'housePositions': house_positions,
        }
    except Exception:
        return None

@birth_chart_bp.route('/birth-chart', methods=['POST'])
def calculate_birth_chart():
    """Calculate birth chart based on user input"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'date', 'time', 'place']
        for field in required_fields:
            if not data.get(field):
                return jsonify({
                    'success': False,
                    'error': f'Missing required field: {field}'
                }), 400
        
        name = data['name']
        date = data['date']
        time = data['time']
        place = data['place']
        # Try AI generation first
        ai_chart = ai_generate_birth_chart({
            'name': name,
            'date': date,
            'time': time,
            'place': place,
            'latitude': data.get('latitude'),
            'longitude': data.get('longitude'),
        })

        if ai_chart:
            ai_chart['dataSource'] = 'AI Generated (GPT-5)'
            return jsonify({'success': True, 'data': ai_chart})

        # Fallback: Generate mock birth chart data
        planets = [
            {'name': 'Sun', 'symbol': '☀️', 'element': 'Fire', 'degree': random.randint(0, 30), 'house': random.randint(1, 12), 'status': random.choice(['Strong', 'Weak']), 'sign': random.choice(['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'])},
            {'name': 'Moon', 'symbol': '🌙', 'element': 'Water', 'degree': random.randint(0, 30), 'house': random.randint(1, 12), 'status': random.choice(['Strong', 'Weak']), 'sign': random.choice(['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'])},
            {'name': 'Mercury', 'symbol': '☿', 'element': 'Earth', 'degree': random.randint(0, 30), 'house': random.randint(1, 12), 'status': random.choice(['Strong', 'Weak']), 'sign': random.choice(['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'])},
            {'name': 'Venus', 'symbol': '♀', 'element': 'Earth', 'degree': random.randint(0, 30), 'house': random.randint(1, 12), 'status': random.choice(['Strong', 'Weak']), 'sign': random.choice(['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'])},
            {'name': 'Mars', 'symbol': '♂', 'element': 'Fire', 'degree': random.randint(0, 30), 'house': random.randint(1, 12), 'status': random.choice(['Strong', 'Weak']), 'sign': random.choice(['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'])},
            {'name': 'Jupiter', 'symbol': '♃', 'element': 'Fire', 'degree': random.randint(0, 30), 'house': random.randint(1, 12), 'status': random.choice(['Strong', 'Weak']), 'sign': random.choice(['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'])},
            {'name': 'Saturn', 'symbol': '♄', 'element': 'Earth', 'degree': random.randint(0, 30), 'house': random.randint(1, 12), 'status': random.choice(['Strong', 'Weak']), 'sign': random.choice(['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'])},
            {'name': 'Rahu', 'symbol': '☊', 'element': 'Shadow', 'degree': random.randint(0, 30), 'house': random.randint(1, 12), 'status': random.choice(['Strong', 'Weak']), 'sign': random.choice(['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'])},
            {'name': 'Ketu', 'symbol': '☋', 'element': 'Shadow', 'degree': random.randint(0, 30), 'house': random.randint(1, 12), 'status': random.choice(['Strong', 'Weak']), 'sign': random.choice(['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'])}
        ]
        
        houses = [
            {'number': 1, 'name': 'Ascendant', 'area': 'Self, personality, appearance', 'sign': random.choice(['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'])},
            {'number': 2, 'name': 'Wealth', 'area': 'Finances, family, speech', 'sign': random.choice(['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'])},
            {'number': 3, 'name': 'Siblings', 'area': 'Communication, courage, short journeys', 'sign': random.choice(['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'])},
            {'number': 4, 'name': 'Mother', 'area': 'Home, property, vehicles', 'sign': random.choice(['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'])},
            {'number': 5, 'name': 'Children', 'area': 'Intelligence, creativity, romance', 'sign': random.choice(['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'])},
            {'number': 6, 'name': 'Enemies', 'area': 'Health, service, obstacles', 'sign': random.choice(['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'])},
            {'number': 7, 'name': 'Spouse', 'area': 'Partnership, marriage, business', 'sign': random.choice(['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'])},
            {'number': 8, 'name': 'Longevity', 'area': 'Mystery, research, sudden events', 'sign': random.choice(['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'])},
            {'number': 9, 'name': 'Dharma', 'area': 'Religion, guru, higher learning', 'sign': random.choice(['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'])},
            {'number': 10, 'name': 'Career', 'area': 'Profession, authority, reputation', 'sign': random.choice(['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'])},
            {'number': 11, 'name': 'Income', 'area': 'Gains, friends, elder siblings', 'sign': random.choice(['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'])},
            {'number': 12, 'name': 'Moksha', 'area': 'Expenses, foreign travel, liberation', 'sign': random.choice(['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'])}
        ]
        
        birth_chart = {
            'ascendant': random.choice(['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces']),
            'sunSign': random.choice(['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces']),
            'moonSign': random.choice(['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces']),
            'planetaryPositions': planets,
            'housePositions': houses,
            'dataSource': 'Fallback Generated'
        }
        
        return jsonify({
            'success': True,
            'data': birth_chart
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
