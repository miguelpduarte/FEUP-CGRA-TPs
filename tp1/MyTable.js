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
	};

	display() {
		//Back left leg of cube
		this.scene.pushMatrix();
		this.scene.translate(-2.35, 0, -1.35);
		this.scene.scale(0.3, 3.5, 0.3);
		this.scene.translate(0, 0.5, 0);
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
		this.cube.display();
		this.scene.popMatrix();
	};
};
