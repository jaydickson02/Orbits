let planetPosition;
let SmallestOrbitalRadius = 50;
let bigG = 100;
let orbitalDifference = 20;
let isPaused = false;

let colourList = [
    [255, 99, 71],
    [135, 206, 250],
    [124, 252, 0],
    [255, 215, 0],
    [255, 20, 147],
    [0, 191, 255],
    [50, 205, 50],
    [255, 140, 0],
    [138, 43, 226],
    [255, 105, 180]
];

let satellites = [];
let satelliteCounter = 1;

function setup() {
    createCanvas(windowWidth, windowHeight);
    createUI();

    planetPosition = createVector(width / 2, height / 2);
    let SatPosition = createVector(planetPosition.x, planetPosition.y - SmallestOrbitalRadius);
    let initialSatellite = new Satellite(SatPosition.x, SatPosition.y, 0, 0, 10, colourList[0], 'Satellite 1');
    initialSatellite.findOrbit(planetPosition, bigG);
    satellites.push(initialSatellite);
    updateSatelliteSelect();

    frameRate(60);
}

function draw() {
    if (!isPaused) {
        background(getComputedStyle(document.documentElement).getPropertyValue('--background-color'));
        drawPlanet(planetPosition.x, planetPosition.y, 50);

        for (let i = 0; i < satellites.length; i++) {
            satellites[i].run(planetPosition, bigG);
            satellites[i].draw(planetPosition);
            satellites[i].drawTrail();
            }
            }
            }
            
            function drawPlanet(x, y, size) {
            fill(getComputedStyle(document.documentElement).getPropertyValue('–planet-color'));
            stroke(0);
            strokeWeight(2);
            ellipse(x, y, size, size);
            }
            
            function createUI() {
            let controls = createDiv().id('controls').addClass('flex flex-col space-y-2 fixed top-16 left-10 p-4 rounded-lg z-50');
            controls.child(createButton('Pause/Resume').mousePressed(togglePause).addClass('px-4 py-2 bg-blue-500 text-white rounded'));
            controls.child(createLabeledInput('Add Satellite', 'satelliteLabel', 'Enter label', 'satelliteAltitude', 'Enter altitude'));
            controls.child(createButton('Add').mousePressed(addSatellite).addClass('px-4 py-2 bg-green-500 text-white rounded'));
            controls.child(createLabeledSelect('Select Group', 'groupSelect'));
            controls.child(createButton('Remove Selected').mousePressed(removeSatellite).addClass('px-4 py-2 bg-red-500 text-white rounded'));
            controls.child(createLabeledInput('Acceleration', 'acc', 'Enter acceleration'));
            controls.child(createLabeledInput('Burn Time (s)', 'burnTime', 'Enter burn time'));
            controls.child(createButton('Run').mousePressed(updateAcc).addClass('px-4 py-2 bg-purple-500 text-white rounded'));

        }

        function createLabeledInput(labelText, inputId, inputPlaceholder, inputId2, inputPlaceholder2) {
        let container = createDiv().addClass('flex flex-col space-y-1');
        container.child(createSpan(labelText).addClass('font-semibold text-black dark:text-white'));
        container.child(createInput().id(inputId).attribute('placeholder', inputPlaceholder).addClass('px-3 py-2 border rounded'));
        if (inputId2) {
        container.child(createInput().id(inputId2).attribute('placeholder', inputPlaceholder2).addClass('px-3 py-2 border rounded'));
        }
        return container;
        }
        
        function createLabeledSelect(labelText, selectId) {
        let container = createDiv().addClass('flex flex-col space-y-1');
        container.child(createSpan(labelText).addClass('font-semibold text-black dark:text-white'));
        container.child(createSelect().id(selectId).addClass('px-3 py-2 border rounded'));
        return container;
        }
        
        function updateAcc() {
        let elementAcc = select('#acc').value();
        let elementBurn = select('#burnTime').value();
        let selectedGroup = select('#groupSelect').value();
        if (elementAcc && elementBurn && elementAcc != 0 && elementBurn != 0 && selectedGroup) {
            let accValue = parseFloat(elementAcc);
            let burnTime = parseFloat(elementBurn);
        
            let selectedSatellites = satellites.filter(satellite => satellite.label.includes(selectedGroup));
            selectedSatellites.forEach(satellite => satellite.applyBurn(accValue, burnTime));
        }
    }

    function togglePause() {
    isPaused = !isPaused;
    }
    
    function addSatellite() {
    let label = select('#satelliteLabel').value();
    let altitude = parseFloat(select('#satelliteAltitude').value());
    if (label && !isNaN(altitude)) {
        let newSatellitePos = createVector(planetPosition.x, planetPosition.y - SmallestOrbitalRadius - altitude);
        let colourIndex = satellites.length % colourList.length;
        let uniqueLabel = `${label} ${satelliteCounter++}`;
        let newSatellite = new Satellite(newSatellitePos.x, newSatellitePos.y, 0, 0, 10, colourList[colourIndex], uniqueLabel);
        newSatellite.findOrbit(planetPosition, bigG);
        satellites.push(newSatellite);
        updateSatelliteSelect();
    }
}

function removeSatellite() {
let selectedGroup = select('#groupSelect').value();
if (selectedGroup) {
satellites = satellites.filter(satellite => !satellite.label.includes(selectedGroup));
updateSatelliteSelect();
}
}

function updateSatelliteSelect() {
let satelliteSelect = select('#groupSelect');
satelliteSelect.html('');
let groups = new Set(satellites.map(satellite => satellite.label.split(' ')[0]));
groups.forEach(group => {
satelliteSelect.option(group);
});
}

function selectSatellite() {
// Additional logic can be added here if needed when a satellite is selected
}