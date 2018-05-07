
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

        return true;
    };

    createAxisCheckbox() {
        this.gui['Eixo'] = true;
        this.gui.add(this.gui, 'Eixo').onChange((val) => {
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
