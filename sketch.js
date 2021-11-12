'use strict';

var sketch = function(p) {

  var pointCount = 500;
  var freqX = 1;
  var freqY = 4;
  var phi = 60;
  var pos = 0

  var modFreqX = 2;
  var modFreqY = 1;
  var modulationPhi = 0;

  var angle;
  var x;
  var y;
  var w;
  var maxDist;
  var oldX;
  var oldY;

  var drawMode = 2;
  
  
  p.setup = function() {
    p.createCanvas(101,101);
    p.cursor(p.HAND);
    maxDist = p.sqrt(p.sq(p.width / 2 - 50) + p.sq(p.height / 2 - 50));
    freqX = 1
    freqY = 3
    phi = 765
    modFreqX = 2
    modFreqY = 3 
  };

  p.draw = function() {
    
    if(p.frameCount<180){
      phi = 765 + (p.frameCount)
    }
    else if(p.frameCount>180 && p.frameCount<360){
      phi = 765
    }
    else{
      if((p.frameCount%(720)) < 360){
        phi = 765
      } else {
        phi = 765 + (p.frameCount%720-360)
      }
    }
    
    p.clear();
    p.translate(p.width / 2, p.height / 2);
    p.scale(70);

    pointCount = 500;

    if (drawMode == 1) {
      p.stroke(0);
      p.strokeWeight(1);

      p.beginShape();
      for (let i = 0; i <= pointCount; i++) {
        angle = p.map(i, 0, pointCount, 0, p.TAU);
        x = p.sin(angle * freqX + p.radians(phi)) * p.cos(angle * modFreqX);
        y = p.sin(angle * freqY) * p.cos(angle * modFreqY);
        x *= p.width / 2 - 50;
        y *= p.height / 2 - 50;
        p.vertex(x,y);
      }
      p.endShape();
    } else if (drawMode == 2) {
      p.strokeWeight(0.05);

      for (let i = 0; i <= pointCount; i++) {
        angle = p.map(i, 0, pointCount, 0, p.TAU);
        x = p.sin(angle * freqX + p.radians(phi)) * p.cos(angle * modFreqX);
        y = p.sin(angle * freqY) * p.cos(angle * modFreqY);
        x *= p.width / 2 - 50;
        y *= p.height / 2 - 50;

        if (i > 0) {
          w = p.dist(x,y,0,0);
          p.stroke(i % 2 * 2, p.map(w, 0, maxDist, 255, 0));
          p.line(oldX,oldY,x,y);
        }

        oldX = x;
        oldY = y;
      }
    }
  };

//   p.mouseWheel = function(event) {
//     phi += event.delta/10;
// } 
  
  p.keyPressed = function() {

    if (p.keyCode == p.LEFT_ARROW) phi -= 15;
    if (p.keyCode == p.RIGHT_ARROW) phi += 15;

  };

};

var myp5 = new p5(sketch, 'logo');

