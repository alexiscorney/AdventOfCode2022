import logging 
import sys
import numpy as np
import json 

logging.basicConfig(level=logging.DEBUG)

def init_maze(input_path):

    with open(input_path) as f: 
        lines = f.readlines()
        maze = [[ll for ll in l.strip()] for l in lines]

    width = len(maze[0])
    height = len(maze)
    
    for i in range(0, height):
        for j in range(0, width):
            if maze[i][j] == 'S':
                start = [i,j]
            if maze[i][j] == 'E':
                end = [i,j]
    maze = [[ord(ll) for ll in l] for l in maze]
    maze[start[0]][start[1]] = 97
    maze[end[0]][end[1]] = 122
    return maze, start, end

def init_maze_part2(input_path):

    with open(input_path) as f: 
        lines = f.readlines()
        maze = [[ll for ll in l.strip()] for l in lines]

    width = len(maze[0])
    height = len(maze)
    
    starts = []
    
    for i in range(0, height):
        for j in range(0, width):
            if maze[i][j] == 'S' or maze[i][j] == 'a':
                starts.append([i,j])
            if maze[i][j] == 'E':
                end = [i,j]
    maze = [[97 if ord(ll) == 83 else ord(ll) for ll in l] for l in maze]
    maze[end[0]][end[1]] = 122
    return maze, starts, end


def walkable(current, new):
    return (new - current) <= 1


def get_neighbours(current, maze): 
    move  =  [[-1, 0 ], # go up
              [ 0, -1], # go left
              [ 1, 0 ], # go down
              [ 0, 1 ]] # go right
    no_rows, no_columns = np.shape(maze)
    
    neighbours = []
    for new_position in move: 
        node_position = [current[0] + new_position[0], current[1] + new_position[1]]
        if 0 <= node_position[0] < len(maze) and 0 <= node_position[1] < len(maze[0]) and walkable(maze[current[0]][current[1]], maze[node_position[0]][node_position[1]]):
        # Make sure within range (check if within maze boundary)
            neighbours.append(node_position)
    return neighbours
    
def mark_visited(node, visited):
    visited.add(''.join(map(str,s)))


def is_visited(node, visited):
    return (node[0],node[1]) in visited


def bfs(start, end, maze):
    queue = [(start, [])]
    visited = set()
    
    while len(queue) > 0:
        node, path = queue.pop(0)
        path.append(node)
        if not is_visited(node, visited):
            visited.add((node[0],node[1]))
            if node == end:
                logging.debug("path found length %d" % (len(path) - 1))
                return path
            neighbours = get_neighbours(node, maze)
            for n in neighbours:
                if not is_visited(n, visited):
                    queue.append((n, path[:]))
    return []

def print_path(path, input_path):
    with open(input_path) as f: 
        lines = f.readlines()
        maze = [[ll for ll in l.strip()] for l in lines]

    for i, step in enumerate(path):
        maze[step[0]][step[1]] = (maze[step[0]][step[1]]).upper()

    strings = [''.join(l) for l in maze]

    with open('out.txt', 'w') as file:
        for l in strings:
            file.write(l + "\n")

def day12(input_path):
    maze, start, end = init_maze(input_path)
    path = bfs(start, end, maze)
    part1 = len(path) - 1
    
    maze, starts, end = init_maze_part2(input_path)
    paths = []
    for s in starts:
        paths.append(len(bfs(s, end, maze))-1)
    paths = [p for p in paths if not p == -1]
    paths.sort(reverse=False)
    part2 = paths[0]
    
    return { "dayNumber": 12, "part1": str(part1), "part2": str(part2) }

logging.debug('day12 in python...')
input_path = sys.argv[1]
res = day12(input_path)
sys.stdout.write(json.dumps(res))
