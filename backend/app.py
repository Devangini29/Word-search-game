try:
    from flask import Flask, request, jsonify
    from flask_cors import CORS
    from trie import load_dictionary
    import random
except ImportError as e:
    print(f"Import error: {e}")
    exit(1)

app = Flask(__name__)
CORS(app)
trie = load_dictionary('words.txt')

# Directions for placing words (horizontal, vertical, diagonal)
DIRECTIONS = [(0, 1), (1, 0), (1, 1), (-1, -1), (1, -1), (-1, 1), (0, -1), (-1, 0)]

def generate_grid(size=10, word_count=5):
    grid = [[' ' for _ in range(size)] for _ in range(size)]
    words = []
    with open('words.txt', 'r') as file:
        all_words = [w.strip().lower() for w in file.readlines() if len(w.strip()) <= size]
        words = random.sample(all_words, min(word_count, len(all_words)))

    for word in words:
        placed = False
        attempts = 0
        while not placed and attempts < 100:
            direction = random.choice(DIRECTIONS)
            row = random.randint(0, size - 1)
            col = random.randint(0, size - 1)
            if can_place_word(grid, word, row, col, direction, size):
                place_word(grid, word, row, col, direction)
                placed = True
            attempts += 1

    # Fill remaining spaces with random letters
    letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for i in range(size):
        for j in range(size):
            if grid[i][j] == ' ':
                grid[i][j] = random.choice(letters)
    
    return grid, words

def can_place_word(grid, word, row, col, direction, size):
    dr, dc = direction
    for i, char in enumerate(word):
        r, c = row + i * dr, col + i * dc
        if r < 0 or r >= size or c < 0 or c >= size or (grid[r][c] != ' ' and grid[r][c] != char):
            return False
    return True

def place_word(grid, word, row, col, direction):
    dr, dc = direction
    for i, char in enumerate(word):
        r, c = row + i * dr, col + i * dc
        grid[r][c] = char.upper()

@app.route('/grid', methods=['GET'])
def get_grid():
    grid, words = generate_grid()
    return jsonify({'grid': grid, 'words': words})

@app.route('/validate', methods=['POST'])
def validate_word():
    data = request.json
    word = data.get('word', '').lower()
    if trie.search(word):
        return jsonify({'valid': True, 'message': 'Valid word!'})
    return jsonify({'valid': False, 'message': 'Invalid word!'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)