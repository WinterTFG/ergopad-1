import requests

def ping(host, port, path):
    try:
        res = requests.get(f'http://{host}:{port}/{path}')
        if res.status_code == 200:
            return res.json()
    
    except Exception as e:
        return {'status': 'error', 'detail': e}

if __name__ == '__main__':
    isMainnet = True
    res = ping('localhost', (9052, 9053)[isMainnet], 'info')    
    print(f"port: {(9052, 9053)[isMainnet]}, fullHeight: {res['fullHeight']}, headersHeight: {res['headersHeight']}")
    res = ping('localhost', 9054, 'info') # wallet
    print(f"port {(9052, 9053)[isMainnet]}, fullHeight: {res['fullHeight']}, headersHeight: {res['headersHeight']}")

    if res['fullHeight'] == int(res['fullHeight']): print(True)
    else: print(False)