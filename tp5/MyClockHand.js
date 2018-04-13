/**
 * MyClockHand
 * @constructor
 */
class MyClockHand extends CGFobject
{
	constructor(scene)
	{
        super(scene);
        
        this.body = new MyQuad(this.scene);
        this.body.initBuffers();

        this.depth = 0.12;
        this.xyscale = 0.6;

        // Clock cover material
		this.blackAppearance = new CGFappearance(this.scene);
    	this.blackAppearance.setDiffuse(0.0, 0.0, 0.0, 1);
        this.blackAppearance.setSpecular(0, 0, 0, 1);
        this.blackAppearance.setAmbient(0, 0, 0, 1);
    	this.blackAppearance.setShininess(0);
    };
    
    display() {
        this.scene.pushMatrix();
            this.scene.
            this.blackAppearance.apply();
            this.body.display();
        this.scene.popMatrix();
    }
};
