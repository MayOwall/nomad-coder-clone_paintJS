const canvas = document.querySelector("#jsCanvas");
const {width, height} = canvas.getBoundingClientRect();
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".jsColor");
const brushSizeInput = document.querySelector("input");
const mode = document.querySelector("#jsMode");
const saveBtn = document.querySelector("#jsSave");

const INITIAL_COLOR = "black";


canvas.width = width;
canvas.height = height;
ctx.lineWidth = 5.0;
ctx.strokeStyle = "INITIAL_COLOR";
ctx.fillStyle = "INITIAL_COLOR"

let painting = false;
let filling = false;


function startPainting() {
    painting = true;
};

function stopPainting() {
    painting = false;
};

//canvas 위에서의 mousemove.
function onMouseMove(event) {
    const offsetX = event.offsetX;
    const offsetY = event.offsetY;
    if(painting === false) {
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
    } else {
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
    };
};

function changeColor(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
};

function brushSizeHandler() {
    const brushSize = brushSizeInput.value;
    ctx.lineWidth = brushSize;
};

function handleModeClick() {
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Brush";
    };
}

function handleCanvasClick() {
    if(filling === true) {
        ctx.fillRect(0, 0, width, height);
    }
};

function handleCM(event) {
    event.preventDefault();
};

function savePictureHandler() {
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = image;
    link.download = "paintJS export";
    link.click();
}
//canvas가 존재하는지 확인하기 위해 if(canvas)의 조건을 추가!!
if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("mousedown", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
};

colors.forEach(color => color.addEventListener("click", changeColor));

if(brushSizeInput) {
    brushSizeInput.addEventListener("input", brushSizeHandler);
};

if(mode) {
    mode.addEventListener("click", handleModeClick);
};

if(saveBtn) {
    saveBtn.addEventListener("click", savePictureHandler);
}