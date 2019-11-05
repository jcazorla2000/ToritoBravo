const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
let health = document.getElementById("health")
let interval;
let frames = 0;
let meatArray = []
let rockArray = []

class Board {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = canvas.width
        this.height = canvas.height
        this.img = new Image()
        this.img.src = "./images/background2.jpg"
        this.img.onload = () => this.draw
    }
    draw() {
        if (frames < 1600) this.x-= 2.5
        if (this.x == -canvas.width) this.x = 0
        ctx.drawImage(this.img, this.x, 0, this.width, this.height)
        ctx.drawImage(this.img, this.x + canvas.width, 0, this.width, this.height)
    }
}

class Bull {
  constructor() {
    this.x = 0;
    this.y = 380;
    this.width = 260;
    this.height = 130;
    this.img = new Image()
    this.img.src = "./images/bull-left.png"
    this.animate = 0
    this.chargeVar = false
    this.pos = 1
  }
  draw() {
    if (this.animate === 3 && frames % 12 == 0) {
      this.animate = 1;
      ctx.drawImage(this.img,149* this.animate, 100, 600 / 4, 600 / 4, this.x, this.y, this.width - 50, this.height + 10)
    } else if (frames % 12 == 0){
      ctx.drawImage(this.img, 149* this.animate, 100, 600 / 4, 600 / 4, this.x, this.y, this.width - 50, this.height + 10)
      this.animate++    }
    ctx.drawImage(this.img, 149* this.animate, 100, 600 / 4, 600 / 4, this.x, this.y, this.width - 50, this.height + 10)
  }
  position(ejey, position) {
    if (frames % 50 === 0 && this.chargeVar == false) {
      this.y = ejey + 10
      this.pos = position
    }
  }
  charge() {
    if (this.x >= canvas.width + 400) {
      //this.x = 0
      this.chargeVar = false
    }
    if (frames % 1100 == 0) this.chargeVar = true
    if (this.chargeVar == true) this.x += 4
  }
}

class Cavernicola {
  constructor() {
    this.x = 270;
    this.y = 370;
    this.width = 100;
    this.height = 150;
    this.img = new Image()
    this.img.src = "./images/cavernicola.png"
    this.animate = 0
    this.animateBool = false
    this.position = 1
    this.imgLeft = new Image()
    this.imgLeft.src = "./images/cavernicola2.png"
    this.imgNow = this.img
    this.pos = 1;
  }
  draw() {
    if (frames < 1600){
      if (this.animate === 4 && frames % 8 == 0 && this.animateBool == false) {
        this.animate-- ;
        this.animateBool = true;
      } else if (this.animate == 0 && this.animateBool == true && frames % 8 == 0) {
        this.animate ++;
        this.animateBool = false
      } else if (this.animate != 4 && this.animateBool == false && frames % 8 == 0) {
        this.animate++
      } else if (this.animate != 4 && this.animateBool == true && frames % 8 == 0) {
        this.animate--
      }
    }
    ctx.drawImage(this.imgNow, (334 * this.animate), 0, 334, 500, this.x, this.y, this.width , this.height)
  }
  moveUp() {
    if (this.position < 2){
      this.position++
      this.y -= 30
      this.pos -= 1
    }
  }
  moveRight() {
    this.x += 15;
    this.imgNow = this.img
    if (frames > 1600) {
      if (this.animate === 4 && frames % 1 == 0 && this.animateBool == false) {
        this.animate-- ;
        this.animateBool = true;
      } else if (this.animate == 0 && this.animateBool == true && frames % 1 == 0) {
        this.animate ++;
        this.animateBool = false
      } else if (this.animate != 4 && this.animateBool == false && frames % 1 == 0) {
        this.animate++
      } else if (this.animate != 4 && this.animateBool == true && frames % 1 == 0) {
        this.animate--
      }
    }
  }
  moveDown() {
    if (this.position > 0){
      this.position--
      this.y += 30;
      this.pos += 1
    }
  }
  moveLeft() {
    this.x -= 20;
    this.imgNow = this.imgLeft
    if (frames > 1600) {
      if (this.animate === 4 && frames % 1 == 0 && this.animateBool == false) {
        this.animate-- ;
        this.animateBool = true;
      } else if (this.animate == 0 && this.animateBool == true && frames % 1 == 0) {
        this.animate ++;
        this.animateBool = false
      } else if (this.animate != 4 && this.animateBool == false && frames % 1 == 0) {
        this.animate++
      } else if (this.animate != 4 && this.animateBool == true && frames % 1 == 0) {
        this.animate--
      }
    }
  }
  isTouching(obstacle) {
    return (
      this.x < obstacle.x + obstacle.width &&
      this.x + this.width > obstacle.x &&
      this.y < obstacle.y + obstacle.height &&
      this.y + this.height > obstacle.y && cavernicola.pos == obstacle.pos
    );
  }
}

