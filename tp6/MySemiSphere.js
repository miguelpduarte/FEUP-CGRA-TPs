/**
 * MySemiSphere
 * @constructor
 */
class MySemiSphere extends CGFobject
{
	constructor(scene, slices, stacks)
	{
		super(scene);

		this.slices = slices;
		this.stacks = stacks;

		this.initBuffers();
	};

	initBuffers()
	{
		this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.texCoords = [];

		let omega_angle = 2*Math.PI/this.slices;
		let alpha_angle = Math.PI/(2*this.stacks);
		let stack_step = 1/this.stacks;

		for(let i = 0; i <= this.slices; ++i) {

			for(let j = 0; j <= this.stacks; ++j) {

				this.vertices.push(
					Math.cos(alpha_angle*j)*Math.cos(omega_angle*i), Math.cos(alpha_angle*j)*Math.sin(omega_angle*i), Math.sin(alpha_angle*j)
				);

				this.normals.push(
					Math.cos(alpha_angle*j)*Math.cos(omega_angle*i), Math.cos(alpha_angle*j)*Math.sin(omega_angle*i), Math.sin(alpha_angle*j)
				);

				this.texCoords.push(
					i*1/this.slices, j*1/this.stacks
				);

			}

		}

		for (let i = 0; i < this.slices; ++i) {
			for(let j = 0; j < this.stacks; ++j) {
				this.indices.push(
					(i+1)*(this.stacks+1) + j, i*(this.stacks+1) + j+1, i*(this.stacks+1) + j,
					i*(this.stacks+1) + j+1, (i+1)*(this.stacks+1) + j, (i+1)*(this.stacks+1) + j+1
				);
			}
		}

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
