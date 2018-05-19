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

		this.baseSize = 0.4;
		this.articulationSize = 0.38;
		this.baseArmSize = 0.2;
		this.baseArmLength = 4;
		this.catchArmSize = this.baseArmSize;
		this.catchArmLength = 2.5;
		this.ropeLength = 0.6;
		this.ropeRadius = 0.01;
		this.magnetHeight = 0.15;
		this.magnetDiameter = 0.35;

		// Crane Elements Angles
		this.craneAngle = 0;
		this.baseArmAngle = 0;
		this.catchArmAngle = 0;

		this.setBaseArmAngle(Math.PI/3);
		this.setCatchArmAngle(Math.PI/8);
		this.setCraneAngle(Math.PI/8);

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

	display()
	{
		this.scene.rotate(this.craneAngle, 0, 1, 0);

		// Base
		this.scene.pushMatrix();
			this.scene.scale(this.baseSize, this.baseSize, this.baseSize);
			this.scene.rotate(-Math.PI/2, 1, 0 ,0);
			this.cylinder.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.scale(this.baseSize, this.baseSize, this.baseSize);
			this.scene.rotate(Math.PI/2, 1, 0 ,0);
			this.circle.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.translate(0, this.baseSize, 0);
			this.scene.scale(this.baseSize, this.baseSize, this.baseSize);
			this.scene.rotate(-Math.PI/2, 1, 0 ,0);
			this.circle.display();
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
