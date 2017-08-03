import sys


def fix_dates(strng):

    pass


if __name__ == "__main__":
    # execute only if run as a script
    arg_names = ['command', 'input', 'output']
    args = dict(zip(arg_names, sys.argv))
    if not 'input' in args:
        print "Usage: " + args["command"] + " input [output]"
        exit(-1)
    input_file = args["input"]
    output_file = args["output"] if 'output' in args else args["input"]
    try:
        handle = open(input_file, "r")
        strng = handle.read()
        handle.close()
        handle = open(output_file, "w")
        handle.write(strng)
        handle.write('\n')
        handle.close()
    except:
        print "File " + input_file + " does not exist"
        exit(-1)
