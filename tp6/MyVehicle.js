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
		this.top = new MyVehicleTop(scene, this.vehicleBreath, this.vehicleHeight);
		this.bottom = new MyVehicleBottom(scene, this.vehicleBreath, this.vehicleDistanceToGround);
		this.glass = new Plane(scene, 20);
		this.trapezoidGlass1 = new MyTrapezoid(scene, 0.5);
		this.trapezoidGlass2 = new MyTrapezoid(scene, 0.5, true);
		this.headLight = new MyVehicleHeadLight(scene, 20);
		this.mirror = new MyVehicleSideMirror(scene);

		// Vehicle Materials
		this.blueColorMaterial = new CGFappearance(scene);
		this.blueColorMaterial.setAmbient(0.05 , 0.05 , 0.20 , 1);
		this.blueColorMaterial.setDiffuse(0.025 , 0.025 , 0.10 , 1);
		this.blueColorMaterial.setSpecular(0.05 , 0.05 , 0.20 , 1);
		this.blueColorMaterial.setShininess(50);

		this.glassMaterial = new CGFappearance(scene);
		this.glassMaterial.setAmbient(179/255, 217/255, 255/255, 1);
		this.glassMaterial.setDiffuse(0, 0, 0, 1);
		this.glassMaterial.setSpecular(179/255, 217/255, 255/255, 1);
		this.glassMaterial.setShininess(150);

        this.metalAppearance = new CGFappearance(this.scene);
        this.metalAppearance.loadTexture("./resources/images/metal.jpg");

        this.licensePlateAppearance = new CGFappearance(this.scene);
        this.licensePlateAppearance.loadTexture("./resources/images/licensePlate.jpg");

		// Vehicle Status
		this.x = 0;
		this.z = 0;
        this.turningSpeed = 5;
		this.vehicleSpeed = 0.08;
		this.direction_angle = 0;
    };

	update(dir) {
		if (dir == "front") {
			this.direction_angle += this.turningWheel.getTurningAngle()/40;	// Divide by factor 40 to make the curve smooth
			this.z += this.vehicleSpeed * Math.cos(this.direction_angle);
			this.x += this.vehicleSpeed * Math.sin(this.direction_angle);
			this.turnWheels(dir);
		} else if (dir == "back") {
		this.direction_angle -= this.turningWheel.getTurningAngle()/40;		// Divide by factor 40 to make the curve smooth
			this.z -= this.vehicleSpeed * Math.cos(this.direction_angle);
			this.x -= this.vehicleSpeed * Math.sin(this.direction_angle);
			this.turnWheels(dir);
		}
	}

	turnWheels(dir) {
		if (dir == "front") {
			this.wheel.changeAngleBy(this.vehicleSpeed/this.wheelRadius);
			this.turningWheel.changeAngleBy(this.vehicleSpeed/this.wheelRadius);
		} else if (dir == "back") {
			this.wheel.changeAngleBy(-this.vehicleSpeed/this.wheelRadius);
			this.turningWheel.changeAngleBy(-this.vehicleSpeed/this.wheelRadius);
		}
	}

    descreaseFrontWheelAngle() {
        this.turningWheel.changeTurningAngleBy(-this.turningSpeed);
    }

    increaseFrontWheelAngle() {
        this.turningWheel.changeTurningAngleBy(this.turningSpeed);
    }

    setFrontWheelsAngle(angle) {
        if (angle <= this.turningWheel.getMaxTurningAngle() && angle >= this.turningWheel.getMinTurningAngle()) {
            this.turningWheel.setTurningAngle(angle);
        }
    }

	moveVehicle() {
		// Perform the movement itself
		this.scene.translate(this.x, 0, this.z);

		// The vehicle has frontal traction, make rotation around back wheels and replace vehicle's position
		this.scene.translate(this.vehicleBreath/2, 0, this.vehicleLength/3);
		this.scene.rotate(this.direction_angle, 0, 1, 0);
		this.scene.translate(-this.vehicleBreath/2, 0, -this.vehicleLength/3);
	}

    display() {
		this.moveVehicle();

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

		this.blueColorMaterial.apply();

		// Front
        this.scene.pushMatrix();
            this.scene.translate(this.vehicleBreath/2, 2/3, 4.45);
			this.scene.scale(this.vehicleBreath, 2/3, 0.9);
			this.cube.display();
        this.scene.popMatrix();

		// Top
		this.scene.pushMatrix();
			this.top.display();
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

		// Vehicle bottom
		this.scene.pushMatrix();
			this.bottom.display();
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
		this.metalAppearance.apply();
        this.scene.pushMatrix();
			this.scene.translate(this.vehicleBreath-0.10, 0.4, -0.15);
			this.exhaustPipe.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
			this.scene.translate(this.vehicleBreath-0.25, 0.4, -0.15);
			this.exhaustPipe.display();
        this.scene.popMatrix();

		// Front Glass
		this.glassMaterial.apply();
        this.scene.pushMatrix();
            this.scene.translate(this.vehicleBreath/2, 1.5 + 0.01, 3.5 + 0.01);
			this.scene.rotate(-Math.PI/4, 1, 0, 0);
			this.scene.scale(this.vehicleBreath-0.2, Math.sqrt(2)-0.2, 1);
			this.glass.display();
        this.scene.popMatrix();

		// Back Glass
        this.scene.pushMatrix();
            this.scene.translate(this.vehicleBreath/2, this.vehicleHeight-0.5 + 0.01, 0.625 - 0.01);
			this.scene.rotate(-Math.PI/2-0.927295, 1, 0, 0);
			this.scene.scale(this.vehicleBreath-0.2, Math.sqrt(1 + 0.75*0.75)-0.2, 1);
			this.glass.display();
        this.scene.popMatrix();

		// Right Side glasses
        this.scene.pushMatrix();
			this.scene.translate(this.vehicleBreath + 0.01, 1.5, 1.225);
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.scene.scale(1.25, 0.75, 1);
			this.trapezoidGlass1.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
			this.scene.translate(this.vehicleBreath + 0.01, 1.5, 2.85);
			this.scene.rotate(-Math.PI/2, 0, 1, 0);
			this.scene.scale(1.5, 0.75, 1);
			this.trapezoidGlass2.display();
        this.scene.popMatrix();

		// Left Side glasses
        this.scene.pushMatrix();
			this.scene.translate(-0.01, 1.5, 2.85);
			this.scene.rotate(-Math.PI/2, 0, 1, 0);
			this.scene.scale(1.5, 0.75, 1);
			this.trapezoidGlass1.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
			this.scene.translate(-0.01, 1.5, 1.225);
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.scene.scale(1.25, 0.75, 1);
			this.trapezoidGlass2.display();
        this.scene.popMatrix();

		// License Plate
		this.licensePlateAppearance.apply();
		this.scene.pushMatrix();
			this.scene.translate(this.vehicleBreath/2, 0.53, this.vehicleLength-0.09);
			this.scene.scale(1, 0.214, 1);
			this.quad.display();
        this.scene.popMatrix();

		// Head Lights
		this.scene.pushMatrix();
			this.scene.translate(0.25, 0.53, this.vehicleLength-0.09);
			this.headLight.display();
        this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.translate(this.vehicleBreath-0.25, 0.53, this.vehicleLength-0.09);
			this.headLight.display();
        this.scene.popMatrix();

		// Vehicle Right Side Mirror
		this.blueColorMaterial.apply();
		this.scene.pushMatrix();
			this.scene.translate(this.vehicleBreath, 1.12, 3.72);
			this.mirror.display();
        this.scene.popMatrix();

		// Vehicle Left Side Mirror
		this.blueColorMaterial.apply();
		this.scene.pushMatrix();
			this.scene.translate(0, 1.12, 3.72);
			this.scene.rotate(Math.PI, 0, 0, 1);
			this.mirror.display();
        this.scene.popMatrix();

    };
};
