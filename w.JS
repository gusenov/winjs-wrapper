/*jslint browser: true, devel: true, nomen: true */
/*global WinJS, Windows */

var W = (function () {
    'use strict';

    /**
     * @access protected
     * @constructs W
     */
    function W() { }




    // <NAMESPACES>
    
    /**
     * Declare a namespace.
     * @access public
     *
     * @example <caption>Example of namespace definition:</caption>
     * // Define the namespace ProgrammingLanguages and create the JavaScript under it.
     * W.nsDef("ProgrammingLanguages", {
     *     JavaScript: {
     *         getDescription: function () {
     *             return 'JavaScript is the programming language of HTML and the Web.';
     *         }
     *     }
     * });
     * console.log(ProgrammingLanguages.JavaScript.getDescription());
     *
     * @example <caption>Example of namespace population:</caption>
     * // Define the namespace ProgrammingLanguages.
     * W.nsDef("ProgrammingLanguages");
     *
     * // JavaScript created in the ProgrammingLanguages namespace.
     * ProgrammingLanguages.JavaScript = {
     *     getDescription: function () {
     *         return 'JavaScript is the programming language of HTML and the Web.';
     *     }
     * };
     * console.log(ProgrammingLanguages.JavaScript.getDescription());
     *
     * @memberof W
     * @method
     * @param {string} nameOfNewNamespace - This is the first parameter and represents the name of the new namespace.
     * @param {Object} [members] - This parameter represents the list of objects that need to be added to the namespace being defined.
     * @returns {Object} The newly-defined namespace.
     */
    W.nsDef = function (nameOfNewNamespace, members) {
        // pre-condition
        console.assert(typeof nameOfNewNamespace === 'string', 'nameOfNewNamespace should be string');
        if (members) {
            console.assert(typeof members === 'object', 'members should be Object');
        }
        
        var newNamespace;
        try {
            newNamespace = WinJS.Namespace.define(nameOfNewNamespace, members);
        } catch (e) {
            console.log(e);
        }
        
        console.assert(newNamespace !== undefined, 'newNamespace should not be undefined');
        console.assert(newNamespace !== null, 'newNamespace should not be null');
        console.assert(typeof newNamespace === 'object', 'newNamespace should be Object');
        
        return newNamespace;
    };
    
    /**
     * Add a namespace to the existing namespace and define your functionalities.
     * @access public
     *
     * @example <caption>Example of namespace in namespace:</caption>
     * W.nsDefChild(ProgrammingLanguages, "CLI", {
     *     Bash: {
     *         getDescription: function () {
     *             return "Bash is the shell, or command language interpreter, for the GNU operating system.";
     *         }
     *     }
     * });
     * console.log(ProgrammingLanguages.CLI.Bash.getDescription());
     *
     * @example <caption>Example of adding members to nested namespace:</caption>
     * W.nsDefChild(ProgrammingLanguages, "CLI");
     * ProgrammingLanguages.CLI.Bash = {
     *     getDescription: function () {
     *         return "Bash is the shell, or command language interpreter, for the GNU operating system.";
     *     }
     * };
     * console.log(ProgrammingLanguages.CLI.Bash.getDescription());
     *
     * @memberof W
     * @method
     * @param {Object} parentNamespace - The first parameter is the name of the parent namespace.
     * @param {string} childName - This is the name of the namespace to be added to the parent namespace.
     * @param {Object} [childMembers] - The list of objects to be added to the new namespace. This is an optional parameter.
     * @returns {Object} The newly-defined namespace.
     */
    W.nsDefChild = function (parentNamespace, childName, childMembers) {
        // pre-condition
        console.assert(typeof parentNamespace === 'object', 'parentNamespace should be Object');
        console.assert(typeof childName === 'string', 'childName should be string');
        if (childMembers) {
            console.assert(typeof childMembers === 'object', 'childMembers should be Object');
        }
        
        var newNamespace;
        try {
            newNamespace = WinJS.Namespace.defineWithParent(parentNamespace, childName, childMembers);
        } catch (e) {
            console.log(e);
        }
        
        console.assert(newNamespace !== undefined, 'newNamespace should not be undefined');
        console.assert(newNamespace !== null, 'newNamespace should not be null');
        console.assert(typeof newNamespace === 'object', 'newNamespace should be Object');
        
        return newNamespace;
    };
    
    // </NAMESPACES>




    // <OOP>
    
    /**
     * Create a class.
     * @access public
     *
     * @example <caption>Example of class Robot:</caption>
     * var Robot = W.clsDef(function (name) {
     *         this.name = name;
     *     }, {
     *         modelName: "",
     *         on: function () { },
     *         off: function () { }
     *     }, {
     *         harmsHumans: false,
     *         getModels: function () { return ["R2-D2", "WALL-E", "Bender"]; }
     *     }),
     *     models = Robot.getModels(),
     *     r = new Robot("Artoo-Detoo");
     * r.model = "R2-D2";
     * r.on();
     * Robot.harmsHumans = false;
     * console.log(models);
     *
     * @example <caption>Example of class Car:</caption>
     * var Car = W.clsDef(function (model) {
     *         this.model = model;
     *     }, {
     *         _model: undefined,
     *         model: {
     *             set: function (value) { this._model = value; },
     *             get: function () { return this._model; }
     *         }
     *     });
     *
     * @example <caption>Example of class Person:</caption>
     * var Person = W.clsDef(function (firstName, lastName) {
     *         this.firstName = firstName;
     *         this.lastName = lastName;
     *     }, {
     *         _firstName: undefined,
     *         _lastName: undefined,
     *         firstName: {
     *             set: function (value) { this._firstName = value; },
     *             get: function () { return this._firstName; }
     *         },
     *         lastName: {
     *             set: function (value) { this._lastName = value; },
     *             get: function () { return this._lastName; }
     *         }
     *     }),
     *     ag = new Person("Abbas", "Gussenov");
     * console.log(ag.firstName + ' ' + ag.lastName);
     *
     * @memberof W
     * @method
     * @param {function} constructor - The first parameter lets developers initialize a new object.
     * @param {Object} instanceMembers - The second parameter is the collection of instance members, which includes properties and methods.
     * @param {Object} [staticMembers] -  The third parameter includes static properties and static methods.
     * @returns {function} The newly-defined type.
     */
    W.clsDef = function (constructor, instanceMembers, staticMembers) {
        // pre-condition
        console.assert(typeof constructor === 'function', 'constructor should be function');
        console.assert(typeof instanceMembers === 'object', 'instanceMembers should be Object');
        if (staticMembers) {
            console.assert(typeof staticMembers === 'object', 'staticMembers should be Object');
        }
        
        var newClass;
        try {
            newClass = WinJS.Class.define(constructor, instanceMembers, staticMembers);
        } catch (e) {
            console.log(e);
        }
        
        console.assert(newClass !== undefined, 'newClass should not be undefined');
        console.assert(newClass !== null, 'newClass should not be null');
        console.assert(typeof newClass === 'function', 'newClass should be function');
        
        return newClass;
    };
    
    /**
     * Derive one class from another.
     * @access public
     *
     * @example <caption>Example of classes MechanicalCar and ElectricCar:</caption>
     * var MechanicalCar = W.clsDefChild(Car, function (model, fuelTank) {
     *         this.model = model;
     *         this.fuelTank = fuelTank;
     *     }, {
     *         _fuelTank: undefined,
     *         fuelTank: {
     *             set: function (value) { this._fuelTank = value; },
     *             get: function () { return this._fuelTank; }
     *         }
     *     }),
     *
     *     ElectricCar = W.clsDefChild(Car, function (model, batteryType) {
     *         this.model = model;
     *         this.batteryType = batteryType;
     *     }, {
     *         _batteryType: undefined,
     *         batteryType: {
     *             set: function (value) { this._batteryType = value; },
     *             get: function () { return this._batteryType; }
     *         }
     *     });
     *
     * @example <caption>Example of class Employee:</caption>
     * var Employee = W.clsDefChild(Person, function (firstName, lastName, position, hireDate) {
     *         this.firstName = firstName;
     *         this.lastName = lastName;
     *         this.position = position;
     *         this.hireDate = hireDate;
     *     }, {
     *         _hireDate: undefined,
     *         _position: undefined,
     *         hireDate: {
     *             set: function (value) { this._hireDate = value; },
     *             get: function () { return this._hireDate; }
     *         },
     *         position: {
     *             set: function (value) { this._position = value; },
     *             get: function () { return this._position; }
     *         },
     *         getDescription: function () {
     *             var options = { day: 'numeric', month: 'long', year: 'numeric' };
     *             return this.firstName + " " + this.lastName
     *                 + " was hired as a " + this.position
     *                 + " on the " + this.hireDate.toLocaleString("en-US", options) + ".";
     *         }
     *     }),
     *     ag = new Employee("Abbas", "Gussenov", "software developer", new Date(2016, 8, 20));
     * console.log(ag.getDescription());
     *
     * @memberof W
     * @method
     * @param {function} baseClass - The class that the current class needs to inherit from.
     * @param {function} constructor - This parameter refers to the constructor function that can be used to initialize the class members.
     * @param {Object}   [instanceMembers] - This parameter defines instance members, which includes properties and methods.
     * @param {Object}   [staticMembers] - This parameter defines static properties and static methods.
     * @returns {function} The newly-defined type.
     */
    W.clsDefChild = function (baseClass, constructor, instanceMembers, staticMembers) {
        // pre-condition
        console.assert(typeof baseClass === 'function', 'baseClass should be function');
        console.assert(typeof constructor === 'function', 'constructor should be function');
        if (instanceMembers) {
            console.assert(typeof instanceMembers === 'object', 'instanceMembers should be Object');
        }
        if (staticMembers) {
            console.assert(typeof staticMembers === 'object', 'staticMembers should be Object');
        }

        var newClass;
        try {
            newClass = WinJS.Class.derive(baseClass, constructor, instanceMembers, staticMembers);
        } catch (e) {
            console.log(e);
        }
        
        console.assert(newClass !== undefined, 'newClass should not be undefined');
        console.assert(newClass !== null, 'newClass should not be null');
        console.assert(typeof newClass === 'function', 'newClass should be function');
        
        return newClass;
    };
    
    /**
     * Combine methods and properties from multiple JavaScript objects.
     * @access public
     *
     * @example <caption>Example of class HybridCar:</caption>
     * var HybridCar = W.clsMix(function (model, fuelTank, batteryType) {
     *         this.model = model;
     *         this.fuelTank = fuelTank;
     *         this.batteryType = batteryType;
     *     }, MechanicalCar, ElectricCar),
     *
     *     c = new HybridCar("Toyota Prius 2016", 43, "NiMH");
     *
     * console.log("Specs for " + c.model
     *     + "\nBattery type: " + c.batteryType
     *     + "\nFuel tank: " + c.fuelTank + " l");
     *
     * @memberof W
     * @method
     * @param {function} constructor - The first parameter, which is used to initialize the class members.
     * @param {...function} mixin - The second parameter is the array that takes the mixin methods.
     * @returns {function} The newly defined class.
     */
    W.clsMix = function (constructor, mixin) {
        var i, newClass;
        
        // pre-condition
        console.assert(typeof constructor === 'function', 'constructor should be function');
        for (i = 1; i < arguments.length; i += 1) {
            console.assert(typeof arguments[i] === 'function', 'mixin should be function');
        }

        try {
            newClass = WinJS.Class.mix.apply(null, arguments);
        } catch (e) {
            console.log(e);
        }
        
        console.assert(newClass !== undefined, 'newClass should not be undefined');
        console.assert(newClass !== null, 'newClass should not be null');
        console.assert(typeof newClass === 'function', 'newClass should be function');
        
        return newClass;
    };
    
    // </OOP>




    // <EVENTS>
    
    /**
     * Add the event management functionality to any type that you define.
     * @access public
     *
     * @example <caption>Example of adding event management functionality to the class Person:</caption>
     * W.evtMgmtAdd(Person);
     *
     * @memberof W
     * @method
     * @param {function} type - Any type.
     * @returns This method does not return a value.
     */
    W.evtMgmtAdd = function (type) {
        // pre-condition
        console.assert(typeof type === 'function', 'type should be function');
        
        WinJS.Class.mix(type, WinJS.Utilities.eventMixin);
    };
    
    /**
     * Define events.
     * @access public
     *
     * @example <caption>Example of defining event in the class Person:</caption>
     * W.evtDef(Person, "WeightChanged");
     *
     * @memberof W
     * @method
     * @param {function} type - Any type.
     * @param {...string} events - A variable list of property names.
     * @returns This method does not return a value.
     */
    W.evtDef = function (type, events) {
        var i;
        
        // pre-condition
        console.assert(typeof type === 'function', 'type should be function');
        for (i = 1; i < arguments.length; i += 1) {
            console.assert(typeof arguments[i] === 'string', 'events should be string');
        }
        
        WinJS.Class.mix(type, WinJS.Utilities.createEventProperties.apply(null, Array.prototype.splice.call(arguments, 1)));
    };
    
    /**
     * Adds an event listener to the control.
     * @access public
     *
     * @example <caption>Example of adding event handler:</caption>
     * var myPerson = new Person(64),
     *     listener = function (evt) {
     *         console.log("WeightChanged event fired!");
     *         console.log(myPerson.weight);
     *     };
     * W.evtHndAdd(myPerson, "WeightChanged", listener);
     * myPerson.weight += 1;
     * myPerson.weight -= 1;
     *
     * @memberof W
     * @method
     * @param {Object} control - Any other object that supports events.
     * @param {string} type - The type (name) of the event.
     * @param {function} listener - The listener to invoke when the event gets raised.
     * @param {boolean} useCapture - If true, initiates capture, otherwise false. 
     * @returns This method does not return a value.
     */
    W.evtHndAdd = function (control, type, listener, useCapture) {
        // pre-condition
        console.assert(typeof control === 'object', 'control should be Object');
        console.assert(typeof type === 'string', 'type should be string');
        console.assert(typeof listener === 'function', 'listener should be function');
        if (useCapture) {
            console.assert(typeof useCapture === 'boolean', 'useCapture should be boolean');
        }

        control.addEventListener(type, listener, useCapture);
    };
    
    /**
     * Raises an event of the specified type and with the specified additional properties.
     * @access public
     * 
     * @example <caption>Example of dispatching an event in the class Person:</caption>
     * var Person = W.clsDef(function (weight) {
     *         this.weight = weight;
     *     }, {
     *         _weightValue: undefined,
     *         weight: {
     *             get: function () {
     *                 return this._weightValue;
     *             },
     *             set: function (val) {
     *                 this._weightValue = val;
     *                 W.evtRaise(this, "WeightChanged");
     *             }
     *         }
     *     });
     *
     * @memberof W
     * @method
     * @param {Object} control - Any other object that supports events.
     * @param {string} type - The type (name) of the event.
     * @param {Object} eventProperties - The set of additional properties to be attached to the event object when the event is raised.
     * @returns {boolean} true if preventDefault was called on the event.
     */
    W.evtRaise = function (control, type, eventProperties) {
        return control.dispatchEvent(type, eventProperties);
    };
    
    /**
     * Removes an event listener from the control.
     * @access public
     *
     * @example <caption>Example of removing event handler:</caption>
     * W.evtHndDel(myPerson, "WeightChanged", listener);
     * myPerson.weight = 90;
     *
     * @memberof W
     * @method
     * @param {Object} control - Any other object that supports events.
     * @param {string} type - The type (name) of the event.
     * @param {function} listener - The listener to remove.
     * @param {boolean} useCapture - true if capture is to be initiated, otherwise false.
     * @returns This method does not return a value.
     */
    W.evtHndDel = function (control, type, listener, useCapture) {
        // pre-condition
        console.assert(typeof control === 'object', 'control should be Object');
        console.assert(typeof type === 'string', 'type should be string');
        console.assert(typeof listener === 'function', 'listener should be function');
        if (useCapture) {
            console.assert(typeof useCapture === 'boolean', 'useCapture should be boolean');
        }
        
        control.removeEventListener(type, listener, useCapture);
    };
    
    /**
     * Marks an event handler function as being compatible with declarative processing.
     * @access public
     *
     * @example <caption>Example of marking an event handler function as being compatible with declarative processing:</caption>
     * <body class="win-type-body">
     *     <div class="basicToolbar" data-win-control="WinJS.UI.ToolBar">
     *         <!-- Primary commands -->
     *         <button data-win-control="WinJS.UI.Command" data-win-options="{ id: 'cmdAdd',    label: 'Add',    section: 'primary', type: 'button', icon: 'add',    onclick: cmd.click }"></button>
     *         <button data-win-control="WinJS.UI.Command" data-win-options="{ id: 'cmdEdit',   label: 'Edit',   section: 'primary', type: 'button', icon: 'edit',   onclick: cmd.click }"></button>
     *         <button data-win-control="WinJS.UI.Command" data-win-options="{ id: 'cmdDelete', label: 'Delete', section: 'primary', type: 'button', icon: 'delete', onclick: cmd.click }"></button>
     *         <!-- Secondary command -->
     *         <button data-win-control="WinJS.UI.Command" data-win-options="{ id: 'cmdShare', label: 'Share', section: 'secondary', type: 'button', onclick: cmd.click }"></button>
     *     </div>
     *     <script>
     *         (function () {
     *             'use strict';
     *             W.nsDef("cmd", {
     *                 click: W.evtHndMark(function (e) {
     *                     var t = e.currentTarget;
     *                     if (t.winControl) {
     *                         console.log(t.winControl.label);
     *                     }
     *                 })
     *             });
     *             W.uiCtrlRender();
     *         }());
     *     </script>        
     * </body>
     *
     * @memberof W
     * @method
     * @param {function} handler - The handler to be marked as compatible with declarative processing.
     * @returns {function} The handler, marked as compatible with declarative processing.
     */
    W.evtHndMark = function (handler) {
        console.assert(typeof handler === 'function', 'handler should be function');
        
        var newHandler = WinJS.UI.eventHandler(function (ev) {
            handler(ev);
        });
        
        console.assert(newHandler !== undefined, 'newHandler should not be undefined');
        console.assert(typeof newHandler === 'function', 'newHandler should be function');
        
        return newHandler;
    };
    
    // </EVENTS>




    // <BINDING>
    
    /**
     * This function is used to add binding management functionality, 
     * in which developers can bind a user-defined object to a control that is capable of notifying listeners when the value of a property changes.
     * This is helpful for wiring up two-way data binding, 
     * something that WinJS doesn’t do itself, but isn’t too hard to pull together. 
     * @access public
     * @class
     * @memberof W
     * @param {} data - Just a plain object (and not a Date, Array, or nonobject).
     * @param {} constructor
     */
    W.ObservableProxy = WinJS.Class.mix(function (data, constructor) {
        var self = this;

        self._initObservable(data);

        // The Object.defineProperties() method defines new or modifies existing properties directly on an object, 
        // returning the object.
        // WinJS.Binding.expandProperties function wraps the specified object so that all its properties are instrumented for binding. 
        // This is meant to be used in conjunction with the binding mixin.
        Object.defineProperties(this, WinJS.Binding.expandProperties(data));

        constructor(self);
        
    }, WinJS.Binding.dynamicObservableMixin);
    
    /**
     * Basically, this method creates a bindable list of the given objects.
     * @access public
     * @memberof W
     * @method
     * @param {Array} list - The array containing the elements to initalize the list.
     * @returns 
     */
    W.bndLstNew = function (list) {
        return new WinJS.Binding.List(list);
    };
    
    /**
     * Provides a reusable declarative binding element.
     * @access public
     * @memberof W
     * @method
     * @param {} id - 
     * @returns 
     */
    W.bndTplNew = function (id) {
        var object = new WinJS.Binding.Template(document.getElementById(id));
        return object;
    };
    
    /**
     * Bind the data properties of the business object to HTML elements on the UI.
     * @access public
     * @memberof W
     * @method
     * @param {} containerId - 
     * @param {} businessObject - A simple business object with data properties. 
     * @returns 
     */
    W.bndDat2El = function (containerId, businessObject) {
        var container = document.querySelector('#' + containerId),
            prmise = WinJS.UI.processAll().then(function () {
                WinJS.Binding.processAll(container, businessObject);
            });
        return prmise;
    };
    
    /**
     * Creates a new constructor function that supports observability with the specified set of properties.
     * @access public
     * @memberof W
     * @method
     * @param {object} data - The object to use as the pattern for defining the set of properties. 
     * @returns {function} A constructor function with 1 optional argument that is the initial state of the properties.
     */
    W.bndClsNew = function (data) {
        var someFunction = WinJS.Binding.define(data);
        return someFunction;
    };
    
    // </BINDING>




    // <APPLICATION>
    
    var isFirstActivation = true;
    
    /**
     * Starts dispatching application events (the activated, checkpoint, error, loaded, ready, settings, and unload events).     
     * @access public
     * @memberof W
     * @method
     * @param {function} init - The app was activated and had not been running. Do general startup initialization here.
     * @param {function} becameVisible - The app just became visible. This may be a good time to refresh the view.
     * @param {function} longRunOper - If prelaunchActivated were true, it would mean the app was prelaunched in the background as an optimization. In that case it would be suspended shortly thereafter. Any long-running operations (like expensive network or disk I/O) or changes to user state which occur at launch should be done here (to avoid doing them in the prelaunch case). Alternatively, this work can be done in a resume or visibilitychanged handler.
     * @param {function} saveState - This application is about to be suspended. Save any state that needs to persist across suspensions here. You might use the WinJS.Application.sessionState object, which is automatically saved and restored across suspension. If you need to complete an asynchronous operation before your application is suspended, call args.setPromise().
     * @param {function} restoreState - This application had been suspended and was then terminated to reclaim memory. To create a smooth user experience, restore application state here so that it looks like the app never stopped running. Note: You may want to record the time when the app was last suspended and only restore state if they've returned after a short period.
     * @param {function} toast - If the app supports toasts, use this value from the toast payload to determine where in the app to take the user in response to them invoking a toast notification.
     * @param {function} voiceCmd - If your app can be started by voice commands, this is a good place to decide whether to populate an input field or choose a different initial view.
     * @returns {} A WinJS.Application object instance.
     */
    W.appStart = function (init, becameVisible, longRunOper, saveState, restoreState, toast, voiceCmd) {
        var app = WinJS.Application,
            activation = typeof Windows !== 'undefined' ? Windows.ApplicationModel.Activation : undefined;
        
        function onVisibilityChanged(args) {
            if (becameVisible && !document.hidden) {
                becameVisible(args);
            }
        }
        
        app.onactivated = function (args) {
            if (activation) {
                // Handle relevant ActivationKinds.
                if (voiceCmd && args.detail.kind === activation.ActivationKind.voiceCommand) {
                    voiceCmd(args);
                } else if (args.detail.kind === activation.ActivationKind.launch) {
                    // A Launch activation happens when the user launches your app via the tile
                    // or invokes a toast notification by clicking or tapping on the body.
                    if (toast && args.detail['arguments']) {
                        toast(args);
                    } else if (restoreState && args.detail.previousExecutionState === activation.ApplicationExecutionState.terminated) {
                        restoreState(args);
                    }
                }
            }

            if (longRunOper && !args.detail.prelaunchActivated) {
                longRunOper(args);
            }

            if (isFirstActivation) {
                document.addEventListener("visibilitychange", onVisibilityChanged);
                args.setPromise(WinJS.UI.processAll());
                if (init) { init(args); }
            }

            isFirstActivation = false;
        };

        if (saveState) {
            app.oncheckpoint = function (args) {
                saveState(args);
            };
        }
        
        app.start();
        
        return app;
    };
    
    // </APPLICATION>




    // <PAGE>
    
    /**
     * Ensures that the specified function executes only after the DOMContentLoaded event has fired for the current page.
     * The DOMContentLoaded event occurs after the page has been parsed but before all the resources are loaded.
     * @access public
     * @memberof W
     * @method
     * @param {function} callback - A function that executes after the DOMContentLoaded event has occurred.
     * @param {boolean} [async=false] - If true, the callback should be executed asynchronously.
     * @returns {Promise} A promise that completes after the DOMContentLoaded event has occurred.
     */
    W.pageParsed = function (callback, async) {
        var promise = WinJS.Utilities.ready(function () {
            callback();
        }, typeof async !== 'undefined' ? async : false);
    };
    
    /**
     * A ready method that will be called when the page is loaded.
     * @access public
     * @callback W~readyMethod
     * @param {DOMElement} element - The DOM element that contains all the content for the page.
     * @param {Object} options - An object that contains one or more property/value pairs to apply to the PageControl. How these property/value pairs are used (or not used) depends on the implementation of that particular PageControl.
     */
    
    /**
     * Provide a ready method that will be called when the page is loaded.
     * @access public
     * @memberof W
     * @method
     * @param {string} uri - The URI for the content that defines the page.
     * @param {W~readyMethod} readyMethod - This function is called after the page control contents have been loaded, controls have been activated, and the resulting elements have been parented to the DOM.
     * @returns {PageControl} A constructor function that creates the PageControl.
     */
    W.pageReady = function (uri, readyMethod) {
        var pageControl = WinJS.UI.Pages.define(uri, {
            ready: function (element, options) {
                readyMethod(element, options);
            }
        });
        return pageControl;
    };

    // </PAGE>




    // <UI>
    
    /**
     * Parse the HTML page, identify the attributes with the data-win-control, and generate the control accordingly.
     * @access public
     * @memberof W
     * @method
     * @param {function} onComplete - The function to be called if the promise is fulfilled successfully with a value.
     * @param {function} onError - The function to be called if the promise is fulfilled with an error.
     * @param {function} onProgress - The function to be called if the promise reports progress.
     * @returns This method does not return a value.
     */
    W.uiCtrlRender = function (onComplete, onError, onProgress) {
        if (onComplete || onError || onProgress) {
            // Wait until all the controls are created and parsed in the document.
            WinJS.UI.processAll().done(onComplete, onError, onProgress);
        } else {
            WinJS.UI.processAll();
        }
    };
        
    
    /**
     * Get the control from the HTML page’s DOM element.
     * @access public
     * @memberof W
     * @method
     */
    W.uiCtrlGet = function (id, onComplete, onError, onProgress) {
        if (onComplete) {
            WinJS.UI.processAll().done(function () {
                var control = document.getElementById(id).winControl;
                onComplete(control);
            }, onError, onProgress);
        } else {
            var control = document.getElementById(id).winControl;
            return control;
        }
    };

    /**
     * Create a new instance of the WinJS.UI.Rating JavaScript class.
     * @access public
     * @memberof W
     * @method
     * @param {} [id=rating] - The rating div element's id attribute value.
     * @param {} [maxRating=4] - The Rating control’s maximum ratings.
     * @param {} [enableClear=false] - If the enableClear property is set to true, then the user can slide to the left of the control to clear the rating value.
     * @param {} [userRating=2] - 
     * @returns A reference to the Rating Control on a page.
     */
    W.uiCtrlRatingNew = function (id, maxRating, enableClear, userRating) {
        var ratingDiv = document.getElementById(typeof id !== 'undefined' ? id : "rating"),
            ratingCtrl = new WinJS.UI.Rating(ratingDiv);
        
        ratingCtrl.maxRating = typeof maxRating !== 'undefined' ? maxRating : 4;
        ratingCtrl.enableClear = typeof enableClear !== 'undefined' ? enableClear : false;
        ratingCtrl.userRating = typeof userRating !== 'undefined' ? userRating : 2;
        
        return ratingCtrl;
    };
    
    /**
     * Create the ToggleSwitch control on the page using the WinJS.UI.ToggleSwitch.
     * @access public
     *
     * @example <caption>Example of creating a ToggleSwitch control:</caption>
     * <body class="win-type-body">                
     *     <div id="locationServices"></div>
     *     <div id="info"></div>                
     *     <div data-win-control="WinJS.UI.ToggleSwitch" 
     *          data-win-options="{title :'Wi-Fi', labelOff: 'OFF', labelOn:'ON', checked:true}">
     *     </div>
     *     <script>
     *         (function () {
     *             'use strict';
     *
     *             var toggleBtn,
     *                 infoEl;
     *
     *             function chgEvtHnd(args) {
     *                 if (toggleBtn.checked) {
     *                     infoEl.innerHTML = 'Location Services enabled';
     *                 } else {
     *                     infoEl.innerHTML = 'Location Services disabled';
     *                 }
     *             }
     *
     *             W.uiCtrlRender(function () {
     *                 toggleBtn = W.uiCtrlToggleNew('locationServices', 'Location Services', 'Disabled', 'Enabled', true, chgEvtHnd);
     *                 infoEl = document.getElementById('info');
     *             });
     *
     *         }());
     *     </script>
     * </body>
     *
     * @memberof W
     * @method
     * @param {} id - 
     * @param {} title - The title sets the title content for the ToggleSwitch.
     * @param {} [labelOff=Disabled] - The labelOff property identify the text that needs to be displayed next to the ToggleSwitch based on the unchecked (Off) state of the control.
     * @param {} [labelOn=Enabled] - The labelOn property identify the text that needs to be displayed next to the ToggleSwitch based on the checked (On) state of the control.
     * @param {} [checked=true] - The current state (checked or unchecked) of the ToggleSwitch.
     * @param {} [changeEventHandler] - This event is triggered when you change the state of the control.
     * @returns A reference to the ToggleSwitch Control on a page.
     */
    W.uiCtrlToggleNew = function (id, title, labelOff, labelOn, checked, changeEventHandler) {
        var toggleButton = new WinJS.UI.ToggleSwitch(document.getElementById(id));
        toggleButton.title = title;
        toggleButton.labelOff = typeof labelOff !== 'undefined' ? labelOff : "Disabled";
        toggleButton.labelOn = typeof labelOn !== 'undefined' ? labelOn : "Enabled";
        toggleButton.checked = typeof checked !== 'undefined' ? checked : true;
        if (changeEventHandler) {
            toggleButton.addEventListener('change', changeEventHandler);
        }
        return toggleButton;
    };
    
    /**
     * Create the DatePicker control on the page using the WinJS.UI.DatePicker.
     * Also, check out {@link https://github.com/winjs/winjs/issues/1530|DatePicker - Patterns  · Issue #1530 · winjs/winjs}.
     * @access public
     * @memberof W
     * @method
     * @param {} id - 
     * @param {} [changeEventHandler] - This event is triggered when you change the state of the control.
     * @param {} [monthPattern={month.abbreviated}] - Display pattern for the month.
     * @param {} [datePattern={day.integer(2)}] - Display pattern for the date in the DatePicker control. 
     * @param {} [yearPattern='{year.abbreviated}'] - Display pattern for the year. 
     * @returns A reference to the DatePicker Control on a page.
     */
    W.uiCtrlDateNew = function (id, changeEventHandler, monthPattern, datePattern, yearPattern) {
        var datepick = new WinJS.UI.DatePicker(document.getElementById(id));
        datepick.monthPattern = typeof monthPattern !== 'undefined' ? monthPattern : '{month.abbreviated}';
        datepick.datePattern = typeof datePattern !== 'undefined' ? datePattern : '{day.integer(2)}';
        datepick.yearPattern = typeof yearPattern !== 'undefined' ? yearPattern : '{year.abbreviated}';
        if (changeEventHandler) {
            datepick.addEventListener('change', changeEventHandler);
        }
        return datepick;
    };
    
    /**
     * Create the TimePicker control on the page using the WinJS.UI.TimePicker.
     * @access public
     * @memberof W
     * @method
     * @param {} id - 
     * @param {} [changeEventHandler] - This event is triggered when you change the state of the control.
     * @param {} [clock=24HourClock] - Clock format.
     * @param {} [minuteIncrement=15] - The increment values of the minute list.
     * @param {} [hourPattern={hour.integer(2)}] - This displays the specified number of digits for hours.
     * @param {} [minutePattern={minute.integer(2)}] - This displays the specified number of digits for minutes.
     * @param {} [periodPattern={period.abbreviated(2)}] - Display pattern for the period based on the value passed as parameter.
     * @returns A reference to the TimePicker Control on a page.
     */
    W.uiCtrlTimeNew = function (id, changeEventHandler, clock, minuteIncrement, hourPattern, minutePattern, periodPattern) {
        var timepick = new WinJS.UI.TimePicker(document.getElementById(id));
        timepick.clock = typeof clock !== 'undefined' ? clock : '24HourClock';
        timepick.minuteIncrement = typeof minuteIncrement !== 'undefined' ? minuteIncrement : 15;
        
        timepick.hourPattern = typeof hourPattern !== 'undefined' ? hourPattern : '{hour.integer(2)}';
        timepick.minutePattern = typeof minutePattern !== 'undefined' ? minutePattern : '{minute.integer(2)}';
        timepick.periodPattern = typeof periodPattern !== 'undefined' ? periodPattern : '{period.abbreviated(2)}';
        
        if (changeEventHandler) {
            timepick.addEventListener('change', changeEventHandler);
        }
        return timepick;
    };
    
    /**
     * Create the Tooltip control on the page using the WinJS.UI.Tooltip.
     * @access public
     *
     * @example <caption>Example of creating a Tooltip control:</caption>
     * <head>
     *     <style>
     *         .win-tooltip
     *         {
     *             background-color: bisque;
     *             border-radius:30px;
     *             border-color:red;
     *         }
     *     </style>
     * </head>
     * <body class="win-type-body">
     *     <button id="btnSave" class="action win-button">Save</button>
     *     <button data-win-control="WinJS.UI.Tooltip" class="action win-button"
     *             data-win-options="{ innerHTML: 'Removes the <b>Employee</b> record' }">Remove</button>
     *     <script>
     *         (function () {
     *             'use strict';
     *             W.pageParsed(function () {
     *                 var tooltip = W.uiCtrlTipNew("btnSave", 'Saves the <b>Employee</b> record');
     *                 W.uiCtrlRender();
     *             });
     *         }());
     *     </script>
     * </body>
     *
     * @memberof W
     * @method
     * @param {} id - 
     * @param {} innerHTML - The text for the tooltip control. This text can contain HTML tags too.
     * @returns A reference to the Tooltip Control on a page.
     */
    W.uiCtrlTipNew = function (id, innerHTML) {
        var tooltip = new WinJS.UI.Tooltip(document.getElementById(id));
        tooltip.innerHTML = innerHTML;
        return tooltip;
    };
    
    /**
     * Create the Repeater control on the page using the WinJS.UI.Repeater.
     * @access public
     * @memberof W
     * @method
     * @param {} id - 
     * @returns A reference to the Repeater Control on a page.
     */
    W.uiCtrlRepeaterNew = function (id) {
        var repeater = new WinJS.UI.Repeater(document.getElementById(id));
        return repeater;
    };
    
    /**
     * Create the FlipView control on the page using the WinJS.UI.FlipView.
     * @access public
     * @memberof W
     * @method
     * @param {} id - 
     * @param {} itemTemplate - A Template or function that defines the HTML for each item's page.
     * @param {} itemDataSource - Data source that provides the FlipView with items to display. The FlipView displays one item at a time, on its own page.
     * @returns A reference to the FlipView Control on a page.
     */
    W.uiCtrlFlipNew = function (id, itemTemplate, itemDataSource) {
        var flipView;
        try {
            
            function rendererTemplatingFunction(itemPromise) {
                return itemPromise.then(function (item) {
                    return itemTemplate.render(item.data);
                });
            }
            
            flipView = new WinJS.UI.FlipView(document.getElementById(id),
                { itemDataSource: itemDataSource.dataSource, itemTemplate: rendererTemplatingFunction });
        } catch (e) {
            console.log(e);
        }

        return flipView;
    };
    
    /**
     * Create an interactive list of items on the page.
     * @access public
     * @memberof W
     * @method
     * @param {} id - 
     * @param {} [layoutType=grid] - The overall appearance of the control.
     * @param {} itemTemplate - 
     * @param {} itemDataSource - The data source that implements the IListDataSource interface.
     * @param {} [layoutMaxRowsOrColumns=1] -
     * @returns 
     */
    W.uiCtrlListNew = function (id, layoutType, itemTemplate, itemDataSource, layoutMaxRowsOrColumns) {
        var listView;
        
        try {
            listView = new WinJS.UI.ListView(document.getElementById(id));

            switch (typeof layoutType !== 'undefined' ? layoutType : 'grid') {
            case "grid":
                listView.layout.type = WinJS.UI.GridLayout;
                break;
            case "cellSpanning":
                listView.layout.type = WinJS.UI.cellSpanningLayout;
                break;
            case "list":
                listView.layout.type = WinJS.UI.ListLayout;
                break;
            }

            function rendererTemplatingFunction(itemPromise) {
                return itemPromise.then(function (item) {
                    return itemTemplate.render(item.data);
                });
            }
            listView.itemTemplate = rendererTemplatingFunction;

            listView.itemDataSource = itemDataSource.dataSource;

            listView.layout.maximumRowsOrColumns =
                typeof layoutMaxRowsOrColumns !== 'undefined' ? layoutMaxRowsOrColumns : 1;
        } catch (e) {
            console.log(e);
        }
        
        return listView;
    };
    
    /**
     * Filter the items displayed in a ListView by filtering it from the data source associated with the ListView.
     * @access public
     * @memberof W
     * @method
     * @param {} listView - 
     * @param {} bindableList - 
     * @param {} searchField - 
     * @param {} searchText - 
     * @returns 
     */
    W.uiCtrlListFilter = function (listView, bindableList, searchField, searchText) {
        var filteredData = bindableList.createFiltered(function (item) {
            var result = item[searchField].toLowerCase().indexOf(searchText.toLowerCase());
            return result === 0;
        });
        listView.itemDataSource = filteredData.dataSource;
    };
    
    /**
     * @access public
     * @memberof W
     * @method
     * @param {} listView - 
     * @param {} bindableList - 
     * @param {} groupKey - 
     * @returns 
     */
    W.uiCtrlListGroup = function (listView, bindableList, groupKey) {
        var grouped = bindableList.createGrouped(
            function (item) {
                return item[groupKey];
            },
            function (item) {
                var groupData = {};
                groupData[groupKey] = item[groupKey];
                return groupData;
            },
            function (group1, group2) {
                return group1 > group2 ? 1 : -1;
            }
        );
        listView.groupDataSource = grouped.groups.dataSource;
        listView.itemDataSource = grouped.dataSource;
        return grouped;
    };
    
    /**
     * @access public
     * @memberof W
     * @method
     * @param {} listView1 - 
     * @param {} listView2 - 
     * @param {} bindableList - 
     * @param {} groupKey - 
     * @returns 
     */
    W.uiCtrlListZoom = function (listView1, listView2, bindableList, groupKey) {
        var grouped = W.uiCtrlListGroup(listView1, bindableList, groupKey);
        listView2.itemDataSource = grouped.groups.dataSource;
    };

    /**
     *
     * @access public
     *
     * @example <caption>Example of creating an AppBarCommand:</caption>
     * <body class="win-type-body">
     *     <div id="appBar">
     *         <button id="cmdAdd"></button>
     *         <button id="cmdRemove"></button>
     *         <button id="cmdCamera"></button>
     *     </div>
     *     <script>
     *         (function () {
     *             'use strict';
     *
     *             function addMethod() { console.log("Add button pressed"); }
     *             function remMethod() { console.log("Remove button pressed"); }
     *             function camMethod() { console.log("Camera button pressed"); }
     *
     *             var cmdAdd = W.uiCtrlBarCmdNew('cmdAdd', 'Add', 'add', addMethod),
     *                 cmdRem = W.uiCtrlBarCmdNew('cmdRemove', 'Remove', 'remove', remMethod),
     *                 cmdCam = W.uiCtrlBarCmdNew('cmdCamera', 'Click Photo', 'camera', camMethod),
     *                 appBar = W.uiCtrlBarNew('appBar');
     *
     *             W.uiCtrlRender();
     *         }());
     *     </script>
     * </body>
     *
     * @memberof W
     * @method
     * @param {string} id - This uniquely identifies the AppBarCommand.
     * @param {string} label - The content displayed in the AppBarCommand.
     * @param {string} icon - The built-in icons for the AppBarCommand.
     * @param {function} method - Command function.
     * @param {string} [section] - The section within the AppBar where the command should be displayed. This value can be primary or secondary.
     * @param {string} [tooltip] - The text to be displayed when you mouse-over the command button.     
     * @returns {Object}
     */
    W.uiCtrlBarCmdNew = function (id, label, icon, method, section, tooltip) {
        console.assert(typeof id === 'string', 'id should be string');
        console.assert(typeof label === 'string', 'label should be string');
        console.assert(typeof icon === 'string', 'icon should be string');
        console.assert(typeof method === 'function', 'method should be function');
        if (section) {
            console.assert(typeof section === 'string', 'section should be string');
        }
        if (tooltip) {
            console.assert(typeof tooltip === 'string', 'tooltip should be string');
        }
        
        var cmd, element;
        try {
            element = document.getElementById(id);
            cmd = new WinJS.UI.AppBarCommand(element, {
                id: id,
                section: typeof section !== 'undefined' ? 'primary' : section
            });
            cmd.label = label;
            cmd.icon = icon;
                        
            if (tooltip) {
                cmd.tooltip = tooltip;
            }
            
            element.addEventListener("click", method, false);
        } catch (e) {
            console.log(e);
        }
        
        console.assert(cmd !== undefined, 'cmd should not be undefined');
        console.assert(cmd !== null, 'cmd should not be null');
        console.assert(typeof cmd === 'object', 'cmd should be Object');
        
        return cmd;
    };
    
    /**
     * Add an app bar to your page.
     * @access public
     * @memberof W
     * @method
     * @param {} id - 
     * @returns 
     */
    W.uiCtrlBarNew = function (id) {
        var appBar;
        try {
            appBar = new WinJS.UI.AppBar(document.getElementById(id));
        } catch (e) {
            console.log(e);
        }
        return appBar;
    };
    
    /**
     *
     * @access public
     *
     * @example <caption>Example of creating a Toolbar control:</caption>
     * <body class="win-type-body">
     *     <div class="basicToolbar" id="tb">
     *         <!-- Primary commands -->
     *         <button id="cmdAdd"></button>
     *         <button id="cmdEdit"></button>
     *         <button id="cmdDelete"></button>
     *         <!-- Secondary command -->
     *         <button id="cmdShare"></button>
     *     </div>
     *     <script>
     *         (function () {
     *             'use strict';    
     *             W.nsDef("samples", {
     *                 clickcommand: function (ev) {
     *                     var command = ev.currentTarget;
     *                     if (command.winControl) {
     *                         console.log(command.winControl.label);
     *                     }
     *                 }
     *             });    
     *             var cmdAdd = W.uiCmdNew('cmdAdd', 'Add', 'primary', 'button', 'add', samples.clickcommand),
     *                 cmdEdit = W.uiCmdNew('cmdEdit', 'Edit', 'primary', 'button', 'edit', samples.clickcommand),
     *                 cmdDelete = W.uiCmdNew('cmdDelete', 'Delete', 'primary', 'button', 'delete', samples.clickcommand),
     *                 cmdShare = W.uiCmdNew('cmdShare', 'Share', 'secondary', 'button', null, samples.clickcommand),
     *                 toolbar = W.uiCtrlTbNew('tb');
     *         }());
     *     </script>
     * </body>
     *
     * @memberof W
     * @method
     * @param {} id - Defines the identifier for the command.
     * @param {} label -  Defines the text to be displayed for the command.
     * @param {} section - Defines the area in the toolbar where the command should appear. This can take a primary or secondary value.
     * @param {} type - The value is set to “button” to display a button control.
     * @param {} icon - Displays a built-in icon for the command.
     * @param {} onClick - An event that fires and calls the corresponding JavaScript method.
     * @returns 
     */
    W.uiCmdNew = function (id, label, section, type, icon, onClick) {
        var cmd;
        try {
            cmd = new WinJS.UI.Command(document.getElementById(id), { id: id, section: section });
            cmd.label = label;
            cmd.type = type;
            if (icon) { cmd.icon = icon; }
            cmd.onclick = WinJS.UI.eventHandler(function (ev) {
                onClick(ev);
            });
        } catch (e) {
            console.log(e);
        }
        return cmd;
    };
    
    /**
     *
     * @access public
     * @memberof W
     * @method
     * @param {} id - 
     * @returns 
     */
    W.uiCtrlTbNew = function (id) {
        var toolbar;
        try {
            toolbar = new WinJS.UI.ToolBar(document.getElementById(id));
        } catch (e) {
            console.log(e);
        }
        return toolbar;
    };
    
    /**
     * 
     * @access public
     * @memberof W
     * @method
     * @param {String} content - The message displayed to the user.
     * @returns 
     */
    W.uiMsgShow = function (content) {
        if (typeof Windows !== 'undefined') {
            var message = new Windows.UI.Popups.MessageDialog(content);
            message.showAsync();
            return message;
        } else {
            alert(content);
        }
    };
    
    // </UI>




    // <NETWORK>
    
    /**
     * This function wraps the calls made to the XMLHttpRequest in a promise.
     * @access public
     * @memberof W
     * @method
     */
    W.netUrlConnect = function (url, completed, error) {
        return WinJS.xhr({
            url: url
        }).then(function (result) {
            completed(result, result.status);
        }, function (e) {
            error(e);
        });
    };
    
    // </NETWORK>




    return W;
}());