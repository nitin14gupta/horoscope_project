from flask import Blueprint, request, jsonify
import uuid

zodiac_bp = Blueprint('zodiac', __name__)

# Zodiac signs data
ZODIAC_SIGNS = [
    {
        'id': str(uuid.uuid4()),
        'name': 'Aries',
        'symbol': '♈',
        'element': 'Fire',
        'rulingPlanet': 'Mars',
        'dates': 'March 21 - April 19',
        'traits': ['Courageous', 'Energetic', 'Willful', 'Pioneering', 'Independent'],
        'description': 'Aries is the first sign of the zodiac, and those born under this sign are bold and ambitious. They are natural leaders who are always ready for action.',
        'luckyColors': ['Red', 'Orange', 'Crimson'],
        'luckyNumbers': [1, 9, 17]
    },
    {
        'id': str(uuid.uuid4()),
        'name': 'Taurus',
        'symbol': '♉',
        'element': 'Earth',
        'rulingPlanet': 'Venus',
        'dates': 'April 20 - May 20',
        'traits': ['Patient', 'Reliable', 'Devoted', 'Persistent', 'Practical'],
        'description': 'Taurus is known for being reliable, practical, ambitious and sensual. They have an eye for beauty and love to be surrounded by love and material pleasures.',
        'luckyColors': ['Green', 'Pink', 'Brown'],
        'luckyNumbers': [2, 6, 15]
    },
    {
        'id': str(uuid.uuid4()),
        'name': 'Gemini',
        'symbol': '♊',
        'element': 'Air',
        'rulingPlanet': 'Mercury',
        'dates': 'May 21 - June 20',
        'traits': ['Adaptable', 'Versatile', 'Communicative', 'Witty', 'Intellectual'],
        'description': 'Gemini is versatile, expressive, and quick-witted. They are excellent communicators and can adapt to any situation.',
        'luckyColors': ['Yellow', 'Light Blue', 'Orange'],
        'luckyNumbers': [3, 5, 12]
    },
    {
        'id': str(uuid.uuid4()),
        'name': 'Cancer',
        'symbol': '♋',
        'element': 'Water',
        'rulingPlanet': 'Moon',
        'dates': 'June 21 - July 22',
        'traits': ['Nurturing', 'Protective', 'Intuitive', 'Emotional', 'Sympathetic'],
        'description': 'Cancer is deeply intuitive and sentimental. They are very emotional and sensitive, and care deeply about matters of the family.',
        'luckyColors': ['Silver', 'White', 'Pearl'],
        'luckyNumbers': [2, 7, 11]
    },
    {
        'id': str(uuid.uuid4()),
        'name': 'Leo',
        'symbol': '♌',
        'element': 'Fire',
        'rulingPlanet': 'Sun',
        'dates': 'July 23 - August 22',
        'traits': ['Creative', 'Passionate', 'Generous', 'Warm-hearted', 'Cheerful'],
        'description': 'Leo is dramatic, creative, self-confident, born to lead and born to entertain. They are natural leaders and have a strong sense of self.',
        'luckyColors': ['Gold', 'Orange', 'Yellow'],
        'luckyNumbers': [1, 5, 9]
    },
    {
        'id': str(uuid.uuid4()),
        'name': 'Virgo',
        'symbol': '♍',
        'element': 'Earth',
        'rulingPlanet': 'Mercury',
        'dates': 'August 23 - September 22',
        'traits': ['Analytical', 'Kind', 'Hardworking', 'Practical', 'Modest'],
        'description': 'Virgo is analytical, kind, hardworking and practical. They are perfectionists and pay attention to every detail.',
        'luckyColors': ['Green', 'Brown', 'Navy Blue'],
        'luckyNumbers': [4, 6, 8]
    },
    {
        'id': str(uuid.uuid4()),
        'name': 'Libra',
        'symbol': '♎',
        'element': 'Air',
        'rulingPlanet': 'Venus',
        'dates': 'September 23 - October 22',
        'traits': ['Diplomatic', 'Gracious', 'Fair-minded', 'Social', 'Peaceful'],
        'description': 'Libra is peaceful, fair, and they hate being alone. Partnership is very important for them, as their mirror and someone to grow with.',
        'luckyColors': ['Pink', 'Light Blue', 'Lavender'],
        'luckyNumbers': [2, 6, 7]
    },
    {
        'id': str(uuid.uuid4()),
        'name': 'Scorpio',
        'symbol': '♏',
        'element': 'Water',
        'rulingPlanet': 'Pluto',
        'dates': 'October 23 - November 21',
        'traits': ['Passionate', 'Determined', 'Magnetic', 'Mysterious', 'Strategic'],
        'description': 'Scorpio is passionate and assertive. They are determined and decisive, and will research until they find out the truth.',
        'luckyColors': ['Deep Red', 'Black', 'Maroon'],
        'luckyNumbers': [4, 8, 11]
    },
    {
        'id': str(uuid.uuid4()),
        'name': 'Sagittarius',
        'symbol': '♐',
        'element': 'Fire',
        'rulingPlanet': 'Jupiter',
        'dates': 'November 22 - December 21',
        'traits': ['Optimistic', 'Adventurous', 'Independent', 'Honest', 'Philosophical'],
        'description': 'Sagittarius is optimistic, loves freedom, and exploration. They are enthusiastic, extroverted, and always ready for an adventure.',
        'luckyColors': ['Purple', 'Blue', 'Indigo'],
        'luckyNumbers': [3, 9, 12]
    },
    {
        'id': str(uuid.uuid4()),
        'name': 'Capricorn',
        'symbol': '♑',
        'element': 'Earth',
        'rulingPlanet': 'Saturn',
        'dates': 'December 22 - January 19',
        'traits': ['Responsible', 'Disciplined', 'Self-controlled', 'Ambitious', 'Patient'],
        'description': 'Capricorn is responsible and disciplined, masters of self-control and have the ability to lead, with solid organizational skills.',
        'luckyColors': ['Dark Green', 'Brown', 'Gray'],
        'luckyNumbers': [1, 4, 8]
    },
    {
        'id': str(uuid.uuid4()),
        'name': 'Aquarius',
        'symbol': '♒',
        'element': 'Air',
        'rulingPlanet': 'Uranus',
        'dates': 'January 20 - February 18',
        'traits': ['Progressive', 'Original', 'Independent', 'Humanitarian', 'Intellectual'],
        'description': 'Aquarius is deep, imaginative, and uncompromising in their dedication to making the world a better place.',
        'luckyColors': ['Electric Blue', 'Turquoise', 'Silver'],
        'luckyNumbers': [2, 5, 7]
    },
    {
        'id': str(uuid.uuid4()),
        'name': 'Pisces',
        'symbol': '♓',
        'element': 'Water',
        'rulingPlanet': 'Neptune',
        'dates': 'February 19 - March 20',
        'traits': ['Compassionate', 'Artistic', 'Intuitive', 'Gentle', 'Musical'],
        'description': 'Pisces is intuitive, artistic, and deeply feeling. They are the most spiritual of all signs and have a deep connection to the universe.',
        'luckyColors': ['Sea Green', 'Lavender', 'Aqua'],
        'luckyNumbers': [3, 7, 9]
    }
]

@zodiac_bp.route('/zodiac', methods=['GET'])
def get_zodiac_signs():
    """Get all zodiac signs"""
    try:
        return jsonify({
            'success': True,
            'data': ZODIAC_SIGNS
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@zodiac_bp.route('/zodiac/<sign_id>', methods=['GET'])
def get_zodiac_sign(sign_id):
    """Get specific zodiac sign by ID"""
    try:
        sign = next((s for s in ZODIAC_SIGNS if s['id'] == sign_id), None)
        
        if not sign:
            return jsonify({
                'success': False,
                'error': 'Zodiac sign not found'
            }), 404
        
        return jsonify({
            'success': True,
            'data': sign
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
