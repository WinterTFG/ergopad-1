from core.celery_app import celery_app

### INIT
@celery_app.task(acks_late=True)
def example_task(word: str) -> str:
    return f"Hello, {word}"
