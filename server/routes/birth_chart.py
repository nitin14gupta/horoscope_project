from flask import Blueprint, request, jsonify
import random

birth_chart_bp = Blueprint('birth_chart', __name__)

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
        
        # Generate mock birth chart data
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
            'housePositions': houses
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
