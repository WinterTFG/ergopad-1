import requests

def ping(host, port, path):
    try:
        res = requests.get(f'http://{host}:{port}/{path}')
        if res.status_code == 200:
            return res.json()
    
    except Exception as e:
        return {'status': 'error', 'detail': e}

if __name__ == '__main__':
    res = ping('localhost', 8000, 'api/ping')
    print(res)
