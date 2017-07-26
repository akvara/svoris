#####
# url = 'http://127.0.0.1:5000/weights/'
# payload = {'key1': 'value1', 'key2': 'value2'}

# GET
# r = requests.get(url)

# GET with params in URL
# r = requests.get(url, params=payload)

# POST with form-encoded data
# r = requests.post(url, data=payload)

# POST with JSON

# import json
# r = requests.post(url, data=json.dumps(payload))

# Response, status etc
# print r.text
# print r.status_code
#####

import requests
import sys
def post_weights(list):
    lineno = 0
    for str in list:
        lineno += 1
        if len(str) == 15:
            (for_date, weight) = str.split(" ")
            payload = {'for_date': for_date, 'weight': weight}
            r = requests.post(url, data=payload)
            if r.status_code == 201:
                print str
            else:
                print r.status_code, r.text
        else:
            print "Not imported: '" + str + "' at line", lineno


url = 'http://127.0.0.1:5000/weights/'

if __name__ == "__main__":
    # execute only if run as a script
    arg_names = ['command', 'input']
    args = dict(zip(arg_names, sys.argv))
    if not 'input' in args:
        print "Usage: " + args["command"] + " input"
        exit(-1)
    input_file = args["input"]
    try:
        file = open(input_file,"r")
        data = file.read()
        file.close()
    except:
        print "File " + input_file + " does not exist"
        exit(-1)

    post_weights(data.split('\n'))

