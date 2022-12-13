/* eslint-disable no-undef, no-unused-vars */
let wetMix,
  distortion,
  roomSlider,
  pitch,
  vol,
  button1,
  button2,
  button3,
  button4,
  button5,
  button6,
  button7;

const delay = new Tone.FeedbackDelay(0.5, 0.5).toDestination();
const distort = new Tone.Distortion(1.0).connect(delay);
const shifter = new Tone.PitchShift(2).connect(distort);
const reverb = new Tone.JCReverb({ roomSize: 0.8, wet: 1.0 }).connect(shifter);
const volume = new Tone.Volume(-12).connect(reverb);

const multiplayer = new Tone.Players({
  drums: "Christmas/drums.wav",
  flute: "Christmas/flute.wav",
  piano: "Christmas/piano.wav",
  bells: "Christmas/srBells.wav",
  trumpet: "Christmas/trumpetsolo.wav",
  grinch: "Christmas/thegrinch.wav"
}).connect(volume);

multiplayer.player("drums")._loop = true;
multiplayer.player("flute")._loop = true;
multiplayer.player("piano")._loop = true;
multiplayer.player("bells")._loop = true;
multiplayer.player("trumpet")._loop = true;
multiplayer.player("grinch")._loop = true;

function setup() {
  createCanvas(windowWidth, windowHeight);

  wetMix = createSlider(0, 1, 0, 0);
  wetMix.style("width", "200px");
  wetMix.position(width / 5 + 300, height / 15 + 60);

  distortion = createSlider(0, 1, 0, 0);
  distortion.style("width", "200px");
  distortion.position(width / 5 + 300, height / 15 + 120);

  pitch = createSlider(-12, 12, 0, 1);
  pitch.style("width", "200px");
  pitch.position(width / 5 + 300, height / 15 + 180);

  roomSlider = createSlider(0, 1, 0, 0);
  roomSlider.style("width", "200px");
  roomSlider.position(width / 5 + 300, height / 15 + 240);

  vol = createSlider(0, 1, 0.3, 0);
  vol.style("width", "200px");
  vol.position(width / 5 + 300, height / 15 + 300);

  button1 = createButton("Drums");
  button1.position(width / 20, height / 15);
  button1.mousePressed(play1);

  button2 = createButton("Flute");
  button2.position(width / 20, height / 15 + 30);
  button2.mousePressed(play2);

  button3 = createButton("Piano");
  button3.position(width / 20, height / 15 + 60);
  button3.mousePressed(play3);

  button4 = createButton("Bells");
  button4.position(width / 20, height / 15 + 90);
  button4.mousePressed(play4);

  button5 = createButton("Trumpet");
  button5.position(width / 20, height / 15 + 120);
  button5.mousePressed(play5);

  button6 = createButton("The Grinch");
  button6.position(width / 20, height / 15 + 150);
  button6.mousePressed(play6);

  button7 = createButton("Stop All");
  button7.position(width / 20, height / 15 + 180);
  button7.mousePressed(cease);
}

function draw() {
  delay.wet.value = wetMix.value();
  background("green");
  textSize(16);
  fill("black");
  textAlign(CENTER);
  text("Delay", width / 5 + 400, height / 15 + 40);

  textSize(10);
  fill("blue");
  textAlign(CENTER);
  text(
    int(wetMix.value() * 100) + "% effected sound",
    width / 5 + 400,
    height / 15 + 55
  );
  delay.wet.value = wetMix.value();
  distort.distortion = distortion.value();
  shifter.pitch = pitch.value();
  reverb.roomSize.value = roomSlider.value();
  volume.vol = vol.value();

  textSize(10);
  fill("blue");
  textAlign(CENTER);
  text("Shift in Half Steps", width / 5 + 400, height / 15 + 115);

  textSize(16);
  fill("black");
  textAlign(CENTER);
  text("Pitch", width / 5 + 400, height / 15 + 100);

  textSize(16);
  fill("black");
  textAlign(CENTER);
  text("Distortion", width / 5 + 400, height / 15 + 160);

  textSize(10);
  fill("blue");
  textAlign(CENTER);
  text("Amount of Distortion", width / 5 + 400, height / 15 + 175);

  textSize(16);
  fill("black");
  textAlign(CENTER);
  text("Reverb", width / 5 + 400, height / 15 + 220);

  textSize(10);
  fill("blue");
  textAlign(CENTER);
  text("Room Size", width / 5 + 400, height / 15 + 235);

  textSize(16);
  fill("black");
  textAlign(CENTER);
  text("Volume", width / 5 + 400, height / 15 + 280);

  textSize(10);
  fill("blue");
  textAlign(CENTER);
  text(int(vol.value() * 100) + "% volume", width / 5 + 400, height / 15 + 295);

  textSize(30);
  fill("red");
  textAlign(CENTER);
  text("Christmas Sound Board!", width / 5 + 100, height / 15 + 255);
}
function play1() {
  multiplayer.player("drums").start();
}
function play2() {
  multiplayer.player("flute").start();
}
function play3() {
  multiplayer.player("piano").start();
}
function play4() {
  multiplayer.player("bells").start();
}
function play5() {
  multiplayer.player("trumpet").start();
}
function play6() {
  multiplayer.player("grinch").start();
}
function cease() {
  multiplayer.stopAll();
}
