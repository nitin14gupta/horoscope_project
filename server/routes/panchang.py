from flask import Blueprint, request, jsonify
from datetime import datetime, timedelta
import hashlib
import requests
import json
import os
from config import Config

panchang_bp = Blueprint('panchang', __name__)

# Sample Panchang data
TITHIS = ['Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami', 'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami', 'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima', 'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami', 'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami', 'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Amavasya']

NAKSHATRAS = ['Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati']

YOGAS = ['Vishkumbha', 'Priti', 'Ayushman', 'Saubhagya', 'Shobhana', 'Atiganda', 'Sukarman', 'Dhriti', 'Shula', 'Ganda', 'Vriddhi', 'Dhruva', 'Vyaghata', 'Harshana', 'Vajra', 'Siddhi', 'Vyatipata', 'Variyan', 'Parigha', 'Shiva', 'Siddha', 'Sadhya', 'Shubha', 'Shukla', 'Brahma', 'Indra', 'Vaidhriti']

KARANAS = ['Bava', 'Balava', 'Kaulava', 'Taitila', 'Garija', 'Vanija', 'Vishti', 'Shakuni', 'Chatushpada', 'Naga']

DAILY_WISDOMS = [
    "Today is auspicious for starting new ventures. Trust in the divine timing.",
    "Focus on spiritual practices and meditation for inner peace.",
    "Charity and helping others will bring positive karma today.",
    "Maintain harmony in relationships and avoid conflicts.",
    "Study and learning will be particularly rewarding today.",
    "Express gratitude for all blessings in your life today.",
    "Practice patience and understanding in all interactions.",
    "Today is perfect for self-reflection and inner growth.",
    "Connect with nature to find balance and tranquility.",
    "Share your knowledge and wisdom with others today.",
    "Embrace change with courage and optimism.",
    "Focus on family and strengthen your bonds today.",
    "Financial decisions made today will be favorable.",
    "Health and wellness should be your priority today.",
    "Creative pursuits will bring joy and fulfillment."
]

# Tithi significance
TITHI_SIGNIFICANCE = {
    'Pratipada': 'Auspicious for new beginnings, starting projects, and spiritual practices.',
    'Dwitiya': 'Good for education, learning, and intellectual pursuits.',
    'Tritiya': 'Favorable for creative activities, arts, and entertainment.',
    'Chaturthi': 'Ideal for spiritual practices, meditation, and inner reflection.',
    'Panchami': 'Excellent for travel, communication, and social activities.',
    'Shashthi': 'Good for health-related activities, exercise, and wellness.',
    'Saptami': 'Auspicious for relationships, partnerships, and harmony.',
    'Ashtami': 'Powerful for spiritual practices, fasting, and devotion.',
    'Navami': 'Favorable for courage, strength, and overcoming obstacles.',
    'Dashami': 'Good for success, achievement, and goal completion.',
    'Ekadashi': 'Highly auspicious for fasting, spiritual practices, and purification.',
    'Dwadashi': 'Favorable for charity, helping others, and community service.',
    'Trayodashi': 'Good for learning, knowledge acquisition, and wisdom.',
    'Chaturdashi': 'Ideal for meditation, introspection, and spiritual growth.',
    'Purnima': 'Perfect for celebrations, gratitude, and abundance.',
    'Amavasya': 'Powerful for new beginnings, letting go, and transformation.'
}

