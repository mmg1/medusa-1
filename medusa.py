import subprocess, readline, glob
import completeTab




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

