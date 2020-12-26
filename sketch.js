//todo:
//dynamic buttons
//more sorts
//layout

//logic variables
let arr = [];
const n = 50;
let is_sorted = false;
let sort_running = false;

//interaction elements
let btn_sort;
let btn_shuffle;
let sel;

const colors = {
  "blue": [0, 137, 230],
  "darkblue": [32, 89, 232],
  "pink": [247, 45, 217],
  "black": [0, 0, 0],
  "white": [255, 255, 255]
};

async function setup() {
  let h = windowHeight/2;
  if (h < 500 ) h = 500;
  createCanvas(windowWidth, h);
  btn_sort = createButton('sort');
  btn_sort.position(50, 50);
  btn_sort.mousePressed(sortArray);

  btn_shuffle = createButton('shuffle');
  btn_shuffle.position(150, 50);
  btn_shuffle.mousePressed(shuffleArray);

  for (btn of [btn_shuffle, btn_sort]) {
    btn.style('background-color', '#0089e6');
    btn.style('border', 'none');
    btn.style('color', 'white');
    btn.style('text-align', 'center');
    btn.style('font-size', '16px');
    btn.style('padding', '15px 32px');
    
  }

  sel = createSelect();
  sel.position(330, 50);
  sel.option('Bubblesort');
  sel.option('Quicksort');
  sel.option('Selectionsort');
  sel.selected('Bubblesort');

  shuffleArray();
}


function draw() {
  background(colors.white);
  drawArray();
  if (is_sorted) {
    fill(colors.blue);
    textSize(50);
    text('sorted!', 50, 250);
  }
}




function drawArray() {
  let width = windowWidth/n;
  fill(colors.blue);
  stroke(colors.white);
  
  for(let i = 1; i < arr.length - 1; i++) {
    fill(arr[i].color)
    rect(width * i, 300, width, arr[i].val*5, 2);
  }
}


function shuffleArray() {
  is_sorted = false;
  sort_running = false;
  arr = [];
  for(let i = 0; i < n; i++) {
    arr.push({
      "val": Math.floor(Math.random()*30), 
      "color": colors.blue}
      );
  }
}

function sortArray() {
  if (sort_running || is_sorted) return;
  sort_running = true;
  switch (sel.value()) {
    case "Bubblesort":
      print("bubble");
      bubblesort();
      break;
    case "Quicksort":
      break;
    case "Selectionsort":
      break;
  }
}

async function bubblesort() {
  let run = true;
  for(let i = 0; i < arr.length && run; i++) {
    run = false;
    for(let y = 0; y < arr.length-1; y++) {
      if (!sort_running) return;
      arr[y].color = colors.pink;
      arr[y+1].color = colors.pink;
      await sleep(5);
      if (arr[y].val > arr[y+1].val) {
        run = true;
        swap(y, y+1);
      }
      await sleep(5);
      arr[y].color = colors.blue;
      arr[y+1].color = colors.blue;
    }
  }
  is_sorted = true;
}

function swap(a, b) {
  let tmp = arr[a];
  arr[a]  = arr[b];
  arr[b] = tmp;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function windowResized() { 
  let h = windowHeight/2;
  if (h < 500 ) h = 500;
  resizeCanvas(windowWidth, h); 
} 