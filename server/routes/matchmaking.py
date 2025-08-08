from flask import Blueprint, request, jsonify
import random

matchmaking_bp = Blueprint('matchmaking', __name__)

# Compatibility matrix
COMPATIBILITY_MATRIX = {
    'aries': {
        'aries': 70, 'taurus': 60, 'gemini': 85, 'cancer': 50, 'leo': 90, 'virgo': 65,
        'libra': 75, 'scorpio': 55, 'sagittarius': 95, 'capricorn': 45, 'aquarius': 80, 'pisces': 40
    },
    'taurus': {
        'aries': 60, 'taurus': 85, 'gemini': 50, 'cancer': 90, 'leo': 65, 'virgo': 95,
        'libra': 75, 'scorpio': 80, 'sagittarius': 40, 'capricorn': 90, 'aquarius': 45, 'pisces': 85
    },
    'gemini': {
        'aries': 85, 'taurus': 50, 'gemini': 80, 'cancer': 65, 'leo': 75, 'virgo': 70,
        'libra': 95, 'scorpio': 60, 'sagittarius': 85, 'capricorn': 55, 'aquarius': 90, 'pisces': 70
    },
    'cancer': {
        'aries': 50, 'taurus': 90, 'gemini': 65, 'cancer': 85, 'leo': 60, 'virgo': 80,
        'libra': 70, 'scorpio': 95, 'sagittarius': 45, 'capricorn': 75, 'aquarius': 40, 'pisces': 90
    },
    'leo': {
        'aries': 90, 'taurus': 65, 'gemini': 75, 'cancer': 60, 'leo': 85, 'virgo': 55,
        'libra': 80, 'scorpio': 70, 'sagittarius': 95, 'capricorn': 50, 'aquarius': 75, 'pisces': 65
    },
    'virgo': {
        'aries': 65, 'taurus': 95, 'gemini': 70, 'cancer': 80, 'leo': 55, 'virgo': 85,
        'libra': 75, 'scorpio': 85, 'sagittarius': 50, 'capricorn': 90, 'aquarius': 70, 'pisces': 80
    },
    'libra': {
        'aries': 75, 'taurus': 75, 'gemini': 95, 'cancer': 70, 'leo': 80, 'virgo': 75,
        'libra': 85, 'scorpio': 65, 'sagittarius': 80, 'capricorn': 70, 'aquarius': 90, 'pisces': 75
    },
    'scorpio': {
        'aries': 55, 'taurus': 80, 'gemini': 60, 'cancer': 95, 'leo': 70, 'virgo': 85,
        'libra': 65, 'scorpio': 90, 'sagittarius': 60, 'capricorn': 85, 'aquarius': 55, 'pisces': 95
    },
    'sagittarius': {
        'aries': 95, 'taurus': 40, 'gemini': 85, 'cancer': 45, 'leo': 95, 'virgo': 50,
        'libra': 80, 'scorpio': 60, 'sagittarius': 85, 'capricorn': 65, 'aquarius': 85, 'pisces': 70
    },
    'capricorn': {
        'aries': 45, 'taurus': 90, 'gemini': 55, 'cancer': 75, 'leo': 50, 'virgo': 90,
        'libra': 70, 'scorpio': 85, 'sagittarius': 65, 'capricorn': 85, 'aquarius': 75, 'pisces': 80
    },
    'aquarius': {
        'aries': 80, 'taurus': 45, 'gemini': 90, 'cancer': 40, 'leo': 75, 'virgo': 70,
        'libra': 90, 'scorpio': 55, 'sagittarius': 85, 'capricorn': 75, 'aquarius': 85, 'pisces': 65
    },
    'pisces': {
        'aries': 40, 'taurus': 85, 'gemini': 70, 'cancer': 90, 'leo': 65, 'virgo': 80,
        'libra': 75, 'scorpio': 95, 'sagittarius': 70, 'capricorn': 80, 'aquarius': 65, 'pisces': 85
    }
}

# Compatibility messages
COMPATIBILITY_MESSAGES = {
    'high': [
        "Excellent compatibility! This is a match made in the stars.",
        "High compatibility indicates a strong potential for a harmonious relationship.",
        "The stars align perfectly for this combination.",
        "This pairing has great potential for long-term success."
    ],
    'medium': [
        "Good compatibility with room for growth and understanding.",
        "This combination can work well with mutual effort and communication.",
        "Moderate compatibility suggests a balanced relationship dynamic.",
        "With patience and understanding, this can be a rewarding partnership."
    ],
    'low': [
        "Challenging compatibility that may require extra effort and understanding.",
        "This combination may face some obstacles but can grow stronger through challenges.",
        "Lower compatibility suggests the need for open communication and compromise.",
        "While challenging, this pairing can teach valuable life lessons."
    ]
}

@matchmaking_bp.route('/matchmaking', methods=['POST'])
def get_compatibility():
    """Get compatibility between two zodiac signs"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['zodiacSign1', 'zodiacSign2']
        for field in required_fields:
            if not data.get(field):
                return jsonify({
                    'success': False,
                    'error': f'Missing required field: {field}'
                }), 400
        
        zodiac_sign1 = data['zodiacSign1'].lower()
        zodiac_sign2 = data['zodiacSign2'].lower()
        
        # Validate zodiac signs
        if zodiac_sign1 not in COMPATIBILITY_MATRIX or zodiac_sign2 not in COMPATIBILITY_MATRIX:
            return jsonify({
                'success': False,
                'error': 'Invalid zodiac sign'
            }), 400
        
        # Get compatibility score
        compatibility_score = COMPATIBILITY_MATRIX[zodiac_sign1][zodiac_sign2]
        
        # Determine compatibility level
        if compatibility_score >= 80:
            compatibility_level = 'high'
            message = random.choice(COMPATIBILITY_MESSAGES['high'])
        elif compatibility_score >= 60:
            compatibility_level = 'medium'
            message = random.choice(COMPATIBILITY_MESSAGES['medium'])
        else:
            compatibility_level = 'low'
            message = random.choice(COMPATIBILITY_MESSAGES['low'])
        
        # Generate detailed compatibility
        love_compatibility = f"{zodiac_sign1.capitalize()} and {zodiac_sign2.capitalize()} have a {compatibility_score}% love compatibility. {message}"
        
        friendship_compatibility = f"As friends, {zodiac_sign1.capitalize()} and {zodiac_sign2.capitalize()} can build a {compatibility_level} level of trust and understanding."
        
        business_compatibility = f"In business partnerships, {zodiac_sign1.capitalize()} and {zodiac_sign2.capitalize()} can achieve {compatibility_level} success through collaboration."
        
        # Generate tips based on compatibility level
        if compatibility_level == 'high':
            tips = [
                "Communicate openly and honestly",
                "Support each other's goals and dreams",
                "Celebrate your differences and similarities",
                "Maintain trust and loyalty",
                "Continue to grow together"
            ]
        elif compatibility_level == 'medium':
            tips = [
                "Focus on effective communication",
                "Be patient with each other's differences",
                "Find common ground and shared interests",
                "Practice active listening",
                "Work on building trust gradually"
            ]
        else:
            tips = [
                "Practice patience and understanding",
                "Focus on open and honest communication",
                "Respect each other's boundaries",
                "Seek professional guidance if needed",
                "Remember that challenges can lead to growth"
            ]
        
        response = {
            'compatibility': compatibility_score,
            'message': message,
            'loveCompatibility': love_compatibility,
            'friendshipCompatibility': friendship_compatibility,
            'businessCompatibility': business_compatibility,
            'tips': tips
        }
        
        return jsonify({
            'success': True,
            'data': response
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
