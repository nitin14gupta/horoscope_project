from flask import Blueprint, request, jsonify
import random

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

@remedy_bp.route('/remedy', methods=['GET'])
def get_remedies():
    """Get all remedies or filter by category"""
    try:
        category = request.args.get('category')
        
        if category:
            filtered_remedies = [r for r in REMEDIES if r['category'].lower() == category.lower()]
            remedies = filtered_remedies
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
