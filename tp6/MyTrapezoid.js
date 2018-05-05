/**
 * MyTrapezoid
 * @constructor
 */
class MyTrapezoid extends CGFobject
{
	constructor(scene, smallBaseSize)
	{
		super(scene);

		if (smallBaseSize < 0) {
			smallBaseSize = 0;
		} else if (smallBaseSize > 1) {
			smallBaseSize = 1;
		}

		this.smallBaseSize = smallBaseSize;

		this.initBuffers();
	};

	initBuffers()
	{
		this.vertices = [
		-0.5, -0.5, 0,
		-0.5+this.smallBaseSize, -0.5, 0,
		-0.5, 0.5, 0,
		-0.5+this.smallBaseSize, 0.5, 0,
		0.5, -0.5, 0
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1
		]

		this.indices = [
		0, 1, 2,
		3, 2, 1,
		1, 4, 3
		];

		this.texCoords = [
		0, 1,
		this.smallBaseSize, 1,
		0, 0,
		this.smallBaseSize, 0,
		1, 1
		];

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
