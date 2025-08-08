from flask import Blueprint, request, jsonify
import random

tarot_bp = Blueprint('tarot', __name__)

# Tarot cards data
TAROT_CARDS = [
    {'id': '1', 'name': 'The Fool', 'meaning': 'New beginnings, innocence, spontaneity', 'reversed': 'Recklessness, risk-taking, naivety', 'image': '🃏', 'suit': 'Major Arcana'},
    {'id': '2', 'name': 'The Magician', 'meaning': 'Manifestation, resourcefulness, power', 'reversed': 'Manipulation, poor planning, untapped talents', 'image': '🔮', 'suit': 'Major Arcana'},
    {'id': '3', 'name': 'The High Priestess', 'meaning': 'Intuition, sacred knowledge, divine feminine', 'reversed': 'Secrets, disconnected from intuition, withdrawal', 'image': '🌙', 'suit': 'Major Arcana'},
    {'id': '4', 'name': 'The Empress', 'meaning': 'Femininity, beauty, nature, abundance', 'reversed': 'Creative block, dependence on others, emptiness', 'image': '👑', 'suit': 'Major Arcana'},
    {'id': '5', 'name': 'The Emperor', 'meaning': 'Authority, establishment, structure, father figure', 'reversed': 'Domination, excessive control, rigidity', 'image': '⚔️', 'suit': 'Major Arcana'},
    {'id': '6', 'name': 'The Lovers', 'meaning': 'Love, harmony, relationships, choices', 'reversed': 'Disharmony, imbalance, misalignment of values', 'image': '💕', 'suit': 'Major Arcana'},
    {'id': '7', 'name': 'The Chariot', 'meaning': 'Control, willpower, determination, success', 'reversed': 'Lack of control and direction, aggression', 'image': '🏛️', 'suit': 'Major Arcana'},
    {'id': '8', 'name': 'Strength', 'meaning': 'Inner strength, courage, persuasion, influence', 'reversed': 'Self doubt, low energy, raw emotion', 'image': '🦁', 'suit': 'Major Arcana'},
    {'id': '9', 'name': 'The Hermit', 'meaning': 'Soul-searching, introspection, solitude', 'reversed': 'Isolation, loneliness, withdrawal', 'image': '🧙', 'suit': 'Major Arcana'},
    {'id': '10', 'name': 'Wheel of Fortune', 'meaning': 'Good luck, karma, life cycles, destiny', 'reversed': 'Bad luck, resistance to change, breaking cycles', 'image': '🎡', 'suit': 'Major Arcana'}
]

@tarot_bp.route('/tarot', methods=['GET'])
def get_tarot_reading():
    """Get a three-card tarot reading"""
    try:
        # Shuffle and draw 3 cards
        shuffled_cards = random.sample(TAROT_CARDS, 3)
        
        drawn_cards = []
        positions = ['Past', 'Present', 'Future']
        
        for i, card in enumerate(shuffled_cards):
            is_reversed = random.choice([True, False])
            drawn_cards.append({
                **card,
                'isReversed': is_reversed,
                'position': positions[i]
            })
        
        # Generate interpretation
        interpretation = f"Your reading reveals insights about your {drawn_cards[0]['position'].lower()} experiences, current {drawn_cards[1]['position'].lower()} situation, and {drawn_cards[2]['position'].lower()} possibilities."
        
        message = "Trust your intuition and use this guidance to navigate your path forward."
        
        reading = {
            'cards': drawn_cards,
            'interpretation': interpretation,
            'message': message
        }
        
        return jsonify({
            'success': True,
            'data': reading
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
