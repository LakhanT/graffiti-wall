const socket = io();
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let drawing = false;
let colorPicker = document.getElementById("color");
let sizePicker = document.getElementById("size");

canvas.addEventListener("mousedown", () => drawing = true);
canvas.addEventListener("mouseup", () => drawing = false);
canvas.addEventListener("mouseout", () => drawing = false);

canvas.addEventListener("mousemove", (e) => {
    if (!drawing) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const color = colorPicker ? colorPicker.value : "#000";
    const size = sizePicker ? sizePicker.value : 2;

    draw(x, y, color, size);

    socket.emit("draw", { x, y, color, size });
});

socket.on("draw", (data) => {
    draw(data.x, data.y, data.color, data.size);
});

socket.on("clear", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

function draw(x, y, color, size) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
}

function clearCanvas() {
    socket.emit("clear");
}
