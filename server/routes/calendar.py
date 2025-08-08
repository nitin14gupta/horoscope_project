from flask import Blueprint, request, jsonify
from datetime import datetime, timedelta
import random

calendar_bp = Blueprint('calendar', __name__)

# Sample calendar events
CALENDAR_EVENTS = [
    {
        'id': '1',
        'date': '2024-01-15',
        'title': 'New Moon in Capricorn',
        'description': 'A powerful new moon for setting intentions and goals',
        'type': 'cosmic',
        'significance': 'Excellent time for career planning and goal setting'
    },
    {
        'id': '2',
        'date': '2024-01-20',
        'title': 'Sun enters Aquarius',
        'description': 'The sun moves into the innovative sign of Aquarius',
        'type': 'zodiac',
        'significance': 'Time for innovation, community, and humanitarian efforts'
    },
    {
        'id': '3',
        'date': '2024-01-25',
        'title': 'Mercury Retrograde',
        'description': 'Mercury begins its retrograde motion',
        'type': 'planetary',
        'significance': 'Review, revise, and reflect on communication matters'
    }
]

@calendar_bp.route('/calendar', methods=['GET'])
def get_calendar_events():
    """Get calendar events for specified month and year"""
    try:
        month = request.args.get('month')
        year = request.args.get('year')
        
        # For now, return sample events
        # In a real implementation, you would filter by month and year
        events = CALENDAR_EVENTS
        
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
    """Get weekly forecast"""
    try:
        week_start = request.args.get('weekStart')
        
        if week_start:
            start_date = datetime.strptime(week_start, '%Y-%m-%d')
        else:
            start_date = datetime.now()
        
        end_date = start_date + timedelta(days=6)
        
        forecast = {
            'weekStart': start_date.strftime('%Y-%m-%d'),
            'weekEnd': end_date.strftime('%Y-%m-%d'),
            'overallEnergy': random.choice(['High', 'Medium', 'Low']),
            'predictions': [
                'This week brings opportunities for growth and learning',
                'Focus on communication and relationships',
                'Financial decisions should be made carefully',
                'Health and wellness will be important'
            ],
            'luckyDays': ['Monday', 'Wednesday', 'Friday'],
            'challengingDays': ['Tuesday', 'Thursday']
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
