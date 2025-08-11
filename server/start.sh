#!/bin/bash
# Startup script for Horoscope API

echo "🚀 Starting Horoscope API..."

# Check if we're in production (Render sets PORT)
if [ -n "$PORT" ]; then
    echo "🌐 Production mode - Using Gunicorn"
    gunicorn wsgi:app --config gunicorn.conf.py
else
    echo "🔧 Development mode - Using Flask dev server"
    python app.py
fi
