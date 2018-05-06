var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

const FRAME_RATE = 60;

class LightingScene extends CGFscene {
	constructor() {
		super();
	};

	init(application) {
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
		this.floor = new MyTerrain(this, 80);
		this.wheel = new MyWheel(this, 20);
		this.vehicle = new MyVehicle(this);

		// Materials
		this.materialDefault = new CGFappearance(this);

		this.floorAppearance = new CGFappearance(this);
		this.floorAppearance.loadTexture("./resources/images/floor.png");

		this.enableTextures(true);

		this.setUpdatePeriod(1000 / FRAME_RATE);
	};

	initCameras() {
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	};

	checkKeys() {
		var text = "Keys pressed: ";
		var keysPressed = false;
		if (this.gui.isKeyPressed("KeyW")) {
			text += " W ";
			keysPressed = true;
		}
		if (this.gui.isKeyPressed("KeyA")) {
			text += " A ";
			keysPressed = true;
			this.vehicle.descreaseFrontWheelAngle();
		}
		if (this.gui.isKeyPressed("KeyD")) {
			text += " D ";
			keysPressed = true;
			this.vehicle.increaseFrontWheelAngle();
		}

		if (this.gui.isKeyPressed("KeyS")) {
			text += " S ";
			keysPressed = true;
		}
		if (keysPressed)
			console.log(text);
	}

	update(currTime) {
		this.checkKeys();
		this.vehicle.update(currTime);
	}

	initLights() {
		this.nLights = 4;

		this.setGlobalAmbientLight(0.4, 0.4, 0.4, 1.0);

		let lightHeight = 2.8;

		this.lights[0].setPosition(3, lightHeight, 3, 1);
		this.lights[0].setVisible(true);
		this.lights[1].setPosition(-1, lightHeight, 3, 1);
		this.lights[1].setVisible(true);
		this.lights[2].setPosition(3, lightHeight, -1, 1);
		this.lights[2].setVisible(true);
		this.lights[3].setPosition(-1, lightHeight, -1, 1);
		this.lights[3].setVisible(true);

		this.lights[0].setAmbient(0, 0, 0, 1);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[0].setSpecular(1.0, 1.0, 1.0, 1.0);
		this.lights[0].enable();
		this.lights[1].setAmbient(0, 0, 0, 1);
		this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[1].setSpecular(1.0, 1.0, 1.0, 1.0);
		this.lights[1].enable();
		this.lights[2].setAmbient(0, 0, 0, 1);
		this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[2].setSpecular(1.0, 1.0, 1.0, 1.0);
		this.lights[2].enable();
		this.lights[3].setAmbient(0, 0, 0, 1);
		this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[3].setSpecular(1.0, 1.0, 1.0, 1.0);
		this.lights[3].enable();
	};

	updateLights() {
		for (var i = 0; i < this.lights.length; i++)
			this.lights[i].update();
	}

	setLightState(index, setOn) {
		if(setOn) {
			this.lights[index].enable();
		} else {
			this.lights[index].disable();
		}
	}

	display() {
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

		// Floor
		this.pushMatrix();
		this.scale(50, 1, 50);
		this.rotate(-90 * degToRad, 1, 0, 0);

		this.floor.display();
		this.popMatrix();

		// Wheel
		this.pushMatrix();
		this.vehicle.display();
		this.popMatrix();


		// ---- END Scene drawing section
	};
};
