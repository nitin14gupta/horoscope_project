from flask import Blueprint, request, jsonify
from datetime import datetime, timedelta
import sys
import os

# Add the parent directory to the path to import utils
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from utils.astrological_service import astrological_service

calendar_bp = Blueprint('calendar', __name__)

@calendar_bp.route('/calendar', methods=['GET'])
def get_calendar_events():
    """Get real calendar events for specified month and year"""
    try:
        month = request.args.get('month', datetime.now().month, type=int)
        year = request.args.get('year', datetime.now().year, type=int)
        zodiac_sign = request.args.get('zodiac', None)
        
        # Get real astronomical events
        events = astrological_service.get_real_calendar_events(month, year)
        
        # Filter by zodiac sign if specified
        if zodiac_sign:
            filtered_events = []
            for event in events:
                # Check if event is related to the specified zodiac sign
                if (zodiac_sign.lower() in event['title'].lower() or 
                    zodiac_sign.lower() in event['description'].lower() or
                    zodiac_sign.lower() in event['significance'].lower()):
                    filtered_events.append(event)
            events = filtered_events
        
        return jsonify({
            'success': True,
            'data': events
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@calendar_bp.route('/calendar/weekly', methods=['GET'])
def get_weekly_forecast():
    """Get real weekly forecast"""
    try:
        week_start = request.args.get('weekStart')
        zodiac_sign = request.args.get('zodiac', None)
        
        if week_start:
            start_date = datetime.strptime(week_start, '%Y-%m-%d')
        else:
            start_date = datetime.now()
        
        end_date = start_date + timedelta(days=6)
        
        # Get real weekly forecast based on current planetary positions
        forecast = {
            'weekStart': start_date.strftime('%Y-%m-%d'),
            'weekEnd': end_date.strftime('%Y-%m-%d'),
            'overallEnergy': astrological_service.get_weekly_energy_level(start_date),
            'predictions': astrological_service.get_weekly_predictions(start_date, zodiac_sign),
            'luckyDays': astrological_service.get_lucky_days(start_date, zodiac_sign),
            'challengingDays': astrological_service.get_challenging_days(start_date, zodiac_sign)
        }
        
        return jsonify({
            'success': True,
            'data': forecast
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@calendar_bp.route('/calendar/zodiac/<zodiac_sign>', methods=['GET'])
def get_zodiac_calendar(zodiac_sign):
    """Get calendar events specific to a zodiac sign"""
    try:
        month = request.args.get('month', datetime.now().month, type=int)
        year = request.args.get('year', datetime.now().year, type=int)
        
        # Validate zodiac sign
        if zodiac_sign.lower() not in astrological_service.zodiac_signs:
            return jsonify({
                'success': False,
                'error': 'Invalid zodiac sign'
            }), 400
        
        # Get events for the zodiac sign
        events = astrological_service.get_zodiac_specific_events(zodiac_sign.lower(), month, year)
        
        return jsonify({
            'success': True,
            'data': events
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
