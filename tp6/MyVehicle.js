/**
 * MyVehicle
 * @constructor
 */
class MyVehicle extends CGFobject
{
	constructor(scene)
	{
        super(scene);

        this.wheel = new MyWheel(scene, 20);
        this.turningWheel = new MyWheel(scene, 20);
        //this.turningWheel.setTurningAngle(40);
        this.turningSpeed = 5;
    };

    update(currTime) {
        this.wheel.setAngle(currTime/1000 * 360/60);
	    this.turningWheel.setAngle(currTime/1000 * 360/60);
    }

    descreaseFrontWheelAngle() {
        this.turningWheel.changeTurningAngleBy(-this.turningSpeed);
    }

    increaseFrontWheelAngle() {
        this.turningWheel.changeTurningAngleBy(this.turningSpeed);
    }

    setFrontWheelsAngle(angle) {
        if (angle <= 45 && angle >= -45) {
            this.turningWheel.setTurningAngle(angle);
        }
    }

    display() {

		// Tire #1
        this.scene.pushMatrix();
            this.scene.translate(0.5, 1, 0);
            this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.wheel.display();
        this.scene.popMatrix();

        // Tire #2
        this.scene.pushMatrix();
            this.scene.translate(4.5, 1, 0);
            this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.wheel.display();
        this.scene.popMatrix();

        // Tire #3
        this.scene.pushMatrix();
            this.scene.translate(0.5, 1, 6);
            this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.turningWheel.display();
        this.scene.popMatrix();

        // Tire #4
        this.scene.pushMatrix();
            this.scene.translate(4.5, 1, 6);
            this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.turningWheel.display();
        this.scene.popMatrix();

    };
};
