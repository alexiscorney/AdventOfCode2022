import sys
import json 
import logging 

logging.basicConfig(level=logging.DEBUG)


def createBluePrint(line):
    line = line.trim()
    
with open(sys.argv[1]) as f:
    lines = f.readlines()
    logging.debug(lines)

res = { "dayNumber": 19, "part1": 'this is part1', "part2": 'this is part 2'}
sys.stdout.write(json.dumps(res))
