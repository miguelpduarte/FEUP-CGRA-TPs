/**
 * MyChair
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyChair extends CGFobject
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
	};

	display() {
		//Back left leg of the chair
		this.scene.pushMatrix();
		    this.scene.translate(-0.9, 0, -1.0);
		    this.scene.scale(0.3, 1.6, 0.3);
		    this.scene.translate(0, 0.5, 0);

  			this.materialWood.apply();
		    this.cube.display();
		this.scene.popMatrix();

		//Back right leg of the chair
		this.scene.pushMatrix();
		    this.scene.translate(0.9, 0, -1.0);
		    this.scene.scale(0.3, 1.6, 0.3);
		    this.scene.translate(0, 0.5, 0);
		    this.cube.display();
		this.scene.popMatrix();

		//Front left leg of the chair
		this.scene.pushMatrix();
		    this.scene.translate(-0.9, 0, 1.0);
		    this.scene.scale(0.3, 1.6, 0.3);
		    this.scene.translate(0, 0.5, 0);
		    this.cube.display();
		this.scene.popMatrix();

		//Front right leg of the chair
		this.scene.pushMatrix();
		    this.scene.translate(0.9, 0, 1.0);
		    this.scene.scale(0.3, 1.6, 0.3);
		    this.scene.translate(0, 0.5, 0);
		    this.cube.display();
		this.scene.popMatrix();

		//Chair's seat
		this.scene.pushMatrix();
		    this.scene.translate(0, 1.6, 0);
		    this.scene.scale(2.1, 0.3, 2.3);
		    this.scene.translate(0, 0.5, 0);
		    this.cube.display();
		this.scene.popMatrix();

		//Chair's back left column
		this.scene.pushMatrix();
		    this.scene.translate(-0.9, 1.9, -1.0);
		    this.scene.scale(0.3, 2.2, 0.3);
		    this.scene.translate(0, 0.5, 0);
		    this.cube.display();
		this.scene.popMatrix();

		//Chair's back right column
		this.scene.pushMatrix();
		    this.scene.translate(0.9, 1.9, -1.0);
		    this.scene.scale(0.3, 2.2, 0.3);
		    this.scene.translate(0, 0.5, 0);
		    this.cube.display();
		this.scene.popMatrix();

		// Chair's back Row 1
		this.scene.pushMatrix();
		    this.scene.translate(0, 2.5, -1.0);
		    this.scene.scale(1.8, 0.4, 0.3);
		    this.scene.translate(0, 0.5, 0);
		    this.cube.display();
		this.scene.popMatrix();

		// Chair's back Row 2
		this.scene.pushMatrix();
		    this.scene.translate(0, 3.2, -1.0);
		    this.scene.scale(1.8, 0.4, 0.3);
		    this.scene.translate(0, 0.5, 0);
		    this.cube.display();
		this.scene.popMatrix();
	};
};
