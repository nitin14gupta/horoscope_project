from flask import Blueprint, request, jsonify
import random
import requests
import json
from config import Config

tarot_bp = Blueprint('tarot', __name__)

# Tarot cards data for fallback
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
    {'id': '10', 'name': 'Wheel of Fortune', 'meaning': 'Good luck, karma, life cycles, destiny', 'reversed': 'Bad luck, resistance to change, breaking cycles', 'image': '🎡', 'suit': 'Major Arcana'},
    {'id': '11', 'name': 'Justice', 'meaning': 'Justice, fairness, truth, cause and effect', 'reversed': 'Unfairness, lack of accountability, dishonesty', 'image': '⚖️', 'suit': 'Major Arcana'},
    {'id': '12', 'name': 'The Hanged Man', 'meaning': 'Surrender, letting go, new perspective', 'reversed': 'Stalling, needless sacrifice, fear of sacrifice', 'image': '🕊️', 'suit': 'Major Arcana'},
    {'id': '13', 'name': 'Death', 'meaning': 'Endings, change, transformation, transition', 'reversed': 'Resistance to change, inability to move on', 'image': '💀', 'suit': 'Major Arcana'},
    {'id': '14', 'name': 'Temperance', 'meaning': 'Balance, moderation, patience, purpose', 'reversed': 'Imbalance, excess, self-healing, re-alignment', 'image': '🕊️', 'suit': 'Major Arcana'},
    {'id': '15', 'name': 'The Devil', 'meaning': 'Shadow self, attachment, addiction, materialism', 'reversed': 'Releasing limiting beliefs, exploring dark thoughts', 'image': '😈', 'suit': 'Major Arcana'},
    {'id': '16', 'name': 'The Tower', 'meaning': 'Sudden change, upheaval, chaos, revelation', 'reversed': 'Personal transformation, fear of change, averting disaster', 'image': '🗼', 'suit': 'Major Arcana'},
    {'id': '17', 'name': 'The Star', 'meaning': 'Hope, faith, purpose, renewal, spirituality', 'reversed': 'Lack of faith, despair, self-trust, disconnection', 'image': '⭐', 'suit': 'Major Arcana'},
    {'id': '18', 'name': 'The Moon', 'meaning': 'Illusion, fear, anxiety, subconscious, intuition', 'reversed': 'Release of fear, repressed emotion, inner confusion', 'image': '🌙', 'suit': 'Major Arcana'},
    {'id': '19', 'name': 'The Sun', 'meaning': 'Positivity, fun, warmth, success, vitality', 'reversed': 'Inner child, feeling down, overly optimistic', 'image': '☀️', 'suit': 'Major Arcana'},
    {'id': '20', 'name': 'Judgement', 'meaning': 'Judgement, rebirth, inner calling, absolution', 'reversed': 'Self-doubt, inner critic, ignoring the call', 'image': '👼', 'suit': 'Major Arcana'},
    {'id': '21', 'name': 'The World', 'meaning': 'Completion, integration, accomplishment, travel', 'reversed': 'Seeking personal closure, short-cut to success', 'image': '🌍', 'suit': 'Major Arcana'}
]

def get_ai_tarot_reading():
    """Generate AI-powered tarot reading using Gemini"""
    try:
        if not Config.has_api_key('gemini'):
            return None

        prompt = f"""
        You are an expert tarot reader with deep knowledge of the Major Arcana. Generate a personalized three-card tarot reading.

        Select 3 cards from this list and provide detailed interpretations:
        {[card['name'] for card in TAROT_CARDS]}

        Return ONLY a JSON object with this exact structure:
        {{
          "cards": [
            {{
              "name": "Card name from the list above",
              "image": "emoji representation",
              "meaning": "Detailed upright meaning (2-3 sentences)",
              "reversed": "Detailed reversed meaning (2-3 sentences)",
              "isReversed": true/false,
              "position": "Past",
              "suit": "Major Arcana"
            }},
            {{
              "name": "Card name from the list above", 
              "image": "emoji representation",
              "meaning": "Detailed upright meaning (2-3 sentences)",
              "reversed": "Detailed reversed meaning (2-3 sentences)",
              "isReversed": true/false,
              "position": "Present",
              "suit": "Major Arcana"
            }},
            {{
              "name": "Card name from the list above",
              "image": "emoji representation", 
              "meaning": "Detailed upright meaning (2-3 sentences)",
              "reversed": "Detailed reversed meaning (2-3 sentences)",
              "isReversed": true/false,
              "position": "Future",
              "suit": "Major Arcana"
            }}
          ],
          "interpretation": "Overall reading interpretation connecting all three cards (3-4 sentences)",
          "message": "Personal message of guidance and encouragement (2-3 sentences)"
        }}

        Make the reading personal, insightful, and spiritually meaningful. Consider the flow from past to present to future.
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
        
        response = requests.post(Config.get_api_endpoint('gemini_api'), headers=headers, json=data, timeout=15)
        
        if response.status_code == 200:
            result = response.json()
            content = result['candidates'][0]['content']['parts'][0]['text'].strip()
            
            # Parse the JSON response
            try:
                # Clean the response to extract JSON
                if content.startswith('```json'):
                    content = content[7:]
                if content.endswith('```'):
                    content = content[:-3]
                content = content.strip()
                
                reading_data = json.loads(content)
                
                # Validate and ensure all required fields
                for card in reading_data['cards']:
                    if 'id' not in card:
                        card['id'] = str(random.randint(1, 1000))
                
                return reading_data
                
            except json.JSONDecodeError as e:
                print(f"Error parsing Gemini response: {e}")
                print(f"Raw response: {content}")
                return None
                
    except Exception as e:
        print(f"Error with Gemini API: {e}")
    
    return None

@tarot_bp.route('/tarot', methods=['GET'])
def get_tarot_reading():
    """Get a three-card tarot reading"""
    try:
        # Try AI-generated reading first
        ai_reading = get_ai_tarot_reading()
        
        if ai_reading:
            return jsonify({
                'success': True,
                'data': ai_reading
            })
        
        # Fallback to static reading
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
