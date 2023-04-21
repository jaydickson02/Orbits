
//Class for sattelite
class Satellite {
        constructor(x, y, vx, vy, mass, color) {
            
            #Create a position vector
            this.pos = createVector(x, y);

            #Create a velocity vector
            this.vel = createVector(vx, vy);

            #Define the scalar properties
            this.mass = mass;
            this.color = color;
    }

    //Method to update the position of the satellite
    propogate() {

        #Update the position
        this.pos.add(this.vel);
    }
}
