from flask import Blueprint, request, jsonify
from datetime import datetime, timedelta
import random
import uuid
import requests
import os
from typing import Optional, Dict, Any
import json
from config import Config

horoscope_bp = Blueprint('horoscope', __name__)

def get_real_horoscope_from_api(zodiac_sign: str, date: str = None) -> Optional[Dict[str, Any]]:
    """Get real horoscope data from external astrology API"""
    try:
        if not Config.has_api_key('astrology'):
            return None
            
        # Use Astrology API for real horoscope data
        headers = {
            'Authorization': f'Bearer {Config.get_api_key("astrology")}',
            'Content-Type': 'application/json'
        }
        
        # Get daily horoscope
        daily_endpoint = f"{Config.get_api_endpoint('astrology_api')}/horoscope_prediction/{zodiac_sign}"
        response = requests.get(daily_endpoint, headers=headers, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            return {
                'prediction': data.get('prediction', ''),
                'lucky_color': data.get('lucky_color', ''),
                'lucky_number': data.get('lucky_number', ''),
                'mood': data.get('mood', ''),
                'compatibility': data.get('compatibility', ''),
                'date_range': data.get('date_range', ''),
                'current_date': data.get('current_date', '')
            }
    except Exception as e:
        print(f"Error fetching from astrology API: {e}")
    
    return None

def get_ai_generated_horoscope(zodiac_sign: str, user_details: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    """Generate horoscope using AI models (OpenAI)"""
    try:
        if Config.has_api_key('openai'):
            return get_openai_horoscope(zodiac_sign, user_details)
    except Exception as e:
        print(f"Error generating AI horoscope: {e}")
    
    return None

def get_openai_horoscope(zodiac_sign: str, user_details: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    """Generate horoscope using OpenAI GPT model"""
    try:
        prompt = f"""
        Generate a personalized daily horoscope for a {user_details.get('gender', 'person')} born on {user_details.get('dateOfBirth', '')} 
        with zodiac sign {zodiac_sign.capitalize()}. 
        
        Please provide a JSON response with the following structure:
        {{
            "prediction": "A detailed daily prediction (2-3 sentences)",
            "love": "Love forecast and relationship advice",
            "career": "Career advice and professional insights",
            "finance": "Financial outlook and money advice",
            "health": "Health recommendations and wellness tips",
            "luckyColor": "Lucky color for today",
            "luckyNumber": "Lucky number (integer)",
            "compatibility": "Compatible zodiac signs",
            "planetaryInfluence": "Ruling planet for {zodiac_sign.capitalize()}",
            "element": "Element associated with {zodiac_sign.capitalize()}",
            "quality": "Quality (Cardinal, Fixed, or Mutable) of {zodiac_sign.capitalize()}"
        }}
        
        Make it personal, insightful, and based on astrological principles. Be encouraging and practical.
        Return ONLY the JSON object, no additional text.
        """
        
        headers = {
            'Authorization': f'Bearer {Config.get_api_key("openai")}',
            'Content-Type': 'application/json'
        }
        
        data = {
            'model': 'gpt-5',
            'messages': [
                {'role': 'system', 'content': 'You are an expert astrologer with deep knowledge of zodiac signs, planetary influences, and astrological principles. Provide accurate, personalized horoscope readings. Always respond with valid JSON only.'},
                {'role': 'user', 'content': prompt}
            ],
            'max_tokens': 800,
            'temperature': 0.7
        }
        
        response = requests.post(Config.get_api_endpoint('openai_api'), headers=headers, json=data, timeout=15)
        
        if response.status_code == 200:
            result = response.json()
            content = result['choices'][0]['message']['content']
            
            # Parse the JSON response from GPT
            try:
                # Clean the response to extract JSON
                content = content.strip()
                if content.startswith('```json'):
                    content = content[7:]
                if content.endswith('```'):
                    content = content[:-3]
                content = content.strip()
                
                horoscope_data = json.loads(content)
                
                # Ensure all required fields are present
                return {
                    'prediction': horoscope_data.get('prediction', ''),
                    'love': horoscope_data.get('love', ''),
                    'career': horoscope_data.get('career', ''),
                    'finance': horoscope_data.get('finance', ''),
                    'health': horoscope_data.get('health', ''),
                    'lucky_color': horoscope_data.get('luckyColor', ''),
                    'lucky_number': horoscope_data.get('luckyNumber', 7),
                    'compatibility': horoscope_data.get('compatibility', ''),
                    'planetaryInfluence': horoscope_data.get('planetaryInfluence', ''),
                    'element': horoscope_data.get('element', ''),
                    'quality': horoscope_data.get('quality', ''),
                    'dataSource': 'AI Generated (GPT-5)'
                }
            except json.JSONDecodeError as e:
                print(f"Error parsing GPT response: {e}")
                print(f"Raw response: {content}")
                return None
                
    except Exception as e:
        print(f"Error with OpenAI API: {e}")
    
    return None

def get_fallback_horoscope(zodiac_sign: str) -> Dict[str, Any]:
    """Fallback horoscope data if external APIs fail"""
    fallback_data = {
        'aries': {
            'prediction': "Mars energy empowers you to take bold action today. Your natural leadership and courage will be recognized.",
            'love': "Romantic opportunities may arise. Be bold in expressing your feelings.",
            'career': "Your leadership qualities will shine. Take initiative in important projects.",
            'finance': "Bold financial decisions may bring rewards. Trust your instincts.",
            'health': "Physical activity will boost your energy. Focus on exercise and movement.",
            'lucky_color': 'Red',
            'lucky_number': 9,
            'compatibility': "Leo, Sagittarius, Gemini",
            'planetaryInfluence': 'Mars',
            'element': 'Fire',
            'quality': 'Cardinal'
        },
        'taurus': {
            'prediction': "Venus blesses you with harmony and beauty today. Your practical nature will help you create something meaningful.",
            'love': "Harmony in relationships. Express your feelings openly and honestly.",
            'career': "Your attention to detail will be recognized. Focus on quality and stability.",
            'finance': "Financial gains are possible through careful planning and patience.",
            'health': "Focus on creating balance. Enjoy healthy foods and relaxing activities.",
            'lucky_color': 'Green',
            'lucky_number': 6,
            'compatibility': "Virgo, Capricorn, Cancer",
            'planetaryInfluence': 'Venus',
            'element': 'Earth',
            'quality': 'Fixed'
        },
        'gemini': {
            'prediction': "Mercury's influence brings clarity to your thoughts today. Communication will be your strength.",
            'love': "Open communication will strengthen your relationships. Share your thoughts freely.",
            'career': "Your versatility will be an asset. Adapt to changing situations with ease.",
            'finance': "Diversify your investments. Multiple income sources may benefit you.",
            'health': "Mental exercises and social activities will boost your well-being.",
            'lucky_color': 'Yellow',
            'lucky_number': 5,
            'compatibility': "Libra, Aquarius, Aries",
            'planetaryInfluence': 'Mercury',
            'element': 'Air',
            'quality': 'Mutable'
        },
        'cancer': {
            'prediction': "The Moon's nurturing energy surrounds you today. Trust your intuition and emotional wisdom.",
            'love': "Deep emotional connections will flourish. Be vulnerable and authentic.",
            'career': "Your caring nature will be appreciated. Focus on helping others succeed.",
            'finance': "Save for the future. Emotional spending should be avoided.",
            'health': "Emotional well-being is key. Practice self-care and meditation.",
            'lucky_color': 'Silver',
            'lucky_number': 2,
            'compatibility': "Scorpio, Pisces, Taurus",
            'planetaryInfluence': 'Moon',
            'element': 'Water',
            'quality': 'Cardinal'
        },
        'leo': {
            'prediction': "The Sun's radiant energy fills you with confidence today. Your natural charisma will shine.",
            'love': "Your magnetic personality will attract admirers. Be generous with your affection.",
            'career': "Leadership opportunities await. Your creativity will be recognized.",
            'finance': "Generosity may bring unexpected returns. Invest in yourself.",
            'health': "Confidence will boost your energy. Engage in activities that make you feel powerful.",
            'lucky_color': 'Gold',
            'lucky_number': 1,
            'compatibility': "Aries, Sagittarius, Gemini",
            'planetaryInfluence': 'Sun',
            'element': 'Fire',
            'quality': 'Fixed'
        },
        'virgo': {
            'prediction': "Mercury's analytical energy helps you solve problems today. Your attention to detail will be valuable.",
            'love': "Practical gestures will speak louder than words. Show care through actions.",
            'career': "Your organizational skills will be recognized. Focus on efficiency and quality.",
            'finance': "Careful planning will lead to financial stability. Avoid impulsive purchases.",
            'health': "Routine and structure will benefit your health. Maintain healthy habits.",
            'lucky_color': 'Brown',
            'lucky_number': 5,
            'compatibility': "Taurus, Capricorn, Cancer",
            'planetaryInfluence': 'Mercury',
            'element': 'Earth',
            'quality': 'Mutable'
        },
        'libra': {
            'prediction': "Venus brings balance and harmony to your day. Your diplomatic nature will resolve conflicts.",
            'love': "Partnerships will flourish. Focus on creating harmony in relationships.",
            'career': "Your fairness and diplomacy will be valued. Mediate conflicts effectively.",
            'finance': "Balance your spending and saving. Avoid financial extremes.",
            'health': "Balance in all aspects of life will promote well-being. Practice moderation.",
            'lucky_color': 'Pink',
            'lucky_number': 6,
            'compatibility': "Gemini, Aquarius, Leo",
            'planetaryInfluence': 'Venus',
            'element': 'Air',
            'quality': 'Cardinal'
        },
        'scorpio': {
            'prediction': "Pluto's transformative energy empowers you today. Your intensity will lead to breakthroughs.",
            'love': "Deep, passionate connections will develop. Trust your instincts in love.",
            'career': "Your determination will overcome obstacles. Focus on long-term goals.",
            'finance': "Research investments thoroughly. Your intuition will guide financial decisions.",
            'health': "Transformative health practices will benefit you. Consider new approaches.",
            'lucky_color': 'Deep Red',
            'lucky_number': 8,
            'compatibility': "Cancer, Pisces, Capricorn",
            'planetaryInfluence': 'Pluto',
            'element': 'Water',
            'quality': 'Fixed'
        },
        'sagittarius': {
            'prediction': "Jupiter's expansive energy opens new horizons today. Your optimism will attract opportunities.",
            'love': "Adventure in love awaits. Be open to new romantic possibilities.",
            'career': "Your enthusiasm will inspire others. Take on new challenges with confidence.",
            'finance': "Optimistic financial decisions may bring growth. Trust your instincts.",
            'health': "Outdoor activities and travel will boost your energy. Stay active.",
            'lucky_color': 'Purple',
            'lucky_number': 3,
            'compatibility': "Aries, Leo, Aquarius",
            'planetaryInfluence': 'Jupiter',
            'element': 'Fire',
            'quality': 'Mutable'
        },
        'capricorn': {
            'prediction': "Saturn's disciplined energy helps you achieve your goals today. Your patience will be rewarded.",
            'love': "Stable, long-term relationships will develop. Build trust gradually.",
            'career': "Your ambition and discipline will lead to success. Stay focused on goals.",
            'finance': "Conservative financial decisions will pay off. Save for the future.",
            'health': "Discipline in health routines will bring results. Maintain consistency.",
            'lucky_color': 'Black',
            'lucky_number': 4,
            'compatibility': "Taurus, Virgo, Scorpio",
            'planetaryInfluence': 'Saturn',
            'element': 'Earth',
            'quality': 'Cardinal'
        },
        'aquarius': {
            'prediction': "Uranus brings innovation and originality to your day. Your unique perspective will be valued.",
            'love': "Unconventional relationships may develop. Embrace your individuality.",
            'career': "Your innovative ideas will be recognized. Think outside the box.",
            'finance': "Alternative investments may interest you. Consider new financial approaches.",
            'health': "Try new health practices. Innovation in wellness will benefit you.",
            'lucky_color': 'Electric Blue',
            'lucky_number': 7,
            'compatibility': "Gemini, Libra, Sagittarius",
            'planetaryInfluence': 'Uranus',
            'element': 'Air',
            'quality': 'Fixed'
        },
        'pisces': {
            'prediction': "Neptune's spiritual energy connects you to higher wisdom today. Trust your intuition.",
            'love': "Spiritual connections in love will deepen. Follow your heart's guidance.",
            'career': "Your creativity and intuition will guide your work. Trust your instincts.",
            'finance': "Intuitive financial decisions may bring unexpected benefits. Trust your gut.",
            'health': "Spiritual practices will enhance your well-being. Meditation and reflection will help.",
            'lucky_color': 'Sea Green',
            'lucky_number': 2,
            'compatibility': "Cancer, Scorpio, Capricorn",
            'planetaryInfluence': 'Neptune',
            'element': 'Water',
            'quality': 'Mutable'
        }
    }
    
    return fallback_data.get(zodiac_sign, fallback_data['aries'])

@horoscope_bp.route('/horoscope', methods=['POST'])
def get_horoscope():
    """Get real horoscope prediction using external APIs and AI models"""
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
        
        # Try to get real data from external APIs first
        horoscope_data = None
        
        # 1. Try external astrology API
        if not horoscope_data:
            horoscope_data = get_real_horoscope_from_api(zodiac_sign, date_of_birth)
        
        # 2. Try AI-generated horoscope
        if not horoscope_data:
            user_details = {
                'fullName': full_name,
                'dateOfBirth': date_of_birth,
                'timeOfBirth': time_of_birth,
                'placeOfBirth': place_of_birth,
                'gender': gender,
                'zodiacSign': zodiac_sign
            }
            horoscope_data = get_ai_generated_horoscope(zodiac_sign, user_details)
        
        # 3. Use fallback data if all else fails
        if not horoscope_data:
            horoscope_data = get_fallback_horoscope(zodiac_sign)
        
        # Create response with real data
        horoscope_response = {
            'id': str(uuid.uuid4()),
            'fullName': full_name,
            'zodiacSign': zodiac_sign,
            'date': datetime.now().strftime('%Y-%m-%d'),
            'prediction': horoscope_data.get('prediction', ''),
            'luckyColor': horoscope_data.get('lucky_color', ''),
            'luckyNumber': horoscope_data.get('lucky_number', 7),
            'compatibility': horoscope_data.get('compatibility', ''),
            'health': horoscope_data.get('health', ''),
            'career': horoscope_data.get('career', ''),
            'love': horoscope_data.get('love', ''),
            'finance': horoscope_data.get('finance', ''),
            'planetaryInfluence': horoscope_data.get('planetaryInfluence', ''),
            'element': horoscope_data.get('element', ''),
            'quality': horoscope_data.get('quality', ''),
            'dataSource': 'External API' if 'dataSource' not in horoscope_data else horoscope_data['dataSource'],
            'createdAt': datetime.now().isoformat()
        }
        
        return jsonify({
            'success': True,
            'data': horoscope_response
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'An error occurred while generating your horoscope: {str(e)}'
        }), 500

@horoscope_bp.route('/horoscope/daily/<zodiac_sign>', methods=['GET'])
def get_daily_horoscope(zodiac_sign):
    """Get daily horoscope for a specific zodiac sign from external APIs"""
    try:
        zodiac_sign = zodiac_sign.lower()
        
        # Try to get real daily horoscope
        horoscope_data = get_real_horoscope_from_api(zodiac_sign)
        
        if not horoscope_data:
            # Fallback to AI generation
            user_details = {'zodiacSign': zodiac_sign}
            horoscope_data = get_ai_generated_horoscope(zodiac_sign, user_details)
        
        if not horoscope_data:
            # Final fallback
            horoscope_data = get_fallback_horoscope(zodiac_sign)
        
        daily_horoscope = {
            'zodiacSign': zodiac_sign,
            'date': datetime.now().strftime('%Y-%m-%d'),
            'prediction': horoscope_data.get('prediction', ''),
            'luckyColor': horoscope_data.get('lucky_color', ''),
            'luckyNumber': horoscope_data.get('lucky_number', ''),
            'dataSource': horoscope_data.get('dataSource', 'Fallback')
        }
        
        return jsonify({
            'success': True,
            'data': daily_horoscope
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@horoscope_bp.route('/horoscope/ai', methods=['POST'])
def generate_ai_horoscope():
    """Generate custom AI horoscope with specific requirements"""
    try:
        data = request.get_json()
        zodiac_sign = data.get('zodiacSign', '').lower()
        custom_prompt = data.get('prompt', '')
        
        if not zodiac_sign:
            return jsonify({
                'success': False,
                'error': 'Zodiac sign is required'
            }), 400
        
        # Generate AI horoscope with custom prompt
        user_details = {'zodiacSign': zodiac_sign}
        horoscope_data = get_ai_generated_horoscope(zodiac_sign, user_details)
        
        if not horoscope_data:
            horoscope_data = get_fallback_horoscope(zodiac_sign)
        
        # Create response with proper structure matching frontend expectations
        horoscope_response = {
            'id': str(uuid.uuid4()),
            'fullName': f'AI Generated for {zodiac_sign.capitalize()}',
            'zodiacSign': zodiac_sign,
            'date': datetime.now().strftime('%Y-%m-%d'),
            'prediction': horoscope_data.get('prediction', ''),
            'luckyColor': horoscope_data.get('lucky_color', ''),
            'luckyNumber': horoscope_data.get('lucky_number', 7),
            'compatibility': horoscope_data.get('compatibility', ''),
            'health': horoscope_data.get('health', ''),
            'career': horoscope_data.get('career', ''),
            'love': horoscope_data.get('love', ''),
            'finance': horoscope_data.get('finance', ''),
            'planetaryInfluence': horoscope_data.get('planetaryInfluence', ''),
            'element': horoscope_data.get('element', ''),
            'quality': horoscope_data.get('quality', ''),
            'dataSource': horoscope_data.get('dataSource', 'AI Generated'),
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
