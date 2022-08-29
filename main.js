const canvas = document.getElementById('lifeBoard');
const cc = canvas.getContext("2d");
const radius = 5;
const canvasSize = 600;
// const particles = [];

function createParticle(x, y) {
    return { x: x, y: y, vx: 0, vy: 0 }
}

function createGroup(number) {
    const group = [];
    for (let i = 0; i < number; i++) {
        const p = createParticle(getRandom(), getRandom());
        group.push(p);
    }
    return group;
}
function getRandom() {
    return Math.floor(Math.random() * (canvasSize - radius));
}
function draw(particles, color) {
    cc.fillStyle = color;
    for (let i = 0; i < particles.length; i++) {
        cc.fillRect(particles[i].x, particles[i].y, radius, radius);
    }
}
function rule(particles1, particles2, force) {
    for (let i = 0; i < particles1.length; i++) {
        for (let j = 0; j < particles2.length; j++) {
            const d = getDistance(particles1[i], particles2[j])
            if(d !== 0) {
            let v = force / (d**2 );
            const p1 = particles1[i];
            const p2 = particles2[j];
            p1.vx += v * (p2.x - p1.x);
            p1.vy += v * (p2.y - p1.y);
            p1.x += p1.vx;
            p1.y += p1.vy;
            if(p1.x > canvasSize -radius || p1.x < radius) {
                p1.vx = -p1.vx;
            }
            if(p1.y > canvasSize -radius || p1.y < radius) {
                p1.vy = -p1.vy;
            }
            }
            
        }
    }
}
const red = createGroup(4);
const blue = createGroup(10);
const green = createGroup(10);
function update() {
    cc.fillStyle = 'black';
    cc.fillRect(0, 0, canvasSize, canvasSize);
    rule(red, red, 1)
    // rule(blue, blue, 1)
    // rule(green, green, 5)
    // rule(blue, red, -1);
    // rule(red, blue , -1)
    // rule(green, red, 2);
    // rule(red, green , 2);
    // rule(blue, green , 1);
    // rule(green, blue ,1)
    // rule(green, green, 1);
    draw(red, 'red');
    // draw(blue, 'blue');
    // draw(green, 'green');
    requestAnimationFrame(update);
}
function getDistance(p1, p2) {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
}
update();