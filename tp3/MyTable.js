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

		// Wood Material
		this.materialWood = new CGFappearance(this.scene);
		this.materialWood.setAmbient(0.5 , 0.3 , 0.0 , 1);
		this.materialWood.setDiffuse(0.3 , 0.17 , 0.0 , 1);
		this.materialWood.setSpecular(0.15 , 0.1 , 0.1 , 1);
		this.materialWood.setShininess(50);

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

			this.materialWood.apply();
			this.cube.display();
		this.scene.popMatrix();
	};
};
