import requests
import json

def test_api():
    base_url = "http://localhost:5000"
    
    # Test health endpoint
    try:
        response = requests.get(f"{base_url}/api/health")
        print(f"Health check: {response.status_code}")
        if response.status_code == 200:
            print("✅ Health check passed")
        else:
            print("❌ Health check failed")
    except Exception as e:
        print(f"❌ Health check failed: {e}")
    
    # Test horoscope endpoint
    try:
        horoscope_data = {
            "fullName": "Test User",
            "dateOfBirth": "1990-01-01",
            "zodiacSign": "aries"
        }
        response = requests.post(f"{base_url}/api/horoscope", json=horoscope_data)
        print(f"Horoscope API: {response.status_code}")
        if response.status_code == 200:
            print("✅ Horoscope API passed")
            data = response.json()
            print(f"Prediction: {data['data']['prediction'][:50]}...")
        else:
            print("❌ Horoscope API failed")
    except Exception as e:
        print(f"❌ Horoscope API failed: {e}")

if __name__ == "__main__":
    test_api()
