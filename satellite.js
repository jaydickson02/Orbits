class Satellite {
    constructor(x, y, vx, vy, size, colour = [0, 0, 0], label = "Satellite") {
        this.pos = createVector(x, y);
        this.vel = createVector(vx, vy);
        this.mass = size;
        this.colour = colour;
        this.label = label;
        this.trailPoints = [];
        this.frameCount = 0;
        this.framesTillRemove = 2;
        this.pointsPerRemove = 1;
        this.burnTime = 0;
        this.accValue = 0;
    }

    run(orbitalBody, G) {
        let gAcc = this.gravityAcceleration(orbitalBody, G);
        let acceleration = this.applyAcceleration(orbitalBody, gAcc, this.accValue, "prograde");
        this.propagate(acceleration);

        if (this.burnTime > 0) {
            this.burnTime -= 1;
        } else {
            this.accValue = 0;
        }
    }

    propagate(accelerationVector) {
        this.vel.add(accelerationVector);
        this.pos.add(this.vel);
    }

    findOrbit(planetPosition, G) {
        let distanceVector = p5.Vector.sub(planetPosition, this.pos);
        let gravity = (1 / (distanceVector.mag() ** 2)) * G;
        let initialV = Math.sqrt(gravity * distanceVector.mag());
        let velocity = createVector(initialV, 0);
        this.vel = velocity;
    }

    applyAcceleration(planetPosition, gravityAcceleration, tangentAcceleration, direction = "prograde") {
        let distanceVector = p5.Vector.sub(planetPosition, this.pos);
        distanceVector.normalize();
        let prograde = createVector(distanceVector.y, -distanceVector.x);
        let retrograde = createVector(distanceVector.y, distanceVector.x);
        prograde.setMag(tangentAcceleration);
        retrograde.setMag(tangentAcceleration);
        let acceleration;
        if (direction === "prograde") {
            acceleration = prograde.add(gravityAcceleration);
        } else if (direction === "retrograde") {
            acceleration = retrograde.add(gravityAcceleration);
        }
        return acceleration;
    }

    gravityAcceleration(planetPosition, G) {
        let gravityVector = p5.Vector.sub(planetPosition, this.pos);
        let distanceVector = p5.Vector.sub(planetPosition, this.pos);
        gravityVector.normalize();
        let gravity = (1 / (distanceVector.mag() ** 2)) * G;
        gravityVector.setMag(gravity);
        return gravityVector;
    }

    draw(planetPosition) {
        stroke(0);
        fill(this.colour);
        circle(this.pos.x, this.pos.y, this.mass);

        fill(getComputedStyle(document.documentElement).getPropertyValue('--label-background'));
        noStroke();
        textSize(12);
        let altitude = p5.Vector.dist(this.pos, planetPosition).toFixed(2);
        let velocity = this.vel.mag().toFixed(2);
        fill(getComputedStyle(document.documentElement).getPropertyValue('--label-text-color'));
        text(`${this.label.split(' ')[0]}\nAlt: ${altitude}\nVel: ${velocity}`, this.pos.x + 5, this.pos.y - 5);
    }

    drawTrail() {
        this.trailPoints.unshift([this.pos.x, this.pos.y]);
        this.frameCount++;
        if (this.frameCount >= this.framesTillRemove) {
            this.frameCount = 0;
            for (let i = 0; i < this.pointsPerRemove; i++) {
                this.trailPoints.pop();
            }
        }
        noFill();
        stroke(this.colour[0], this.colour[1], this.colour[2], 100);
        beginShape();
        for (let i = 0; i < this.trailPoints.length; i++) {
            curveVertex(this.trailPoints[i][0], this.trailPoints[i][1]);
        }
        endShape();
        stroke(0);
    }

    applyBurn(accValue, burnTime) {
        this.accValue = accValue;
        this.burnTime = burnTime;
    }
}