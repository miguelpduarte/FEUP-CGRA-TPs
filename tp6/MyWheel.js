/**
 * MyWheel
 * @constructor
 */
class MyWheel extends CGFobject
{
	constructor(scene, sides)
	{
        super(scene);

        this.body = new MyCylinder(this.scene, sides, 1);
        this.cover = new MyCircle(this.scene, sides);

		// Tire material
        this.tireAppearance = new CGFappearance(this.scene);
        this.tireAppearance.loadTexture("./resources/images/tire.jpg");

        this.tireSideAppearance = new CGFappearance(this.scene);
        this.tireSideAppearance.loadTexture("./resources/images/tireSide.png");
    };

    setAngle(angle) {
        this.angle = -angle * this.ang_to_rad;
    }

    display() {
        this.scene.materialDefault.apply();

		// Tire Cover #1
        this.scene.pushMatrix();
			this.scene.translate(0, 1, 1);

			this.tireAppearance.apply();
            this.cover.display();
        this.scene.popMatrix();

		// Tire Cover #2
        this.scene.pushMatrix();
			this.scene.translate(0, 1, 0);
			this.scene.scale(1, -1, 1);

			this.tireAppearance.apply();
            this.cover.display();
        this.scene.popMatrix();

		// Tire Body
        this.scene.pushMatrix();
			this.scene.translate(0, 1, 0);

		    this.tireSideAppearance.apply();
            this.body.display();
        this.scene.popMatrix();
    };
};
