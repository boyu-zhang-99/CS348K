from django.shortcuts import render

# Create your views here.
from django.contrib.auth.models import User, Group
from rest_framework import viewsets,status
from rest_framework import permissions
from  nerf.serializers import UserSerializer, GroupSerializer
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from .serializers import PostSerializer
from .models import Post
import subprocess, sys
from datetime import datetime
class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]

class PostViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    def partial_update(self, request, *args, **kwargs):
        instance = self.queryset.get(pk=kwargs.get('pk'))
        new_data = request.data
        if request.data.get('pose','') != '':
            timediff = int((datetime.now()-instance.__dict__["train_time"].replace(tzinfo=None)).total_seconds())
            new_data['pose_time'] = timediff
        elif request.data.get('mask','') != '':
            timediff = int((datetime.now()-instance.__dict__["train_time"].replace(tzinfo=None)).total_seconds())
            new_data['mask_time'] = timediff
        elif request.data.get('smpl','') != '':
            timediff = int((datetime.now()-instance.__dict__["train_time"].replace(tzinfo=None)).total_seconds())
            new_data['smpl_time'] = timediff
        elif request.data.get('novel','') != '':
            timediff = int((datetime.now()-instance.__dict__["train_time"].replace(tzinfo=None)).total_seconds())
            new_data['novel_time'] = timediff
        elif request.data.get('dance','') != '':
            timediff = int((datetime.now()-instance.__dict__["train_time"].replace(tzinfo=None)).total_seconds())
            new_data['dance_time'] = timediff

        serializer = self.serializer_class(instance, data=new_data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def send_the_mail(self, request):
        title = request.data.get('title','')
        file = request.data.get('file','').split("/")[-1]
        instance = self.queryset.get(pk=title)
        data = {"train_time": datetime.now(),
                "pose": "na",
                "pose_time": None,
                "mask": "na",
                "mask_time": None,
                "smpl": "na",
                "smpl_time": None,
                "novel": "na",
                "novel_time": None,
                "dance": "na",
                "dance_time": None,
                "metrics": "na",
                "dace_time": None,
                }
        serializer = self.serializer_class(instance, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        process = subprocess.Popen(['bash', '/home/billzhang/repo/InstantAvatar-api/bash/run-custom-api.sh', title, file], stdout=subprocess.PIPE, text=True)
        while True:
            output = process.stdout.readline()
            if output:
                print(output.strip())
            result = process.poll()
            if result is not None:
                break
        return Response("mail sent successfully")

# class PostView(APIView):
#     parser_classes = (MultiPartParser, FormParser)

#     def get(self, request, *args, **kwargs):
#         posts = Post.objects.all()
#         serializer = PostSerializer(posts, many=True)
#         return Response(serializer.data)

#     def post(self, request, *args, **kwargs):
#         posts_serializer = PostSerializer(data=request.data)
#         if posts_serializer.is_valid():
#             posts_serializer.save()
#             return Response(posts_serializer.data, status=status.HTTP_201_CREATED)
#         else:
#             print('error', posts_serializer.errors)
#             return Response(posts_serializer.errors, status=status.HTTP_400_BAD_REQUEST)