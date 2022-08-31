var blob;
var enemy;
var enemy1;
var enemy2;
var enemy3;
var enemy4;
var blobs = [];
var zoom = 1;


function setup() {
  createCanvas(windowWidth, windowHeight);
  blob = new Blob(0, 0, 16);
  enemy = new Blob(random(width), random(height), 16)
  enemy1 = new Blob(random(width), random(height), 16)
  enemy2 = new Blob(random(width), random(height), 16)
  enemy3 = new Blob(random(width), random(height), 16)
  enemy4 = new Blob(random(width), random(height), 16)
  for (var i = 0; i < 500; i++) {
    var x = random(-width,width);
    var y = random(-height, height);
    blobs[i] = new Blob(x, y, 16);
  }
}

function draw() {
  background(100);
  //smoother eating transitions
  translate(width/2, height/2);
  var newzoom = 64 / blob.r;
  zoom = lerp(zoom, newzoom, 0.1);
  scale(zoom);
  translate(-blob.pos.x, -blob.pos.y);
 // using the eating function below, this section covers how the smaller ellipse is removed. we created an empty array at the start called blobs, which is filled with the generated blobs upon start. Once the eating function returns a true value, the blob is "spliced" / removed from the array.
 for (var i = blobs.length - 1; i >= 0; i--) {
    blobs[i].show();
    if (blob.eats(blobs[i])) {
      blobs.splice(i, 1);
    }
    if (enemy.eats(blobs[i])) {
      blobs.splice(i, 1);
    }
    if (enemy1.eats(blobs[i])) {
      blobs.splice(i, 1);
    }
    if (enemy2.eats(blobs[i])) {
      blobs.splice(i, 1);
    }
    if (enemy3.eats(blobs[i])) {
      blobs.splice(i, 1);
    }
    if (enemy4.eats(blobs[i])) {
      blobs.splice(i, 1);
    } 
    if(blob.eats(enemy)) {
      enemy.splice();
  }

  }







  blob.show();
  blob.update();
  enemy.show();
  enemy.move();
  enemy1.show();
  enemy1.move();
  enemy2.show();
  enemy2.move();
  enemy3.show();
  enemy3.move();
  enemy4.show();
  enemy4.move();


}
//creates both character blob, and smaller blobs
function Blob(x, y, r) {
  this.pos = createVector(x, y);
  this.r = r;
  this.vel = createVector(0,0);
  this.xspeed=2;
  this.yspeed=2;
  this.xdirection=random(2);
  this.ydirection=random(2);

  this.update = function() {
    var newvel = createVector(mouseX-width/2, mouseY-height/2);
    mag = 3
    if(mouseIsPressed) {
      mag = mag + 10
      this.r = this.r*0.975
    }
    newvel.setMag(mag);
    this.vel.lerp(newvel, 0.1)
    this.pos.add(this.vel);
    }
  
  this.eats = function(other) {
    //This is the Eating function, where if the distance between the player and the ellipse is smaller than the two radii added together, they are touching 
    var d = p5.Vector.dist(this.pos, other.pos);
    if (d < this.r + other.r){
      var sum = PI * this.r * this.r + PI * other.r * other.r
      this.r = sqrt(sum / PI);
      //this.r += other.r
      return true;
    } else{
      return false;
    }
  }
  
  this.move = function() {
    this.pos.x+=this.xspeed*this.xdirection
    this.pos.y+=this.yspeed*this.ydirection
    if(this.pos.x>1920||this.pos.x<-1920){       
      this.xdirection=-this.xdirection;
    }
    if(this.pos.y>1080||this.pos.y<-1080){
      this.ydirection=-this.ydirection;
    }
  }
  

  this.show = function() {
    fill(255);
    ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2)
  }

}  






class AI{
 constructor(tempx,tempy){
   this.x=tempx;
   this.y=tempy;
   this.r=30;
   this.xspeed=2;
   this.yspeed=2;
   this.xdirection=random(2);
   this.ydirection=random(2);
 }
  display(){
    noStroke();
  ellipse(this.x,this.y,this.r);
  }
  move(){
  this.x+=this.xspeed*this.xdirection
  this.y+=this.yspeed*this.ydirection
  if(this.x>1920||this.x<-1920){       
      this.xdirection=-this.xdirection;
    }
    if(this.y>1080||this.y<-1080){
      this.ydirection=-this.ydirection;
    }
  }
  consume(Blob){
    var g = p5.Vector.dist(this.pos, Blob.pos);
    if (g < this.r + Blob.r){
      var eq = PI * this.r * this.r + PI * Blob.r * Blob.r
      this.r = sqrt(eq / PI);
      return true;
    } else{
      return false;
    }
  } 
}




