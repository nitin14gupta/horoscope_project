from flask import Blueprint, request, jsonify
import sys
import os
from datetime import datetime

# Add the parent directory to the path to import utils
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from utils.astrological_service import astrological_service

birth_chart_bp = Blueprint('birth_chart', __name__)

@birth_chart_bp.route('/birth-chart', methods=['POST'])
def calculate_birth_chart():
    """Calculate real birth chart based on user input"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'date', 'time', 'place']
        for field in required_fields:
            if not data.get(field):
                return jsonify({
                    'success': False,
                    'error': f'Missing required field: {field}'
                }), 400
        
        name = data['name']
        date_str = data['date']
        time_str = data['time']
        place = data['place']
        latitude = float(data.get('latitude', 0))
        longitude = float(data.get('longitude', 0))
        
        # Parse date and time
        try:
            date_obj = datetime.strptime(f"{date_str} {time_str}", "%Y-%m-%d %H:%M")
        except ValueError:
            return jsonify({
                'success': False,
                'error': 'Invalid date or time format'
            }), 400
        
        # Calculate real planetary positions
        planetary_positions = astrological_service.calculate_planetary_positions(
            date_obj, latitude, longitude
        )
        
        # Calculate house positions
        house_positions = astrological_service.calculate_houses(
            date_obj, latitude, longitude
        )
        
        # Determine ascendant, sun sign, and moon sign
        ascendant = astrological_service.get_zodiac_sign(date_obj)
        
        # Get sun sign from planetary positions
        sun_position = next((p for p in planetary_positions if p['name'] == 'Sun'), None)
        sun_sign = sun_position['sign'] if sun_position else ascendant
        
        # Get moon sign from planetary positions
        moon_position = next((p for p in planetary_positions if p['name'] == 'Moon'), None)
        moon_sign = moon_position['sign'] if moon_position else ascendant
        
        birth_chart = {
            'ascendant': ascendant.capitalize(),
            'sunSign': sun_sign.capitalize(),
            'moonSign': moon_sign.capitalize(),
            'planetaryPositions': planetary_positions,
            'housePositions': house_positions
        }
        
        return jsonify({
            'success': True,
            'data': birth_chart
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
