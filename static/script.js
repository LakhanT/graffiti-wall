const socket = io();
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let drawing = false;
let history = [];
let selectedEmoji = null;
let isEraser = false;

const colorPicker = document.getElementById("color");
const sizePicker = document.getElementById("size");

// ================= SAVE STATE =================
function save() {
    history.push(canvas.toDataURL());
}

// ================= DRAW =================
canvas.onmousedown = () => {
    drawing = true;
    save();
};

canvas.onmouseup = () => drawing = false;
canvas.onmouseout = () => drawing = false;

canvas.onmousemove = (e) => {
    if (!drawing) return;

    const x = e.offsetX;
    const y = e.offsetY;

    const color = isEraser
        ? "#ffffff"
        : (colorPicker ? colorPicker.value : "#000");

    const size = sizePicker ? sizePicker.value : 2;

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();

    socket.emit("draw", { x, y, color, size });
};

socket.on("draw", (d) => {
    ctx.fillStyle = d.color;
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
    ctx.fill();
});

// ================= ERASER FIX =================
function toggleEraser() {
    isEraser = true;
}

// If user selects color → disable eraser
if (colorPicker) {
    colorPicker.addEventListener("input", () => {
        isEraser = false;
    });
}

// ================= UNDO =================
function undo() {
    if (history.length === 0) return;

    let img = new Image();
    img.src = history.pop();

    img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
    };

    socket.emit("image", { src: img.src });
}

// ================= CLEAR =================
function clearCanvas() {
    socket.emit("clear");
}

socket.on("clear", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// ================= IMAGE UPLOAD =================
const upload = document.getElementById("uploadImage");

if (upload) {
    upload.onchange = (e) => {
        let reader = new FileReader();

        reader.onload = (ev) => {
            let img = new Image();

            img.onload = () => {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                socket.emit("image", { src: ev.target.result });
            };

            img.src = ev.target.result;
        };

        reader.readAsDataURL(e.target.files[0]);
    };
}

socket.on("image", (d) => {
    let img = new Image();

    img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    img.src = d.src;
});

// ================= EMOJI =================
function selectEmoji(e) {
    selectedEmoji = e;
}

canvas.onclick = (e) => {
    if (!selectedEmoji) return;

    ctx.font = "40px Arial";
    ctx.fillText(selectedEmoji, e.offsetX, e.offsetY);

    socket.emit("emoji", {
        x: e.offsetX,
        y: e.offsetY,
        emoji: selectedEmoji
    });

    selectedEmoji = null;
};

socket.on("emoji", (d) => {
    ctx.font = "40px Arial";
    ctx.fillText(d.emoji, d.x, d.y);
});

// ================= QR =================
function submitCanvas() {
    fetch('/generate_qr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: canvas.toDataURL() })
    })
    .then(res => res.json())
    .then(d => {
        document.getElementById("qrImage").src =
            "data:image/png;base64," + d.qr;

        // download link
        const link = document.createElement("a");
        link.href = d.url;
        link.innerText = "Download Image";
        link.target = "_blank";

        document.body.appendChild(link);
    });
}