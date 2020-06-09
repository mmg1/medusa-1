import subprocess
import os, sys

RED   = "\033[1;31m"  
BLUE  = "\033[1;34m"
CYAN  = "\033[1;36m"
GREEN = "\033[0;32m"
RESET = "\033[0;0m"
BOLD    = "\033[;1m"
REVERSE = "\033[;7m"

def parse_module(mods):
    hooks = ['Java.perform(function() {']
    for file in mods:
        with open(file) as mod:
            hooks.append(' try { ')
            for line in mod:
                if not line.startswith('#'):
                    hooks.append('\t\t'+line.strip('\n'))

            hooks.append("""    } catch (err) {
                console.log('Error loading module %s');
        }"""%file)
    
    hooks.append('});')

    with open('agent.js','w') as agent:
        for line in hooks:
            agent.write('%s\n' % line)
    print("\nScript is compiled\n")

def show_categories():
    folders = list(os.walk('modules/'))
    print('\nAvaillable module categories:\n')
    for f in folders[1:]:
        module=f[0].split('/')
        print(module[1])
    print()


def show_modules(category):
    presentation = {}
    
    for root, directories, filenames in os.walk('modules/{}'.format(category)):
        for filename in filenames:
            if filename.endswith('.med'):
                filepath = os.path.join(root,filename)
                presentation.update({filepath: display_tag(filepath,'Description')})
    
    if len(presentation) == 0:
        print('No such category or this category does not contain modules')
    else:
        print('\nModules in this category:\n')
        for key,value in presentation.items():
            print('Name: '+GREEN+key+' '+BLUE+value+RESET, end = '')
    

def display_tag(file, what_tag):
    with open(file) as fl:
        for line in fl:
            if line.startswith('#{}'.format(what_tag)):
                return line


def run_frida(force, package_name):
    if force == True:
        subprocess.run('frida -D 9B051FFBA00614 -l agent.js -f {} --no-pause'.format(package_name), shell=True)
    else:
        subprocess.run('frida -D 9B051FFBA00614 -l agent.js {}'.format(package_name), shell=True)


def print_help():
    print("""Available commands:
                    - show categories           : Displays the availlable module categories (start here)
                    - show modules [category]   : Displays the availlable modules for the selected category
                    - show mods                 : Shows loaded modules
                    - add [module name]         : Selects a module which will be added to the final script
                    - rem [module name]         : Removes a module from the list that will be loaded
                    - reset                     : Removes all modules from the list that will be loaded
                    - help [module name]        : Displays help for the 
                    - compile script            : Compiles the script 
                    - run       [package name]  : Initiates a Frida session and attaches to the sellected package
                    - run -f    [package name]  : Initiates a Frida session and spawns the sellected package
                    
                    Use the /modules/myModules/scratchpad.med to insert your own hooks and include them to the agent.js 
                    using the 'compile script' command""")