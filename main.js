const canvas = document.getElementById('lifeBoard');
const cc = canvas.getContext("2d");
const radius = 5;
const canvasSize = 600;
const redParticles = [];
const blueParticles = [];
const particles = [];

function createParticle(x, y) {
    return { x: x, y: y, vx: 0, vy: 0 }
}

function createGroup(number, color) {
    const group = [];
    cc.fillStyle = color;
    for (let i = 0; i < number; i++) {
        const p = createParticle(getRandom(), getRandom());
        group.push(p);
        cc.fillRect(p.x, p.y, radius, radius);
    }
    return group;
}
function getRandom() {
    return Math.floor(Math.random() * (canvasSize - radius));
}
function createParticles(number, color) {
    particles.push({
        group: createGroup(number, color),
        color: color
    })
}
function setRules(p1, p2) {
    const v = 1 / (getDistance(p1, p2));

    p1.vx = v * (p2.x - p1.x)
    p1.vy = v * (p2.y - p1.y)
    p1.x += p1.vx;
    p1.y += p1.vy;

    p2.vx = v * (p1.x - p2.x)
    p2.vy = v * (p1.y - p2.y)
    p2.x += p2.vx;
    p2.y += p2.vy;
    if (p1.x > canvasSize - radius || p1.x < 0 + radius) {
        p1.vx = -p1.vx
    }
    if (p1.y > canvasSize - radius || p1.y < 0 + radius) {
        p1.vy = -p1.vy
    }
    if (p2.x > canvasSize - radius || p2.x < 0 + radius) {
        p2.vx = -p2.vx
    }
    if (p2.y > canvasSize - radius || p2.y < 0 + radius) {
        p2.vy = -p2.vx
    }
    if (p1.vx > 50) {
        p1.vx = 0
    }
    if (p1.vy > 50) {
        p1.vy = 0
    }
    if (p2.vx > 50) {
        p2.vx = 0
    }
    if (p2.vy > 50) {
        p2.vy = 0
    }
}
function update() {
    cc.fillStyle = 'black';
    cc.fillRect(0, 0, canvasSize, canvasSize);

    for (let i = 0; i < particles.length; i++) {
        for (let j = 0; j < particles[i].group.length - 1; j++) {
            setRules(particles[i].group[j], particles[i].group[j + 1]);
            cc.fillStyle = particles[i].color;
            cc.fillRect(particles[i].group[j].x, particles[i].group[j].y, radius, radius);
            cc.fillRect(particles[i].group[j+1].x, particles[i].group[j+1].y, radius, radius);
        }
    }
    requestAnimationFrame(update);
}
function getDistance(p1, p2) {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
}
createParticles(2, 'red');
createParticles(2, 'blue');
update();