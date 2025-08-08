from flask import Blueprint, request, jsonify
from datetime import datetime
import random
import uuid

horoscope_bp = Blueprint('horoscope', __name__)

# Sample horoscope predictions
HOROSCOPE_PREDICTIONS = {
    'aries': [
        "Today brings fiery energy and determination. Your leadership qualities will shine through. Take bold steps towards your goals. Lucky color: Red. Lucky number: 1.",
        "Mars energy empowers you to take action. Be bold in your decisions. Physical activity will bring good results. Lucky color: Orange. Lucky number: 9.",
        "Your natural courage and enthusiasm will help you overcome challenges. Trust your instincts. Lucky color: Crimson. Lucky number: 4."
    ],
    'taurus': [
        "Venus blesses you with harmony in relationships. Express your feelings openly. Financial gains are possible. Lucky color: Green. Lucky number: 6.",
        "Your practical nature will help you make wise decisions today. Focus on stability and growth. Lucky color: Pink. Lucky number: 2.",
        "Patience and persistence will lead to success. Trust in your abilities. Lucky color: Brown. Lucky number: 8."
    ],
    'gemini': [
        "Mercury's influence brings clarity to your thoughts. Communication will be key today. Trust your intuition. Lucky color: Yellow. Lucky number: 5.",
        "Your curiosity and adaptability will open new doors. Embrace change and learning. Lucky color: Light Blue. Lucky number: 3.",
        "Social interactions will be particularly rewarding today. Share your ideas freely. Lucky color: Orange. Lucky number: 7."
    ],
    'cancer': [
        "The Moon's energy enhances your emotional intelligence. Trust your feelings and intuition. Lucky color: Silver. Lucky number: 2.",
        "Your nurturing nature will bring positive energy to those around you. Focus on family and home. Lucky color: White. Lucky number: 7.",
        "Emotional connections will be strengthened today. Express your care and concern. Lucky color: Pearl. Lucky number: 4."
    ],
    'leo': [
        "The Sun's energy makes you the center of attention. Your charisma will attract opportunities. Lucky color: Gold. Lucky number: 1.",
        "Your natural leadership will be recognized today. Take charge of situations with confidence. Lucky color: Orange. Lucky number: 5.",
        "Creative projects will flourish under your guidance. Express yourself boldly. Lucky color: Yellow. Lucky number: 9."
    ],
    'virgo': [
        "Your attention to detail will be your greatest asset today. Focus on organization and efficiency. Lucky color: Green. Lucky number: 6.",
        "Analytical thinking will help you solve complex problems. Trust your logical mind. Lucky color: Brown. Lucky number: 4.",
        "Service to others will bring you satisfaction and recognition. Lucky color: Navy Blue. Lucky number: 8."
    ],
    'libra': [
        "Venus brings balance and harmony to your relationships. Focus on fairness and cooperation. Lucky color: Pink. Lucky number: 6.",
        "Your diplomatic nature will help resolve conflicts. Seek balance in all areas. Lucky color: Light Blue. Lucky number: 2.",
        "Social connections will be particularly rewarding today. Lucky color: Lavender. Lucky number: 7."
    ],
    'scorpio': [
        "Your intuitive powers are heightened today. Trust your gut feelings and insights. Lucky color: Deep Red. Lucky number: 8.",
        "Transformation and change are in the air. Embrace new beginnings. Lucky color: Black. Lucky number: 4.",
        "Your determination will help you achieve your goals. Stay focused and persistent. Lucky color: Maroon. Lucky number: 9."
    ],
    'sagittarius': [
        "Jupiter's influence brings optimism and expansion. New opportunities are on the horizon. Lucky color: Purple. Lucky number: 3.",
        "Your adventurous spirit will lead you to exciting discoveries. Embrace new experiences. Lucky color: Blue. Lucky number: 9.",
        "Philosophical insights will guide your decisions today. Trust your wisdom. Lucky color: Indigo. Lucky number: 6."
    ],
    'capricorn': [
        "Saturn's energy brings discipline and structure. Your hard work will pay off. Lucky color: Dark Green. Lucky number: 4.",
        "Your ambition and determination will lead to success. Stay focused on your goals. Lucky color: Brown. Lucky number: 8.",
        "Practical decisions will bring long-term benefits. Trust your judgment. Lucky color: Gray. Lucky number: 1."
    ],
    'aquarius': [
        "Uranus brings innovation and originality to your thinking. Embrace your unique perspective. Lucky color: Electric Blue. Lucky number: 7.",
        "Your humanitarian nature will inspire others today. Focus on community and friendship. Lucky color: Turquoise. Lucky number: 5.",
        "Progressive ideas will lead to positive change. Share your vision with others. Lucky color: Silver. Lucky number: 2."
    ],
    'pisces': [
        "Neptune enhances your spiritual awareness and creativity. Trust your dreams and intuition. Lucky color: Sea Green. Lucky number: 3.",
        "Your compassionate nature will touch the lives of others. Focus on healing and empathy. Lucky color: Lavender. Lucky number: 7.",
        "Artistic and spiritual pursuits will bring fulfillment today. Lucky color: Aqua. Lucky number: 9."
    ]
}

