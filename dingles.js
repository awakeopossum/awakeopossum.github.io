//dingles.js
function dinglesSketch(p) {

  //technical: disable FES to improve performance
  p.disableFriendlyErrors = true;

  p.dingleCanvasDivName = 'dinglesCanvasDiv';
  p.dingleCanvasDiv = document.getElementById(p.dingleCanvasDivName);
  p.w = p.dingleCanvasDiv.offsetWidth;
  p.lineFactor = p.w / 500;
  p.bg = getBackgroundColor(), p.fg = '#ED581F';
  
  p.speedScale = 0.15;
  p.pendulumRadius = 3;
  p.pendulumCount = 35;
  p.pendulums = [];
  
  p.setup = function() {
    //create pendulums
    for (var c = 0; c < p.pendulumCount; c++) {
      p.pendulums[c] = new Pendulum(c);
    }
    //skip some time
    for (var c = 0; c < 360; c++) {
      for (var pd of p.pendulums) {
        pd.update()
      }
    }
    let cv = p.createCanvas(p.w, p.w, p.P2D); // windowWidth, windowHeight
    cv.parent(p.dingleCanvasDivName);
    //cv.mouseClicked(redrawFromStart);
    p.background(p.bg);
    p.stroke(p.fg);
  }
  
  p.draw = function() {
    //center
    p.translate(p.width / 2, p.height / 2);
    p.background(p.bg);
    p.fill(p.bg);
    p.ellipse(0, 0, p.pendulumRadius);
    for (var pd of p.pendulums){
      pd.display();
      pd.update();
    }
  }

  class Pendulum {
    constructor(n) {
      this.angle = 0;
      this.angleSpeed = 0.01 + n * 0.004;
      this.radius = 30 + n * 6; 
    }
    update() {
      this.angle += this.angleSpeed * p.speedScale;
    }
    display(){
      let x = this.radius * p.cos(this.angle) * p.lineFactor;
      let y = this.radius * p.sin(this.angle) * p.lineFactor;
      p.line(0, 0, x, y);
      p.circle(x, y, p.pendulumRadius);
    }
  }
}

var p5dingles = new p5(dinglesSketch);
