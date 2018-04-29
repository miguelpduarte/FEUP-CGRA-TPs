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
        this.secondHand = new MyClockHand(this.scene, 0.01, 0.8);
        this.secondHand.initBuffers();
        this.minuteHand = new MyClockHand(this.scene, 0.03, 0.65);
        this.minuteHand.initBuffers();
        this.hourHand = new MyClockHand(this.scene, 0.05, 0.4);
        this.hourHand.initBuffers();

        this.secondHand.setAngle(270);
        this.minuteHand.setAngle(180);
        this.hourHand.setAngle(90);

        this.depth = 0.12;
        this.xyscale = 0.6;

        // Clock cover material
		this.coverAppearance = new CGFappearance(this.scene);
    	this.coverAppearance.loadTexture("./resources/images/clock.png");
    	this.coverAppearance.setDiffuse(0.8,0.8,0.8,1);
    	this.coverAppearance.setSpecular(0.2,0.2,0.2,1);
    	this.coverAppearance.setShininess(15);
    };
    
    drawHands() {
        this.scene.pushMatrix();
            this.scene.translate(0, 0, this.depth + 0.01);
            this.scene.scale(this.xyscale, this.xyscale, 1);
            this.secondHand.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(0, 0, this.depth + 0.01);
            this.scene.scale(this.xyscale, this.xyscale, 1);
            this.minuteHand.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(0, 0, this.depth + 0.01);
            this.scene.scale(this.xyscale, this.xyscale, 1);
            this.hourHand.display();
        this.scene.popMatrix();
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

        this.drawHands();
    };

    update(currTime) {
        this.secondHand.setAngle(currTime/1000 * 360/60);
        this.minuteHand.setAngle(currTime/1000 * 360/(60*60));
        this.hourHand.setAngle(currTime/1000 * 360/(60*60*12));
    }
};
