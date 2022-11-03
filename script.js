let fft

let Particle = function(position){
  this.position = position
  this.speed = createVector(0, 1)
  this.color = [random(0, 255), random(0, 255), random(0, 255)]

  this.draw = function(){
    square(this.position.x, this.position.y, this.diameter)
    fill(this.color)
  }
  this.update = function(energy){
    this.diameter = random(5,7) + energy * 31
    this.position.y += this.speed.y * energy * 31

    if(this.position.y > width){
      this.position.y = this.position.x
    }
  }
}

function setup(){
  createCanvas(windowWidth, windowHeight)
  noStroke()

  let mic = new p5.AudioIn()
  mic.start()

  fft = new p5.FFT()
  fft.setInput(mic)

  positionParticles()
}

function draw(){
  background(200, 75, 150)
  let spectrum = fft.analyze()
  updateParticles(spectrum)
}