const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const settings = {
  shape: "",
  primaryColor: "",
  secondaryColor: "",
  horizontalOffset: 0,
  verticalOffset: 0
}

const shapeSelector = document.querySelector('#shape');

shapeSelector.addEventListener('change', ()=> {
  settings.shape = shapeSelector.value;
})

const primaryColorSelector = document.querySelector("#primary-color");

primaryColorSelector.addEventListener('change', ()=> {
  settings.primaryColor = primaryColorSelector.value;
})

const secondaryColorSelector = document.querySelector("#secondary-color");

secondaryColorSelector.addEventListener('change', ()=> {
  settings.secondaryColor = secondaryColorSelector.value;
})

const horizontalOffsetInput = document.querySelector("#horizontal-offset");

horizontalOffsetInput.addEventListener('change', () => {
  settings.horizontalOffset = Number(horizontalOffsetInput.value);
})

const verticalOffsetInput = document.querySelector("#vertical-offset");

verticalOffsetInput.addEventListener('change', () => {
  settings.verticalOffset = Number(verticalOffsetInput.value);
})

const drawSquare = (x,y) => {

  ctx.fillStyle = settings.primaryColor;
  ctx.fillRect(x - 10, y - 10, 20, 20);

  ctx.fillStyle = settings.secondaryColor;
  ctx.fillRect(x - 10 + settings.horizontalOffset, y - 10 + settings.verticalOffset, 20 , 20);

}

const drawCircle = (x, y) => {

  ctx.beginPath();
  ctx.arc(x, y, 10, 0, 2*Math.PI);
  ctx.fillStyle = settings.primaryColor;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(x + settings.horizontalOffset, y + settings.verticalOffset, 10, 0, 2*Math.PI);
  ctx.fillStyle = settings.secondaryColor;
  ctx.fill();

}

const drawSingleTriangle = (x,y) => {

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + 30, y);
  ctx.lineTo(x + 30, y + 30);
  ctx.fill();

}

const drawBothTriangles = (x, y) => {

  ctx.fillStyle = settings.primaryColor;
  drawSingleTriangle(x, y);

  ctx.fillStyle = settings.secondaryColor;
  drawSingleTriangle(x + settings.horizontalOffset, y + settings.verticalOffset);

}


canvas.addEventListener('click', (e) => {

  const rect = canvas.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  if (!settings.shape) {
    alert("Set shape first.");
    return;
  } else if(!settings.primaryColor) {
    alert("Set primary color first.");
    return;
  } else if(!settings.secondaryColor) {
    alert("Set secondary color first.");
    return;
  }

  if(settings.shape === "triangle") {
    drawBothTriangles(x, y);
  } else if(settings.shape === "circle") {
    drawCircle(x, y);
  } else if(settings.shape === "square") {
    drawSquare(x, y);
  }
})

const button = document.querySelector("button");

button.addEventListener('click', (e) => {
  ctx.clearRect(0, 0, 400, 400);
})
