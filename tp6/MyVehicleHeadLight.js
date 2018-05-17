/**
 * MyVehicleHeadLight
 * @constructor
 */
class MyVehicleHeadLight extends CGFobject
{
	constructor(scene, vehicle, sides)
	{
        super(scene);

        this.vehicle = vehicle;
        this.body = new MySemiSphere(scene, sides, sides);
    };

    display() {
        this.scene.pushMatrix();
			this.scene.scale(0.10, 0.08, 0.03);
			
			this.vehicle.texGroup.headLightMaterial.apply();
			this.body.display();
        this.scene.popMatrix();
    };
};
