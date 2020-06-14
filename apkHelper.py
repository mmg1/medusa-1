#!/usr/bin/env python3
import sys
import readline
import os
from xml.dom import minidom
from xmlUtils import *


RED   = "\033[1;31m"  
BLUE  = "\033[1;34m"
CYAN  = "\033[1;36m"
GREEN = "\033[0;32m"
RESET = "\033[0;0m"
BOLD    = "\033[;1m"
REVERSE = "\033[;7m"

if len(sys.argv[1:]) < 1:
    print("\nInput file is missing ! \nUsage: {} apath_to_apk\n\n".format(sys.argv[0]))
    exit()

xmlDoc = minidom.parse(sys.argv[1])

print("""-----------Package Details-------------:
Name:               {}
Version code:       {}
Version Name:       {}
Mimimum SDK:        {}
Target SDK:         {}
App Name:           {}
Allow Backup        {}

Type 'help' for a list with the availlable commands\n\n""".format(get_elements(xmlDoc,'manifest','package')
            ,get_elements(xmlDoc,'manifest','android:versionCode')
            ,get_elements(xmlDoc,'manifest','android:versionName')
            ,get_elements(xmlDoc,'uses-sdk','android:minSdkVersion')
            ,get_elements(xmlDoc,'uses-sdk','android:targetSdkVersion')
            ,get_elements(xmlDoc,'application','android:name')
            ,get_elements(xmlDoc,'application','android:allowBackup')))
package = get_elements(xmlDoc,'manifest','package')
permissions = get_element_list(xmlDoc,'uses-permission','android:name')
activities = get_element_list(xmlDoc,'activity','android:name')
services = get_element_list(xmlDoc, 'service','android:name')
receivers = get_element_list(xmlDoc,'receiver','android:name')
providers = get_element_list(xmlDoc,'provider','android:name')

device_list = os.popen("adb devices -l").read().split('\n')

device_list.pop()
index = 1

print('Availlable Devices:')

for device in device_list[1:-1]:
    print("{}) {}".format(index,device))
    index+=1
try:
    index = int(input('Please choose the device to operate:'))
    operation_device = device_list[index].split()[0]
    print('[+] Starting adb as root\n\n')
    os.popen("""adb -s {} root""".format(operation_device))
except:
    print('Error occured!')

cmd = ''
try:
    while cmd != 'exit':
        cmd = input(BLUE+'medusa_helper>'+RESET)
        if cmd == 'clear' or 'ls' in cmd or 'nano' in cmd or 'cat ' in cmd:
            os.system(cmd)
        elif cmd == 'help':
            print_help()
        elif 'show ' in cmd:
            show = cmd.split(' ')
            if show[1] == 'permissions':
                print_list(permissions)
            elif show[1] == 'activities':
                print_list(activities)
            elif show[1] == 'receivers':
                print_list(receivers)
            elif show[1] == 'providers':
                print_list(providers)
        elif 'start ' in cmd:
            start = cmd.split(' ')
            if start[1] == 'activity':
                start_activity(activities,operation_device,package)
        elif 'send keys ' in cmd:
            what = cmd.split(' ')
            send_keys(what[2],operation_device)
        elif 'screencap -o ' in cmd:
            fname = cmd.split(' ')
            screencap(operation_device,fname[2])
        elif 'set proxy ' in cmd:
            spl = cmd.split(':')
            port = spl[1]
            ip = spl[0].split(' ')[2]
            proxy(operation_device,False,ip,port)
        elif 'unset proxy' in cmd:
            proxy(operation_device,True)
        elif 'get proxy' in cmd:
            proxy(operation_device,False,' ',' ',True)
except Exception as e:
    print(e)



# pkgSdk = xmldoc.getElementsByTagName('uses-sdk')
# pkgPerms = xmldoc.getElementsByTagName('uses-permission')
# print(pkgPerms.length)

# for perm in pkgPerms:
#     print(perm.getAttribute('android:name'))
#
# cNodes = xmldoc.childNodes

# packageInfo = root.childNodes('manifest')
# sdkInfo = dom.getElementsByTagName('uses-sdk')

# for pkgInf in packageInfo:





# dom = parseString(data)

# version = dom.getElementsByTagName('manifest');

# for v in version:
#     print(v.getAttribute('android:versionCode'))