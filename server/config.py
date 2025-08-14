import os
from typing import Dict, Any

class Config:
    """Configuration class for API keys and settings"""
    
    # API Keys for AI providers (must be set via environment)
    GEMINI_API_KEY = os.getenv('GEMINI_API_KEY', 'AIzaSyBnw7JNFWCVawy0Ay7WcUjrIun3gd_KJWY')
    
    # External API endpoints
    EXTERNAL_APIS = {
        'gemini_api': 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
    }
    
    # AI Model configurations
    AI_MODELS = {
        'gemini': {
            'model': 'gemini-2.0-flash',
            'max_tokens': 500,
            'temperature': 0.7
        },
    }
    
    # Fallback settings
    ENABLE_FALLBACK = True
    CACHE_DURATION = 3600  # 1 hour in seconds
    
    @classmethod
    def get_api_key(cls, service: str) -> str:
        """Get API key for a specific service"""
        key_map = {
            'gemini': cls.GEMINI_API_KEY,
        }
        return key_map.get(service, '')
    
    @classmethod
    def has_api_key(cls, service: str) -> bool:
        """Check if API key exists for a service"""
        return bool(cls.get_api_key(service))
    
    @classmethod    
    def get_api_endpoint(cls, service: str) -> str:
        """Get API endpoint for a specific service"""
        return cls.EXTERNAL_APIS.get(service, '')
    
    @classmethod
    def get_ai_config(cls, service: str) -> Dict[str, Any]:
        """Get AI model configuration for a specific service"""
        return cls.AI_MODELS.get(service, {})
