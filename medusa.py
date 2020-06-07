import subprocess, readline, glob
import completeTab



print("""
Welcome to:
                          888                         
                          888                         
                          888                         
88888b.d88b.  .d88b.  .d88888888  888.d8888b  8888b.  
888 "888 "88bd8P  Y8bd88" 888888  88888K         "88b 
888  888  88888888888888  888888  888"Y8888b..d888888 
888  888  888Y8b.    Y88b 888Y88b 888     X88888  888 
888  888  888 "Y8888  "Y88888 "Y88888 88888P'"Y888888\n\n\n """)
# cmd = input('medussa>')
# while cmd != 'quit':
#     cmd = input('medussa>')




##
    #Mods is a list of med files
    #the following function iterates trough
    #this files and add their content 
    #to the agent.js
##

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




def run_frida(package_name):
    subprocess.run('frida -D 9B051FFBA00614 -l agent.js -f {} --no-pause'.format(package_name), shell=True)


def complete(text, state):
    return (glob.glob(text+'*')+[None])[state]





mods = ['modules/helpers/sslUnpinning.med']
package_name = input('Enter package name you want to run:')

parse_module(mods)
run_frida(package_name)

