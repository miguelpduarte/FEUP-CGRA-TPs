/**
 * MyUnitCubeQuad
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyUnitCubeQuad extends CGFobject
{
	constructor(scene) 
	{
		super(scene);
		this.quad = new MyQuad(this.scene);
		this.quad.initBuffers();
	};

	display() {
		//Left of cube
		this.scene.pushMatrix();
		this.scene.rotate(-Math.PI/2, 0, 1, 0);
		this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();

		//Front of cube
		this.scene.pushMatrix();
		this.scene.translate(0, 0, 0.5);		
		this.quad.display();
		this.scene.popMatrix();

		//Right of cube
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI/2, 0, 1, 0);
		this.scene.translate(0, 0, 0.5);		
		this.quad.display();
		this.scene.popMatrix();
		
		//Back of cube
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.scene.translate(0, 0, 0.5);		
		this.quad.display();
		this.scene.popMatrix();

		//Top of cube
		this.scene.pushMatrix();
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.scene.translate(0, 0, 0.5);		
		this.quad.display();
		this.scene.popMatrix();

		//Bottom of cube
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.scene.translate(0, 0, 0.5);		
		this.quad.display();
		this.scene.popMatrix();
	};
};
