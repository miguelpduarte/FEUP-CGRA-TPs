
class MyInterface extends CGFinterface {
	/**
	 * MyInterface
	 * @constructor
	 */
    constructor() {
        super();
    }

	/**
	 * init
	 * @param {CGFapplication} application
	 */
    init(application) {
        // call CGFinterface init
        super.init(application);

        // init GUI. For more information on the methods, check:
        //  http://workshop.chromeexperiments.com/examples/gui

        this.gui = new dat.GUI();
        this.model = {};

        this.initKeys();
        this.createAxisCheckbox();
        this.createLightCheckboxes();
        this.createTexturePackDropdown();

        return true;
    };

    createAxisCheckbox() {
        this.model['Eixo'] = true;
        this.gui.add(this.model, 'Eixo').onChange((val) => {
            this.scene.toggleAxis();
        });
    }

    createLightCheckboxes() {
        let nLights = this.scene.nLights;
        var group = this.gui.addFolder("Luzes");
        for(let i = 0; i < nLights; ++i) {
            //Initializing lights as enabled
            this.model['Luz ' + (i+1)] = true;
            group.add(this.model, 'Luz ' + (i+1)).onChange((val) => {
                this.scene.setLightState(i, val);
            });
        }
    }

    createTexturePackDropdown() {
        this.model.texturePackIndex = 0;
        let texPackDropdownModel = {
            "Pack 1": 0,
            "Pack 2": 1,
            "Pack 3": 2,
            "Pack 4": 3
        }
        this.gui.add(this.model, "texturePackIndex", texPackDropdownModel).name("Texture Pack").onChange((val) => {
            this.scene.setTexturePack(val);
        });
    }

    initKeys() {
        this.scene.gui = this;
        this.processKeyboard = function () { };
        this.model.activeKeys = {};
    }

    processKeyDown(event) {
        this.model.activeKeys[event.code] = true;
    };

    processKeyUp(event) {
        this.model.activeKeys[event.code] = false;
    };

    isKeyPressed(keyCode) {
        return this.model.activeKeys[keyCode] || false;
    }
};
