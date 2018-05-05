/**
 * MyVehicleRightSide
 * @constructor
 */
class MyVehicleRightSide extends CGFobject
{
	constructor(scene, vehicleDistanceToGround)
	{
        super(scene);

		this.quad = new MyQuad(scene);
		this.triangle = new MyTriangle(scene);
		this.vehicleDistanceToGround = vehicleDistanceToGround;
    };

    display() {
		this.scene.pushMatrix();
			this.scene.translate(0, 1.5, 0.625);
			this.scene.scale(1, 1, 0.75);
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.triangle.display();
        this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0, 1.5, 2);
			this.scene.rotate(Math.PI/2, 0, 1, 0) ;
			this.scene.scale(2, 1, 1);
			this.quad.display();
        this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0, 1.5, 3.5);
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.scene.rotate(Math.PI/2, 0, 0, 1);
			this.triangle.display();
        this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0, 0.875, 1);
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.scene.scale(2, 0.25, 1);
			this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0, 0.875, 3);
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.scene.scale(2, 0.25, 1);
			this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0, 5/24+this.vehicleDistanceToGround, 2.25);
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.scene.scale(1.5, 5/12, 1);
			this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0, this.vehicleDistanceToGround+5/24, 0.25);
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.scene.scale(0.5, 5/12, 1);
			this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0, this.vehicleDistanceToGround+5/24, 0.675);
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.scene.scale(0.35, 5/12, 1);
			this.scene.rotate(Math.PI, 0, 0, 1);
			this.triangle.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0, this.vehicleDistanceToGround+5/24, 3.175);
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.scene.scale(0.35, 5/12, 1);
			this.scene.rotate(Math.PI, 0, 0, 1);
			this.triangle.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0, this.vehicleDistanceToGround+5/24, 1.325);
			this.scene.rotate(Math.PI, 1, 0, 0);
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.scene.scale(0.35, 5/12, 1);
			this.scene.rotate(Math.PI/2, 0, 0, 1);
			this.triangle.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0, this.vehicleDistanceToGround+5/24, 3.825);
			this.scene.rotate(Math.PI, 1, 0, 0);
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.scene.scale(0.35, 5/12, 1);
			this.scene.rotate(Math.PI/2, 0, 0, 1);
			this.triangle.display();
		this.scene.popMatrix();

    };
};