# Nakshatra significance
NAKSHATRA_SIGNIFICANCE = {
    'Ashwini': 'Symbolizes speed, energy, and new beginnings. Good for starting new ventures.',
    'Bharani': 'Represents creativity and artistic pursuits. Favorable for arts and crafts.',
    'Krittika': 'Associated with fire and purification. Good for spiritual practices.',
    'Rohini': 'Symbolizes growth and abundance. Auspicious for prosperity and fertility.',
    'Mrigashira': 'Represents curiosity and exploration. Good for learning and travel.',
    'Ardra': 'Associated with transformation and change. Good for personal growth.',
    'Punarvasu': 'Symbolizes renewal and restoration. Favorable for healing and recovery.',
    'Pushya': 'Represents nourishment and care. Good for family and relationships.',
    'Ashlesha': 'Associated with wisdom and knowledge. Good for education and learning.',
    'Magha': 'Symbolizes authority and leadership. Favorable for career advancement.',
    'Purva Phalguni': 'Represents joy and celebration. Good for social activities.',
    'Uttara Phalguni': 'Symbolizes partnership and harmony. Good for relationships.',
    'Hasta': 'Associated with skill and craftsmanship. Good for creative work.',
    'Chitra': 'Represents beauty and artistry. Favorable for artistic pursuits.',
    'Swati': 'Symbolizes independence and freedom. Good for personal development.',
    'Vishakha': 'Associated with determination and success. Good for achieving goals.',
    'Anuradha': 'Represents friendship and loyalty. Good for building relationships.',
    'Jyeshtha': 'Symbolizes wisdom and experience. Good for learning from elders.',
    'Mula': 'Associated with roots and foundation. Good for establishing stability.',
    'Purva Ashadha': 'Represents victory and success. Favorable for competitions.',
    'Uttara Ashadha': 'Symbolizes achievement and accomplishment. Good for goal setting.',
    'Shravana': 'Associated with listening and learning. Good for education.',
    'Dhanishta': 'Represents wealth and prosperity. Favorable for financial matters.',
    'Shatabhisha': 'Symbolizes healing and medicine. Good for health-related activities.',
    'Purva Bhadrapada': 'Associated with spirituality and devotion. Good for religious activities.',
    'Uttara Bhadrapada': 'Represents humanitarian work. Good for charity and service.',
    'Revati': 'Symbolizes completion and fulfillment. Good for finishing projects.'
}

def get_deterministic_choice(items, seed_string):
    """Get a deterministic choice based on a seed string"""
    hash_object = hashlib.md5(seed_string.encode())
    hash_hex = hash_object.hexdigest()
    hash_int = int(hash_hex, 16)
    return items[hash_int % len(items)]

def get_auspicious_timings(date_str):
    """Generate auspicious timings based on date"""
    base_timings = [
        '06:00 - 08:00 (Brahma Muhurta)',
        '09:00 - 11:00 (Abhijit Muhurta)',
        '15:00 - 17:00 (Godhuli Kaal)',
        '18:00 - 20:00 (Nishita Kaal)',
        '21:00 - 23:00 (Ardha Ratri)',
        '03:00 - 05:00 (Usha Kaal)'
    ]
    
    # Use date to determine which timings to include
    hash_object = hashlib.md5(f"auspicious_{date_str}".encode())
    hash_hex = hash_object.hexdigest()
    hash_int = int(hash_hex, 16)
    
    # Select 3-4 timings based on hash
    num_timings = 3 + (hash_int % 2)  # 3 or 4 timings
    selected_indices = [(hash_int + i * 7) % len(base_timings) for i in range(num_timings)]
    return [base_timings[i] for i in selected_indices]

def get_inauspicious_timings(date_str):
    """Generate inauspicious timings based on date"""
    base_timings = [
        '12:00 - 13:00 (Rahu Kaal)',
        '16:00 - 17:30 (Yamaganda)',
        '18:00 - 19:30 (Gulika Kaal)',
        '14:00 - 15:30 (Kantaka)',
        '10:00 - 11:30 (Bhadra)',
        '08:00 - 09:30 (Vishti)'
    ]
    
    # Use date to determine which timings to include
    hash_object = hashlib.md5(f"inauspicious_{date_str}".encode())
    hash_hex = hash_object.hexdigest()
    hash_int = int(hash_hex, 16)
    
    # Select 2-3 timings based on hash
    num_timings = 2 + (hash_int % 2)  # 2 or 3 timings
    selected_indices = [(hash_int + i * 5) % len(base_timings) for i in range(num_timings)]
    return [base_timings[i] for i in selected_indices]

