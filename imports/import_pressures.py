import requests
import sys
import re

def post_pressures(list):
    lineno = 0
    for str in list:
        lineno += 1
        pattern = re.compile('(\d{2})-(\d{2}), (\d{2}):(\d{2}) (\d{2,3})/(\d{2,3})/(\d{2,3})')
        match = pattern.findall(str)
        if match:
            (mon, day, h, m, sys, dia, pul) = match[0]
            y = 2017 if int(mon) < 10 else 2016
            # print "%s-%s-%s %s:%s %s/%s/%s" % (y, mon, day, h, m, sys, dia, pul)


            payload = {
                'for_date': '{0}-{1}-{2}'.format(y, mon, day),
                'for_hour': '{0}'.format(h),
                'sys': sys,
                'dia': dia,
                'pul': pul,
            }
            # print payload
            r = requests.post(url, data=payload)
            if r.status_code == 201:
                print str
            else:
                print(r.status_code, r.text)
        else:
            print "Not imported: '" + str + "' at line", lineno


url = 'http://127.0.0.1:5000/pressures/'
# url = 'http://svoris-api.herokuapp.com/pressures/'

if __name__ == "__main__":
    # execute only if run as a script

    # arg_names = ['command', 'input']
    # args = dict(zip(arg_names, sys.argv))
    # if not 'input' in args:
        # print "Usage: " + args["command"] + " input"
        # exit(-1)
    # input_file = args["input"]

    input_file = 'history_pressures.txt'
    try:
        file = open(input_file,"r")
        data = file.read()
        file.close()
    except:
        print "File " + input_file + " does not exist"
        exit(-1)

    post_pressures(data.split('\n'))

