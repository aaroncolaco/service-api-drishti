#!/usr/bin/env python
import sys
import os
import cv2
import errno
import uuid
import json
import subprocess

TEST_DIR = '/mnt/disks/datadisk/pics/ofexplore/test'
OF_CONTAINER = '017f8ef10600'

def mkdir_p(path):
    try:
        os.makedirs(path)
    except OSError as exc:  # Python >2.5
        if exc.errno == errno.EEXIST and os.path.isdir(path):
            pass
        else:
            raise

def facechop(imagepath,outputdir):
    facedata = "/mnt/disks/datadisk/pics/ofexplore/service/haarcascade_frontalface_default.xml"
    cascade = cv2.CascadeClassifier(facedata)

    img = cv2.imread(imagepath)
    print imagepath
    minisize = (img.shape[1],img.shape[0])
    miniframe = cv2.resize(img, minisize)

    faces = cascade.detectMultiScale(miniframe)
    facecount = len(faces)
    for f in faces:
        x, y, w, h = [ v for v in f ]
        cv2.rectangle(img, (x,y), (x+w,y+h), (255,255,255))

        sub_face = img[y:y+h, x:x+w]
        face_file_name = outputdir +'/' + str(uuid.uuid4()) + ".jpg"
        cv2.imwrite(face_file_name, sub_face)

    return facecount


if __name__ == '__main__':
    args = sys.argv
    picname = args[1]
    facecount = 0
    # call facechop on file name
    picname = picname.split('/')[-1]
    print picname 
    outputdir = os.path.join(TEST_DIR,picname)
    print outputdir
    mkdir_p(outputdir)
    predictions = []
    
    facecount = facechop(args[1], outputdir)
    detect_dir = "/root/datadisk/pics/ofexplore/test/" +picname +'/*.jpg'
    args = ['sudo','docker','exec',OF_CONTAINER,'/bin/bash','/root/datadisk/pics/ofexplore/test-recognition.sh' , detect_dir]
    output,error = subprocess.Popen(args,stdout = subprocess.PIPE, stderr= subprocess.PIPE).communicate()
    print output,error
    output = output.split('===')
    for text in output:
          text = text.replace('\n','')
          termlist = text.split(' ')
          if termlist[0] == 'Predict':
              predictions.append({"name": termlist[1], "probability": float(termlist[3])})
    
    response = {"predictions": predictions,"faceCount":facecount }
    print json.dumps(response)
