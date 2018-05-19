/**
 * MyWheel
 * @constructor
 */
class MyWheel extends CGFobject
{
	constructor(scene, vehicle, sides)
	{
        super(scene);

		this.vehicle = vehicle;
        this.body = new MyCylinder(this.scene, sides, 1);
        this.cover = new MyCircle(this.scene, sides);
		this.rim = new MySemiSphere(this.scene, sides, sides);

		this.rimSize = 0.7;

		this.angle = 0;
		this.turningAngle = 0;
        this.ANG_TO_RAD = Math.PI/180;

        this.MIN_TURNING_ANGLE = -55 * this.ANG_TO_RAD;
        this.MAX_TURNING_ANGLE = 55 * this.ANG_TO_RAD;
    };

    setAngle(angle) {
        this.angle = 12*angle * this.ANG_TO_RAD;
    }

	changeAngleBy(angle) {
		this.angle += angle;
	}

	setTurningAngle(angle) {
        this.turningAngle = angle * this.ANG_TO_RAD;
    }

    changeTurningAngleBy(angleDelta) {
        this.turningAngle += angleDelta * this.ANG_TO_RAD;
        if(this.turningAngle > this.MAX_TURNING_ANGLE) {
            this.turningAngle = this.MAX_TURNING_ANGLE;
        } else if(this.turningAngle < this.MIN_TURNING_ANGLE) {
            this.turningAngle = this.MIN_TURNING_ANGLE;
        }
    }

	getMaxTurningAngle() {
		return this.MAX_TURNING_ANGLE;
	}

	getMinTurningAngle() {
		return this.MIN_TURNING_ANGLE;
	}

	getTurningAngle() {
		return this.turningAngle;
	}

    display() {

		// Rim #1
        this.scene.pushMatrix();
			this.scene.rotate(this.turningAngle, 0, 1, 0);
			this.scene.rotate(this.angle, 0, 0, 1);
			this.scene.translate(0, 0, 0.5);
			this.scene.scale(this.rimSize, this.rimSize, 0.1);
			this.vehicle.texGroup.wheelRimMaterial.apply();
            this.rim.display();
        this.scene.popMatrix();

		// Rim #2
        this.scene.pushMatrix();
			this.scene.rotate(this.turningAngle, 0, 1, 0);
			this.scene.rotate(this.angle, 0, 0, 1);
			this.scene.translate(0, 0, -0.5);
			this.scene.scale(this.rimSize, this.rimSize, 0.1);
			this.scene.rotate(Math.PI, 0, 1, 0);

			this.vehicle.texGroup.wheelRimMaterial.apply();
            this.rim.display();
        this.scene.popMatrix();

		// Tire Cover #1
        this.scene.pushMatrix();
			this.scene.rotate(this.turningAngle, 0, 1, 0);
            this.scene.rotate(this.angle, 0, 0, 1);
			this.scene.translate(0, 0, 0.5);

			this.vehicle.texGroup.wheelTireSideMaterial.apply();
            this.cover.display();
        this.scene.popMatrix();

		// Tire Cover #2
        this.scene.pushMatrix();
			this.scene.rotate(this.turningAngle, 0, 1, 0);
            this.scene.rotate(this.angle, 0, 0, 1);
			this.scene.rotate(Math.PI, 0, 0, 1);
			this.scene.scale(1, -1, 1);
			this.scene.translate(0, 0, -0.5);

			this.vehicle.texGroup.wheelTireSideMaterial.apply();
            this.cover.display();
        this.scene.popMatrix();

		// Tire Body
        this.scene.pushMatrix();
			this.scene.rotate(this.turningAngle, 0, 1, 0);
            this.scene.rotate(this.angle, 0, 0, 1);
			this.scene.translate(0, 0, -0.5);
			
			this.vehicle.texGroup.wheelTireMaterial.apply();
            this.body.display();
        this.scene.popMatrix();
    };
};