class Meat {
  constructor() {
    this.x = 1000 + 40;
    this.y = 400;
    this.width = 40;
    this.height = 40;
    this.img = new Image()
    this.img.src = "./images/ezgif.com-gif-to-apng (1).png"
    this.pos = Math.floor(Math.random()* 3 )
  }
  draw() {
    this.x -= 2.5
    ctx.drawImage(this.img, 0, 0, 200, 200, this.x, this.y + 30 * this.pos, this.width, this.height)
  }
}

class Rock {
  constructor() {
    this.x = 1000 + 70;
    this.y = 400;
    this.width = 70;
    this.height = 40;
    this.img = new Image()
    this.img.src = "./images/rocks2.png"
    this.pos = Math.floor(Math.random()* 3 )
  }
  draw() {
    this.x -= 2.5
    ctx.drawImage(this.img, 0, 0, 800, 498, this.x, this.y + 30 * this.pos , this.width, this.height)
  }
}

class Danger {
  constructor() {
    this.x = 90;
    this.y = 300;
    this.width = 50;
    this.height = 50;
    this.img = new Image();
    this.img.src = "./images/danger.png"
  }
  draw(bully) {
    ctx.drawImage(this.img, 0, 0, 360, 360, this.x, bully - 50, this.width, this.height)
  }
}



let board = new Board()
let bull = new Bull()
let cavernicola = new Cavernicola()
let meat = new Meat()
let rock = new Rock()
let danger = new Danger()

function generateMeat(){
  if (frames % 400 === 0){
    meat = new Meat()
    meatArray.push(meat)
  }
}

function drawMeat() {
  if (frames < 1600) {
    meatArray.forEach(meat => meat.draw())
  }
}

function clearBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function generateRock(){
  if (frames % 100 === 0){
    rock = new Rock()
    rockArray.push(rock)
  }
}

function drawRock() {
  if (frames < 1600) {
    rockArray.forEach(rock => rock.draw())
  }
}

function checkCollition() {
  rockArray.forEach((rock, i) => {
    if (cavernicola.isTouching(rock) && frames < 1400) {
      console.log("f*ck")
      rockArray.splice(i, 1);
      health.value -= 15;
    }
  });
  meatArray.forEach((meat, i) => {
    if (cavernicola.isTouching(meat)) {
      console.log("f*ck yes")
      meatArray.splice(i, 1);
      health.value += 15;
    }
  });
    if (cavernicola.isTouching(bull)) {
      console.log("f*ck NOOO")
      health.value -= 50;
    }
}

function update() {
  frames++
  clearBoard()
  board.draw()
  danger.draw(bull.y)
  bull.position(cavernicola.y, cavernicola.pos)
  bull.charge()
  generateMeat()
  drawMeat()
  generateRock()
  drawRock()
  bull.draw()
  cavernicola.draw()
  checkCollition()
}

window.onload = () => {
  if (interval) return
  interval = setInterval(update, 1000/ 60)
}

document.onkeydown = (e) => {
    switch(e.keyCode){
      case 87:
        cavernicola.moveUp()
        break;
      case 68:
        if (frames > 1600 && cavernicola.x < canvas.width - 100) cavernicola.moveRight()
        break;
      case 83:
        cavernicola.moveDown()
        break;
      case 65:
        if(frames > 1600 && cavernicola.x > 0)cavernicola.moveLeft()
        break;
      default:
        break;
    }
  } 