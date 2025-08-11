from flask import Blueprint, request, jsonify
import random
import requests
import json
from typing import List, Dict, Any, Optional
from config import Config

mantra_bp = Blueprint('mantra', __name__)

# Mantras data
MANTRAS = [
    {
        'id': '1',
        'name': 'Gayatri Mantra',
        'sanskrit': 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्',
        'transliteration': 'Om Bhur Bhuvaḥ Swaḥ Tat-savitur Vareñyaṃ Bhargo Devasya Dhīmahi Dhiyo Yonaḥ Prachodayāt',
        'meaning': 'We meditate on the divine light of the sun, may it illuminate our intellect',
        'benefits': ['Enhances intelligence', 'Removes obstacles', 'Brings peace of mind'],
        'bestTime': 'Sunrise',
        'repetitions': 108,
        'category': 'Planetary Mantras'
    },
    {
        'id': '2',
        'name': 'Mahamrityunjaya Mantra',
        'sanskrit': 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय माऽमृतात्',
        'transliteration': 'Om Tryambakam Yajamahe Sugandhim Pushtivardhanam Urvarukamiva Bandhanan Mrityormukshiya Maamritat',
        'meaning': 'We worship the three-eyed one who is fragrant and who nourishes all beings',
        'benefits': ['Healing and recovery', 'Longevity', 'Protection from accidents'],
        'bestTime': 'Morning or evening',
        'repetitions': 108,
        'category': 'Healing Mantras'
    },
    {
        'id': '3',
        'name': 'Om Namah Shivaya',
        'sanskrit': 'ॐ नमः शिवाय',
        'transliteration': 'Om Namah Shivaya',
        'meaning': 'I bow to Shiva',
        'benefits': ['Spiritual growth', 'Inner peace', 'Removes negative energy'],
        'bestTime': 'Morning or evening',
        'repetitions': 108,
        'category': 'Zodiac Specific Mantras'
    }
]

def normalize_category(category: Optional[str]) -> Optional[str]:
    if not category:
        return None
    c = category.strip().lower()
    if c in { 'planetary', 'graha', 'planet' }:
        return 'planetary'
    if c in { 'zodiac', 'rashi', 'zodiac specific' }:
        return 'zodiac'
    if c in { 'healing', 'health' }:
        return 'healing'
    if c in { 'prosperity', 'wealth', 'abundance' }:
        return 'prosperity'
    return c

def ai_generate_mantras(category: Optional[str]) -> Optional[List[Dict[str, Any]]]:
    try:
        if not Config.has_api_key('openai'):
            return None

        cat_text = ''
        if category == 'planetary':
            cat_text = 'Focus on Planetary (Graha) mantras related to Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu.'
        elif category == 'zodiac':
            cat_text = 'Focus on Zodiac-specific (Rashi) mantras suitable for different zodiac signs.'
        elif category == 'healing':
            cat_text = 'Focus on Healing and protection mantras that support health, peace, and recovery.'
        elif category == 'prosperity':
            cat_text = 'Focus on Prosperity and abundance mantras that support wealth and success.'

        count_hint = 'Provide 5-6 mantras covering a good variety.'
        if category:
            count_hint = 'Provide 4-6 mantras in this category.'

        prompt = f"""
        You are a learned Vedic scholar. Generate a daily set of Hindu mantras.
        {cat_text}
        {count_hint}

        Return ONLY a JSON array of objects. Each object MUST have exactly these fields:
        - id: a short stable slug (kebab-case) based on the mantra name
        - name: mantra name (e.g., "Gayatri Mantra")
        - sanskrit: the mantra text in Devanagari
        - transliteration: IAST transliteration
        - meaning: brief meaning in English (1-2 sentences)
        - benefits: array of 3-5 concise strings
        - bestTime: a concise time recommendation (e.g., "Sunrise", "Morning or evening")
        - repetitions: a reasonable integer count (e.g., 11, 21, 108)
        - category: one of "planetary", "zodiac", "healing", "prosperity"
        """

        headers = {
            'Authorization': f'Bearer {Config.get_api_key("openai")}',
            'Content-Type': 'application/json'
        }
        data = {
            'model': 'gpt-5',
            'messages': [
                {
                    'role': 'system',
                    'content': 'You are an expert in Vedic mantras. Always respond with valid JSON only.'
                },
                {
                    'role': 'user',
                    'content': prompt
                }
            ],
            'max_tokens': 900,
            'temperature': 0.7
        }
        resp = requests.post(Config.get_api_endpoint('openai_api'), headers=headers, json=data, timeout=15)
        if resp.status_code != 200:
            return None
        result = resp.json()
        content = result['choices'][0]['message']['content'].strip()
        if content.startswith('```json'):
            content = content[7:]
        if content.endswith('```'):
            content = content[:-3]
        content = content.strip()
        parsed = json.loads(content)
        items = parsed if isinstance(parsed, list) else [parsed]

        # Validate and normalize
        validated: List[Dict[str, Any]] = []
        for it in items:
            obj = {
                'id': str(it.get('id', '')).strip() or str(it.get('name', '').lower().replace(' ', '-')),
                'name': str(it.get('name', '')).strip(),
                'sanskrit': str(it.get('sanskrit', '')).strip(),
                'transliteration': str(it.get('transliteration', '')).strip(),
                'meaning': str(it.get('meaning', '')).strip(),
                'benefits': [str(b).strip() for b in (it.get('benefits') or [])][:5],
                'bestTime': str(it.get('bestTime', '')).strip(),
                'repetitions': int(it.get('repetitions', 108)) if str(it.get('repetitions', '')).isdigit() else 108,
                'category': normalize_category(it.get('category')) or (category or 'general')
            }
            if not obj['id'] or not obj['name']:
                continue
            validated.append(obj)

        return validated
    except Exception:
        return None

@mantra_bp.route('/mantra', methods=['GET'])
def get_mantras():
    """Get all mantras or filter by category"""
    try:
        raw_category = request.args.get('category')
        category = normalize_category(raw_category)

        # Try AI-generated daily mantras first
        ai_list = ai_generate_mantras(category)
        if ai_list and len(ai_list) > 0:
            return jsonify({
                'success': True,
                'data': ai_list
            })

        # Fallback to static list, with tolerant matching
        if category:
            def matches(m):
                cat = m.get('category', '')
                cl = cat.lower()
                if category == 'planetary':
                    return 'planet' in cl
                if category == 'zodiac':
                    return 'zodiac' in cl
                if category == 'healing':
                    return 'healing' in cl
                if category == 'prosperity':
                    return 'prosper' in cl
                return cl == category
            mantras = [m for m in MANTRAS if matches(m)]
        else:
            mantras = MANTRAS
        
        return jsonify({
            'success': True,
            'data': mantras
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@mantra_bp.route('/mantra/<mantra_id>', methods=['GET'])
def get_mantra(mantra_id):
    """Get specific mantra by ID"""
    try:
        mantra = next((m for m in MANTRAS if m['id'] == mantra_id), None)
        
        if not mantra:
            return jsonify({
                'success': False,
                'error': 'Mantra not found'
            }), 404
        
        return jsonify({
            'success': True,
            'data': mantra
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
