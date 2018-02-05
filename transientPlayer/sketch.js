

var gun;
var mx = 0;
var my = 0;
var mz = 0;
var ease = 0.08;
var mx2 = 0;
var my2 = 0;
var ease2 = 0.01;
var newX = 0, newY = 0; newZ = 0;

var mlight = 0;
var delay;
var sample = [];
var keycodelist = [8, 9, 13, 16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 109, 110, 111, 186, 187, 188, 189, 190, 191, 192, 219, 220, 221, 222];
// var sampledict {};
var dict = [];


function preload(){
  delay = new p5.Delay();
  var index = 0;
  //this.code[];
  for (var i = 0; i < 223; i ++){
    if (i = keycodelist[index]) {
      dict[i] = new dicky(index);
      index++;
      //print(dict[i].getIndex());
    }
    else{
      dict[i] = new dicky(0);
    }
  }
  for (var i = 0; i < 81; i++) {
    sample[i] = loadSound("assets/" + keycodelist[i] + ".wav")
  }
}
function setup(){
  createCanvas(windowWidth, windowHeight, WEBGL);
  //dict = new dicky();
  
  gun = loadModel('assets/WallFuseBox.obj', true);
  
}

// function samp(theName) {
//   this.sample = loadSound("assets/" + keycodelist[theName] + ".wav");
//   print("assets/" + keycodelist[theName] + ".wav");
// }
// samp.prototype.play = function (){
//   this.sample.play();
// }

function dicky(index) {
  if (index > 0){
    this.code = index;
  }
  else{
    this.code = 8;
  }
}
dicky.prototype.getIndex = function() {
  return this.code;
}

function draw(){
  background(249 - mlight,248 - mlight,250 - mlight);
  //translate(0,0,500+((frameCount*0.1)%300));
  translate((mx-width/2),(my-height/2),height*0.71 - (mz/1));
  mx += (newX - mx) * ease;
  my += (newY - my) * ease;
  mz += (newZ - mz) * ease;
  mx2 += (newX - mx2) * ease2;
  my2 += (newY - my2) * ease2;
  
  rotateX(mx * 0.01);
  rotateY(mx * 0.01);
  rotateZ(my * 0.01);

  
 
  rotateZ(frameCount * 0.001);
  rotateY(frameCount * 0.001);

  //pointLight(map(mx,0,width, 0, 255), map(my,0,height, 0, 255), 250, 50);
  
  //pointLight(mlight, mlight, mlight, mx2, my2, mx2);
  
  
  //fill(255,50);
  //stroke(0);
  
  //pointLight(255, 255, 255, 255, 255, 255);
  directionalLight(2+mlight, 2+mlight, 4+mlight, mx2, my2, mx2)
  specularMaterial(1);
  
  //normalMaterial();
  //model(gun);

  if (mlight > 0){
    mlight-=3;
  }
  
  for (var i = 0; i < 53; i++){
    rotateX(mx * (1/float(i+1)/100));
    rotateY(my * (1/float(i+1)/100));
    rotateZ(mz * (1/float(i+1)/100));
    // rotateX((1/float(i+1)/1000));
    // rotateY((1/float(i+1)/1000));
    // rotateZ((1/float(i+1)/1000));
    
    model(gun);
     scale(1.01 + (my/height*.7)*0.1);
    //scale(1.02)
    
  }
  
}

function mousePressed(){
  mlight = 0;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  mlight = 255;
  mx = random(width);
  my = random(height);
  mz = random(width);
  newX = noise((map(keyCode, 60, 100, 0, 200)))*width;
  newY = noise((map(keyCode, 60, 100, 0, 200)))*height;
  newZ = noise((map(keyCode, 70, 110, -100, 100)))*height - map(keyCode, 70, 110, -100, 100);
  // use keyCode as filename for samples
  //var samplename = "assets/" + keyCode + ".wav";
  //sample = loadSound(samplename);
  //print(keyCode);
  sample[dict[int(keyCode)].getIndex()].play();
  sample[dict[int(keyCode)].getIndex()].amp(4);
  
  var delTime = (mx/width) * 0.1 + 0.001 ;
  delTime = constrain(delTime, .001, .2);
  delay.process(sample[dict[int(keyCode)].getIndex()], delTime, .96, (my/height)*20000);
  delay.amp(0.2);
}