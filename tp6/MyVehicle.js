/**
 * MyVehicle
 * @constructor
 */
class MyVehicle extends CGFobject
{
	constructor(scene)
	{
        super(scene);

		// Vehicle Dimensions
		this.wheelRadius = 0.35;
		this.wheelBreadth = 0.3;
		this.vehicleBreath = 2.3;
		this.vehicleLength = 5;
		this.vehicleHeight = 2;
		this.vehicleDistanceToGround = 1/3;

		// Vehicle Parts
        this.wheel = new MyWheel(scene, 20);
        this.turningWheel = new MyWheel(scene, 20);
		this.cube = new MyUnitCubeQuad(scene);
		this.quad = new MyQuad(scene);
		this.triangle = new MyTriangle(scene);
		this.circle = new MyCircle(scene, 20);
		this.rightSide = new MyVehicleRightSide(scene, this.vehicleDistanceToGround);
		this.leftSide = new MyVehicleLeftSide(scene, this.vehicleDistanceToGround);
		this.exhaustPipe = new MyExhaustPipe(scene);

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
            this.scene.translate(this.wheelBreadth/2, this.wheelRadius, 1);
            this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.scene.scale(this.wheelRadius, this.wheelRadius, this.wheelBreadth);
			this.wheel.display();
        this.scene.popMatrix();

        // Tire #2
        this.scene.pushMatrix();
            this.scene.translate(this.vehicleBreath - this.wheelBreadth/2, this.wheelRadius, 1);
            this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.scene.scale(this.wheelRadius, this.wheelRadius, this.wheelBreadth);
			this.wheel.display();
        this.scene.popMatrix();

        // Tire #3
        this.scene.pushMatrix();
            this.scene.translate(this.wheelBreadth/2, this.wheelRadius, 3.5);
            this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.scene.scale(this.wheelRadius, this.wheelRadius, this.wheelBreadth);
			this.turningWheel.display();
        this.scene.popMatrix();

        // Tire #4
        this.scene.pushMatrix();
            this.scene.translate(this.vehicleBreath - this.wheelBreadth/2, this.wheelRadius, 3.5);
            this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.scene.scale(this.wheelRadius, this.wheelRadius, this.wheelBreadth);
			this.turningWheel.display();
        this.scene.popMatrix();

		this.scene.materialDefault.apply();

		// Front
        this.scene.pushMatrix();
            this.scene.translate(this.vehicleBreath/2, 2/3, 4.375);
			this.scene.scale(this.vehicleBreath, 2/3, 0.75);
			this.cube.display();
        this.scene.popMatrix();

		// Front Glass
        this.scene.pushMatrix();
            this.scene.translate(this.vehicleBreath/2, 1.5, 3.5);
			this.scene.rotate(-Math.PI/4, 1, 0, 0);
			this.scene.scale(this.vehicleBreath, Math.sqrt(2), 1);
			this.quad.display();
        this.scene.popMatrix();

		// Top
        this.scene.pushMatrix();
            this.scene.translate(this.vehicleBreath/2, this.vehicleHeight, 2);
			this.scene.rotate(-Math.PI/2, 1, 0, 0);
			this.scene.scale(this.vehicleBreath, 2, 1);
			this.quad.display();
        this.scene.popMatrix();

		// Back Glass
        this.scene.pushMatrix();
            this.scene.translate(this.vehicleBreath/2, this.vehicleHeight-0.5, 0.625);
			this.scene.rotate(-Math.PI/2-0.927295, 1, 0, 0);
			this.scene.scale(this.vehicleBreath, Math.sqrt(1 + 0.75*0.75), 1);
			this.quad.display();
        this.scene.popMatrix();

		// Back
        this.scene.pushMatrix();
            this.scene.translate(this.vehicleBreath/2, 1, 0.125);
			this.scene.rotate(-Math.PI/2, 1, 0, 0);
			this.scene.scale(this.vehicleBreath, 0.25, 1);
			this.quad.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
            this.scene.translate(this.vehicleBreath/2, 1/3 + this.vehicleDistanceToGround, 0);
			this.scene.rotate(Math.PI, 1, 0, 0);
			this.scene.scale(this.vehicleBreath, 2/3, 1);
			this.quad.display();
        this.scene.popMatrix();

		// Car bottom
        this.scene.pushMatrix();
            this.scene.translate(this.vehicleBreath/2, this.vehicleDistanceToGround, 0.25);
			this.scene.rotate(Math.PI/2, 1, 0, 0);
			this.scene.scale(this.vehicleBreath, 0.5, 1);
			this.quad.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
            this.scene.translate(this.vehicleBreath/2, this.vehicleDistanceToGround, 2.25);
			this.scene.rotate(Math.PI/2, 1, 0, 0);
			this.scene.scale(this.vehicleBreath, 1.5, 1);
			this.quad.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
            this.scene.translate(this.vehicleBreath/2, 0.75, 1);
			this.scene.rotate(Math.PI/2, 1, 0, 0);
			this.scene.scale(this.vehicleBreath, 0.3, 1);
			this.quad.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
            this.scene.translate(this.vehicleBreath/2, 0.75, 3.5);
			this.scene.rotate(Math.PI/2, 1, 0, 0);
			this.scene.scale(this.vehicleBreath, 0.3, 1);
			this.quad.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
            this.scene.translate(this.vehicleBreath/2, 13/24, 0.675);
			this.scene.rotate(0.698659, 1, 0, 0);
			this.scene.scale(this.vehicleBreath, Math.sqrt(5/12*5/12 + 0.35*0.35), 1);
			this.quad.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
            this.scene.translate(this.vehicleBreath/2, 13/24, 3.175);
			this.scene.rotate(0.698659, 1, 0, 0);
			this.scene.scale(this.vehicleBreath, Math.sqrt(5/12*5/12 + 0.35*0.35), 1);
			this.quad.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
            this.scene.translate(this.vehicleBreath/2, 13/24, 1.325);
			this.scene.rotate(-0.698659 + Math.PI, 1, 0, 0);
			this.scene.scale(this.vehicleBreath, Math.sqrt(5/12*5/12 + 0.35*0.35), 1);
			this.quad.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
            this.scene.translate(this.vehicleBreath/2, 13/24, 3.825);
			this.scene.rotate(-0.698659 + Math.PI, 1, 0, 0);
			this.scene.scale(this.vehicleBreath, Math.sqrt(5/12*5/12 + 0.35*0.35), 1);
			this.quad.display();
        this.scene.popMatrix();

		// Vehicle Right Side
        this.scene.pushMatrix();
			this.scene.translate(this.vehicleBreath, 0, 0);
			this.rightSide.display();
        this.scene.popMatrix();

		// Vehicle Left Side
        this.scene.pushMatrix();
			this.leftSide.display();
        this.scene.popMatrix();

		// Vehicle Exhaust Pipes
        this.scene.pushMatrix();
			this.scene.translate(this.vehicleBreath-0.10, 0.4, -0.15);
			this.exhaustPipe.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
			this.scene.translate(this.vehicleBreath-0.25, 0.4, -0.15);
			this.exhaustPipe.display();
        this.scene.popMatrix();

    };
};
