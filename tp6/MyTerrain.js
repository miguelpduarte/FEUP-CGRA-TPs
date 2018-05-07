/**
 * MyTerrain
 * @constructor
 */
class MyTerrain extends Plane
{

    constructor(scene, nrDivs)
	{
		super(scene, nrDivs, 0, 12, 0, 12);

        // Floor material
        this.appearance = new CGFappearance(this.scene);
        this.appearance.loadTexture("./resources/images/terrain.jpg");

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
