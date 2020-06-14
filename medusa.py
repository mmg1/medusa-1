#!/usr/bin/env python3
import readline
import os
from defs import *


print("""
Welcome to:
                          888                         
                          888                         
                          888                         
88888b.d88b.  .d88b.  .d88888888  888.d8888b  8888b.  
888 "888 "88bd8P  Y8bd88" 888888  88888K         "88b 
888  888  88888888888888  888888  888"Y8888b..d888888 
888  888  888Y8b.    Y88b 888Y88b 888     X88888  888 
888  888  888 "Y8888  "Y88888 "Y88888 88888P'"Y888888\n\n\n Type help for options\n\n""")

module_list=[];

device_list = os.popen("adb devices -l").read().split('\n')

device_list.pop()
index = 1

for device in device_list[1:-1]:
    print("{}) {}".format(index,device))
    index+=1

index = int(input('Please choose the device to operate:'))
operation_device = device_list[index].split()[0]



cmd = ''
try:
    while cmd != 'exit':
        cmd = input(CYAN+'medussa>'+RESET)
        if cmd == 'help':
            print_help()
        elif cmd == 'show categories':
            show_categories()
        elif 'list packages' in cmd:
            list_packages(operation_device)
        elif 'run -f ' in cmd:
            run_frida(True,cmd.split(' ')[2],operation_device)
        elif 'run ' in cmd:
            run_frida(False,cmd.split(' ')[1],operation_device)
        elif 'send text ' in cmd:
            text = cmd.split('text') 
            send_keys(text[1],operation_device)
        elif cmd == 'show all':
            show_all()
        elif 'show modules ' in cmd:
            module = cmd.split(' ') 
            show_modules(module[2])
        elif 'help ' in cmd:
            module = cmd.split(' ')
            print('\n'+BLUE+display_tag(module[1],'Help')+RESET)
        elif 'add ' in cmd:
            module = cmd.split(' ')
            module_list.append(module[1])
            print("\nCurrent Mods:")
            for mod in module_list:
                print(mod)
            print()
        elif 'rem ' in cmd:
            module = cmd.split(' ')
            module_list.remove(module[1])
            print("\nCurrent Mods:")
            for mod in module_list:
                print(mod)
            print()            
        elif cmd == 'reset':
            module_list=[]
        elif cmd == 'compile script':
            parse_module(module_list)
        elif cmd == 'exit':
            break
        elif cmd == 'show mods':
            print("\nCurrent Mods:")
            for mod in module_list:
                print(mod)
            print()
        elif cmd == 'clear' or 'ls' in cmd or 'nano' in cmd or 'cat ' in cmd or 'grep ' in cmd:
            os.system(cmd)
            #print('Invalid command !')
        else:
            print('Invalid command !')

except:
    print('Command was not understood, type help to read the availlable commands!! \n\nExiting !!')





#parse_module(mods)


