import requests

def ping(host, port, path):
    try:
        res = requests.get(f'http://{host}:{port}/{path}')
        if res.status_code == 200:
            return res.json()
        else:
            return {}
    
    except Exception as e:
        return {'status': 'error', 'detail': e}

if __name__ == '__main__':
    res = ping('localhost', 8080, 'state')
    print(res)
