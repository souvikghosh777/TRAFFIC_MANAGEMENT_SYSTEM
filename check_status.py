import requests
import webbrowser
import time

def check_servers():
    print("🔍 Checking server status...")
    
    # Check backend
    try:
        response = requests.get("http://localhost:5001/api/health", timeout=5)
        if response.status_code == 200:
            print("✅ Backend: Running on http://localhost:5001")
        else:
            print(f"❌ Backend: Error {response.status_code}")
    except requests.exceptions.RequestException as e:
        print(f"❌ Backend: Not responding - {e}")
    
    # Check frontend (just try to connect to port)
    try:
        response = requests.get("http://localhost:3007", timeout=5)
        if response.status_code == 200:
            print("✅ Frontend: Running on http://localhost:3007")
        else:
            print(f"⚠️ Frontend: Response {response.status_code}")
    except requests.exceptions.RequestException as e:
        print(f"❌ Frontend: Not responding - {e}")
    
    print("\n🌐 Opening browser...")
    webbrowser.open("http://localhost:3007")

if __name__ == "__main__":
    check_servers()