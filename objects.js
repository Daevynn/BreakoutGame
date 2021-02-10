// Object Document

let ball = {
    x : 0,
    y : 0,
    dy : 0,
    dx : 0,
    radius : 0,
    power : 0, // More power allows ball to pierce blocks
    strength : 0, // Default ball will have max strength, Some ball powerups will cause secondary balls to disipate after a couple hits
    type: "", // The type of ball will tell you what the ball does
}

let paddle = {
    x : 0,
    y : 0,
    dx : 0,
    width : 0, // Powerup will allow you to extend paddle width
}

let brick = {
    x : 0,
    y : 0,
    strength : 0, // Higher strength requires more hits
    type : "", // Different types of bricks will do different things, i.e. split will split upon destrucktion. 
}

let powerUp = {
    type : "", // Different types of powerups do different things
    duration : 0, // This is how long the power up will last
}

let enemy = {
    type : "",
    hp : 0,
    speed : 0,
}

