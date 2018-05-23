/**
 * MyCrane
 * @constructor
 */
class MyCrane extends CGFobject
{
	constructor(scene)
	{
		super(scene);

		this.circle = new MyCircle(scene, 20);
		this.cylinder = new MyCylinder(scene, 20, 20);
		this.quad = new MyUnitCubeQuad(scene);

		this.baseSize = 0.32;
		this.baseDiameter = 1;
		this.articulationSize = 0.5;
		this.baseArmSize = 0.25;
		this.baseArmLength = 6.6;
		this.catchArmSize = this.baseArmSize;
		this.catchArmLength = 4.5;
		this.ropeLength = 0.8;
		this.ropeRadius = 0.01;
		this.magnetHeight = 0.15;
		this.magnetDiameter = 0.75;
		this.rotatingBaseSize = this.baseSize/2;
		this.rotatingBaseDiameter = 0.7;

		// Animation defines
		this.catchArmSpeed = 3.5E-5;
		this.craneSpeed = 2E-5;

		this.initialBaseArmAngle = Math.PI/12;
		this.initialCatchArmAngle = Math.PI/2;
		this.initialCraneAngle = 0;
		this.catchCatchArmAngle = Math.PI/5.28;
		this.dropZoneCraneAngle = Math.PI;

		this.baseArmAngle = this.initialBaseArmAngle;
		this.catchArmAngle = this.initialCatchArmAngle;
		this.craneAngle = this.initialCraneAngle;

		this.animationState = 'catchVehicle';

		this.initBuffers();
	};

	setCraneAngle(angle) {
		this.craneAngle = angle;
	}

	setBaseArmAngle(angle) {
		this.baseArmAngle = angle;
	}

	setCatchArmAngle(angle) {
		this.catchArmAngle = angle;
	}

	animate(deltaTime) {
		if (this.animationState == 'catchVehicle') {
			this.animateCatchingVehicle(deltaTime);
		} else if (this.animationState == 'pullUpVehicle') {
			this.animatePullUpVehicle(deltaTime);
		} else if (this.animationState == 'turnToDropZone') {
			this.animateTurnToDropZone(deltaTime);
		} else if (this.animationState == 'dropVehicle') {
			this.animateDropVehicle(deltaTime);
		} else if (this.animationState == 'returnStartingPos') {
			this.animateReturnStarting(deltaTime);
		}
	}

	animateCatchingVehicle(deltaTime) {
		if (this.catchArmAngle > this.catchCatchArmAngle) {
			this.catchArmAngle += (this.catchCatchArmAngle-this.initialCatchArmAngle)*this.catchArmSpeed*deltaTime;
		} else {
			this.catchArmAngle = this.catchCatchArmAngle;
			this.animationState = 'pullUpVehicle';
		}
	}

	animatePullUpVehicle(deltaTime) {
		if (this.catchArmAngle < this.initialCatchArmAngle) {
			this.catchArmAngle += (this.initialCatchArmAngle-this.catchCatchArmAngle)*this.catchArmSpeed*deltaTime;
		} else {
			this.catchArmAngle = this.initialCatchArmAngle;
			this.animationState = 'turnToDropZone';
		}
	}
	
	animateTurnToDropZone(deltaTime) {
		if (this.craneAngle < this.dropZoneCraneAngle) {
			this.craneAngle += (this.dropZoneCraneAngle-this.initialCraneAngle)*this.craneSpeed*deltaTime;
		} else {
			this.craneAngle = this.dropZoneCraneAngle;
			this.animationState = 'returnStartingPos';
		}
	}

	animateDropVehicle(deltaTime) {

	}

	animateReturnStarting(deltaTime) {
		if (this.craneAngle > this.initialCraneAngle) {
			this.craneAngle += (this.initialCraneAngle-this.dropZoneCraneAngle)*this.craneSpeed*deltaTime;
		} else {
			this.craneAngle = this.initialCraneAngle;
			this.animationState = 'catchVehicle';
		}
	}

