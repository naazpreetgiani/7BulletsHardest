// Canvas View Easier
// When player moves, move the canvas with it

// Canvas Setup
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 400;
cnv.height = 400;

let leftPressed = false;
let rightPressed = false;

// Player Characteristics
let player = {
  x: cnv.width / 2,
  y: 565,
  w: 25,
  h: 25,
  dx: 5,
  dy: 0,
  a: 0.1,
  jumpSpeed: -5,
  color: "blue"
};


// Global Variables
let walls = [];
walls.push({ x: 300, y: 250, w: 100, h: 20 });
walls.push({ x: 500, y: 275, w: 200, h: 20 });
walls.push({ x: 700, y: 200, w: 100, h: 20 });
walls.push({ x: 900, y: 275, w: 200, h: 20 });
walls.push({ x: 1100, y: 200, w: 100, h: 20 });
walls.push({ x: 1300, y: 275, w: 200, h: 20 });
walls.push({ x: 1500, y: 275, w: 200, h: 20 });


// Draw Function
window.addEventListener("load", draw);

function draw() {
  // LOGIC
  cnv.x = player.x - 200;

  // Horizontal Movement
   if (rightPressed) {
    player.x += player.dx;
  } else if (leftPressed) {
    player.x -= player.dx;
  }

  //Vertical Movement
  player.dy += player.a; // Accelerate
  player.y += player.dy; // Move

  // Land on Floor
  if (player.y + player.h > cnv.height) {
    player.y = cnv.height - player.h;
    player.dy = 0;
  }

  // Check Collision with border
  if (player.x < 0) {
    player.x = 0;
  } else if (player.x + player.w > 1750) {
    player.x = 1750 - player.w;
  }
 
  if (player.x + 200 > 1750) {
    cnv.x = 1350;
  } else if (player.x - 200 < 0) {
    cnv.x = 0;
  }

 //Check if Player collides with any wall
  for (let i = 0; i <walls.length; i++) {
    let wall = walls[i];
    if (player.x < wall.x + wall.w && player.x + player.w > wall.x && player.y < wall.y + wall.h && player.y + player.h > wall.y) {
      console.log(player.y);
      player.y = wall.y - player.h;
    }
  }
  
  // DRAWING
  // Background
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  // Draw Walls
  ctx.fillStyle = "black";
  for (let i = 0; i < walls.length; i++) {
    let wall = walls[i];
    ctx.fillRect(wall.x - cnv.x, wall.y, wall.w, wall.h);
  }

  // Draw Player
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x - cnv.x, player.y, player.w, player.h);



  // Animation Loop
  requestAnimationFrame(draw);

  // Constrain view and PLAYER at 0 and 1750
  // view goes back to zero or stays at 1750
}

// Event Listeners & Handlers
document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", keyupHandler);

function keydownHandler(e) {
    //Check for keys pressed
  if (e.code === "ArrowUp") {
      player.dy = player.jumpSpeed;
    } else if (e.code === "ArrowLeft") {
      leftPressed = true;
    } else if (e.code === "ArrowRight") {
      rightPressed = true;
  }
}

function keyupHandler(e) {
    //Check for keys pressed
  if (e.code === "ArrowLeft") {
    leftPressed = false;
  } else if (e.code === "ArrowRight") {
    rightPressed = false;
  } 
}