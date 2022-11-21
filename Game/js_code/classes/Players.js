// Declaring Class Player which controls Player datas like position and velocity
class Player extends Sprite{
    constructor({position,collisionBlocks, platformCollisionBlocks, imageSrc, frameRate, scale = 0.5, animations}){
        super({imageSrc, frameRate, scale})  //giving the properties to the class
        this.position = position  /* The initial position of the object  */
        this.velocity ={
            x:0,
            y:0,
        }  /* The initial speed of the object */
        this.collisionBlocks = collisionBlocks
        this.hitbox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: 10,
            height: 10
        }
        this.platformCollisionBlocks = platformCollisionBlocks
        this.animations = animations
        for(let key in this.animations){
            const image = new Image()
            image.src = this.animations[key].imageSrc

            this.animations[key].image = image
        }
        // this.width = 25
        // this.height = 25
        // this.lastKey
    }
    // draw(){
    //     c.fillStyle = 'red'
    //     c.fillRect(this.position.x, this.position.y, this.width, this.height)  //Where the object is going to be created
    // }

    switchSprite(key){
        if(this.image === this.animations[key]) return
        this.image = this.animations[key].image
        this.frameBuffer = this.animations[key].frameBuffer
        this.frameRate = this.animations[key].frameRate
    }
    update(){
        this.updateFrames()
        this.updateHitbox()

        //Draws out the image
        c.fillStyle = 'rgba(0, 160, 0, 0.2)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height )

        c.fillStyle = 'rgba(255, , 0, 0.2)'
        c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height )
        

        this.draw()  /* Calls the draw() method to draw the object */
        
        this.position.x += this.velocity.x  /* change in the horizontal position */
        this.updateHitbox()
        this.checkForHorizontallCollisions()
        this.applyGravity()
        this.updateHitbox()
        this.checkForVerticalCollisions()
        }

        updateHitbox(){
            this.hitbox = {
            position: {
                x: this.position.x + 35,
                y: this.position.y + 25,
            },
            width: 14,
            height: 28
            }
        }

        applyGravity(){
            this.velocity.y += gravity //let the object fall
            this.position.y += this.velocity.y  /* change in the vertical position */
        }

        checkForHorizontallCollisions(){
            for(let i = 0; i < this.collisionBlocks.length; i++){
                const CollisionBlock = this.collisionBlocks[i]

                if(
                    collision({
                    object1: this.hitbox,
                    object2: CollisionBlock,
                })
                ){    
                    if(this.velocity.x > 0){
                        this.velocity.x = 0
                        const offset = this.hitbox.position.x - this.position.x + this.hitbox.width
                        this.position.x = CollisionBlock.position.x - offset  - 0.01
                        break
                    }
                    if(this.velocity.x < 0){
                        this.velocity.x = 0

                        const offset = this.hitbox.position.x - this.position.x + this.hitbox.width
                        this.position.x = CollisionBlock.position.x + this.width - (offset*2) + 0.01
                        break
                    }
                }
            }
        }
        checkForVerticalCollisions(){
            for(let i = 0; i < this.collisionBlocks.length; i++){
                const CollisionBlock = this.collisionBlocks[i]

                if(
                    collision({
                    object1: this.hitbox,
                    object2: CollisionBlock,
                })
                ){
                    if(this.velocity.y > 0){
                        this.velocity.y = 0

                        const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
                        this.position.y = CollisionBlock.position.y - offset - 0.01
                        break
                    }
                    if(this.velocity.y < 0){
                        this.velocity.y = 0
                        this.position.y = CollisionBlock.position.y + this.height + 0.01
                        break
                    }
                }
            }

            // Platformcollisionblocks
            for(let i = 0; i < this.platformCollisionBlocks.length; i++){
                const platformCollisionBlock = this.platformCollisionBlocks[i]

                if(
                    collision({
                    object1: this.hitbox,
                    object2: platformCollisionBlock,
                })
                ){
                    if(this.velocity.y > 0){
                        this.velocity.y = 0

                        const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
                        this.position.y = platformCollisionBlock.position.y - offset - 0.01
                        break
                    }
                    
                }
            }
        }
    }
    


function collision({object1, object2}){
    return(
        object1.position.y + object1.height >= object2.position.y &&
        object1.position.y <= object2.position.y + object2.height &&
        object1.position.x <= object2.position.x + object2.width &&
        object1.position.x + object1.width >= object2.position.x
    )
}

