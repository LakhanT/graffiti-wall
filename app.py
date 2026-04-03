from flask import Flask, render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route('/')
def display():
    return render_template('display.html')

@app.route('/kiosk')
def kiosk():
    return render_template('kiosk.html')

@socketio.on('draw')
def handle_draw(data):
    emit('draw', data, broadcast=True)

@socketio.on('clear')
def handle_clear():
    emit('clear', broadcast=True)

if __name__ == '__main__':
    socketio.run(app, debug=True)
