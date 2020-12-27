//todo:
//dynamic buttons
//more sorts
//layout

//logic variables
let arr = [];
let arr_color = [];
let arr_sorted = [];

const n = 50;
let sort_running = false;

//interaction elements
let btn_sort;
let btn_shuffle;
let sel;

const MIN_WIDTH = 600;
const MIN_HEIGHT = 500;
let w;
let h;

const colors = {
  "blue": [0, 137, 230],
  "darkblue": [32, 89, 232],
  "pink": [247, 45, 217],
  "darkpink": [219, 35, 192],
  "black": [0, 0, 0],
  "white": [255, 255, 255]
};

async function setup() {
  h = windowHeight/2;
  if (h < MIN_HEIGHT ) h = MIN_HEIGHT;
  w = windowWidth;
  if (w < MIN_WIDTH) w = MIN_WIDTH;
  createCanvas(w, h);
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
  sel.selected('Quicksort');

  shuffleArray();
}

function draw() {
  background(colors.white);
  drawArray();
  if (is_sorted()) {
    fill(colors.blue);
    textSize(50);
    text('sorted!', 50, 250);
  }
}

function windowResized() { 
  h = windowHeight/2;
  if (h < MIN_HEIGHT ) h = MIN_HEIGHT;
  w = windowWidth;
  if (w < MIN_WIDTH) w = MIN_WIDTH;
  resizeCanvas(w, h); 
} 

function drawArray() {
  let width = w/n;
  //fill(colors.blue);
  stroke(colors.white);
  
  for(let i = 1; i < arr.length - 1; i++) {
    if (arr_sorted[i] === arr[i] && sort_running && arr_color[i] == colors.blue) fill(colors.darkblue);
    else fill(arr_color[i]);
    rect(width * i, 150, width, arr[i]*5, 2);
  }
  

}

function shuffleArray() {
  sort_running = false;
  arr = [];
  arr_color = [];
  for(let i = 0; i < n; i++) {
    arr.push(1+Math.floor(Math.random()*30));
    arr_color.push(colors.blue);
  }
  arr_sorted = Array.from(arr).sort((x, y) => x-y);
}

function is_sorted() {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] != arr_sorted[i]) return false;
  }
  return true;

}
async function sortArray() {
  if (sort_running || is_sorted()) return;
  sort_running = true;
  switch (sel.value()) {
    case "Bubblesort":
      bubblesort();
      break;
    case "Quicksort":
      await quicksort(0,(arr.length - 1));
      break;
    case "Selectionsort":
      break;
  }
}

async function swap(a, b) {
  let tmp = arr[a];
  arr[a]  = arr[b];
  arr[b] = tmp;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubblesort() {
  let run = true;
  for(let i = 0; i < arr.length && run; i++) {
    run = false;
    for(let y = 0; y < arr.length-1; y++) {
      if (!sort_running) return;
      arr_color[y] = colors.pink;
      arr_color[y+1] = colors.pink;
      await sleep(5);
      if (arr[y] > arr[y+1]) {
        run = true;
        await swap(y, y+1);
        await sleep(10);
      }
      arr_color[y] = colors.blue;
      arr_color[y+1] = colors.blue;
    }
  }
}

async function quicksort(low, high) {
  if (low < high && sort_running) {
    let partition_index = await partition(low, high);

    await Promise.all([
      quicksort(low, partition_index - 1),
      quicksort(partition_index + 1, high)
    ]);
  }
}

async function partition(low, high) {
  
  let pivot = arr[high];
  let color = await randomColor();
  for(let i = low + 1; i < high; i++) {
    arr_color[i] = colors.pink;
  }
  if (low === high) arr_color[low] = colors.darkpink;
  await sleep(500);
  let i = (low - 1);

  for(let j = low; j <= high - 1; j++) {
    if (!sort_running) return 0;
    if (arr[j] < pivot) {
      i++;
      await swap(i, j);
      await sleep(100);
    }


  }
  await swap(i + 1, high);
  for(let i = low + 1; i < high; i++) {
    arr_color[i] = colors.blue;
  }
  await sleep(50);
  return (i+1);
}
function randomColor() {
  return [random(0, 255), random(0, 255), random(0, 255)];
}
