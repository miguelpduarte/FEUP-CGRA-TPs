/**
 * MyVehicleBottom
 * @constructor
 */
class MyVehicleBottom extends CGFobject
{
	constructor(scene, vehicleBreath, vehicleDistanceToGround)
	{
        super(scene);

		this.quad = new MyQuad(scene);
		this.vehicleBreath = vehicleBreath;
		this.vehicleDistanceToGround = vehicleDistanceToGround;
    };

    display() {
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
    };
};
