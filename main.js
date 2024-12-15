const canvas = document.querySelector('#canvas');
const upload = document.querySelector('#upload');
const worker = new Worker('worker.js');

ctx = canvas.getContext('2d');

upload.addEventListener('change', function(event) {
  const file = event.target.files[0];
  if(!file) return;

  const img = new Image();
  img.src = URL.createObjectURL(file);

  img.onload = function() {
    const canvasWidth = 500
    const canvasHeight = 500;
    
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const ratio = Math.min(canvasWidth / img.width, canvasHeight / img.height);
    const newWidth = img.width * ratio;
    const newHeight = img.height * ratio;

    const xOffset = (canvasWidth - newWidth) / 2;
    const yOffset = (canvasHeight - newHeight) / 2;

    ctx.drawImage(img, xOffset, yOffset, newWidth, newHeight);
  }
})

const grayscale = document.querySelector('#grayscale').addEventListener('click', () => { apllyFilter('grayscale')})
const sepia = document.querySelector('#sepia').addEventListener('click', () => { apllyFilter('sepia')})
const brightness = document.querySelector('#brightness').addEventListener('click', () => { apllyFilter('brightness')})

function apllyFilter(filter) {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  worker.postMessage({ filter,imageData });
};

worker.onmessage = function(message) {
  const { imageData } = message.data;
  ctx.putImageData(imageData, 0, 0);
};