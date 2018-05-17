/**
 * TaxiTextureGroup
 * @constructor
 */
class TaxiTextureGroup extends CGFobject
{
	constructor(scene)
	{
		super(scene);

		this.initMaterials(scene);
	};

	initMaterials(scene) {
		this.paintMaterial = new CGFappearance(scene);
		this.paintMaterial.setAmbient(130/255 , 104/255 , 0/255 , 1);
		this.paintMaterial.setDiffuse(65/255 , 52/255 , 0/255 , 1);
		this.paintMaterial.setSpecular(13/255 , 10/255 , 0/255 , 1);
		this.paintMaterial.setShininess(50);

		this.secondaryPaintMaterial = new CGFappearance(this.scene);
        this.secondaryPaintMaterial.loadTexture("./resources/images/safeDriving.jpg");


		this.terciaryPaintMaterial = new CGFappearance(this.scene);
        this.terciaryPaintMaterial.loadTexture("./resources/images/chessPattern.jpg");

		this.glassMaterial = new CGFappearance(scene);
		this.glassMaterial.setAmbient(179/255, 217/255, 255/255, 1);
		this.glassMaterial.setDiffuse(40/255, 47/255, 41/255, 1);
		this.glassMaterial.setSpecular(179/255, 217/255, 255/255, 1);
		this.glassMaterial.setShininess(150);

        this.exhaustPipeMaterial = new CGFappearance(this.scene);
        this.exhaustPipeMaterial.loadTexture("./resources/images/metal.jpg");

        this.licensePlateMaterial = new CGFappearance(this.scene);
		this.licensePlateMaterial.loadTexture("./resources/images/licensePlateTaxi.jpg");

        this.wheelTireMaterial = new CGFappearance(this.scene);
        this.wheelTireMaterial.loadTexture("./resources/images/tire.jpg");

        this.wheelRimMaterial = new CGFappearance(this.scene);
        this.wheelRimMaterial.loadTexture("./resources/images/metal.jpg");

        this.wheelTireSideMaterial = new CGFappearance(this.scene);
		this.wheelTireSideMaterial.loadTexture("./resources/images/tireSide.jpg");

        this.headLightMaterial = new CGFappearance(this.scene);
        this.headLightMaterial.loadTexture("./resources/images/headLight.jpg");
	}
};
