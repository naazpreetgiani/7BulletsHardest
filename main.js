// Bullets Challenge Hardest

//Canvas Setup
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;

// Global Variables
let mouseX, mouseY;
let leftPressed = false;
let rightPressed = false;
let upPressed = false;
let downPressed = false;

// Player Characteristics
let player = {
    x: cnv.width / 2,
    y: 550,
    r: 30,
    color: "blue",
    dir: "up"
};

let line = {
    w: 5,
    colour: "red",
    x1: player.x,
    y1: player.y,
    x2: player.x,
    y2: player.y - player.r
}

// Circles Array
let circles = [];
for (let n = 1; n <= 5; n++) {
    circles.push(randomCircle());
}

// Bullets Array
let bullets = [];

window.addEventListener("load", draw)

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cnv.width, cnv.height);

    // Draw Player
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.r, 0, 2 * Math.PI)
    ctx.fill();

    // Change player direction
    if (leftPressed) {
        player.x -= 7;
        player.dir = "left";
    } else if (rightPressed) {
        player.x += 7;
        player.dir = "right";
    } else if (upPressed) {
        player.y -= 7;
        player.dir = "up";
    } else if (downPressed) {
        player.y += 7;
        player.dir = "down";
    }

    // Canvas Boundaries
    if (player.x - player.r < 0) {
        player.x = player.r;
    } else if (player.x + player.r > cnv.width) {
        player.x = cnv.width - player.r;
    }

    // Draw line to detect the way player is facing
    ctx.lineWidth = line.w;
    ctx.strokeStyle =  `${line.colour}`;
    ctx.beginPath();
    ctx.moveTo(player.x, player.y);
    ctx.lineTo(line.x2, line.y2);
    ctx.stroke();

    // Move line to see which direction the line is facing
    if (player.dir === "up") {
        line.x2 = player.x;
        line.y2 = player.y - player.r;
    } else if (player.dir === "down") {
        line.x2 = player.x;
        line.y2 = player.y + player.r;
    } else if (player.dir === "left") {
        line.x2 = player.x - player.r;
        line.y2 = player.y;
    } else if (player.dir === "right") {
        line.x2 = player.x + player.r;
        line.y2 = player.y;
    }

    for (let i = 0; i < circles.length; i++) {
        let circle = circles[i];
        drawCircle(circle);
        moveCircle(circle);
    }

    for (let i = 0; i < bullets.length; i++) {
        let bullet = bullets[i];
        drawBullet(bullet);
        moveBullet(bullet);

        for (let n = 0; n < circles.length; n++) {
            let circle = circles[n];
            let distance = Math.sqrt((bullet.x - circle.x) ** 2 + (bullet.y - circle.y) ** 2);

            if (distance <= bullet.r + circle.r) {
                // Handle collision, remove the bullet and circle
                bullets.splice(i, 1);
                circles.splice(n, 1);
            }
 
            if (bullet.y < 0) {
                bullets.splice(i, 1);
            }
        }   
    }

 requestAnimationFrame(draw);
}

//Circle Stuff

function drawCircle(aCircle) {
 ctx.lineWidth = 3;   
 ctx.strokeStyle = `${aCircle.c}`;
 ctx.beginPath();
 ctx.arc(aCircle.x, aCircle.y, aCircle.r, 0, 2 * Math.PI)
 ctx.stroke();
}

function moveCircle(aCircle) {
    aCircle.y += aCircle.ys;
    aCircle.x += aCircle.xs;

    //Check for collisions with canvas boundaries
    if (aCircle.x - aCircle.r < 0 || aCircle.x + aCircle.r > cnv.width) {
        aCircle.xs = -aCircle.xs;
    }

    if (aCircle.y - aCircle.r < 0 || aCircle.y + aCircle.r > cnv.height) {
        aCircle.ys = -aCircle.ys;
    }
}

function randomCircle() {
   return {
        x: randomInt(0, cnv.width),
        y: randomInt(0, cnv.height),
        r: randomInt(10, 50),
        xs: randomInt(1, 5),
        ys: randomInt(1, 5),
        c: randomRGB()
    }
}

// Bullet Stuff

function singleBullet(initDX, initDY) {
    return {
        x: player.x,
        y: player.y,
        r: 5,
        dx: initDX,
        dy: initDY,
        c: "white"
    }
}  

function drawBullet(aBullet) {
    ctx.lineWidth = 3;   
    ctx.fillStyle = `${aBullet.c}`;
    ctx.beginPath();
    ctx.arc(aBullet.x, aBullet.y, aBullet.r, 0, 2 * Math.PI)
    ctx.fill();
}

function moveBullet(aBullet) {
    aBullet.x += aBullet.dx;
    aBullet.y += aBullet.dy;
}

// Event Listeners & Handlers
document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", keyupHandler);
document.addEventListener("mousedown", mousedownHandler);
document.addEventListener("mousemove", mousemoveHandler);

function keydownHandler(e) {
    //Check for keys pressed
  if (e.code === "ArrowLeft") {
        leftPressed = true;
    } else if (e.code === "ArrowRight") {
        rightPressed = true;
    }  else if (e.code === "ArrowUp") {
        upPressed = true;
    } else if (e.code === "ArrowDown") {
        downPressed = true;
    }
}

function keyupHandler(e) {
    //Check for keys pressed
   if (e.code === "ArrowLeft") {
      leftPressed = false;
    } else if (e.code === "ArrowRight") {
      rightPressed = false;
    } else if (e.code === "ArrowUp") {
        upPressed = false;
    } else if (e.code === "ArrowDown") {
        downPressed = false;
    } 
}

function mousedownHandler() {
    // Create a bullet based on the mouse position
    bullets.push(singleBullet());  
}
      
function mousemoveHandler(event) {
  mouseMove = true;
  // Get rectangle info about canvas location
  let cnvRect = cnv.getBoundingClientRect(); 

  // Calc mouse coordinates using mouse event and canvas location info
  mouseX = Math.round(event.clientX - cnvRect.left);
  mouseY = Math.round(event.clientY - cnvRect.top);

  let d = dist(mouseX, mouseY, player.x, player.y)
  
    line.x2 = player.x + run;
    line.y2 = player.y + rise;

  console.log(line.x);
}

// Determine the distance between two points from the x-values and y-values
function dist(x1, y1, x2, y2) {
    return Math.sqrt((x2-x1)**2 +(y2-y1)**2);
  }