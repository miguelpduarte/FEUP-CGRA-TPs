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
		this.scene.translate(0, 0, 0.5);
		
		this.quad.display();
	};
};
