import os
from typing import Dict, Any

class Config:
    """Configuration class for API keys and settings"""
    
    # API Keys for AI providers (must be set via environment)
    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY', '')
    
    # External API endpoints
    EXTERNAL_APIS = {
        'openai_api': 'https://api.openai.com/v1/chat/completions',
    }
    
    # AI Model configurations
    AI_MODELS = {
        'openai': {
            'model': 'gpt-5',
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
            'openai': cls.OPENAI_API_KEY,
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
