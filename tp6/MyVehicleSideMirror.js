/**
 * MyVehicleSideMirror
 * @constructor
 */
class MyVehicleSideMirror extends CGFobject
{
	constructor(scene)
	{
        super(scene);

		this.semiSphere = new MySemiSphere(scene, 30, 30);
		this.circle = new MyCircle(scene, 30);
		this.cylinder = new MyCylinder(scene, 20, 20);

		this.glassMaterial = new CGFappearance(scene);
		this.glassMaterial.setAmbient(179/255, 217/255, 255/255, 1);
		this.glassMaterial.setDiffuse(0, 0, 0, 1);
		this.glassMaterial.setSpecular(179/255, 217/255, 255/255, 1);
		this.glassMaterial.setShininess(150);
    };

    display() {
		// Mirror Support Piece
        this.scene.pushMatrix();
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.scene.scale(0.015, 0.015, 0.1);
			this.cylinder.display();
        this.scene.popMatrix();

		// Mirror Body
        this.scene.pushMatrix();
			this.scene.translate(0.15, 0, -0.02);
			this.scene.scale(0.12, 0.07, 0.05);
			this.semiSphere.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
			this.scene.translate(0.15, 0, -0.02);
			this.scene.rotate(Math.PI, 1, 0, 0);
			this.scene.scale(0.12, 0.07, 1);
			this.circle.display();
        this.scene.popMatrix();

		// Mirror glass
		this.glassMaterial.apply();
        this.scene.pushMatrix();
			this.scene.translate(0.15, 0, -0.021);
			this.scene.rotate(Math.PI, 1, 0, 0);
			this.scene.scale(0.11, 0.06, 1);
			this.circle.display();
        this.scene.popMatrix();
    };
};
