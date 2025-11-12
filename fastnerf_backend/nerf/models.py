from django.db import models

# Create your models here.

class Post(models.Model):
    title = models.CharField(max_length=100,primary_key=True)
    file = models.FileField()
    pose = models.CharField(max_length=100, default="na")
    pose_time = models.IntegerField(blank=True, null=True)
    mask = models.CharField(max_length=100, default="na")
    mask_time = models.IntegerField(blank=True, null=True)
    smpl = models.CharField(max_length=100, default="na")
    smpl_time = models.IntegerField(blank=True, null=True)
    novel = models.CharField(max_length=100, default="na")
    novel_time = models.IntegerField(blank=True, null=True)
    dance = models.CharField(max_length=100, default="na")
    dance_time= models.IntegerField(blank=True, null=True)
    train_time= models.DateTimeField(blank=True, null=True)
    metrics = models.CharField(max_length=100, default="na")
    created_at = models.DateTimeField(auto_now_add=True,null=True)
    def __str__(self):
        return self.title