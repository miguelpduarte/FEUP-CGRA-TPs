/**
 * MyVehicleTop
 * @constructor
 */
class MyVehicleTop extends CGFobject
{
	constructor(scene, vehicle, vehicleBreath, vehicleHeight)
	{
        super(scene);

		this.quad = new MyQuad(scene);
		this.vehicle = vehicle;
		this.vehicleBreath = vehicleBreath;
		this.vehicleHeight = vehicleHeight;
    };

    display() {
		// Front Part
        this.scene.pushMatrix();
            this.scene.translate(this.vehicleBreath/2, 1.5, 3.5);
			this.scene.rotate(-Math.PI/4, 1, 0, 0);
			this.scene.scale(this.vehicleBreath, Math.sqrt(2), 1);

			this.vehicle.texGroup.paintMaterial.apply();
			this.quad.display();
        this.scene.popMatrix();

		// Top
        this.scene.pushMatrix();
            this.scene.translate(this.vehicleBreath/2, this.vehicleHeight, 2);
			this.scene.rotate(-Math.PI/2, 1, 0, 0);
			this.scene.scale(this.vehicleBreath, 2, 1);

			this.vehicle.texGroup.secondaryPaintMaterial.apply();
			this.quad.display();
        this.scene.popMatrix();

		// Back Part
        this.scene.pushMatrix();
            this.scene.translate(this.vehicleBreath/2, this.vehicleHeight-0.5, 0.625);
			this.scene.rotate(-Math.PI/2-0.927295, 1, 0, 0);
			this.scene.scale(this.vehicleBreath, Math.sqrt(1 + 0.75*0.75), 1);

			this.vehicle.texGroup.paintMaterial.apply();
			this.quad.display();
        this.scene.popMatrix();
    };
};
