import "../style.css";
import { sketch } from "p5js-wrapper";

let strokeWeightslider;
let colorslider;
let button;
let buffer;
var strokeColor;

sketch.setup = function () {
  buffer = createGraphics(3200, 3200);
  createCanvas(720, 720);
  buffer.colorMode(HSB, 360, 100, 100, 100);
  buffer.noFill();

  button = createButton("update");
  button.position(100, 55);
  button.size(50, 20);
  button.style("font-size", "11px");
  button.mousePressed(changecolor1);

  colorslider = createSlider(0, 200, 100);
  colorslider.position(10, 30);
  colorslider.style("width", "80px");

  strokeColor = color(70, 10, 100, 10);

  strokeWeightslider = createSlider(5, 35, 100);
  strokeWeightslider.position(10, 10);
  strokeWeightslider.style("width", "80px");
};

sketch.draw = function () {
  background(10);

  buffer.textSize(70);
  buffer.text("stroke weight", 450, 110);
  buffer.fill(70, 10, 100, 10);
  buffer.text("new color", 450, 200);
  buffer.fill(70, 10, 100, 10);

  let val2 = strokeWeightslider.value();
  buffer.strokeWeight(val2);
  if (mouseIsPressed && mouseButton == LEFT) {
    buffer.push();
    buffer.translate(buffer.width / 2, buffer.height / 2);

    var circleResolution = int(map(5 * mouseY + 100, 0, buffer.height, 2, 10));
    var radius = 5 * mouseX - buffer.width / 2;
    var angle = TAU / circleResolution;

    buffer.stroke(strokeColor);
    buffer.noFill();
    buffer.beginShape();
    for (var i = 0; i <= circleResolution; i++) {
      var x = cos(angle * i) * radius;
      var y = sin(angle * i) * radius;
      buffer.vertex(x, y);
    }

    buffer.endShape();
    buffer.pop();
  }

  image(buffer, 0, 0, width, height);
};

sketch.keyPressed = function () {
  if (keyCode == DELETE || keyCode == BACKSPACE) background(0, 0, 100);
  if (key == "a" || key == "A") buffer.save(gd.timestamp(), "png");
  let val = colorslider.value();
  if (key == "1") strokeColor = color(val, val, val, 10);
  if (key == "2") strokeColor = color(random(150, 200), random(20, 50), 70, 17);
  if (key == "3") strokeColor = color(10, 50, random(170, 200), 13);
  if (key == "4") strokeColor = color(70, 10, 100, 10);
  if (key == "s") buffer.save();
};

sketch.changecolor1 = function () {
  let val = colorslider.value();
  strokeColor = color(val, random(0, 150), val, random(6, 17));
};
