import sys
import json 

res = { "dayNumber": 19, "part1": 'this is part1', "part2": 'this is part 2'}
sys.stdout.write(json.dumps(res))
