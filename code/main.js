import kaboom from "kaboom"

document.title = 'Catch the drink'
// initialize context
// Initialize context
kaboom({
  font: "sink",
  background: [ 10, 1010, 1655, ],
})



// lets upload the sprites
loadSprite("girl", "sprites/girl.png");
loadSprite("bug", "sprites/bug.png");
loadSprite("coffee", "sprites/coffee.png");

// lets load the music
loadSound("background", "sounds/background.mp3");
loadSound("gameover", "sounds/gameover.mp3");
loadSound("sipping", "sounds/sipping.mp3");
loadSound("score", "sounds/score.mp3");

//lets define the game variables
let SPEED = 620
let BSPEED = 0.9
let SCORE = 0
let scoreText;
let bg = false;
let background;



// Lets define a function to display our score
const displayScore = ()=>{
  destroy(scoreText)
  // a simple score counter
  scoreText = add([
      text("Score: " + SCORE),
      scale(3),
      pos(width() - 181, 21),
      color(10, 10, 255)
  ])

       Text = add([
      text("click anywhere to start using the navigation keys"),
      scale(1.5),
     // pos(width() - 1000, 21),
          pos(10, 21),
      color(10, 10, 255)
  ])

   Text = add([
      text("by divya reddy"),
      scale(1.5),
     // pos(width() - 1000, 21),
          pos(10, 42),
      color(10, 10, 255)
  ])
}

//const displayStart = ()=>{
//  wait(5, () => {
      
 //     Text = add([
 //     text("Click on the player to start"),
 //     scale(3),
 //     pos(width() - 1000, 21),
 //     color(10, 10, 255)
 // ])
 // })
//} 



// Lets define a function to play background music
const playBg = ()=>{
  if(!bg){ 
    background = play("background", {volume: 0.2})
    bg = true;
  }
}


//lets add the player
const player = add([
    sprite("girl"),  // renders as a sprite
    pos(120, 80),    // position in world
    area(),          // has a collider
    scale(0.13),
   
])

// Lets add events to our player 
onKeyDown("left", () => {
  playBg()
  player.move(-SPEED, 0)
})

onKeyDown("right", () => {
  playBg()
  player.move(SPEED, 0)
})

onKeyDown("up", () => {
  playBg()
  player.move(0, -SPEED)
})

onKeyDown("down", () => {
  playBg()
  player.move(0, SPEED)
})

//lets add ants and a coffee on loop
loop(4,()=>{
  for(let i=0; i<4; i++){
    let x = rand(0, width())
    let y = height()

    let c = add([
       sprite("bug"),   
       pos(x, y),   
       area(),
       scale(0.13), 
       "bug"
    ])
    c.onUpdate(()=>{
      c.moveTo(c.pos.x, c.pos.y - BSPEED)
    })
  }
  
  let x = rand(0, width())
  let y = height()
  
  // Lets introduce a coffee for our programmer to drink
  let c = add([
     sprite("coffee"),   
     pos(x, y),   
     area(),
     scale(0.13), 
     "coffee"
  ])
  c.onUpdate(()=>{
    c.moveTo(c.pos.x, c.pos.y - BSPEED)
  })
  if(BSPEED<13){ 
    BSPEED += 0.3
  }
})

 

player.onCollide("bug", () => {
 // background.volume(0.2)
  play("gameover")
  destroy(player)
  addKaboom(player.pos)
   Text = add([
      text("Game Over"),
      scale(4),
      pos(525, 200),
      color(10, 10, 255)
  ])
})


player.onCollide("coffee", (coffee) => {
 // background.volume(0.2)
  play("sipping", {
    volume: 2
  })
  destroy(coffee)
  SCORE += 1
  displayScore()

})


// Display the score
displayScore()