let x = 0;
let y = 0;
let N = 30;
let spacing = 0;
function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('sketch');
  background(0, 255, 255);
  spacing = windowHeight / N;
}

function draw() {
  for(var i = 0; i < 20; i++) {
  strokeWeight(3);
  stroke(255);
    if (random(1) < 0.5) {
      line(x, y, x + spacing, y + spacing);
    } else {
      line(x, y + spacing, x + spacing, y);
    }
  x = x+ spacing;

  if(x> width) {
    x = 0;
    y = y + spacing;
  }
}
}