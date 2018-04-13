/**
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTable extends CGFobject
{
	constructor(scene)
	{
		super(scene);
		this.cube = new MyUnitCubeQuad(this.scene);
		this.cube.initBuffers();

		// Table wood material
		this.tableAppearance = new CGFappearance(this.scene);
    	this.tableAppearance.loadTexture("./resources/images/table.png");
    	this.tableAppearance.setDiffuse(0.8,0.8,0.8,1);
    	this.tableAppearance.setSpecular(0.2,0.2,0.2,1);
    	this.tableAppearance.setShininess(15);

		// Metal Material
		this.materialMetal = new CGFappearance(this.scene);
		this.materialMetal.setAmbient(0.6 , 0.6 , 0.6 , 1);
		this.materialMetal.setDiffuse(0.45 , 0.45 , 0.45 , 1);
		this.materialMetal.setSpecular(0.8 , 0.8 , 0.8 , 1);
		this.materialMetal.setShininess(100);
	};

	display() {
		//Back left leg of cube
		this.scene.pushMatrix();
			this.scene.translate(-2.35, 0, -1.35);
			this.scene.scale(0.3, 3.5, 0.3);
			this.scene.translate(0, 0.5, 0);

			this.materialMetal.apply();
			this.cube.display();
		this.scene.popMatrix();

		//Back right leg of cube
		this.scene.pushMatrix();
			this.scene.translate(2.35, 0, -1.35);
			this.scene.scale(0.3, 3.5, 0.3);
			this.scene.translate(0, 0.5, 0);
			this.cube.display();
		this.scene.popMatrix();

		//Front left leg of cube
		this.scene.pushMatrix();
			this.scene.translate(-2.35, 0, 1.35);
			this.scene.scale(0.3, 3.5, 0.3);
			this.scene.translate(0, 0.5, 0);
			this.cube.display();
		this.scene.popMatrix();

		//Front right leg of cube
		this.scene.pushMatrix();
			this.scene.translate(2.35, 0, 1.35);
			this.scene.scale(0.3, 3.5, 0.3);
			this.scene.translate(0, 0.5, 0);
			this.cube.display();
		this.scene.popMatrix();

		//Top of table
		this.scene.pushMatrix();
			this.scene.translate(0, 3.5, 0);
			this.scene.scale(5, 0.3, 3);
			this.scene.translate(0, 0.5, 0);

			this.tableAppearance.apply();
			this.cube.display();
		this.scene.popMatrix();
	};
};