	display()
	{
		// Base
		this.scene.pushMatrix();
			this.scene.scale(this.baseDiameter, this.baseSize, this.baseDiameter);
			this.scene.rotate(-Math.PI/2, 1, 0 ,0);
			this.cylinder.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.scale(this.baseDiameter, this.baseDiameter, this.baseDiameter);
			this.scene.rotate(Math.PI/2, 1, 0 ,0);
			this.circle.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.translate(0, this.baseSize, 0);
			this.scene.scale(this.baseDiameter, this.baseDiameter, this.baseDiameter);
			this.scene.rotate(-Math.PI/2, 1, 0 ,0);
			this.circle.display();
		this.scene.popMatrix();

		this.scene.rotate(this.craneAngle, 0, 1, 0);

		// Rotating Base
		this.scene.pushMatrix();
			this.scene.translate(0, this.baseSize, 0);
			this.scene.pushMatrix();
				this.scene.scale(this.rotatingBaseDiameter, this.rotatingBaseSize, this.rotatingBaseDiameter);
				this.scene.rotate(-Math.PI/2, 1, 0 ,0);
				this.cylinder.display();
			this.scene.popMatrix();	
			this.scene.pushMatrix();
				this.scene.translate(0, this.baseSize/2, 0);
				this.scene.scale(this.rotatingBaseDiameter, this.rotatingBaseDiameter, this.rotatingBaseDiameter);
				this.scene.rotate(-Math.PI/2, 1, 0 ,0);
				this.circle.display();
			this.scene.popMatrix();	
		this.scene.popMatrix();			

		// Base Arm
		this.scene.pushMatrix();
			this.scene.translate(0, this.baseSize/2, 0);
			this.scene.rotate(this.baseArmAngle, 1, 0, 0);
			this.scene.translate(0, this.baseArmLength/2, 0);
			this.scene.scale(this.baseArmSize, this.baseArmLength, this.baseArmSize);
			this.quad.display();
		this.scene.popMatrix();

		// Articulation
		this.scene.pushMatrix();
			this.scene.translate(this.articulationSize/2, this.baseSize/2 + this.baseArmLength*Math.cos(this.baseArmAngle), this.baseArmLength*Math.sin(this.baseArmAngle));
			this.scene.pushMatrix();
				this.scene.scale(this.articulationSize, this.articulationSize, this.articulationSize);
				this.scene.rotate(-Math.PI/2, 0, 1 ,0);
				this.cylinder.display();
			this.scene.popMatrix();
			this.scene.pushMatrix();
				this.scene.scale(this.articulationSize, this.articulationSize, this.articulationSize);
				this.scene.rotate(Math.PI/2, 0, 1 ,0);
				this.circle.display();
			this.scene.popMatrix();
			this.scene.pushMatrix();
				this.scene.translate(-this.articulationSize, 0, 0);
				this.scene.scale(this.articulationSize, this.articulationSize, this.articulationSize);
				this.scene.rotate(-Math.PI/2, 0, 1 ,0);
				this.circle.display();
			this.scene.popMatrix();
		this.scene.popMatrix();

		// Catch Arm
		this.scene.pushMatrix();
			this.scene.translate(0, this.baseSize/2 + this.baseArmLength*Math.cos(this.baseArmAngle), this.baseArmLength*Math.sin(this.baseArmAngle));
			this.scene.rotate(-this.catchArmAngle, 1, 0, 0);
			this.scene.translate(0, -this.catchArmLength/2, 0);
			this.scene.scale(this.catchArmSize, this.catchArmLength, this.catchArmSize);
			this.quad.display();
		this.scene.popMatrix();

		// Rope
		this.scene.pushMatrix();
			this.scene.translate(0, 
								 this.baseArmLength*Math.cos(this.baseArmAngle) - this.catchArmLength*Math.cos(this.catchArmAngle) - this.ropeLength + this.baseSize/1.5,
								 this.baseArmLength*Math.sin(this.baseArmAngle) + this.catchArmLength*Math.sin(this.catchArmAngle));

			this.scene.pushMatrix();
				this.scene.scale(this.ropeRadius, this.ropeLength, this.ropeRadius);
				this.scene.rotate(-Math.PI/2, 1, 0 ,0);
				this.cylinder.display();
			this.scene.popMatrix();
			this.scene.pushMatrix();
				this.scene.scale(this.ropeRadius, this.ropeRadius, this.ropeRadius);
				this.scene.rotate(Math.PI/2, 1, 0 ,0);
				this.circle.display();
			this.scene.popMatrix();
			this.scene.pushMatrix();
				this.scene.translate(0, this.ropeLength, 0);
				this.scene.scale(this.ropeRadius, this.ropeRadius, this.ropeRadius);
				this.scene.rotate(-Math.PI/2, 1, 0 ,0);
				this.circle.display();
			this.scene.popMatrix();
		this.scene.popMatrix();

		// Magnet
		this.scene.pushMatrix();
			this.scene.translate(0, 
								 this.baseArmLength*Math.cos(this.baseArmAngle) - this.catchArmLength*Math.cos(this.catchArmAngle) + this.baseSize/2 - this.ropeLength,
								 this.baseArmLength*Math.sin(this.baseArmAngle) + this.catchArmLength*Math.sin(this.catchArmAngle));

			this.scene.pushMatrix();
				this.scene.scale(this.magnetDiameter, this.magnetHeight, this.magnetDiameter);
				this.scene.rotate(-Math.PI/2, 1, 0 ,0);
				this.cylinder.display();
			this.scene.popMatrix();
			this.scene.pushMatrix();
				this.scene.scale(this.magnetDiameter, this.magnetDiameter, this.magnetDiameter);
				this.scene.rotate(Math.PI/2, 1, 0 ,0);
				this.circle.display();
			this.scene.popMatrix();
			this.scene.pushMatrix();
				this.scene.translate(0, this.magnetHeight, 0);
				this.scene.scale(this.magnetDiameter, this.magnetDiameter, this.magnetDiameter);
				this.scene.rotate(-Math.PI/2, 1, 0 ,0);
				this.circle.display();
			this.scene.popMatrix();
		this.scene.popMatrix();

	};
};
