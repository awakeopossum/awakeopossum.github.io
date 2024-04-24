//perlin.js
var perlinSketch = function(p) {
  p.perlinCanvasDivName = 'perlinCanvasDiv'
  p.perlinCanvasDiv = document.getElementById(p.perlinCanvasDivName);
  p.w = p.perlinCanvasDiv.offsetWidth;
  
  p.bg = getBackgroundColor(), p.fg = '#F1F1F1';
  p.deviation = 10;
  p.pointsCount = 25;
  p.res = 0.02;
  
  p.points = [];
  p.o, p.r;

  p.setup = function() {
    let c = p.createCanvas(p.w, p.w, p.P2D); // windowWidth, windowHeight
    c.parent(p.perlinCanvasDivName);
    c.mouseClicked(p.redrawFromStart);
    p.background(p.bg);

    let space = p.width / p.pointsCount;
    //circle of center o and radius r
    p.o = p.createVector(p.width / 2, p.height / 2);
    p.r = p.width * 2 / 5;
    p.angleMode(p.DEGREES);
    p.noiseDetail(1);

    for (var x = 0; x < p.width; x += space) {
      for (var y = 0; y < p.height; y += space) {
        var k = p.createVector(x + p.random(-p.deviation, p.deviation), y + p.random(-p.deviation, p.deviation));
        p.points.push(k);
      }
    }
  }

  p.redrawFromStart = function() {
    p.points = [];
    p.randomSeed(p.millis());
    p.noiseSeed(p.millis());
    p.setup();
  }

  p.draw = function() {
    p.noStroke();
    for (var i in p.points) {
      var pt = p.points[i];
      var angle = p.map(p.noise(pt.x * p.res, pt.y * p.res), 0, 1, 0, 720);
      var cl = [
        p.map(pt.x, 0, p.width, 50, 255) + 40,
        p.map(pt.y, 0, p.height, 50, 255),
        255 - p.map(pt.x, 0, p.width, 50, 255),
      ];
      p.fill(cl);
      pt.add(p.createVector(p.cos(angle), p.sin(angle)));
      if (p.dist(p.o.x, p.o.y, pt.x, pt.y) < p.r) {
        p.ellipse(pt.x, pt.y, 1);
      }
    }
  }

  p.windowResized = function () {
    console.log('PERLIN SAYS RESIZED!');
    p.w = p.perlinCanvasDiv.offsetWidth;
    p.resizeCanvas(p.w, p.w);
    p.redrawFromStart();
  }
}

var p5perlin = new p5(perlinSketch);
