# Word Search Game

A **Trie-based** word search puzzle game built with a **Python Flask** backend and a **React + Tailwind CSS** frontend. Players can find hidden words in a dynamically generated grid, with real-time word validation using a Trie data structure.

## 🚀 Features
- **Randomized Word Grid**: Generates an NxN grid with hidden words.
- **Trie-Based Word Validation**: Fast and efficient word lookup using a Trie.
- **Interactive UI**: Click and drag to select words, with real-time feedback.
- **Scoring System**: Tracks correct words found and assigns points.
- **Timer**: Adds challenge by limiting the time to find words.
- **Responsive UI**: Built with Tailwind CSS for a modern look across devices.

---
## 🛠 Tech Stack

### Backend
- **Python**: Core programming language.
- **Flask**: Lightweight web framework for the API.
- **Trie Data Structure**: Efficient word validation.

### Frontend
- **React**: JavaScript library for building the UI.
- **Vite**: Fast build tool for React applications.
- **Tailwind CSS**: Utility-first CSS framework for styling.

---
## 📂 Project Structure
```
word_search_game/
│── backend/                  # Python Flask Backend
│   ├── app.py                # Flask API for word validation
│   ├── trie.py               # Trie implementation
│   ├── words.txt             # Dictionary of words
│── frontend/                 # React + Vite + Tailwind Frontend
│   ├── public/               # Static assets
│   ├── src/
│       ├── components/       # Reusable React components
│           ├── Grid.jsx      # Word grid component
│           ├── Timer.jsx     # Timer component
│           ├── Score.jsx     # Score component
│       ├── App.jsx           # Main game logic
│       ├── main.jsx          # Entry point
│       ├── App.css           # Custom styles
│   ├── index.html            # HTML template
│   ├── tailwind.config.js    # Tailwind configuration
│   ├── vite.config.js        # Vite configuration
│── README.md                 # Project documentation
```

---
## ⚡ Setup Instructions

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/word-search-game.git
cd word-search-game
```

### 2️⃣ Backend Setup
Navigate to the backend folder:
```sh
cd backend
```
Install dependencies:
```sh
pip install flask
```
Run the Flask server:
```sh
python app.py
```
> The backend will start at **http://127.0.0.1:5000**

### 3️⃣ Frontend Setup
Navigate to the frontend folder:
```sh
cd ../frontend
```
Install dependencies:
```sh
npm install
```
Start the development server:
```sh
npm run dev
```
> The frontend will start at **http://127.0.0.1:5173**

---
## 🎮 How to Play
1. Open the game in your browser.
2. The grid will display a random set of letters.
3. Click and drag to select words.
4. The game validates words in real-time using the Trie-based backend.
5. Earn points for each valid word found.
6. Complete the game before the timer runs out!

---
## 📡 API Endpoints

### **Validate Word**
- **Endpoint:** `/validate`
- **Method:** `POST`
- **Request Body:**
```json
{
  "word": "example"
}
```
- **Response:**
```json
{
  "valid": true,
  "message": "Valid word!"
}
```

---
## 🛠 Customization

### **Grid Size**
To change the grid size, update the `generateGrid` function in `src/App.jsx`:
```js
const generateGrid = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const grid = Array.from({ length: 10 }, () => // Change 10 to desired size
    Array.from({ length: 10 }, () => letters[Math.floor(Math.random() * letters.length)])
  );
  return grid;
};
```

### **Timer**
To adjust the timer, update the `initialTime` prop in `src/App.jsx`:
```jsx
<Timer initialTime={60} onTimeUp={handleTimeUp} />
```

---
## 👥 Contributing
Contributions are welcome! Follow these steps:

1. Fork the repository.
2. Create a new branch:
```sh
git checkout -b feature/your-feature-name
```
3. Commit your changes:
```sh
git commit -m "Add your feature"
```
4. Push to the branch:
```sh
git push origin feature/your-feature-name
```
5. Open a pull request.

---
## 📜 License
This project is licensed under the **MIT License**. See the LICENSE file for details.

---
## 🙌 Acknowledgements
- **Trie Data Structure**: For efficient word validation.
- **Tailwind CSS**: For a modern and responsive UI.
- **Flask**: For a lightweight backend API.

> Enjoy playing the **Word Search Game!** 🎮🚀

