import ergonode
import assembler

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
    res = ergonode.ping('localhost', 9053)
    results.backend = assert res['hello'] == 'world'

    res = ergonode.ping('localhost', 9054)
    results.backend = assert res['hello'] == 'world'

    # assembler
    res = assembler.ping('localhost', 8080, '/api/ping')
    results.backend = assert res['hello'] == 'world'

    # frontend
    res = assembler.ping('localhost', 3000, '/api/ping')
    results.backend = assert res['hello'] == 'world'

    # backend
    res = backend.ping('localhost', 8000, '/api/ping')
    results.backend = assert res['hello'] == 'world'

    # fin
    logging.info(results)
    