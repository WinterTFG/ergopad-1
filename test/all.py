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
        logging.info('CHECKING ergonode...')
        res = ergonode.ping('localhost', 9053, 'info')
        assert res['fullHeight'] == int(res['fullHeight']), 'fullHeight is non-numeric'
        assert res['fullHeight'] == res['headersHeight'], 'node not syncd'
        results.ergonode = {'status': 'success'}
    except AssertionError as e:
        results.ergonode = {'status': 'assertion error', 'details': e}
    except Exception as e:
        results.ergonode = e

    try:
        logging.info('CHECKING ergonode2...')
        res = ergonode.ping('localhost', 9054, 'info')
        assert res['fullHeight'] == int(res['fullHeight']), 'fullHeight is non-numeric'
        assert res['fullHeight'] == res['headersHeight'], 'node not syncd'
        results.ergonode2 = {'status': 'success'}
    except AssertionError as e:
        results.ergonode2 = {'status': 'assertion error', 'details': e}
    except Exception as e:
        results.ergonode2 = e

    # assembler
    try:
        logging.info('CHECKING assembler...')
        res = assembler.ping('localhost', 8080, 'stat')
        if 'functioning' in res:
            assert res['functioning'] == True, 'not functioning'
        results.assembler = {'status': 'success'}
    except AssertionError as e:
        results.assembler = {'status': 'assertion error', 'details': e}
    except Exception as e:
        results.assembler = e

    # backend
    try:
        logging.info('CHECKING backend...')
        res = backend.ping('localhost', 8000, 'api/ping')
        assert res['hello'] == 'world', 'hello != world'
        results.backend = {'status': 'success'}
    except AssertionError as e:
        results.backend = {'status': 'assertion error', 'details': e}
    except Exception as e:
        results.backend = e

    # frontend
    try:
        logging.info('CHECKING frontend...')
        res = frontend.ping('localhost', 3000, '')
        assert res[:9] == '<!DOCTYPE'
        results.frontend = {'status': 'success'}
    except AssertionError as e:
        results.frontend = {'status': 'assertion error', 'details': e}
    except Exception as e:
        results.frontend = e

    # fin    
    try:
        for r in results.keys():
            if 'status' in results[r]:
                if results[r]['status'] == 'success':
                    logging.info(f'SUCCESS: {r}')
                else:
                    logging.info(f'FAIL: {r}; {results[r]}')
            else:
                logging.info(f'FAIL: {r}; {results[r]}')

    except:
        pass
    
    