let planetPosition;
let accValue = 0;
let burnTime = 0;
let SmallestOrbitalRadius = 50;
let bigG = 100;
let orbitalDifference = 20;
let isPaused = false;
let burnActive = false;

//List of vibrant different colours
let colourList = [ 
    // [255, 0, 0],
    // [255, 255, 0],
    // [0, 255, 0],
    // [0, 255, 255],
    // [0, 0, 255],
    // [255, 0, 255],
    // [255, 60, 255],
    // [255, 0, 127],
    // [127, 0, 255],
    // [0, 255, 127],
    // [127, 255, 0],
    // [0, 127, 255],
    // [255, 127, 0],
    // [255, 255, 127],
    // [127, 255, 255],
    // [255, 127, 255],
    // [127, 127, 127],
    // [255, 127, 127],
    // [127, 255, 127],
    // [127, 127, 255],

    //Shades of gray
    [0, 0, 0],
    [25, 25, 25],
    [50, 50, 50],
    [75, 75, 75],
    [100, 100, 100],
    [125, 125, 125],
    [150, 150, 150],
    [175, 175, 175],
    [200, 200, 200],
    [225, 225, 225],
    [255, 255, 255]
];


//Hold Satellite Objects
let satellites = [];

function setup(){
    //Create Canvas with window width and height
    createCanvas(windowWidth, windowHeight);

    // Pause button
    pauseButton = createButton('Pause/Resume');
    pauseButton.position(2, 30);
    pauseButton.mousePressed(togglePause);

    // Add satellite button
    addButton = createButton('Add Satellite');
    addButton.position(110, 30);
    addButton.mousePressed(addSatellite);

    // Remove satellite button
    removeButton = createButton('Remove Satellite');
    removeButton.position(202, 30);
    removeButton.mousePressed(removeSatellite);

    //Acceleration input button
    button = createButton('Run');
    button.position(298, 8);
    button.mousePressed(updateAcc);
    
    planetPosition = createVector(width/2, height/2);
   
    acceleration = createVector(0, 0);
    SatPosition = createVector(planetPosition.x, planetPosition.y - SmallestOrbitalRadius);
    
    //Initialise a set of satellites
    for(let i = 0; i < 1; i++) {

        satellites[i] = new Satellite(SatPosition.x, SatPosition.y - (i * orbitalDifference), 0, 0, 2, colourList[i]);

        //Find initial velocity
        satellites[i].findOrbit(planetPosition, bigG);
    }
    
    addAcc = createVector(0, 0);
  
    //Set framerate
    frameRate(60);
    
}


function draw(){

    if (!isPaused) {
    
        //Set Background
        background(33,41,54);

        stroke(255)
        //Draw Planet
        ellipse(planetPosition.x, planetPosition.y, 10, 10);

        //Logic for satellites
        for(let i = 0; i < satellites.length; i++) {
            satellites[i].run(planetPosition, bigG, accValue);
            satellites[i].draw();
            satellites[i].drawTrail();
        } 

        //Burn Logic
        if(burnActive) {
            burnTimer()
        }
    }
}

function updateAcc(){

    const elementAcc = document.getElementById("acc");
    const elementBurn = document.getElementById("burnTime");

    if(elementAcc.value == "" || elementBurn.value == "" || elementAcc.value == 0 || elementBurn.value == 0) {
        return;
    }

    accValue = parseFloat(elementAcc.value) / 1000;
    burnTime = parseFloat(elementBurn.value) * 60;

    burnActive = true;
 
}

function burnTimer() {
    if (burnTime > 0) {
        burnTime -= 1;
    }
    else {
        accValue = 0;
        burnActive = false;
    }
}

function togglePause() {
    isPaused = !isPaused;
}

function addSatellite() {
    let newSatelliteIndex = satellites.length;
    let newSatellitePos = createVector(planetPosition.x, planetPosition.y - SmallestOrbitalRadius - newSatelliteIndex * orbitalDifference);
    let newSatellite = new Satellite(newSatellitePos.x, newSatellitePos.y, 0, 0, 2, colourList[newSatelliteIndex % colourList.length]);
    newSatellite.findOrbit(planetPosition, bigG);
    satellites.push(newSatellite);
}

function removeSatellite() {
    if (satellites.length > 0) {
        satellites.pop();
    }
}