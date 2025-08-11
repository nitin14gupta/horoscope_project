# 🚀 Render Deployment Guide

## Quick Deploy to Render

### 1. **Connect Your Repository**
- Go to [Render Dashboard](https://dashboard.render.com)
- Click "New +" → "Web Service"
- Connect your GitHub repository

### 2. **Configure Service**
- **Name**: `horoscope-api` (or your preferred name)
- **Environment**: `Python 3`
- **Region**: Choose closest to your users
- **Branch**: `main` (or your default branch)
- **Root Directory**: `server/` (important!)

### 3. **Build & Start Commands**
```
Build Command: pip install -r requirements.txt
Start Command: gunicorn wsgi:app --config gunicorn.conf.py
```

### 4. **Environment Variables**
Set these in Render Dashboard → Environment:
- `OPENAI_API_KEY`: Your OpenAI API key
- `PORT`: Auto-set by Render (don't change)

### 5. **Free Tier Settings**
- **Instance Type**: Free
- **Auto-Deploy**: Enabled
- **Health Check Path**: `/api/health`

## 📁 Files Created for Deployment

- `wsgi.py` - WSGI entry point for Gunicorn
- `gunicorn.conf.py` - Gunicorn configuration optimized for free tier
- `render.yaml` - Render configuration (optional)
- `start.sh` - Startup script for testing

## 🔧 Local Testing

```bash
# Test Gunicorn locally
gunicorn wsgi:app --config gunicorn.conf.py

# Or use the startup script
chmod +x start.sh
./start.sh
```

## 🌐 API Endpoints

After deployment, your API will be available at:
- `https://your-app-name.onrender.com/api/health`
- `https://your-app-name.onrender.com/api/horoscope`
- `https://your-app-name.onrender.com/api/panchang`
- And all other endpoints...

## ⚠️ Free Tier Limitations

- **Sleep after 15 minutes** of inactivity
- **512MB RAM** limit
- **Single worker** process
- **Cold starts** may take 30-60 seconds

## 🔍 Troubleshooting

1. **Build fails**: Check `requirements.txt` and Python version
2. **Start fails**: Verify `wsgi.py` and Gunicorn config
3. **API key issues**: Set `OPENAI_API_KEY` in environment variables
4. **CORS errors**: Frontend needs to use the new Render URL

## 📊 Monitoring

- Check logs in Render Dashboard
- Monitor health endpoint: `/api/health`
- Set up alerts for downtime
