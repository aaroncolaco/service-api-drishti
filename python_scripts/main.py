import time
import sys

sys.stdout.write('Python script return value 1\n')
time.sleep(5)

print('Python script return value 2\n')
time.sleep(5)

def printHello():
  for x in xrange(1,5):
    print "Hello World", x

printHello();
