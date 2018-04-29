/**
 * MyClockHand
 * @constructor
 */
class MyClockHand extends CGFobject
{
	constructor(scene, thickness, length)
	{
        super(scene);
        
        this.body = new MyQuad(this.scene);
        this.body.initBuffers();

        this.thickness = thickness;
        this.length = length;

        this.angle = 0;
        this.ang_to_rad = Math.PI/180;

        // Clock cover material
		this.blackAppearance = new CGFappearance(this.scene);
    	this.blackAppearance.setDiffuse(0.0, 0.0, 0.0, 1);
        this.blackAppearance.setSpecular(0, 0, 0, 1);
        this.blackAppearance.setAmbient(0, 0, 0, 1);
    	this.blackAppearance.setShininess(0);
    };

    setAngle(angle) {
        this.angle = -angle * this.ang_to_rad;
    }
    
    display() {
        this.scene.pushMatrix();
            this.scene.rotate(this.angle, 0, 0, 1);
            this.scene.scale(this.thickness, this.length, 1);
            this.scene.translate(0, 0.5, 0);
            this.blackAppearance.apply();
            this.body.display();
        this.scene.popMatrix();
    }
};
