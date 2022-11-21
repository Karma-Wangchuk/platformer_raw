// gets the element canvas from html
const canvas = document.querySelector('canvas')

//Specifies the type of API to grab
const c = canvas.getContext('2d')

// Size of The game screen 
canvas.width = 1024
canvas.height = 700

const scaledCanvas = {
    width: canvas.width ,
    height: canvas.height
}

const floorCollisions2D = []

for (let i = 0; i < floorCollisions.length; i += 36){
    floorCollisions2D.push(floorCollisions.slice(i, i + 36))
}

const collisionBlocks = []
floorCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x) =>{
        if(symbol === 202){
            collisionBlocks.push(
                new CollisionBlock({
                    position:{
                        x: x *16,
                        y: y *16,
                    },
                })
            )
        }
    })
})



const platformCollision2D =[]
for (let i =0; i < platformCollision.length; i+=36){
    platformCollision2D.push(platformCollision.slice(i, i + 36))
}

const platformCollisionBlocks = []
platformCollision2D.forEach((row, y) => {
    row.forEach((symbol, x) =>{
        if(symbol === 202){
            platformCollisionBlocks.push(
                new CollisionBlock({
                    position:{
                        x: x * 16,
                        y: y * 16,
                    },
                    height: 4,
                })
            )
        }

    })
}) 
// console.log(platformBlocks)



// Game bg color
c.fillRect(0, 0, canvas.width, canvas.height) //(x-position, y-position, width, height)

const gravity = 0.5//Setting gravity variable



const background = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: './Assets/background.png',
})
const player = new Player({
    position: {
    x: 100,
    y: 300
    },
    collisionBlocks: collisionBlocks,
    platformCollisionBlocks: platformCollisionBlocks,
    velocity: {
    x:0,
    y:0
    },
    imageSrc: './Assets/warrior/warrior/idle.png',
    frameRate: 8,
    animations:{
        idle:{
            imageSrc: './Assets/warrior/warrior/Idle.png',
            frameRate: 8,
            frameBuffer: 3,
        },
        idleLeft:{
            imageSrc: './Assets/warrior/warrior/IdleLeft.png',
            frameRate: 8,
            frameBuffer: 3,
        },
        Run:{
            imageSrc: './Assets/warrior/warrior/Run.png',
            frameRate: 8,
            frameBuffer: 6,
        },
        RunLeft:{
            imageSrc: './Assets/warrior/warrior/RunLeft.png',
            frameRate: 8,
            frameBuffer: 6,
        },
        Jump:{
            imageSrc: './Assets/warrior/warrior/Jump.png',
            frameRate: 2,
            frameBuffer: 3,
        },
        JumpLeft:{
            imageSrc: './Assets/warrior/warrior/JumpLeft.png',
            frameRate: 2,
            frameBuffer: 3,
        },
        Fall:{
            imageSrc: './Assets/warrior/warrior/Fall.png',
            frameRate: 2,
            frameBuffer: 3,
        },
        FallLeft:{
            imageSrc: './Assets/warrior/warrior/FallLeft.png',
            frameRate: 2,
            frameBuffer: 3,
        },

    }
})

// const enemy = new Player({
//     position: {
//     x: 645,
//     y: 100
//     },
//     velocity: {
//     x:0,
//     y:0
//     }
// })

// console.log(player)
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    // ArrowRight: {
    //     pressed: false
    // },
    // ArrowLeft: {
    //     pressed: false
    // }
}

//Creating animation loop
const animate = () => {
    window.requestAnimationFrame(animate) //
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)

    c.save()
    // c.scale(4, 4)
    // c.translate(0, -background.image.height + scaledCanvas.height)
    background.update()
    collisionBlocks.forEach(collisionBlocks => {
        collisionBlocks.update()
    })

    platformCollisionBlocks.forEach(platformCollisionBlocks =>{
        platformCollisionBlocks.update()
    })

    player.update()
    player.velocity.x = 0    


    if(player.velocity.x === 0 && player.lastKey === 'd'){
        player.switchSprite('idle')
    }
    else if(player.velocity.x === 0 && player.lastKey === 'a'){
        player.switchSprite('idleLeft')
    }
    if (keys.a.pressed && player.lastKey === 'a'){
        player.switchSprite('RunLeft')
        player.velocity.x = -4
    } 
    if (keys.d.pressed && player.lastKey === 'd'){
        player.switchSprite('Run')
        player.velocity.x = 4
    }
    
    // if (keys.w.pressed && player.lastKey === 'w') {player.switchSprite('Jump')}
    // else if (keys.w.pressed && keys.a.pressed ) player.switchSprite('JumpLeft')
    else if (player.lastKey === 'w' && player.velocity.y < 0) player.switchSprite('Fall')
    // else if (player.velocity.y < 0 && player.lastKey ==='a') player.switchSprite('FallLeft')

    c.restore()
   

   
    // enemy.update()

   

    // Player Movement

    // enemy.velocity.x = 0

    // // Enemy movement

    // if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft'){
    //     enemy.velocity.x = -5
    // } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight'){
    //     enemy.velocity.x = 5
    // }
}
// calling the animate function
animate()

window.addEventListener('keydown', (event) => {
    switch(event.key){
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break
        case 'w':
            player.velocity.y = -6
            break
        // case 'ArrowRight':
        //     keys.ArrowRight.pressed = true
        //     enemy.lastKey = 'ArrowRight'
        //     break
        // case 'ArrowLeft':
        //     keys.ArrowLeft.pressed = true
        //     enemy.lastKey = 'ArrowLeft'
        //     break
        // case 'ArrowUp':
        //     enemy.velocity.y = -10
        //     break
    }
    // console.log(event.key)
})

window.addEventListener('keyup', (event) => {
    console.log(event.key)
    switch(event.key){
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 'w':
            keys.w.pressed = false
            break
        //     // Enemy Controls
        // case 'ArrowRight':
        //     keys.ArrowRight.pressed = false
        //     break
        // case 'ArrowLeft':
        //     keys.ArrowLeft.pressed = false
        //     break
        // case 'ArrowUp':
        //     keys.ArrowUp.pressed = false
        //     break
        }
    // console.log(event.key)
})