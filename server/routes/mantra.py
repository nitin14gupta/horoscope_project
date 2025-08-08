from flask import Blueprint, request, jsonify
import random

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

@mantra_bp.route('/mantra', methods=['GET'])
def get_mantras():
    """Get all mantras or filter by category"""
    try:
        category = request.args.get('category')
        
        if category:
            filtered_mantras = [m for m in MANTRAS if m['category'].lower() == category.lower()]
            mantras = filtered_mantras
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
