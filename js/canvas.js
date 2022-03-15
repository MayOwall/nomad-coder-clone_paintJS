const canvas = document.getElementById('jsCanvas');
const {width, height} = canvas.getBoundingClientRect();
const context = canvas.getContext('2d');
const brushSize = document.getElementById('jsBrushSize');
const brushColor = document.querySelectorAll('.control-pannel__brush-colors__color');
const brushBtn = document.getElementById('jsBrushBtn');
const fillBtn = document.getElementById('jsFillBtn');

canvas.width = width;
canvas.height = height;

context.lineWidth = 10;
context.strokeStyle = 'black';


let paintmode = 'brush';
let painting = false;

//painting 기능 활성화
function startPainting() {
    if(paintmode === 'brush') {
        painting = true;
    } else if(paintmode = 'fill'){
        context.fillRect(0, 0, width, height);
    };
};
//painting 기능 비활성화
function stopPainting() {
    painting = false;
};

function mousemoveHandler(event) {
    const coordinateX = event.offsetX;
    const coordinateY = event.offsetY;
    if(painting === false) {
        context.beginPath();
        context.moveTo(coordinateX, coordinateY);
    } else {
        context.lineTo(coordinateX, coordinateY);
        context.stroke();
    };
};

function brushSizeHandler() {
    context.lineWidth = brushSize.value;
};

function brushColorHandler(event) {
    const color = event.target.style.backgroundColor;
    context.strokeStyle = color;
    context.fillStyle = color;
};

function paintModeHandler() {
    brushBtn.classList.toggle('deactivated');
    fillBtn.classList.toggle('deactivated');
}
function brushBtnHandler() {
    paintModeHandler();
    paintmode = 'brush';
};

function fillBtnHandler() {
    paintModeHandler();
    paintmode = 'fill';
};

if(canvas) {
    canvas.addEventListener("mousemove", mousemoveHandler);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}
if(brushSize) {
    brushSize.addEventListener("input", brushSizeHandler);
}
if(brushColor) {
    brushColor.forEach(btns => btns.addEventListener('click', brushColorHandler));
}
if(brushBtn) {
    brushBtn.addEventListener('click', brushBtnHandler);
}
if(fillBtn) {
    fillBtn.addEventListener('click', fillBtnHandler);
}
//3. paint/brush버튼 누를때마다 fill, brush모드로 바꿔주기.
//4. save하면 이미지 저장되도록 하기.d