import requests

def ping(host, port, path):
    try:
        res = requests.get(f'http://{host}:{port}/{path}')
        if res.status_code == 200:
            return res.content.decode('utf-8')
    
    except Exception as e:
        return {'status': 'error', 'detail': e}

if __name__ == '__main__':
    res = ping('localhost', 3000, '')
    print(res)
