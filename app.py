from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO, emit
import base64, qrcode, os
from io import BytesIO
from datetime import datetime

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
def draw(data):
    emit('draw', data, broadcast=True)

@socketio.on('clear')
def clear():
    emit('clear', broadcast=True)

@socketio.on('image')
def image(data):
    emit('image', data, broadcast=True)

@socketio.on('emoji')
def emoji(data):
    emit('emoji', data, broadcast=True)

UPLOAD_FOLDER = "static/uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/generate_qr', methods=['POST'])
def qr():
    data = request.json.get('image')
    image_data = data.split(",")[1]
    image_bytes = base64.b64decode(image_data)

    filename = f"{datetime.now().timestamp()}.png"
    filepath = os.path.join(UPLOAD_FOLDER, filename)

    with open(filepath, "wb") as f:
        f.write(image_bytes)

    url = request.host_url + filepath

    qr = qrcode.make(url)
    buf = BytesIO()
    qr.save(buf, format="PNG")

    return jsonify({"qr": base64.b64encode(buf.getvalue()).decode(), "url": url})

if __name__ == '__main__':
    socketio.run(app, debug=True)
