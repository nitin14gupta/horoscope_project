#!/usr/bin/env python3
"""
Test script to verify Gunicorn configuration
"""
import os
import sys

def test_wsgi_import():
    """Test if WSGI app can be imported"""
    try:
        from wsgi import app
        print("✅ WSGI app imported successfully")
        return True
    except Exception as e:
        print(f"❌ WSGI import failed: {e}")
        return False

def test_gunicorn_config():
    """Test Gunicorn configuration file"""
    try:
        import os
        if os.path.exists('gunicorn.conf.py'):
            print("✅ Gunicorn configuration file exists")
            return True
        else:
            print("❌ Gunicorn configuration file missing")
            return False
    except Exception as e:
        print(f"❌ Gunicorn config test failed: {e}")
        return False

def test_requirements():
    """Test if all required packages are installed"""
    required_packages = [
        'flask',
        'flask_cors', 
        'gunicorn',
        'requests'
    ]
    
    missing = []
    for package in required_packages:
        try:
            __import__(package)
            print(f"✅ {package} available")
        except ImportError:
            print(f"❌ {package} missing")
            missing.append(package)
    
    return len(missing) == 0

def main():
    print("🧪 Testing Gunicorn Setup for Render Deployment")
    print("=" * 50)
    
    tests = [
        test_wsgi_import,
        test_gunicorn_config,
        test_requirements
    ]
    
    passed = 0
    for test in tests:
        if test():
            passed += 1
        print()
    
    print("=" * 50)
    print(f"📊 Results: {passed}/{len(tests)} tests passed")
    
    if passed == len(tests):
        print("🎉 All tests passed! Ready for Render deployment.")
        print("\n🚀 Next steps:")
        print("1. Push code to GitHub")
        print("2. Connect to Render dashboard")
        print("3. Set GEMINI_API_KEY environment variable")
        print("4. Deploy!")
    else:
        print("❌ Some tests failed. Please fix issues before deploying.")
        sys.exit(1)

if __name__ == "__main__":
    main()
