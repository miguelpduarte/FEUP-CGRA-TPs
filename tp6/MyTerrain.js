/**
 * MyTerrain
 * @constructor
 */
class MyTerrain extends Plane
{

    constructor(scene, nrDivs)
	{
		super(scene, nrDivs, 0, 1, 0, 1);

        // Floor material
        this.appearance = new CGFappearance(this.scene);
        this.appearance.loadTexture("./resources/images/table.png");

		this.initBuffers();
	};

    display()
	{
        this.scene.pushMatrix();
            this.appearance.apply();
        this.scene.popMatrix();

        super.display();
	};


}