# Detailed predictions for different areas
DETAILED_PREDICTIONS = {
    'love': [
        "Romantic opportunities may arise today. Open your heart to new possibilities.",
        "Communication with your partner will strengthen your bond.",
        "Single? Keep your eyes open for someone special.",
        "Express your feelings openly and honestly.",
        "Past relationships may bring valuable lessons today."
    ],
    'career': [
        "New opportunities may present themselves at work.",
        "Your skills and talents will be recognized by superiors.",
        "Collaboration with colleagues will lead to success.",
        "Consider taking on new responsibilities or projects.",
        "Networking will open doors to future opportunities."
    ],
    'finance': [
        "Financial decisions should be made carefully today.",
        "Unexpected income or opportunities may arise.",
        "Investments made today could be profitable.",
        "Avoid impulsive spending and focus on saving.",
        "Financial planning will bring long-term benefits."
    ],
    'health': [
        "Focus on maintaining a balanced diet and exercise routine.",
        "Mental health and stress management are important today.",
        "Consider trying new wellness practices or activities.",
        "Rest and relaxation will help restore your energy.",
        "Preventive health measures will be beneficial."
    ]
}

@horoscope_bp.route('/horoscope', methods=['POST'])
def get_horoscope():
    """Get horoscope prediction based on user input"""
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
        date_of_birth = data['dateOfBirth']
        zodiac_sign = data['zodiacSign'].lower()
        time_of_birth = data.get('timeOfBirth')
        place_of_birth = data.get('placeOfBirth')
        gender = data.get('gender')
        
        # Validate zodiac sign
        if zodiac_sign not in HOROSCOPE_PREDICTIONS:
            return jsonify({
                'success': False,
                'error': 'Invalid zodiac sign'
            }), 400
        
        # Generate horoscope prediction
        prediction = random.choice(HOROSCOPE_PREDICTIONS[zodiac_sign])
        
        # Generate lucky details
        lucky_colors = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Pink', 'Gold', 'Silver', 'White']
        lucky_color = random.choice(lucky_colors)
        lucky_number = random.randint(1, 9)
        
        # Generate detailed predictions
        love_prediction = random.choice(DETAILED_PREDICTIONS['love'])
        career_prediction = random.choice(DETAILED_PREDICTIONS['career'])
        finance_prediction = random.choice(DETAILED_PREDICTIONS['finance'])
        health_prediction = random.choice(DETAILED_PREDICTIONS['health'])
        
        # Generate compatibility
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
        
        # Create response
        horoscope_response = {
            'id': str(uuid.uuid4()),
            'fullName': full_name,
            'zodiacSign': zodiac_sign,
            'date': datetime.now().strftime('%Y-%m-%d'),
            'prediction': prediction,
            'luckyColor': lucky_color,
            'luckyNumber': lucky_number,
            'compatibility': compatibility,
            'health': health_prediction,
            'career': career_prediction,
            'love': love_prediction,
            'finance': finance_prediction,
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
