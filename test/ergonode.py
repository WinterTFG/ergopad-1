import requests

def ping(host, port, path):
    try:
        res = requests.get(f'http://{host}:{port}/{path}')
        if res.status_code == 200:
            return res.json()
    
    except Exception as e:
        return {'status': 'error', 'detail': e}

if __name__ == '__main__':
    isMainnet = False
    ping('localhost', (9052, 9053)[isMainnet], 'info')    
    ping('localhost', 9054, 'info') # wallet
