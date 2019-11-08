const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
let health = document.getElementById("health")
let bossHealth = document.getElementById("healthboss")
let bossName = document.getElementById("healthBar2")

let interval;
let frames = 0;
let meatArray = []
let rockArray = []
let meteorArray = []

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
    if (this.animate === 3 && frames % 11 == 0) {
      this.animate = 1;
      ctx.drawImage(this.img,149* this.animate, 100, 600 / 4, 600 / 4, this.x, this.y, this.width - 50, this.height + 10)
    } else if (frames % 11 == 0){
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
  charge(danger) {
    if (this.x >= canvas.width + 400) {
      //this.x = 0
      this.chargeVar = false
    }
    if (frames > 1100 && frames < 1600) {
      this.chargeVar = true
      if (frames < 1220 && frames % 2 == 0) {
        danger.draw(this.y)
      }
    }
    if (frames > 2750) {
      this.chargeVar = true
      if (frames > 2800 && frames < 2860 && frames % 2 == 0) {
        danger.draw(this.y)
      }
    }
    if (this.chargeVar == true && frames > 1220) this.x += 4
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
      this.x + 60  < obstacle.x + obstacle.width &&
      this.x + this.width - 30 > obstacle.x &&
      this.y < obstacle.y + obstacle.height &&
      this.y + this.height > obstacle.y && cavernicola.pos == obstacle.pos
    );
  }
  isTouchingMeteor(obstacle) {
    return (
      this.x + 60  < obstacle.x + obstacle.width &&
      this.x + this.width - 30 > obstacle.x &&
      this.y +40 < obstacle.y + obstacle.height &&
      this.y + this.height -30> obstacle.y
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

class Meteor {
  constructor() {
    this.x = 700 + Math.floor(Math.random() * 200)
    this.y = 10
    this.width = 100
    this.height = 100
    this.img = new Image();
    this.img.src = "./images/meteorRight.png"
    this.imgLeft = new Image()
    this.imgLeft.src = "./images/meteorLeft.png"
    this.imgNow = new Image()
  }
  draw(ejex) {
    this.y += 0.8
    if (this.x < ejex + 5 && this.x > ejex -5) {
    }
    else if (this.x > ejex) {
      this.x -= 1.25
      this.imgNow = this.img
    }
    else if (this.x < ejex){
      this.x += 1.25
      this.imgNow = this.imgLeft
    }
    ctx.drawImage(this.imgNow, 0, 0, 920, 920, this.x, this.y, this.width, this.height)
  }
}

class Boss {
  constructor() {
    this.x = 800
    this.y = 230
    this.width = 1700
    this.height = 240
    this.img = new Image()
    this.img.src = "./images/attack.png"
    this.animate = 7;
    this.attackBool = false;
    this.imgDeath = new Image()
    this.imgDeath.src = "./images/death.png"
    this.death = false
  }
  draw() {
    if (this.attackBool == true && this.animate > 0 && frames % 12 == 0){
      this.animate --
    }
    else if (frames % 12 === 0){
      this.animate = 7;
      this.attackBool = false
    }
    ctx.drawImage(this.img, (7520 / 8) * this.animate, 0, 7520, 817, this.x, this.y, this.width, this.height)
  }
  attack() {
    this.attackBool = true;
    generateMeteor()
  }
  death() {
    this.death = true
  }
  isTouching(obstacle) {
    return (
      this.x + 60  < obstacle.x + obstacle.width &&
      this.x + this.width - 30 > obstacle.x &&
      this.y < obstacle.y + obstacle.height &&
      this.y + this.height > obstacle.y 
    );
  }
}

let board = new Board()
let bull = new Bull()
let cavernicola = new Cavernicola()
let meat = new Meat()
let rock = new Rock()
let danger = new Danger()
let meteor = new Meteor()
let boss = new Boss()
let bull2 = new Bull()
bull2.x = 0 - bull2.width;

function generateMeat(){
  if (frames % 400 === 0 && frames < 1240){
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
  if (frames % 104 === 0 && frames < 1240){
    rock = new Rock()
    rockArray.push(rock)
  }
}

function generateMeteor(){
    meteor = new Meteor()
    meteorArray.push(meteor)
}


function drawRock() {
  if (frames < 1600) {
    rockArray.forEach(rock => rock.draw())
  }
}

function drawMeteor(ejex) {
    meteorArray.forEach(meteor => meteor.draw(ejex))
}

function checkCollition() {
  rockArray.forEach((rock, i) => {
    if (cavernicola.isTouching(rock) && frames < 1400) {
      rockArray.splice(i, 1);
      health.value -= 15;
    }
  });
  meatArray.forEach((meat, i) => {
    if (cavernicola.isTouching(meat)) {
      meatArray.splice(i, 1);
      health.value += 15;
    }
  });
  meteorArray.forEach((meteor, i) => {
    if (cavernicola.isTouchingMeteor(meteor)) {
      meteorArray.splice(i, 1);
      health.value -= 25;
    }
  });
  meteorArray.forEach((meteor, i) => {
    if (meteor.y >= 400) {
      meteorArray.splice(i, 1);
    }
  });
  if (cavernicola.isTouching(bull)) {
    health.value -= 50;
  }
  if (cavernicola.isTouching(bull2) && frames > 2500) {
    health.value -= 50;
  }
  if (boss.isTouching(bull2)) {
    bossHealth.value -= 50;
  }
}

function gameOver() {
  let winImg = new Image()
  let loseImg = new Image()
  winImg.src = "./images/win.png"
  loseImg.src = "./images/lose.png"
  if (health.value <= 0) {
    clearInterval(interval)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(loseImg, 0, 0, 802, 481, 0, 0, canvas.width, canvas.height)
  }
  else if (bossHealth.value <= 0) {
    clearInterval(interval)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(winImg, 0, 0, 750, 469, 0, 0, canvas.width, canvas.height)
  }
}

function update() {
  frames++
  clearBoard()
  board.draw()
  bull.position(cavernicola.y, cavernicola.pos)
  bull.charge(danger)
  generateMeat()
  drawMeat()
  generateRock()
  drawRock()
  bull.draw()
  cavernicola.draw()
  if (frames > 1600) bossName.style.visibility = "visible"
  if (frames > 1600) boss.draw()
  if (frames > 1640 && frames % 310 == 0)boss.attack()
  if (frames >= 2650 && frames <= 2750) {
    bull2.draw();
    bull2.x += 2.4
  }
  if (frames > 2700) bull2.draw()
  if (frames > 2850) bull2.charge(danger)
  drawMeteor(cavernicola.x)
  checkCollition()
  gameOver()
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