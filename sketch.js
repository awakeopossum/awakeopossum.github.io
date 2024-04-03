const perlinCanvasDivName = 'perlinCanvasDiv';
const bg = '#1e1e1e', fg = '#f1f1f1';
const nr = 40;

const res = 0.02;
let points = [];

//circle: centered on point O(h, k), has radius r
let o, r;

let isDrawing = true;

function setup() {
  let c = createCanvas(300, 300, P2D); // windowWidth, windowHeight
  c.parent(perlinCanvasDivName);
  c.mouseClicked(redrawFromStart);
  background(bg);
  
  let space = width / nr;
  o = createVector((width / 2), (height / 2));
  r = windowWidth * 2 / 5;
  angleMode(DEGREES);
  noiseDetail(1);
  
  for (var x = 0; x < width; x += space) {
    for (var y = 0; y < height; y += space) {
      var p = createVector(x + random(-10, 10), y + random(-10, 10));
      points.push(p);
    }
  }
}

function redrawFromStart() {
  points = [];
  randomSeed(millis());
  noiseSeed(millis());
  setup();
}

function draw() {
  noStroke();
  
  for (var p in points) {
    // https://p5js.org/reference/#/p5/map
    var angle = map(noise(points[p].x * res, points[p].y * res),
                    0, 1, 0, 720);
    var cl = [
      map(points[p].x, 0, width, 50, 255) + 40,
      map(points[p].y, 0, height, 50, 255),
      255 - map(points[p].x, 0, width, 50, 255),
    ];
    fill(cl);
    points[p].add(createVector(cos(angle), sin(angle)));
    if (dist(o.x, o.y, points[p].x, points[p].y) < r) {
      ellipse(points[p].x, points[p].y, 1);
    }
  }
}
