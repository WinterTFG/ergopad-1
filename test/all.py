import ergonode
import assembler
import backend
import frontend

### LOGGING
import logging
level = logging.DEBUG
logging.basicConfig(format="%(asctime)s %(levelname)s %(threadName)s %(name)s %(message)s", datefmt='%m-%d %H:%M', level=level)

### INIT

### CLASSES
class dotDict(dict):
    def __init__(self, *args, **kwargs):
        super(dotDict, self).__init__(*args, **kwargs)
        self.__dict__ = self

### MAIN
if __name__ == '__main__':
    results = dotDict({})

    # ergonode    
    try:
        logging.info('ergonode...')
        res = ergonode.ping('localhost', 9053, 'info')
        assert res['fullHeight'] != int(res['fullHeight']), 'fullHeight is non-numeric'
        assert res['fullHeight'] == res['headersHeight'], 'node not syncd'
        results.ergonode = {'status': 'success'}
    except AssertionError as e:
        results.ergonode = {'status': 'assertion error', 'details': e}
    except Exception as e:
        results.ergonode = e

    try:
        logging.info('ergonode2...')
        res = ergonode.ping('localhost', 9054, 'info')
        assert res['fullHeight'] != int(res['fullHeight']), 'fullHeight is non-numeric'
        assert res['fullHeight'] == res['headersHeight'], 'node not syncd'
        results.ergonode2 = {'status': 'success'}
    except AssertionError as e:
        results.ergonode2 = {'status': 'assertion error', 'details': e}
    except Exception as e:
        results.ergonode2 = e

    # assembler
    try:
        logging.info('assembler...')
        res = assembler.ping('localhost', 8080, 'state')
        assert res['functioning'] == True, 'not functioning'
        results.assembler = {'status': 'success'}
    except AssertionError as e:
        results.ergonode2 = {'status': 'assertion error', 'details': e}
    except Exception as e:
        results.assembler = e

    # frontend
    # try:
    #     res = frontend.ping('localhost', 3000, '/index.html')
    #     assert res['hello'] == 'world'
    # except Exception as e:
    #     results.frontend = e

    # backend
    try:
        logging.info('backend...')
        res = backend.ping('localhost', 8000, 'api/ping')
        assert res['hello'] == 'world', 'hello != world'
        results.backend = {'status': 'success'}
    except AssertionError as e:
        results.backend = {'status': 'assertion error', 'details': e}
    except Exception as e:
        results.backend = e

    # fin
    logging.info(results)
    