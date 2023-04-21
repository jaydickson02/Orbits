let SatPosition;
let velocity; 
let acceleration;

let gravity = 9.81;

let planetPosition;

let accValue = 0;

let initialOrbitalRadius = 50;

let bigG = 100;

let trailPoints = [];

//Values for drawing and managing trail.
let frameCount = 0;

let framesTillRemove = 2;

let pointsPerRemove = 1;

function updateAcc(){

    const element = document.getElementById("acc");
    accValue = parseFloat(element.value);

}

function findAccelerationVector(){
    

    let distanceVector = p5.Vector.sub(planetPosition, SatPosition);
    
    distanceVector.normalize()

    //Get tangent vectors

    let prograde = createVector(distanceVector.y, -distanceVector.x);

    let retrograde = createVector(distanceVector.y, distanceVector.x);

    //Set Magnitudes
    
    prograde.setMag(accValue);
    retrograde.setMag(accValue);

    //Set final Vector
    
    return(prograde);


}



function setup(){
    createCanvas(1200, 600)
    
    planetPosition = createVector(width/2, height/2);
   
    acceleration = createVector(0, 0);
    SatPosition = createVector(planetPosition.x, planetPosition.y - initialOrbitalRadius);

    
    //Calculate initial velocity for circular orbit
    let distanceVector = p5.Vector.sub(planetPosition, SatPosition);

    gravity = (1/(distanceVector.mag()**2)) * bigG;

    let initialV = Math.sqrt(gravity * distanceVector.mag());

    velocity = createVector(initialV, 0);


    addAcc = createVector(0, 0);
  

    button = createButton('Go');
    button.position(0, 30);

    button.mousePressed(updateAcc);
}


function draw(){

    //Set Background
    
    background(255);

    //Draw Planet

    ellipse(planetPosition.x, planetPosition.y, 10, 10);

    //Calculate Gravity Vector
    
    let gravityVector = p5.Vector.sub(planetPosition, SatPosition);

    let distanceVector = p5.Vector.sub(planetPosition, SatPosition);
    
    gravityVector.normalize()

    //Associated mag with 1/r^2 relationship

    gravity = (1/(distanceVector.mag()**2)) * bigG;
    gravityVector.setMag(gravity)

    //Set Acceleration

    let addAcc = findAccelerationVector(); 
    
    acceleration = gravityVector.add(addAcc);

    //Apply Acceleration
    
    velocity.add(acceleration)
 
    //Apply Velocity

    SatPosition.add(velocity);   

    //Add trail point
    
    trailPoints.unshift([SatPosition.x, SatPosition.y])

    //Trail logic
    
    frameCount++
    
    if(frameCount >= framesTillRemove){
        frameCount = 0;
        for(let i = 0; i < pointsPerRemove; i ++){

            trailPoints.pop();
        }
    }

    //Draw trail
    
    noFill()
    
    beginShape();
    
    for(let i = 0; i < trailPoints.length; i++){

        curveVertex(trailPoints[i][0], trailPoints[i][1]);
    }

    endShape();

    fill(0);

    //Draw Satellite
    
    ellipse(SatPosition.x, SatPosition.y, 2, 2);



   //Text for velocity and altitude data
    
    text("Vel: " + velocity.mag(), 80, 80)
    text("Height: " + distanceVector.mag(), 80, 100)
    text("Acc: " + acceleration.mag(), 80, 120)
}
