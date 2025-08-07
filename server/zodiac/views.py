# zodiac/views.py
import requests
from django.shortcuts import render

def index(request):
    sign_info = [
        {"name": "aries", "dates": "Mar 21 - Apr 19"},
        {"name": "taurus", "dates": "Apr 20 - May 20"},
        {"name": "gemini", "dates": "May 21 - Jun 20"},
        {"name": "cancer", "dates": "Jun 21 - Jul 22"},
        {"name": "leo", "dates": "Jul 23 - Aug 22"},
        {"name": "virgo", "dates": "Aug 23 - Sep 22"},
        {"name": "libra", "dates": "Sep 23 - Oct 22"},
        {"name": "scorpio", "dates": "Oct 23 - Nov 21"},
        {"name": "sagittarius", "dates": "Nov 22 - Dec 21"},
        {"name": "capricorn", "dates": "Dec 22 - Jan 19"},
        {"name": "aquarius", "dates": "Jan 20 - Feb 18"},
        {"name": "pisces", "dates": "Feb 19 - Mar 20"},
    ]
    
    context = {
        "sign_info": sign_info,
        "selected_sign": "",
        "selected_day": "today"
    }

    if request.method == "POST":
        try:
            sign = request.POST.get("sign").lower()
            day = request.POST.get("day", "today")
            
            # Update context with selected values
            context["selected_sign"] = sign
            context["selected_day"] = day
            
            # Use the reliable API
            url = f"https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign={sign}"
            response = requests.get(url, timeout=20)
            
            if response.status_code == 200:
                data = response.json()
                horoscope = {
                    "date": data.get("data", {}).get("date", "Unknown Date"),
                    "description": data.get("data", {}).get("horoscope_data", "No description available.")
                }
                context["horoscope"] = horoscope
            else:
                context["error"] = f"Failed to fetch horoscope. API returned {response.status_code}."
        except Exception as e:
            context["error"] = f"Request failed: {str(e)}"

    return render(request, "horoscope/index.html", context)