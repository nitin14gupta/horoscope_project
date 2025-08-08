from flask import Blueprint, request, jsonify
from datetime import datetime
import uuid
import asyncio
import sys
import os

# Add the parent directory to the path to import utils
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from utils.astrological_service import astrological_service

horoscope_bp = Blueprint('horoscope', __name__)

@horoscope_bp.route('/horoscope', methods=['POST'])
def get_horoscope():
    """Get real horoscope prediction based on user input"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['fullName', 'dateOfBirth', 'zodiacSign']
        for field in required_fields:
            if not data.get(field):
                return jsonify({
                    'success': False,
                    'error': f'Missing required field: {field}'
                }), 400
        
        full_name = data['fullName']
        date_of_birth = datetime.strptime(data['dateOfBirth'], '%Y-%m-%d')
        zodiac_sign = data['zodiacSign'].lower()
        time_of_birth = data.get('timeOfBirth')
        place_of_birth = data.get('placeOfBirth')
        gender = data.get('gender')
        
        # Validate zodiac sign
        if zodiac_sign not in astrological_service.zodiac_signs:
            return jsonify({
                'success': False,
                'error': 'Invalid zodiac sign'
            }), 400
        
        # Get real horoscope using AI
        try:
            # Run async function in sync context
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)
            horoscope_data = loop.run_until_complete(
                astrological_service.get_ai_horoscope(zodiac_sign, datetime.now())
            )
            loop.close()
        except Exception as e:
            # Fallback to basic horoscope
            horoscope_data = astrological_service.get_fallback_horoscope(zodiac_sign)
        
        # Get compatibility based on zodiac sign
        compatibility_signs = {
            'aries': 'Leo, Sagittarius, Gemini',
            'taurus': 'Virgo, Capricorn, Cancer',
            'gemini': 'Libra, Aquarius, Aries',
            'cancer': 'Scorpio, Pisces, Taurus',
            'leo': 'Aries, Sagittarius, Gemini',
            'virgo': 'Taurus, Capricorn, Cancer',
            'libra': 'Gemini, Aquarius, Leo',
            'scorpio': 'Cancer, Pisces, Virgo',
            'sagittarius': 'Aries, Leo, Libra',
            'capricorn': 'Taurus, Virgo, Scorpio',
            'aquarius': 'Gemini, Libra, Sagittarius',
            'pisces': 'Cancer, Scorpio, Capricorn'
        }
        
        compatibility = compatibility_signs.get(zodiac_sign, 'Check with an astrologer')
        
        # Create response with real data
        horoscope_response = {
            'id': str(uuid.uuid4()),
            'fullName': full_name,
            'zodiacSign': zodiac_sign,
            'date': datetime.now().strftime('%Y-%m-%d'),
            'prediction': horoscope_data.get('prediction', ''),
            'luckyColor': horoscope_data.get('luckyColor', 'Blue'),
            'luckyNumber': horoscope_data.get('luckyNumber', 7),
            'compatibility': compatibility,
            'health': horoscope_data.get('health', ''),
            'career': horoscope_data.get('career', ''),
            'love': horoscope_data.get('love', ''),
            'finance': horoscope_data.get('finance', ''),
            'createdAt': datetime.now().isoformat()
        }
        
        return jsonify({
            'success': True,
            'data': horoscope_response
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
