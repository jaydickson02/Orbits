let planetPosition;

let accValue = 0;

let SmallestOrbitalRadius = 50;

let bigG = 100;

let orbitalDifference = 20;

//List of vibrant different colours
let colourList = [ 
    [255, 0, 0],
    [255, 255, 0],
    [0, 255, 0],
    [0, 255, 255],
    [0, 0, 255],
    [255, 0, 255],
    [255, 60, 255],
    [255, 0, 127],
    [127, 0, 255],
    [0, 255, 127],
    [127, 255, 0],
    [0, 127, 255],
    [255, 127, 0],
    [255, 255, 127],
    [127, 255, 255],
    [255, 127, 255],
    [127, 127, 127],
    [255, 127, 127],
    [127, 255, 127],
    [127, 127, 255],
];


//Hold Satellite Objects
let satellites = [];

function updateAcc(){

    const element = document.getElementById("acc");
    accValue = parseFloat(element.value);

}

function setup(){
    //Create Canvas with window width and height
    createCanvas(windowWidth - 10, windowHeight - 45);
    
    planetPosition = createVector(width/2, height/2);
   
    acceleration = createVector(0, 0);
    SatPosition = createVector(planetPosition.x, planetPosition.y - SmallestOrbitalRadius);
    
    //Initialise a set of satellites
    for(let i = 0; i < 10; i++) {

        satellites[i] = new Satellite(SatPosition.x, SatPosition.y - (i * orbitalDifference), 0, 0, 2, colourList[i]);

        //Find initial velocity
        satellites[i].findOrbit(planetPosition, bigG);
    }
    
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

    //Logic for satellites
    for(let i = 0; i < satellites.length; i++) {
        satellites[i].run(planetPosition, bigG, accValue);
        satellites[i].draw();
        satellites[i].drawTrail();
    } 
}
