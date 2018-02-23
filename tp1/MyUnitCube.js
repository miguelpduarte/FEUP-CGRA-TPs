/**
 * MyUnitCube
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyUnitCube extends CGFobject
{
	constructor(scene)
	{
		super(scene);
		this.initBuffers();
	};

	initBuffers()
	{
		this.vertices = [
				//Bottom front left
				-0.5, -0.5, 0.5,
				//Bottom front right
				0.5, -0.5, 0.5,
				//Top front left
				-0.5, 0.5, 0.5,
				//Top front right
				0.5, 0.5, 0.5,
				//Bottom back left
				-0.5, -0.5, -0.5,
				//Bottom back right
				0.5, -0.5, -0.5,
				//Top back left
				-0.5, 0.5, -0.5,
				//Top back right
				0.5, 0.5, -0.5
				];

		this.indices = [
				//Front
				0, 1, 2,
				3, 2, 1,

				//Left
				0, 2, 4,
				6, 4, 2,

				//Right
				1, 5, 7, 
				7, 3, 1,

				//Bottom
				5, 1, 0,
				0, 4, 5,

				//Top
				7, 6, 3,
				2, 3, 6,

				//Back
				5, 4, 6,
				6, 7, 5
			];

		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
