/**
 * MyTerrain
 * @constructor
 */
class MyTerrain extends Plane
{

    constructor(scene, nrDivs, altimetry)
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
			this.scene.scale(50, 1, 50);
			this.scene.rotate(-90 * degToRad, 1, 0, 0);
            super.display();
        this.scene.popMatrix();

	};


}
