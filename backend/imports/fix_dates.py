import sys


def fix_dates(strng):
    out = []
    for item in strng.splitlines():
        (for_date, weight) = item.split(" ")
        (y, m, d) = for_date.split("-")

        out.append("-".join((y, m.zfill(2), d.zfill(2))) + " " + weight)
    return "\n".join(out)


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
        handle.write(fix_dates(strng))
        handle.write('\n')
        handle.close()
    except:
        print "File " + input_file + " does not exist"
        exit(-1)
