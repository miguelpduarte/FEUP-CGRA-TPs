/**
 * MyExhaustPipe
 * @constructor
 */
class MyExhaustPipe extends CGFobject
{
	constructor(scene)
	{
		super(scene);

		this.circle = new MyCircle(scene, 20);
		this.cylinder = new MyCylinder(scene, 20, 20);

		this.initBuffers();
	};

	display()
	{
		// Exhaust Pipe
		this.scene.pushMatrix();
			this.scene.scale(0.05, 0.05, 0.15);
			this.cylinder.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.scale(0.05, -0.05, 1);
			this.circle.display();
		this.scene.popMatrix();
	};
};
