# 🎨 Graffiti Wall - Real-Time Collaborative Drawing System

## 🚀 Overview
The Graffiti Wall is an interactive real-time drawing platform that allows multiple users to create and share artwork simultaneously. The system consists of two kiosk interfaces (drawing boards) and a central display screen that shows all drawings live.

This project demonstrates real-time communication using WebSockets and enables collaborative creativity in environments like events, campuses, and exhibitions.

---

## 🧠 Features
- Real-time collaborative drawing  
- Multiple kiosk interfaces  
- Live display screen  
- Color picker for drawing  
- Adjustable brush size  
- Clear canvas (synchronized across all users)  
- Instant updates using WebSockets  

---

## 🏗️ System Architecture
```
          +-------------------+
          |     Kiosk 1       |
          | (Drawing Board)   |
          +---------+---------+
                    |
                    |
          +---------v---------+
          |                   |
          |   Flask Server    |
          |   (SocketIO)      |
          |                   |
          +---------+---------+
                    |
                    |
          +---------v---------+
          |                   |
          |   Main Display    |
          |   (Live Screen)   |
          |                   |
          +---------+---------+
                    |
          +---------v---------+
          |     Kiosk 2       |
          | (Drawing Board)   |
          +-------------------+
```

---

## ⚙️ Tech Stack

### 🎨 Frontend
- HTML  
- CSS  
- JavaScript  
- Canvas API  

### 🔧 Backend
- Flask (Python)  

### ⚡ Real-Time Communication
- Flask-SocketIO (WebSockets)  

---

## 📂 Project Structure
```
graffiti-wall/
│
├── app.py                 # Flask backend server
│
├── templates/             # HTML templates
│   ├── kiosk.html         # Drawing interface (kiosk)
│   └── display.html       # Main live display screen
│
└── static/                # Static files
    └── script.js          # Drawing + Socket logic
```

---

## ▶️ How to Run the Project

### 1️⃣ Clone the repository
```
git clone https://github.com/LakhanT/graffiti-wall.git
cd graffiti-wall
```

### 2️⃣ Install dependencies
```
pip install flask flask-socketio
```

### 3️⃣ Run the application
```
python app.py
```

---

## 🌐 Access the Application
- 🖥️ Main Display → http://localhost:5000/  
- ✏️ Kiosk Interface → http://localhost:5000/kiosk  

👉 Open multiple kiosk tabs to simulate multiple users.

---

## 💡 Use Cases
- Events & exhibitions  
- Digital art installations  
- College fests  
- Interactive public displays  

---

## 🔮 Future Enhancements
- 👤 User authentication  
- 💾 Save drawings as images  
- ↩️ Undo/Redo functionality  
- 🛑 Admin moderation panel  
- 📱 Mobile responsiveness  

---

## 👨‍💻 Author
Lakhan Dinesh Togadiya  


