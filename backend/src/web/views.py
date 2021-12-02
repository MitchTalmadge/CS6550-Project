from json.decoder import JSONDecodeError
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json
import src.ir.ir as ir


def index(request):
    return HttpResponse("Hello, world!")


@csrf_exempt
def recommend(request):
    """
    Takes in a list of favorites episodes and returns a list of recommended episodes.

    Favorites arrive as JSON in this format, where `id` is the episode number. 
    Recommendations should be returned in the same format.

    ```
    [
        {
            "id": 2,
            "season": 3
        },
        {
            "id": 3,
            "season": 3
        },
        {
            "id": 4,
            "season": 5
        }
    ]
    ```
    """

    try:
        favorites = json.loads(request.body) if request.body else []
        recommendations = ir.recommend(favorites)
        return HttpResponse(json.dumps(recommendations))
    except JSONDecodeError:
        response = HttpResponse("Invalid JSON")
        response.status_code = 400
        return response


@csrf_exempt
def search(request):
    """
    Takes in a query from the user and produces a best guess of which episodes may match the query.
    """

    query = request.body.decode('utf-8')
    results = ir.search(query)
    return HttpResponse(json.dumps(results))
