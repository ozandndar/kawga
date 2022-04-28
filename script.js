const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');
const gravity = 0.2;

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

class Sprite {
    constructor({ position, velcoity, width, height }) {
        this.position = position;
        this.velcoity = velcoity;
        this.height = height;
        this.width = width;
        this.lastKey;
    }

    draw() {
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();
        this.position.x += this.velcoity.x;
        this.position.y += this.velcoity.y;


        if (this.position.y + this.height + this.velcoity.y >= canvas.height) {
            this.velcoity.y = 0;
        } else {
            this.velcoity.y += gravity;
        }

    }
}

// Create player
const player = new Sprite({
    width: 50,
    height: 150,
    position: {
        x: 0,
        y: 50
    },
    velcoity: {
        x: 0,
        y: 0
    }
})

// Create enemy
const enemy = new Sprite({
    width: 50,
    height: 150,
    position: {
        x: 440,
        y: 50
    },
    velcoity: {
        x: 0,
        y: 0
    }
})

// Track keys to prevent spamming
const keys = {
    a: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
    w: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}

function animate() {
    // activate 60FPS rendering
    window.requestAnimationFrame(animate);

    // set background color of the canvas
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height);

    // update positions
    player.update();
    enemy.update();

    // reset velocity every render
    player.velcoity.x = 0;
    enemy.velcoity.x = 0;

    // player moves
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velcoity.x = -5;
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velcoity.x = 5;
    }

    // enemy moves
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velcoity.x = -5;
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velcoity.x = 5;
    }


}

animate();

window.addEventListener('keydown', () => {
    switch (event.key) {
        case 'd':
            player.lastKey = 'd';
            keys.d.pressed = true;
            break;
        case 'a':
            player.lastKey = 'a';
            keys.a.pressed = true;
            break;
        case 'w':
            player.velcoity.y = -10;
            break;
        case 'ArrowRight':
            enemy.lastKey = 'ArrowRight';
            keys.ArrowRight.pressed = true;
            break;
        case 'ArrowLeft':
            enemy.lastKey = 'ArrowLeft';
            keys.ArrowLeft.pressed = true;
            break;
        case 'ArrowUp':
            enemy.velcoity.y = -10;
            break;
    }
})

window.addEventListener('keyup', () => {
    // player keys
    switch (event.key) {
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
    }

    // enemy keys
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
    }
})