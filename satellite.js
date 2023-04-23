
//Class for sattelite
class Satellite {
        constructor(x, y, vx, vy, size, colour = [0, 0, 0]){
            
            //Create a position vector
            this.pos = createVector(x, y);

            //Create a velocity vector
            this.vel = createVector(vx, vy);

            //Define the scalar properties
            this.mass = size;
            this.colour = colour;

            //Values for drawing and managing trail.
            this.trailPoints = [];
            this.frameCount = 0;
            this.framesTillRemove = 2;
            this.pointsPerRemove = 1;
    }

    //Method to run the satellite
    run(orbitalBody, G, tangentAcceleration) {

        let gAcc = this.gravityAcceleration(planetPosition, G);
        let acceleration = this.applyAcceleration(orbitalBody, gAcc, tangentAcceleration, "prograde");

        this.propogate(acceleration);

    }

    //Method to update the position of the satellite
    propogate(accelerationVector){

        //Update the position
        this.vel.add(accelerationVector);
        this.pos.add(this.vel);
    }

    //Find the starting velocity for a circular orbit
    findOrbit(planetPosition, G) {
        
    let distanceVector = p5.Vector.sub(planetPosition, this.pos);

    let gravity = (1/(distanceVector.mag()**2)) * G;

    let initialV = Math.sqrt(gravity * distanceVector.mag());

    let velocity = createVector(initialV, 0);

    this.vel = velocity;
    }


    //Find the acceleration vector
    applyAcceleration(planetPosition, gravityAcceleration, tangentAcceleration, direction = "prograde") {
        
        let distanceVector = p5.Vector.sub(planetPosition, this.pos);
        
        distanceVector.normalize()

        //Get tangent vectors
        let prograde = createVector(distanceVector.y, -distanceVector.x);
        let retrograde = createVector(distanceVector.y, distanceVector.x);

        //Set Magnitudes
        prograde.setMag(accValue);
        retrograde.setMag(accValue);

        //Set final Vector
        
        if(direction == "prograde") {
            //Add Accelerations
            let acceleration = prograde.add(gravityAcceleration).add(tangentAcceleration);
            return(acceleration);
            

        }
        else if(direction == "retrograde") {
            //Add Accelerations
            let acceleration = retrograde.add(gravityAcceleration).add(tangentAcceleration);
            return(acceleration);
        }

    }

    //Find gravity acceleration
    gravityAcceleration(planetPosition, G) {

     //Calculate Gravity Vector
    
    let gravityVector = p5.Vector.sub(planetPosition, this.pos);

    let distanceVector = p5.Vector.sub(planetPosition, this.pos);
    
    gravityVector.normalize()

    //Associated mag with 1/r^2 relationship

    let gravity = (1/(distanceVector.mag()**2)) * G;
    gravityVector.setMag(gravity)
    
    return(gravityVector);
    }

    //Method to draw the satellite
    draw() {
        fill(this.colour[0], this.colour[1], this.colour[2]);
        circle(this.pos.x, this.pos.y, this.mass);
    }

    drawTrail() {
    //Add trail point
    this.trailPoints.unshift([this.pos.x, this.pos.y]);

    //Trail logic
    this.frameCount++
    
    if(this.frameCount >= this.framesTillRemove){
        this.frameCount = 0;
        for(let i = 0; i < this.pointsPerRemove; i ++){

            this.trailPoints.pop();
        }
    }

    //Draw trail
    noFill();

    stroke(this.colour[0], this.colour[1], this.colour[2], 100);
    
    beginShape();
    
    for(let i = 0; i < this.trailPoints.length; i++){
        curveVertex(this.trailPoints[i][0], this.trailPoints[i][1]);
    }

    endShape();

    stroke(0);
    }
}    
