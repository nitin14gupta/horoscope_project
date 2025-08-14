from flask import Blueprint, request, jsonify
import random
import requests
import json
from typing import List, Dict, Any, Optional
from config import Config

remedy_bp = Blueprint('remedy', __name__)

# Remedies data
REMEDIES = [
    {
        'id': '1',
        'name': 'Career Problems',
        'category': 'General Remedies',
        'description': 'Remedies for career and professional challenges',
        'solutions': [
            'Chant Gayatri Mantra 108 times daily',
            'Donate books to students',
            'Fast on Thursday',
            'Visit Saraswati temple',
            'Wear yellow clothes on Thursday'
        ],
        'gemstones': [],
        'mantras': ['Gayatri Mantra', 'Saraswati Mantra']
    },
    {
        'id': '2',
        'name': 'Health Issues',
        'category': 'General Remedies',
        'description': 'Remedies for health and wellness',
        'solutions': [
            'Chant Mahamrityunjaya Mantra',
            'Donate medicines to poor',
            'Fast on Monday',
            'Visit Shiva temple',
            'Wear white clothes on Monday'
        ],
        'gemstones': [],
        'mantras': ['Mahamrityunjaya Mantra']
    },
    {
        'id': '3',
        'name': 'Ruby (Manik)',
        'category': 'Planetary Gemstones',
        'description': 'Gemstone for Sun planet',
        'solutions': ['Wear on ring finger', 'Set in gold', 'Wear on Sunday'],
        'gemstones': [{
            'name': 'Ruby',
            'planet': 'Sun',
            'color': 'Red',
            'finger': 'Ring finger',
            'day': 'Sunday',
            'benefits': 'Leadership, authority, father, government, success',
            'price': 'High',
            'alternatives': 'Red coral, garnet',
            'mantra': 'ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः'
        }],
        'mantras': ['Surya Mantra']
    }
]

def normalize_category(category: Optional[str]) -> Optional[str]:
    if not category:
        return None
    c = category.strip().lower()
    if c in { 'planetary', 'planet', 'graha' }:
        return 'planetary'
    if c in { 'zodiac', 'rashi' }:
        return 'zodiac'
    if c in { 'general', 'general remedies', 'common' }:
        return 'general'
    if c in { 'gemstone', 'gemstones', 'gems' }:
        return 'gemstones'
    return c

def ai_generate_remedies(category: Optional[str]) -> Optional[List[Dict[str, Any]]]:
    try:
        if not Config.has_api_key('gemini'):
            return None

        focus = ''
        if category == 'general':
            focus = 'Focus on general life areas (career, health, relationships, study, peace).'
        elif category == 'planetary':
            focus = 'Focus on planetary (graha) remedies tied to Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu.'
        elif category == 'zodiac':
            focus = 'Focus on zodiac-specific remedies suitable for each sign (Aries..Pisces).'
        elif category == 'gemstones':
            focus = 'Focus on gemstone-based remedies with proper details.'

        prompt = f"""
        You are an expert Vedic astrologer. Generate a list of practical Hindu remedies. {focus}
        Provide 4-8 items.

        Return ONLY a JSON array. Each object MUST have these fields:
        - id: short slug (kebab-case) based on name
        - name: remedy title
        - category: one of "general", "planetary", "zodiac", "gemstones"
        - description: brief description (1-2 sentences)
        - solutions: an array of 4-6 concrete steps (strings)
        - gemstones: OPTIONAL array of gemstone objects with fields:
            {"name","planet","color","finger","day","benefits","price","alternatives","mantra"}
        - mantras: OPTIONAL array of mantra names (strings)
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
        resp = requests.post(Config.get_api_endpoint('gemini_api'), headers=headers, json=data, timeout=15)
        if resp.status_code != 200:
            return None
        result = resp.json()
        content = result['candidates'][0]['content']['parts'][0]['text'].strip()
        if content.startswith('```json'):
            content = content[7:]
        if content.endswith('```'):
            content = content[:-3]
        content = content.strip()
        parsed = json.loads(content)
        items = parsed if isinstance(parsed, list) else [parsed]

        normalized: List[Dict[str, Any]] = []
        for it in items:
            obj: Dict[str, Any] = {
                'id': str(it.get('id', '')).strip() or str(it.get('name', '').lower().replace(' ', '-')),
                'name': str(it.get('name', '')).strip(),
                'category': normalize_category(it.get('category')) or (category or 'general'),
                'description': str(it.get('description', '')).strip(),
                'solutions': [str(s).strip() for s in (it.get('solutions') or [])][:6],
            }
            # gemstones optional
            gems_in = it.get('gemstones') or []
            gemstones: List[Dict[str, Any]] = []
            for g in gems_in:
                gemstones.append({
                    'name': str(g.get('name', '')).strip(),
                    'planet': str(g.get('planet', '')).strip(),
                    'color': str(g.get('color', '')).strip(),
                    'finger': str(g.get('finger', '')).strip(),
                    'day': str(g.get('day', '')).strip(),
                    'benefits': str(g.get('benefits', '')).strip(),
                    'price': str(g.get('price', '')).strip(),
                    'alternatives': str(g.get('alternatives', '')).strip(),
                    'mantra': str(g.get('mantra', '')).strip(),
                })
            if gemstones:
                obj['gemstones'] = gemstones
            # mantras optional
            mans = it.get('mantras') or []
            if mans:
                obj['mantras'] = [str(m).strip() for m in mans][:6]

            if not obj['id'] or not obj['name']:
                continue
            normalized.append(obj)

        return normalized
    except Exception:
        return None

@remedy_bp.route('/remedy', methods=['GET'])
def get_remedies():
    """Get all remedies or filter by category"""
    try:
        raw_category = request.args.get('category')
        category = normalize_category(raw_category)

        # Try AI generated remedies first
        ai_list = ai_generate_remedies(category)
        if ai_list and len(ai_list) > 0:
            return jsonify({'success': True, 'data': ai_list})

        # Fallback: static list with tolerant matching
        if category:
            def matches(rem):
                cl = rem.get('category', '').lower()
                if category == 'general':
                    return 'general' in cl
                if category == 'planetary':
                    return 'planet' in cl
                if category == 'zodiac':
                    return 'zodiac' in cl
                if category == 'gemstones':
                    return 'gem' in cl
                return cl == category
            remedies = [r for r in REMEDIES if matches(r)]
        else:
            remedies = REMEDIES
        
        return jsonify({
            'success': True,
            'data': remedies
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@remedy_bp.route('/remedy/<remedy_id>', methods=['GET'])
def get_remedy(remedy_id):
    """Get specific remedy by ID"""
    try:
        remedy = next((r for r in REMEDIES if r['id'] == remedy_id), None)
        
        if not remedy:
            return jsonify({
                'success': False,
                'error': 'Remedy not found'
            }), 404
        
        return jsonify({
            'success': True,
            'data': remedy
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
