/**
 * MyClock
 * @constructor
 */
class MyClock extends CGFobject
{
	constructor(scene)
	{
        super(scene);
        
        this.body = new MyCylinder(this.scene, 12, 1);
        this.body.initBuffers();
        this.cover = new MyCircle(this.scene, 12);
        this.cover.initBuffers();

        this.depth = 0.12;
        this.xyscale = 0.6;

        // Clock cover material
		this.coverAppearance = new CGFappearance(this.scene);
    	this.coverAppearance.loadTexture("./resources/images/clock.png");
    	this.coverAppearance.setDiffuse(0.8,0.8,0.8,1);
    	this.coverAppearance.setSpecular(0.2,0.2,0.2,1);
    	this.coverAppearance.setShininess(15);
    };
    
    display() {
        this.scene.pushMatrix();
            this.scene.translate(0, 0, this.depth);
            this.scene.scale(this.xyscale, this.xyscale, 1);
            this.coverAppearance.apply();
            this.cover.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.scale(this.xyscale, this.xyscale, this.depth);
            this.scene.materialDefault.apply();
            this.body.display();
        this.scene.popMatrix();
    }
};
