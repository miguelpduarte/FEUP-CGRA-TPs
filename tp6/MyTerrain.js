/**
 * MyTerrain
 * @constructor
 */
class MyTerrain extends Plane
{

    constructor(scene, nrDivs, altimetry)
	{
        super(scene, nrDivs, 0, 1, 0, 1, altimetry);

        // Floor material
        this.appearance = new CGFappearance(this.scene);
        this.appearance.loadTexture("./resources/images/terrain.jpg");
		this.appearance.setAmbient(0.1 , 0.1 , 0.1 , 1);
		this.appearance.setDiffuse(0.3 , 0.3 , 0.3 , 1);
		this.appearance.setSpecular(0 , 0 , 0 , 1);
		this.appearance.setShininess(50);

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
