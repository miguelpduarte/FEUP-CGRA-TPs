/**
 * MyPrism
 * @constructor
 */
class MyPrism extends CGFobject
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

		let step_angle = 2*Math.PI/this.slices;
		let stack_step = 1/this.stacks;

		for(let i = 0; i < this.slices; ++i) {
			let temp_verts = [
				Math.cos(step_angle*i), Math.sin(step_angle*i),
				Math.cos(step_angle*(i+1)), Math.sin(step_angle*(i+1))
			];

			for(let j = 0; j < this.stacks; ++j) {

				this.vertices.push(
					temp_verts[0], temp_verts[1], j*stack_step,
					temp_verts[2], temp_verts[3], j*stack_step,
					temp_verts[0], temp_verts[1], (j+1)*stack_step,
					temp_verts[2], temp_verts[3], (j+1)*stack_step
				);

				this.texCoords.push(
					i*1/this.slices, j*1/this.stacks,
					(i+1)*1/this.slices, j*1/this.stacks,
					i*1/this.slices, (j+1)*1/this.stacks,
					(i+1)*1/this.slices, (j+1)*1/this.stacks
				);

				this.indices.push(
					4*i*this.stacks + 4*j + 0, 4*i*this.stacks + 4*j + 1, 4*i*this.stacks + 4*j + 2,
					4*i*this.stacks + 4*j + 3, 4*i*this.stacks + 4*j + 2, 4*i*this.stacks + 4*j + 1
				);

				let temp_normal = [Math.cos(step_angle*i + step_angle/2), Math.sin(step_angle*i + step_angle/2), 0];

				this.normals.push(
					//Because the normals for a certain face are the same
					temp_normal[0], temp_normal[1], temp_normal[2],
					temp_normal[0], temp_normal[1], temp_normal[2],
					temp_normal[0], temp_normal[1], temp_normal[2],
					temp_normal[0], temp_normal[1], temp_normal[2]
				);

			}

		}

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
