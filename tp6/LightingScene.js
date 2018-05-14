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

		this.gl.clearColor(179/255, 217/255, 255/255, 1.0);
		this.gl.clearDepth(100.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);

		this.axisIsActive = true;
		this.axis = new CGFaxis(this);

		// Scene elements
		this.floor = new MyTerrain(this, 80);
		this.vehicle = new MyVehicle(this);

		// Materials
		this.materialDefault = new CGFappearance(this);

		this.enableTextures(true);

		this.setUpdatePeriod(1000 / FRAME_RATE);
	};

	initSceneElements() {

	}

	initCameras() {
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	};

	checkKeys() {
		var text = "Keys pressed: ";
		var keysPressed = false;
		if (this.gui.isKeyPressed("KeyW")) {
			text += " W ";
			keysPressed = true;
			this.vehicle.update("front");
		}
		if (this.gui.isKeyPressed("KeyS")) {
			text += " S ";
			keysPressed = true;
			this.vehicle.update("back");
		}

		// Vehicle Turning
		if (this.gui.isKeyPressed("KeyA")) {
			text += " A ";
			keysPressed = true;
			this.vehicle.increaseFrontWheelAngle();
		}
		else if (this.gui.isKeyPressed("KeyD")) {
			text += " D ";
			keysPressed = true;
			this.vehicle.descreaseFrontWheelAngle();
		}
		if (keysPressed)
			console.log(text);
	}

	update(currTime) {
		this.checkKeys();
		this.vehicle.updatePos(currTime);
	}

	initLights() {
		this.nLights = 6;

		this.setGlobalAmbientLight(0.4, 0.4, 0.4, 1.0);

		let lightHeight = 2.8;

		this.lights[0].setPosition(3, lightHeight, -1, 1);
		this.lights[1].setPosition(-1, lightHeight, -1, 1);
		this.lights[2].setPosition(3, lightHeight, 3, 1);
		this.lights[3].setPosition(-1, lightHeight, 3, 1);
		this.lights[4].setPosition(3, lightHeight, 7, 1);
		this.lights[5].setPosition(-1, lightHeight, 7, 1);

		for (let i=0 ; i<this.nLights ; i++) {
			this.lights[i].setVisible(true);
			this.lights[i].setAmbient(0, 0, 0, 1);
			this.lights[i].setDiffuse(1.0, 1.0, 1.0, 1.0);
			this.lights[i].setSpecular(1.0, 1.0, 1.0, 1.0);
			this.lights[i].enable();
		}
	};

	toggleAxis() {
		this.axisIsActive = !this.axisIsActive;
	}

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

	setTexturePack(index) {
		console.log("Selected texture pack with index " + index);
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
		if (this.axisIsActive) {
			this.axis.display();
		}

		this.materialDefault.apply();

		// ---- END Background, camera and axis setup

		// ---- BEGIN Scene drawing section

		// Floor
		this.pushMatrix();
			this.floor.display();
		this.popMatrix();

		// Wheel
		this.pushMatrix();
			this.vehicle.display();
		this.popMatrix();


		// ---- END Scene drawing section
	};
};
