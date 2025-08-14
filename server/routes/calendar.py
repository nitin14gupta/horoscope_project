from flask import Blueprint, request, jsonify
from datetime import datetime, timedelta
import random
import requests
import json
from typing import List, Dict, Any, Optional
from config import Config

calendar_bp = Blueprint('calendar', __name__)

def ai_generate_calendar_events(month: Optional[int] = None, year: Optional[int] = None) -> Optional[List[Dict[str, Any]]]:
    """Generate calendar events using Gemini"""
    try:
        api_key = Config.get_api_key('gemini')
        if not api_key:
            print("No valid Gemini API key found for calendar events")
            return None

        # Determine month and year
        if month is None:
            month = datetime.now().month
        if year is None:
            year = datetime.now().year

        month_name = datetime(year, month, 1).strftime('%B')
        
        prompt = f"""
        You are an expert astrologer. Generate 5-8 realistic cosmic events for {month_name} {year}.
        
        Return ONLY a JSON array. Each object MUST have these fields:
        - id: unique string (e.g., "1", "2")
        - date: date in YYYY-MM-DD format (within {month_name} {year})
        - title: event title (e.g., "New Moon in Capricorn", "Mercury Retrograde")
        - description: brief description (1-2 sentences)
        - type: one of "cosmic", "zodiac", "planetary"
        - significance: astrological significance (1-2 sentences)
        
        Include a mix of:
        - New/Full moons
        - Planetary movements (retrogrades, transits)
        - Zodiac sign changes
        - Eclipses (if applicable)
        - Major planetary aspects
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
        
        events = json.loads(content)
        if not isinstance(events, list):
            events = [events]
            
        # Validate and normalize
        validated = []
        for event in events:
            obj = {
                'id': str(event.get('id', '')).strip() or str(len(validated) + 1),
                'date': str(event.get('date', '')).strip(),
                'title': str(event.get('title', '')).strip(),
                'description': str(event.get('description', '')).strip(),
                'type': str(event.get('type', '')).strip().lower(),
                'significance': str(event.get('significance', '')).strip()
            }
            
            # Ensure type is valid
            if obj['type'] not in ['cosmic', 'zodiac', 'planetary']:
                obj['type'] = 'cosmic'
                
            if obj['id'] and obj['title'] and obj['date']:
                validated.append(obj)
                
        return validated
    except Exception:
        return None

def ai_generate_weekly_forecast(week_start: Optional[str] = None) -> Optional[Dict[str, Any]]:
    """Generate weekly forecast using Gemini"""
    try:
        api_key = Config.get_api_key('gemini')
        if not api_key:
            print("No valid Gemini API key found for weekly forecast")
            return None

        if week_start:
            start_date = datetime.strptime(week_start, '%Y-%m-%d')
        else:
            start_date = datetime.now()
            
        end_date = start_date + timedelta(days=6)
        
        prompt = f"""
        You are an expert astrologer. Generate a weekly forecast for {start_date.strftime('%B %d')} - {end_date.strftime('%B %d, %Y')}.
        
        Return ONLY a JSON object with these fields:
        {{
          "weekStart": "{start_date.strftime('%Y-%m-%d')}",
          "weekEnd": "{end_date.strftime('%Y-%m-%d')}",
          "overallEnergy": "High|Medium|Low with brief explanation",
          "predictions": ["4-6 specific predictions for the week"],
          "luckyDays": ["3-4 days of the week"],
          "challengingDays": ["2-3 days of the week"]
        }}
        
        Make predictions specific to this week's astrological influences.
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
        
        forecast = json.loads(content)
        
        # Validate and normalize
        validated = {
            'weekStart': str(forecast.get('weekStart', start_date.strftime('%Y-%m-%d'))).strip(),
            'weekEnd': str(forecast.get('weekEnd', end_date.strftime('%Y-%m-%d'))).strip(),
            'overallEnergy': str(forecast.get('overallEnergy', 'Medium')).strip(),
            'predictions': [str(p).strip() for p in (forecast.get('predictions') or [])][:6],
            'luckyDays': [str(d).strip() for d in (forecast.get('luckyDays') or [])][:4],
            'challengingDays': [str(d).strip() for d in (forecast.get('challengingDays') or [])][:3]
        }
        
        return validated
    except Exception:
        return None

@calendar_bp.route('/calendar', methods=['GET'])
def get_calendar_events():
    """Get calendar events for specified month and year"""
    try:
        month = request.args.get('month')
        year = request.args.get('year')
        
        # Parse month and year
        month_int = None
        year_int = None
        
        if month:
            try:
                month_int = int(month)
            except ValueError:
                month_int = None
                
        if year:
            try:
                year_int = int(year)
            except ValueError:
                year_int = None
        
        # Try AI-generated events first
        ai_events = ai_generate_calendar_events(month_int, year_int)
        if ai_events and len(ai_events) > 0:
            return jsonify({
                'success': True,
                'data': ai_events
            })
        
        # No AI data available - return error
        return jsonify({
            'success': False,
            'error': 'Gemini API key not configured. Please set GEMINI_API_KEY environment variable to get AI-generated calendar events.'
        }), 500
        
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
        
        # Try AI-generated forecast first
        ai_forecast = ai_generate_weekly_forecast(week_start)
        if ai_forecast:
            return jsonify({
                'success': True,
                'data': ai_forecast
            })
        
        # No AI data available - return error
        return jsonify({
            'success': False,
            'error': 'Gemini API key not configured. Please set GEMINI_API_KEY environment variable to get AI-generated weekly forecasts.'
        }), 500
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
