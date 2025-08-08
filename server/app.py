from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime, timedelta
import random
import uuid
from routes.horoscope import horoscope_bp
from routes.zodiac import zodiac_bp
from routes.panchang import panchang_bp
from routes.matchmaking import matchmaking_bp
from routes.birth_chart import birth_chart_bp
from routes.tarot import tarot_bp
from routes.mantra import mantra_bp
from routes.remedy import remedy_bp
from routes.calendar import calendar_bp

app = Flask(__name__)
CORS(app)

# Register blueprints
app.register_blueprint(horoscope_bp, url_prefix='/api')
app.register_blueprint(zodiac_bp, url_prefix='/api')
app.register_blueprint(panchang_bp, url_prefix='/api')
app.register_blueprint(matchmaking_bp, url_prefix='/api')
app.register_blueprint(birth_chart_bp, url_prefix='/api')
app.register_blueprint(tarot_bp, url_prefix='/api')
app.register_blueprint(mantra_bp, url_prefix='/api')
app.register_blueprint(remedy_bp, url_prefix='/api')
app.register_blueprint(calendar_bp, url_prefix='/api')

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'success': True,
        'data': {
            'status': 'healthy',
            'timestamp': datetime.now().isoformat(),
            'service': 'Horoscope API'
        }
    })

@app.errorhandler(404)
def not_found(error):
    return jsonify({
        'success': False,
        'error': 'Endpoint not found'
    }), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        'success': False,
        'error': 'Internal server error'
    }), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