def get_ai_generated_panchang(date_obj):
    """Generate panchang data using Gemini"""
    try:
        if not Config.has_api_key('gemini'):
            return None
            
        date_str = date_obj.strftime('%Y-%m-%d')
        day_name = date_obj.strftime('%A')
        
        prompt = f"""
        You are an expert in Hindu astrology and Panchang calculations. Provide accurate, authentic Panchang data based on traditional Hindu calendar principles. Always respond with valid JSON only.
        
        Generate authentic Hindu Panchang data for {date_str} ({day_name}). 
        
        Please provide a JSON response with the following structure:
        {{
            "date": "{date_str}",
            "tithi": "One of the 30 tithis (e.g., 'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami', 'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami', 'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima', 'Amavasya')",
            "nakshatra": "One of the 27 nakshatras (e.g., 'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati')",
            "yoga": "One of the 27 yogas (e.g., 'Vishkumbha', 'Priti', 'Ayushman', 'Saubhagya', 'Shobhana', 'Atiganda', 'Sukarman', 'Dhriti', 'Shula', 'Ganda', 'Vriddhi', 'Dhruva', 'Vyaghata', 'Harshana', 'Vajra', 'Siddhi', 'Vyatipata', 'Variyan', 'Parigha', 'Shiva', 'Siddha', 'Sadhya', 'Shubha', 'Shukla', 'Brahma', 'Indra', 'Vaidhriti')",
            "karana": "One of the 11 karanas (e.g., 'Bava', 'Balava', 'Kaulava', 'Taitila', 'Garija', 'Vanija', 'Vishti', 'Shakuni', 'Chatushpada', 'Naga')",
            "sunrise": "Realistic sunrise time in HH:MM format (considering seasonal changes)",
            "sunset": "Realistic sunset time in HH:MM format (considering seasonal changes)",
            "auspiciousTimings": ["3-4 auspicious muhurtas with times and names"],
            "inauspiciousTimings": ["2-3 inauspicious periods with times and names"],
            "dailyWisdom": "A spiritual wisdom message for the day",
            "paksha": "Either 'Shukla Paksha (Waxing Moon)' or 'Krishna Paksha (Waning Moon)' based on tithi",
            "dayName": "{day_name}",
            "tithiSignificance": "Brief explanation of what this tithi is auspicious for",
            "nakshatraSignificance": "Brief explanation of what this nakshatra represents and is good for"
        }}
        
        Make the data authentic and spiritually meaningful. Consider the season and day of the week.
        Return ONLY the JSON object, no additional text.
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
        
        response = requests.post(Config.get_api_endpoint('gemini_api'), headers=headers, json=data, timeout=15)
        
        if response.status_code == 200:
            result = response.json()
            content = result['candidates'][0]['content']['parts'][0]['text']
            
            # Parse the JSON response from GPT
            try:
                # Clean the response to extract JSON
                content = content.strip()
                if content.startswith('```json'):
                    content = content[7:]
                if content.endswith('```'):
                    content = content[:-3]
                content = content.strip()
                
                panchang_data = json.loads(content)
                
                # Ensure all required fields are present
                result_obj = {
                    'date': panchang_data.get('date', date_str),
                    'tithi': panchang_data.get('tithi', ''),
                    'nakshatra': panchang_data.get('nakshatra', ''),
                    'yoga': panchang_data.get('yoga', ''),
                    'karana': panchang_data.get('karana', ''),
                    'sunrise': panchang_data.get('sunrise', '06:00'),
                    'sunset': panchang_data.get('sunset', '18:00'),
                    'auspiciousTimings': panchang_data.get('auspiciousTimings', []),
                    'inauspiciousTimings': panchang_data.get('inauspiciousTimings', []),
                    'dailyWisdom': panchang_data.get('dailyWisdom', ''),
                    'paksha': panchang_data.get('paksha', ''),
                    'dayName': panchang_data.get('dayName', day_name),
                    'tithiSignificance': panchang_data.get('tithiSignificance', ''),
                    'nakshatraSignificance': panchang_data.get('nakshatraSignificance', ''),
                }
                result_obj['dataSource'] = 'AI Generated (Gemini)'
                return result_obj
            except json.JSONDecodeError as e:
                print(f"Error parsing Gemini response: {e}")
                print(f"Raw response: {content}")
                return None
                
    except Exception as e:
        print(f"Error with Gemini API: {e}")
    
    return None

def get_sunrise_sunset(date_obj):
    """Generate realistic sunrise and sunset times based on date"""
    # Simple algorithm to simulate seasonal changes
    day_of_year = date_obj.timetuple().tm_yday
    
    # Base times (around equinox)
    base_sunrise = 6.0  # 6:00 AM
    base_sunset = 18.0  # 6:00 PM
    
    # Seasonal variation (simplified)
    # Summer solstice around day 172, winter solstice around day 355
    if day_of_year < 80 or day_of_year > 300:  # Winter
        sunrise_hour = base_sunrise + 0.5
        sunset_hour = base_sunset - 1.0
    elif day_of_year < 172:  # Spring
        sunrise_hour = base_sunrise + 0.25
        sunset_hour = base_sunset - 0.5
    elif day_of_year < 266:  # Summer
        sunrise_hour = base_sunrise - 0.25
        sunset_hour = base_sunset + 0.5
    else:  # Fall
        sunrise_hour = base_sunrise + 0.25
        sunset_hour = base_sunset - 0.5
    
    # Add some variation based on date hash
    hash_object = hashlib.md5(f"sun_{date_obj.strftime('%Y-%m-%d')}".encode())
    hash_hex = hash_object.hexdigest()
    hash_int = int(hash_hex, 16)
    
    # Add ±15 minutes variation
    variation = ((hash_int % 30) - 15) / 60.0
    sunrise_hour += variation
    sunset_hour += variation
    
    # Format times
    sunrise = f"{int(sunrise_hour):02d}:{int((sunrise_hour % 1) * 60):02d}"
    sunset = f"{int(sunset_hour):02d}:{int((sunset_hour % 1) * 60):02d}"
    
    return sunrise, sunset

@panchang_bp.route('/panchang', methods=['GET'])
def get_panchang():
    """Get Panchang data for today or specified date"""
    try:
        date_param = request.args.get('date')
        
        if date_param:
            try:
                target_date = datetime.strptime(date_param, '%Y-%m-%d')
            except ValueError:
                return jsonify({
                    'success': False,
                    'error': 'Invalid date format. Use YYYY-MM-DD'
                }), 400
        else:
            target_date = datetime.now()
        
        date_str = target_date.strftime('%Y-%m-%d')
        
        # Try to get AI-generated panchang data first
        panchang_data = get_ai_generated_panchang(target_date)
        
        # If AI generation fails, use fallback deterministic data
        if not panchang_data:
            # Generate deterministic Panchang data based on date
            tithi = get_deterministic_choice(TITHIS, f"tithi_{date_str}")
            nakshatra = get_deterministic_choice(NAKSHATRAS, f"nakshatra_{date_str}")
            yoga = get_deterministic_choice(YOGAS, f"yoga_{date_str}")
            karana = get_deterministic_choice(KARANAS, f"karana_{date_str}")
            daily_wisdom = get_deterministic_choice(DAILY_WISDOMS, f"wisdom_{date_str}")
            
            # Get sunrise/sunset times
            sunrise, sunset = get_sunrise_sunset(target_date)
            
            # Get auspicious and inauspicious timings
            auspicious_timings = get_auspicious_timings(date_str)
            inauspicious_timings = get_inauspicious_timings(date_str)
            
            # Determine Paksha (Lunar Phase)
            tithi_num = TITHIS.index(tithi) + 1
            if tithi_num <= 15:
                paksha = "Shukla Paksha (Waxing Moon)"
            else:
                paksha = "Krishna Paksha (Waning Moon)"
            
            # Get day name
            day_name = target_date.strftime('%A')
            
            # Get significance information
            tithi_significance = TITHI_SIGNIFICANCE.get(tithi, 'Auspicious for spiritual practices and positive activities.')
            nakshatra_significance = NAKSHATRA_SIGNIFICANCE.get(nakshatra, 'Favorable for general activities and personal growth.')
            
            # Generate fallback Panchang data
            panchang_data = {
                'date': date_str,
                'tithi': tithi,
                'nakshatra': nakshatra,
                'yoga': yoga,
                'karana': karana,
                'sunrise': sunrise,
                'sunset': sunset,
                'auspiciousTimings': auspicious_timings,
                'inauspiciousTimings': inauspicious_timings,
                'dailyWisdom': daily_wisdom,
                'paksha': paksha,
                'dayName': day_name,
                'tithiSignificance': tithi_significance,
                'nakshatraSignificance': nakshatra_significance,
                'dataSource': 'Fallback Generated'
            }
        
        return jsonify({
            'success': True,
            'data': panchang_data
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
