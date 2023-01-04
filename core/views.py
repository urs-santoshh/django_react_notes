from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from .serializers import MyTokenObtainPairSerializer, NotesSerializer
from .models import Notes


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def get_routes(request):
    routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
    ]
    return Response(routes)

@api_view(['GET'])
def get_notes(request):
    notes = Notes.objects.all()
    serializer = NotesSerializer(notes, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_note(request):
    data = request.data
    note = Notes.objects.create(
        body=data['body']
    )
    serializer = NotesSerializer(note, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def get_note(request, pk):
    notes = Notes.objects.get(id=pk)
    serializer = NotesSerializer(notes, many=False)
    return Response(serializer.data)

@csrf_exempt
@api_view(['PUT'])
def update_note(request, pk):
    data = request.data
    notes = Notes.objects.get(id=pk)
    serializer = NotesSerializer(instance=notes, data=data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def delete_note(request, pk):
    note = Notes.objects.get(id=pk)
    note.delete()
    return Response('Note was deleted')
    
