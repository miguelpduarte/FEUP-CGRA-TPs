/**
 * StandardTextureGroup
 * @constructor
 */
class StandardTextureGroup extends CGFobject
{
	constructor(scene)
	{
		super(scene);

		this.initMaterials(scene);
	};

	initMaterials(scene) {
		this.paintMaterial = new CGFappearance(scene);
		this.paintMaterial.setAmbient(0.05 , 0.05 , 0.20 , 1);
		this.paintMaterial.setDiffuse(0.025 , 0.025 , 0.10 , 1);
		this.paintMaterial.setSpecular(0.05 , 0.05 , 0.20 , 1);
		this.paintMaterial.setShininess(50);

		this.secondaryPaintMaterial = this.paintMaterial;
		this.terciaryPaintMaterial = this.paintMaterial;

		this.glassMaterial = new CGFappearance(scene);
		this.glassMaterial.setAmbient(179/255, 217/255, 255/255, 1);
		this.glassMaterial.setDiffuse(0, 0, 0, 1);
		this.glassMaterial.setSpecular(179/255, 217/255, 255/255, 1);
		this.glassMaterial.setShininess(150);

        this.exhaustPipeMaterial = new CGFappearance(this.scene);
        this.exhaustPipeMaterial.loadTexture("./resources/images/metal.jpg");

        this.licensePlateMaterial = new CGFappearance(this.scene);
		this.licensePlateMaterial.loadTexture("./resources/images/licensePlate.jpg");

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
