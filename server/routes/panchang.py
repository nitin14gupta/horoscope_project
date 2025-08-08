from flask import Blueprint, request, jsonify
from datetime import datetime, timedelta
import random

panchang_bp = Blueprint('panchang', __name__)

# Sample Panchang data
TITHIS = ['Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami', 'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami', 'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima', 'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami', 'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami', 'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Amavasya']

NAKSHATRAS = ['Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati']

YOGAS = ['Vishkumbha', 'Priti', 'Ayushman', 'Saubhagya', 'Shobhana', 'Atiganda', 'Sukarman', 'Dhriti', 'Shula', 'Ganda', 'Vriddhi', 'Dhruva', 'Vyaghata', 'Harshana', 'Vajra', 'Siddhi', 'Vyatipata', 'Variyan', 'Parigha', 'Shiva', 'Siddha', 'Sadhya', 'Shubha', 'Shukla', 'Brahma', 'Indra', 'Vaidhriti']

KARANAS = ['Bava', 'Balava', 'Kaulava', 'Taitila', 'Garija', 'Vanija', 'Vishti', 'Shakuni', 'Chatushpada', 'Naga']

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
        
        # Generate Panchang data
        panchang_data = {
            'date': target_date.strftime('%Y-%m-%d'),
            'tithi': random.choice(TITHIS),
            'nakshatra': random.choice(NAKSHATRAS),
            'yoga': random.choice(YOGAS),
            'karana': random.choice(KARANAS),
            'sunrise': '06:00',
            'sunset': '18:00',
            'auspiciousTimings': [
                '06:00 - 08:00 (Brahma Muhurta)',
                '09:00 - 11:00 (Abhijit Muhurta)',
                '15:00 - 17:00 (Godhuli Kaal)'
            ],
            'inauspiciousTimings': [
                '12:00 - 13:00 (Rahu Kaal)',
                '16:00 - 17:30 (Yamaganda)',
                '18:00 - 19:30 (Gulika Kaal)'
            ],
            'dailyWisdom': random.choice([
                "Today is auspicious for starting new ventures. Trust in the divine timing.",
                "Focus on spiritual practices and meditation for inner peace.",
                "Charity and helping others will bring positive karma today.",
                "Maintain harmony in relationships and avoid conflicts.",
                "Study and learning will be particularly rewarding today."
            ])
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
