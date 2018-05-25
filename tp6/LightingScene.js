var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

const FRAME_RATE = 60;

class LightingScene extends CGFscene {
	constructor() {
		super();
		this.time = 0;
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

		// Materials
		this.vehicleTextureGroups = [new StandardTextureGroup(this), new StylishTextureGroup(this), new TaxiTextureGroup(this)];
		this.materialDefault = new CGFappearance(this);

		//Altimetry matrix
    	this.altimetry= [[ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.6, 2.2, 2.2, 1.6, 0.0],
						 [ 0.0, 2.2, 4.5, 2.2, 0.0, 0.0, 2.9, 5.6, 5.6, 2.9, 0.0],
						 [ 0.0, 4.5, 9.0, 4.5, 0.0, 0.0, 2.9, 5.6, 5.6, 2.9, 0.0],
						 [ 0.0, 2.2, 4.5, 2.2, 0.0, 0.0, 2.9, 5.6, 5.6, 2.9, 0.0],
						 [ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.6, 2.9, 2.9, 1.6, 0.0],
						 [ 0.0, 1.0, 3.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
						 [ 0.0, 3.0, 10 , 3.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
						 [ 0.0, 1.0, 3.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
						 [ 0.0, 3.0, 10 , 3.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
						 [ 0.0, 1.0, 3.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
						 [ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
					    ];

		this.CRANE_VEHICLE_CAPACITY = 3;
		this.droppedVehicles = [];

		// Scene elements
		this.floor = new MyTerrain(this, 10, this.altimetry);
		this.vehicle = new MyVehicle(this);
		this.crane = new MyCrane(this);
		this.crane.setPosition(13, 13);
		this.loadingArea = new MyQuad(this);

		this.canMoveVehicle = true;
		this.loadingAreaToleranceWidthRatio = 0.36;
		this.loadingAreaToleranceDepthRatio = 0.18;

		this.vehicle.setTextureGroup(this.vehicleTextureGroups[0]);

		// Loading Area Material
		this.loadingAreaMaterial = new CGFappearance(this);
    	this.loadingAreaMaterial.loadTexture("./resources/images/hazardStripes.jpg");
    	this.loadingAreaMaterial.setDiffuse(0.8,0.8,0.8,1);
    	this.loadingAreaMaterial.setSpecular(0.1,0.1,0.1,1);
    	this.loadingAreaMaterial.setShininess(15);

		this.enableTextures(true);

		this.setUpdatePeriod(1000 / FRAME_RATE);

	};

	initSceneElements() {

	}

	initCameras() {
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 70), vec3.fromValues(0, 0, 0));
	};

	checkKeys(deltaTime) {
		// Update Vehicle
		if (this.gui.isKeyPressed("KeyW") && this.canMoveVehicle) {
			this.vehicle.update("front", deltaTime);
		}
		else if (this.gui.isKeyPressed("KeyS") && this.canMoveVehicle) {
			this.vehicle.update("back", deltaTime);
		}
		else {
			this.vehicle.update("none", deltaTime);
		}

		// Vehicle Turning
		if (this.gui.isKeyPressed("KeyA")) {
			this.vehicle.increaseFrontWheelAngle(deltaTime);
		}
		else if (this.gui.isKeyPressed("KeyD")) {
			this.vehicle.descreaseFrontWheelAngle(deltaTime);
		}
	}

	update(currTime) {
		if (!this.vehicle) {
			return;
		}

		let deltaTime = currTime - this.time;
		this.time = currTime;

		this.checkKeys(deltaTime);

		if (this.isVehicleInCatchingBounds() && this.crane.animationState == 'notMoving' && this.droppedVehicles.length < this.CRANE_VEHICLE_CAPACITY) {
			this.vehicle.activateHandbrake();
			this.canMoveVehicle = false;
			this.crane.startAnimation();
			this.crane.setVehicle(this.vehicle);
		}

		this.crane.animate(deltaTime);
	}

	finishedCraneAnimation() {
		this.droppedVehicles.push(this.vehicle);
		if(this.droppedVehicles.length <= this.CRANE_VEHICLE_CAPACITY) {
			this.vehicle = new MyVehicle(this);
			this.vehicle.setTextureGroup(this.droppedVehicles[this.droppedVehicles.length-1].texGroup);
		}
		this.canMoveVehicle = true;
		this.crane.setVehicle(null);
	}

	isVehicleInCatchingBounds() {
		return (this.vehicle.x > this.crane.catchPositionX - this.loadingAreaToleranceWidthRatio*this.vehicle.vehicleBreadth &&
				this.vehicle.x < this.crane.catchPositionX + this.loadingAreaToleranceWidthRatio*this.vehicle.vehicleBreadth && 
				this.vehicle.z > this.crane.catchPositionZ - this.loadingAreaToleranceDepthRatio*this.vehicle.vehicleLength  && 
				this.vehicle.z < this.crane.catchPositionZ + this.loadingAreaToleranceDepthRatio*this.vehicle.vehicleLength);
	}

	initLights() {
		this.nLights = 6;

		this.setGlobalAmbientLight(0.4, 0.4, 0.4, 1.0);

		let lightHeight = 8;

		this.lights[0].setPosition(17, lightHeight, -17, 1);
		this.lights[1].setPosition(-17, lightHeight, -17, 1);
		this.lights[2].setPosition(17, lightHeight, 17, 1);
		this.lights[3].setPosition(-17, lightHeight, 17, 1);
		this.lights[4].setPosition(0, lightHeight, 8, 1);
		this.lights[5].setPosition(0, lightHeight, -8, 1);

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
		this.vehicle.setTextureGroup(this.vehicleTextureGroups[index]);
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

		// Vehicle
		this.pushMatrix();
			this.vehicle.display();
		this.popMatrix();

		// Dropped Vehicles
		for(let i = 0; i < this.droppedVehicles.length; ++i) {
			this.pushMatrix();
				this.droppedVehicles[i].display();
			this.popMatrix();
		}

		// Crane
		this.pushMatrix();
			this.translate(this.crane.x, 0, this.crane.z);
			this.rotate(-Math.PI/2, 0, 1, 0);
			this.translate(-this.crane.x, 0, -this.crane.z);
			this.crane.display();
		this.popMatrix();

		// Loading Area
		this.pushMatrix();
			this.translate(this.crane.catchPositionX, 0.02, this.crane.catchPositionZ);
			this.scale(this.vehicle.vehicleBreadth+2*this.loadingAreaToleranceWidthRatio*this.vehicle.vehicleBreadth, 
					   1, 
					   this.vehicle.vehicleLength+2*this.loadingAreaToleranceDepthRatio*this.vehicle.vehicleLength);
			this.rotate(-Math.PI/2, 1, 0, 0);

			this.loadingAreaMaterial.apply();
			this.loadingArea.display();
		this.popMatrix();


		// ---- END Scene drawing section
	};
};
