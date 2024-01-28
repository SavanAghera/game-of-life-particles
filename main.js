const canvas = document.getElementById('lifeBoard');
const cc = canvas.getContext("2d");
const radius = 5;
const canvasSize = 600;
let animationFrame;
let colorObj = {
    red: {
      label: "red",
      value: 1,
    },
    blue: {
      label: "blue",
      value: 1,
    },
    green: {
      label: "green",
      value: 1,
    },
  };
let slowSpeed = 1;

function createParticle(x, y, num) {
    return {x: x, y: y, vx: 0, vy: 0, id: new Date().getTime() + '' + num };
}

function createGroup(number) {
    const group = [];
    for (let i = 0; i < number; i++) {
        const p = createParticle(getRandom(), getRandom(), i);
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
            const p1 = particles1[i];
            const p2 = particles2[j];
            if (d !== 0 && p1.id !== p2.id) {

                let v = force / (d ** 2 * slowSpeed);
            
                p1.vx += v * (p2.x - p1.x);
                p1.vy += v * (p2.y - p1.y);
                
                if (p1.x > canvasSize - radius * 2 || p1.x < radius * 2) {
                    p1.vx = -p1.vx;
                }
                if (p1.y > canvasSize - radius * 2 || p1.y < radius * 2) {
                    p1.vy = -p1.vy;
                }
                if (d < radius * 2 && force > 0)   {
                    p1.vx =0;
                    p1.vy = 0;
                }
                    
             
                p1.x += p1.vx;
                p1.y += p1.vy;
              
            }

        }
    }
}

function boarderRule(particles, force) {
    for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.vx += force / (p1.x ** 2 * slowSpeed);
        p1.vy += force / (p1.y ** 2 * slowSpeed);
        p1.x += p1.vx;
        p1.y += p1.vy;
        if (p1.x > canvasSize - radius * 2 || p1.x < radius * 2) {
            p1.vx = -p1.vx;
        }
        if (p1.y > canvasSize - radius * 2 || p1.y < radius * 2) {
            p1.vy = -p1.vy;
        }

    }
}

function update() {
    cc.fillStyle = 'black';
    cc.fillRect(0, 0, canvasSize, canvasSize);
    
  for (const color1 in colorObj) {
    for (const color2 in colorObj) {
      rule(
        colorObj[color1].value,
        colorObj[color2].value,
        document.getElementById(
          `${colorObj[color1].label}-${colorObj[color2].label}`
        ).value * 1 || 0
      );
    }
    draw(colorObj[color1].value, colorObj[color1].label);
  }

    // rule(red, red, document.getElementById('red-red').value*1 || 0);

    // rule(blue, blue, document.getElementById('blue-blue').value*1 ||0);
    // rule(blue, red, document.getElementById('blue-red').value*1 ||0);
    // rule(red, blue, document.getElementById('red-blue').value*1 ||0);

    // rule(green, green, document.getElementById('green-green').value*1||0);
    // rule(green, red, document.getElementById('green-red').value*1||0);
    // rule(red, green, document.getElementById('red-green').value*1||0);
    // rule(blue, green, document.getElementById('blue-green').value*1||0);
    // rule(green, blue, document.getElementById('green-blue').value*1||0);
    // draw(red, 'red');
    // draw(blue, 'blue');
    // draw(green, 'green');
    animationFrame = requestAnimationFrame(update);
}

function getDistance(p1, p2) {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
}

function start() {
    if (animationFrame) {
        cancelAnimationFrame(animationFrame);
    }
    for (const color in colorObj) {
        colorObj[color].value = createGroup(
          document.getElementById(colorObj[color].label).value * 1
        );
      }
    // red = createGroup(document.getElementById('red').value * 1);
    // blue = createGroup(document.getElementById('blue').value * 1);
    // green = createGroup(document.getElementById('green').value * 1);
    slowSpeed = document.getElementById('slowSpeed').value * 1;

    update();

}
start()