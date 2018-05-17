/**
 * MyVehicle
 * @constructor
 */
class MyVehicle extends CGFobject
{
	constructor(scene)
	{
		super(scene);
		
		// Vehicle Materials
		this.texGroup = new StylishTextureGroup(scene);

		// Vehicle Dimensions
		this.wheelRadius = 0.35;
		this.wheelBreadth = 0.3;
		this.vehicleBreath = 2.3;
		this.vehicleLength = 5;
		this.vehicleHeight = 2;
		this.vehicleDistanceToGround = 1/3;

		// Vehicle Parts
        this.wheel = new MyWheel(scene, this, 20);
        this.turningWheel = new MyWheel(scene, this, 20);
		this.cube = new MyUnitCubeQuad(scene);
		this.quad = new MyQuad(scene);
		this.triangle = new MyTriangle(scene);
		this.circle = new MyCircle(scene, 20);
		this.rightSide = new MyVehicleRightSide(scene, this, this.vehicleDistanceToGround);
		this.leftSide = new MyVehicleLeftSide(scene, this, this.vehicleDistanceToGround);
		this.exhaustPipe = new MyExhaustPipe(scene);
		this.top = new MyVehicleTop(scene, this, this.vehicleBreath, this.vehicleHeight);
		this.bottom = new MyVehicleBottom(scene, this.vehicleBreath, this.vehicleDistanceToGround);
		this.glass = new Plane(scene, 20);
		this.trapezoidGlass1 = new MyTrapezoid(scene, 0.5);
		this.trapezoidGlass2 = new MyTrapezoid(scene, 0.5, true);
		this.headLight = new MyVehicleHeadLight(scene, this, 20);
		this.mirror = new MyVehicleSideMirror(scene, this);

		// Vehicle Physics and Status
		this.x = 0;
		this.z = 0;
		this.direction_angle = 0;
        this.turningSpeed = 5;
		this.vehicleSpeed = 0;
		this.vehicleMaxSpeed = 0.2;
		this.vehicleMinSpeed = -this.vehicleMaxSpeed;
		this.vehicleAcceleration = 0.004;
		this.ground_friction = 0.0016;
    };

	update(dir) {
		if (dir == "front") {
			this.vehicleSpeed = Math.min(this.vehicleSpeed + this.vehicleAcceleration, this.vehicleMaxSpeed);
		}
		else if (dir == "back") {
			this.vehicleSpeed = Math.max(this.vehicleSpeed - this.vehicleAcceleration, this.vehicleMinSpeed);
		}
	}

	updatePos() {
		// Update vehicle angle based on the wheels angle
		this.direction_angle += this.vehicleSpeed*this.turningWheel.getTurningAngle()/3.5;	// Divide by factor 3 to make the curve smooth

		// Add ground friction
		if (this.vehicleSpeed != 0) {
			this.vehicleSpeed -= this.ground_friction * (this.vehicleSpeed/Math.abs(this.vehicleSpeed));

			if (this.turningWheel.getTurningAngle() != 0) {
				this.turningWheel.changeTurningAngleBy(-6*Math.abs(this.vehicleSpeed)*(this.turningWheel.getTurningAngle()/Math.abs(this.turningWheel.getTurningAngle())));
			}
		}

		// Move the vehicle
		this.z += this.vehicleSpeed * Math.cos(this.direction_angle);
		this.x += this.vehicleSpeed * Math.sin(this.direction_angle);

		// Turn wheels
		this.wheel.changeAngleBy(Math.cos(this.turningWheel.getTurningAngle())*this.vehicleSpeed/this.wheelRadius);
		this.turningWheel.changeAngleBy(Math.cos(this.turningWheel.getTurningAngle())*this.vehicleSpeed/this.wheelRadius);
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

		this.texGroup.paintMaterial.apply();

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
		this.texGroup.exhaustPipeMaterial.apply();
        this.scene.pushMatrix();
			this.scene.translate(this.vehicleBreath-0.10, 0.4, -0.15);
			this.exhaustPipe.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
			this.scene.translate(this.vehicleBreath-0.25, 0.4, -0.15);
			this.exhaustPipe.display();
        this.scene.popMatrix();

		// Front Glass
		this.texGroup.glassMaterial.apply();
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
		this.scene.pushMatrix();
			this.scene.translate(this.vehicleBreath/2, 0.53, this.vehicleLength-0.09);
			this.scene.scale(1, 0.214, 1);

			this.texGroup.licensePlateMaterial.apply();
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
		this.texGroup.paintMaterial.apply();
		this.scene.pushMatrix();
			this.scene.translate(this.vehicleBreath, 1.12, 3.72);
			this.mirror.display();
        this.scene.popMatrix();

		// Vehicle Left Side Mirror
		this.texGroup.paintMaterial.apply();
		this.scene.pushMatrix();
			this.scene.translate(0, 1.12, 3.72);
			this.scene.rotate(Math.PI, 0, 0, 1);
			this.mirror.display();
        this.scene.popMatrix();

    };
};
