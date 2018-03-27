var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

class LightingScene extends CGFscene
{
	constructor()
	{
		super();
	};

	init(application)
	{
		super.init(application);

		this.initCameras();

		this.initLights();

		this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
		this.gl.clearDepth(100.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);

		this.axis = new CGFaxis(this);

		// Scene elements
		this.table = new MyTable(this);
		this.wall = new Plane(this);
		this.leftWall = new MyQuad(this, -0.25, 1.25, -0.25, 1.25);
		this.floor = new MyQuad(this, 0, 10, 0, 12);
		this.chair = new MyChair(this);

		this.boardA = new Plane(this, BOARD_A_DIVISIONS);
		this.boardB = new Plane(this, BOARD_B_DIVISIONS);

		this.prism = new MyPrism(this, 8, 20);
		this.cylinder = new MyCylinder(this, 8, 20);
		this.lamp = new MyLamp(this, 200, 200);

		// Materials
		this.materialDefault = new CGFappearance(this);

		this.materialA = new CGFappearance(this);
		this.materialA.setAmbient(0.3,0.3,0.3,1);
		this.materialA.setDiffuse(0.6,0.6,0.6,1);
		//this.materialA.setSpecular(0.2,0.2,0.2,1);
		//this.materialA.setSpecular(0.8,0.8,0.8,1);
		this.materialA.setSpecular(0, 0.2, 0.8, 1);
		//this.materialA.setShininess(10);
		this.materialA.setShininess(120);

		this.materialB = new CGFappearance(this);
		this.materialB.setAmbient(0.3,0.3,0.3,1);
		this.materialB.setDiffuse(0.6,0.6,0.6,1);
		this.materialB.setSpecular(0.8,0.8,0.8,1);
		this.materialB.setShininess(120);

		this.materialWall = new CGFappearance(this);
		this.materialWall.setAmbient(0.2 , 0.0 , 0.7 , 1);
		this.materialWall.setDiffuse(0.08 , 0.0 , 0.30 , 1);
		this.materialWall.setSpecular(0.02 , 0.0 , 0.07 , 1);
		this.materialWall.setShininess(50);

		this.windowAppearance = new CGFappearance(this);
    	this.windowAppearance.loadTexture("./resources/images/window.png");
		this.windowAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");

		this.floorAppearance = new CGFappearance(this);
    	this.floorAppearance.loadTexture("./resources/images/floor.png");

		this.enableTextures(true);
	};

	initCameras()
	{
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	};

	initLights()
	{
		//this.setGlobalAmbientLight(0.5,0.5,0.5, 1.0);
		this.setGlobalAmbientLight(0.2, 0.2, 0.2, 1.0);

		// Positions for four lights
		this.lights[0].setPosition(4, 6, 1, 1);
		this.lights[0].setVisible(true); // show marker on light position (different from enabled)

		this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
		this.lights[1].setVisible(true); // show marker on light position (different from enabled)

		this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
		this.lights[2].setVisible(true); // show marker on light position (different from enabled)

		this.lights[3].setPosition(4, 7.5, 5.0, 1.0);
		this.lights[3].setVisible(true); // show marker on light position (different from enabled)

		this.lights[0].setAmbient(0, 0, 0, 1);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[0].setSpecular(1.0, 1.0, 0.0, 1.0);
		this.lights[0].enable();

		this.lights[1].setAmbient(0, 0, 0, 1);
		this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[1].enable();

		this.lights[2].setAmbient(0, 0, 0, 1);
		this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[2].setSpecular(1.0, 1.0, 1.0, 1.0);
		this.lights[2].setConstantAttenuation(0.0);
		this.lights[2].setLinearAttenuation(1.0);
		this.lights[2].setQuadraticAttenuation(0.0);
		this.lights[2].enable();

		this.lights[3].setAmbient(0, 0, 0, 1);
		this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[3].setSpecular(1.0, 1.0, 0.0, 1.0);
		this.lights[3].setConstantAttenuation(0.0);
		this.lights[3].setLinearAttenuation(0.0);
		this.lights[3].setQuadraticAttenuation(0.2);
		this.lights[3].enable();
	};

	updateLights()
	{
		for (var i = 0; i < this.lights.length; i++)
			this.lights[i].update();
	}

	drawRoom() {
		// Floor
		this.pushMatrix();
			this.translate(7.5, 0, 7.5);
			this.rotate(-90 * degToRad, 1, 0, 0);
			this.scale(15, 15, 0.2);

			this.floorAppearance.apply();
			this.floor.display();
		this.popMatrix();

		// Left Wall
		this.pushMatrix();
			this.translate(0, 4, 7.5);
			this.rotate(90 * degToRad, 0, 1, 0);
			this.scale(15, 8, 0.2);

			this.windowAppearance.apply();
			this.leftWall.display();
		this.popMatrix();

		// Plane Wall
		this.pushMatrix();
			this.translate(7.5, 4, 0);
			this.scale(15, 8, 0.2);

			this.materialWall.apply();
			this.wall.display();
		this.popMatrix();

		// First Table
		this.pushMatrix();
			this.translate(5, 0, 8);
			this.table.display();
		this.popMatrix();

		// Second Table
		this.pushMatrix();
			this.translate(12, 0, 8);
			this.table.display();
		this.popMatrix();

		// First Chair
		this.pushMatrix();
		    this.translate(5.0,0,10.0);
		    this.rotate(Math.PI, 0, 1, 0);
		    this.chair.display();
		this.popMatrix();

		// Second Chair
		this.pushMatrix();
		    this.translate(12.0,0,10.0);
		    this.rotate(Math.PI, 0, 1, 0);
		    this.chair.display();
		this.popMatrix();

		// Board A
		this.pushMatrix();
			this.translate(4, 4.5, 0.2);
			this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);

			this.materialA.apply();
			this.boardA.display();
		this.popMatrix();

		// Board B
		this.pushMatrix();
			this.translate(10.5, 4.5, 0.2);
			this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);

			this.materialB.apply();
			this.boardB.display();
		this.popMatrix();

		// Prism
		this.pushMatrix();
			this.translate(5, 0, 13);
			this.rotate(-Math.PI/2, 1, 0, 0);
			this.scale(1, 1, 8);
			this.prism.display();
		this.popMatrix();

		// Cylinder
		this.pushMatrix();
			this.translate(12, 0, 13);
			this.rotate(-Math.PI/2, 1, 0, 0);
			this.scale(1, 1, 8);
			this.cylinder.display();
		this.popMatrix();

		// Lamp
		this.pushMatrix();
			this.translate(4, 8, 5);
			this.rotate(Math.PI/2, 1, 0, 0);
			this.lamp.display();
		this.popMatrix();

	}

	display()
	{
		// ---- BEGIN Background, camera and axis setup

		// Clear image and depth buffer everytime we update the scene
		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		// Initialize Model-View matrix as identity (no transformation)
		this.updateProjectionMatrix();
		this.loadIdentity();

		// Apply transformations corresponding to the camera position relative to the origin
		this.applyViewMatrix();

		// Update all lights used
		this.updateLights();

		// Draw axis
		this.axis.display();

		this.materialDefault.apply();

		// ---- END Background, camera and axis setup

		// ---- BEGIN Scene drawing section

		this.drawRoom();


		// ---- END Scene drawing section
	};
};
