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
     * @example <caption>Namespace definition and namespace extension:</caption>
     * (function () {
     *     'use strict';
     *     W.nsDef('System', {
     *         Console: {
     *             WriteLine: function (msg) {
     *                 console.log(msg);
     *             }
     *         }
     *     });
     *     System.out = {
     *         println: function (msg) {
     *             console.log(msg);
     *         }
     *     };
     *     System.Console.WriteLine('A message from the WriteLine() method.');
     *     // A message from the WriteLine() method.
     *     System.out.println('A message from the println() method.');
     *     // A message from the println() method.
     * }());
     *
     * @memberof W
     * @method
     * @param   {string} nsName   - The name of the new namespace.
     * @param   {Object} [nsMemb] - The list of objects that need to be added to the namespace being defined.
     * @returns {Object}            The newly-defined namespace.
     */
    W.nsDef = function (nsName, nsMemb) {
        // Precondition:
        console.assert(typeof nsName === 'string', 'nsName should be string');
        if (nsMemb) {
            console.assert(typeof nsMemb === 'object', 'nsMemb should be Object');
        }
        
        var ns;
        try {
            ns = WinJS.Namespace.define(nsName, nsMemb);
        } catch (e) {
            console.log(e);
        }
        
        // Postcondition:
        console.assert(ns !== undefined, 'ns should not be undefined');
        console.assert(ns !== null, 'ns should not be null');
        console.assert(typeof ns === 'object', 'ns should be Object');
        
        return ns;
    };
    
    /**
     * Add a namespace to the existing namespace and define your functionalities.
     * @access public
     *
     * @example <caption>Add a namespace to an existing namespace:</caption>
     * (function () {
     *     'use strict';
     *     W.nsDef('System');
     *     W.nsChildDef(System, 'Console', {
     *         WriteLine: function (msg) {
     *             console.log(msg);
     *         }
     *     });
     *     W.nsChildDef(System, 'out');
     *     System.out.println = function (msg) {
     *         console.log(msg);
     *     };
     *     System.Console.WriteLine('A message from the WriteLine() method.');
     *     // A message from the WriteLine() method.
     *     System.out.println('A message from the println() method.');
     *     // A message from the println() method.
     * }());
     *
     * @memberof W
     * @method
     * @param   {Object} nsParent      - Name of the parent namespace.
     * @param   {string} nsChildName   - Name of the namespace to be added to the parent namespace.
     * @param   {Object} [nsChildMemb] - The list of objects to be added to the new namespace.
     * @returns {Object}                 The newly-defined namespace.
     */
    W.nsChildDef = function (nsParent, nsChildName, nsChildMemb) {
        // Precondition:
        console.assert(typeof nsParent === 'object', 'nsParent should be Object');
        console.assert(typeof nsChildName === 'string', 'nsChildName should be string');
        if (nsChildMemb) {
            console.assert(typeof nsChildMemb === 'object', 'nsChildMemb should be Object');
        }
        
        var ns;
        try {
            ns = WinJS.Namespace.defineWithParent(nsParent, nsChildName, nsChildMemb);
        } catch (e) {
            console.log(e);
        }
        
        // Postcondition:
        console.assert(ns !== undefined, 'ns should not be undefined');
        console.assert(ns !== null, 'ns should not be null');
        console.assert(typeof ns === 'object', 'ns should be Object');
        
        return ns;
    };
    
    // </NAMESPACES>




    // <OOP>
    
    /**
     * Create a class.
     * @access public
     *
     * @example <caption>Creating a class:</caption>
     * (function () {
     *     'use strict';
     *     var TCar = W.clsDef(function (model, color) {
     *             this.model = model;
     *             this.color = color;
     *             this.constructor._count += 1;
     *         }, {
     *             _model: undefined,
     *             model: {
     *                 set: function (value) {
     *                     this._model = value;
     *                 },
     *                 get: function () {
     *                     return this._model;
     *                 }
     *             },
     *             _color: undefined,
     *             color: {
     *                 set: function (value) {
     *                     this._color = value;
     *                 },
     *                 get: function () {
     *                     return this._color;
     *                 }
     *             },
     *             display: function () {
     *                 console.log(this.model + ' has ' + this.color + ' color.');
     *             }
     *         }, {
     *             _count: 0,
     *             count: {
     *                 set: function (value) {
     *                     throw new Error('UnimplementedMethod');
     *                 },
     *                 get: function () {
     *                     return this._count;
     *                 }
     *             }
     *         }),
     *         cars = [];
     *     cars.push(new TCar('Jaguar XE R-Sport', 'DarkRed'));
     *     cars.push(new TCar('Porsche 718 Cayman S', 'DarkCyan'));
     *     cars[0].display();
     *     // Jaguar XE R-Sport has DarkRed color.
     *     cars[1].display();
     *     // Porsche 718 Cayman S has DarkCyan color.
     *     cars[1].model = 'McLaren 570S';
     *     cars[1].color = 'DarkOrange';
     *     cars[1].display();
     *     // McLaren 570S has DarkOrange color.
     *     console.log('Number of instances of the TCar class: ' + TCar.count);
     *     // Number of instances of the TCar class: 2
     *     try {
     *         TCar.count = 10;
     *     } catch (e) {
     *         console.log(e);
     *         // Error: UnimplementedMethod(…)
     *     }
     * }());
     *
     * @memberof W
     * @method
     * @param   {function} clsConst      - The first parameter lets developers initialize a new object.
     * @param   {Object}   clsMembInst   - The collection of instance members, which includes properties and methods.
     * @param   {Object}   [clsMembStat] - Static properties and static methods.
     * @returns {function}                 The newly-defined type.
     */
    W.clsDef = function (clsConst, clsMembInst, clsMembStat) {
        // Precondition:
        console.assert(typeof clsConst === 'function', 'clsConst should be function');
        console.assert(typeof clsMembInst === 'object', 'clsMembInst should be Object');
        if (clsMembStat) {
            console.assert(typeof clsMembStat === 'object', 'clsMembStat should be Object');
        }
        
        var clazz;
        try {
            clazz = WinJS.Class.define(clsConst, clsMembInst, clsMembStat);
        } catch (e) {
            console.log(e);
        }
        
        // Postcondition:
        console.assert(clazz !== undefined, 'clazz should not be undefined');
        console.assert(clazz !== null, 'clazz should not be null');
        console.assert(typeof clazz === 'function', 'clazz should be function');
        
        return clazz;
    };
    
    /**
     * Derive one class from another.
     * @access public
     *
     * @example <caption>Deriving a class:</caption>
     * (function () {
     *     'use strict';
     *     var TMechanicalCar = W.clsChildDef(TCar, function (model, color, fuelTank) {
     *             this.model = model;
     *             this.color = color;
     *             this.fuelTank = fuelTank;
     *             this.constructor._count += 1;
     *         }, {
     *             _fuelTank: undefined,
     *             fuelTank: {
     *                 set: function (value) {
     *                     this._fuelTank = value;
     *                 },
     *                 get: function () {
     *                     return this._fuelTank;
     *                 }
     *             },
     *             display: function () {
     *                 console.log(this.model + ' has ' + this.color + ' color and ' + this.fuelTank + ' gal fuel tank.');
     *             }
     *         }, {
     *             _count: 0,
     *             count: {
     *                 set: function (value) {
     *                     throw new Error('UnimplementedMethod');
     *                 },
     *                 get: function () {
     *                     return this._count;
     *                 }
     *             }
     *         }),
     *         TElectricCar = W.clsChildDef(TCar, function (model, color, batteryType) {
     *             this.model = model;
     *             this.color = color;
     *             this.batteryType = batteryType;
     *             this.constructor._count += 1;
     *         }, {
     *             _batteryType: undefined,
     *             batteryType: {
     *                 set: function (value) {
     *                     this._batteryType = value;
     *                 },
     *                 get: function () {
     *                     return this._batteryType;
     *                 }
     *             },
     *             display: function () {
     *                 console.log(this.model + ' has ' + this.color + ' color and ' + this.batteryType + ' battery.');
     *             }
     *         }, {
     *             _count: 0,
     *             count: {
     *                 set: function (value) {
     *                     throw new Error('UnimplementedMethod');
     *                 },
     *                 get: function () {
     *                     return this._count;
     *                 }
     *             }
     *         }),
     *         cars = [];
     *     cars.push(new TMechanicalCar('Subaru BRZ', 'LightSkyBlue', 13.2));
     *     cars.push(new TElectricCar('Tesla Model X', 'WhiteSmoke', 'Li-ion'));
     *     cars[0].display();
     *     // Subaru BRZ has LightSkyBlue color and 13.2 gal fuel tank.
     *     cars[1].display();
     *     // Tesla Model X has WhiteSmoke color and Li-ion battery.
     *     console.log('Number of instances of the TCar class: ' + TCar.count);
     *     // Number of instances of the TCar class: 0
     *     console.log('Number of instances of the TMechanicalCar class: ' + TMechanicalCar.count);
     *     // Number of instances of the TMechanicalCar class: 1
     *     console.log('Number of instances of the TElectricCar class: ' + TElectricCar.count);
     *     // Number of instances of the TElectricCar class: 1
     * }());
     *
     * @memberof W
     * @method
     * @param   {function} clsBase       - The class that the current class needs to inherit from.
     * @param   {function} clsConst      - The constructor function that can be used to initialize the class members.
     * @param   {Object}   [clsMembInst] - Instance members, which includes properties and methods.
     * @param   {Object}   [clsMembStat] - Static properties and static methods.
     * @returns {function}                 The newly-defined type.
     */
    W.clsChildDef = function (clsBase, clsConst, clsMembInst, clsMembStat) {
        // Precondition:
        console.assert(typeof clsBase === 'function', 'clsBase should be function');
        console.assert(typeof clsConst === 'function', 'clsConst should be function');
        if (clsMembInst) {
            console.assert(typeof clsMembInst === 'object', 'clsMembInst should be Object');
        }
        if (clsMembStat) {
            console.assert(typeof clsMembStat === 'object', 'clsMembStat should be Object');
        }

        var clazz;
        try {
            clazz = WinJS.Class.derive(clsBase, clsConst, clsMembInst, clsMembStat);
        } catch (e) {
            console.log(e);
        }
        
        // Postcondition:
        console.assert(clazz !== undefined, 'clazz should not be undefined');
        console.assert(clazz !== null, 'clazz should not be null');
        console.assert(typeof clazz === 'function', 'clazz should be function');
        
        return clazz;
    };
    
    /**
     * Combine methods and properties from multiple JavaScript objects.
     * @access public
     *
     * @example <caption>Create mixins:</caption>

     *
     * @memberof W
     * @method
     * @param {function}    constr - The first parameter, which is used to initialize the class members.
     * @param {...function} mixin  - The array that takes the mixin methods.
     * @returns {function}           The newly defined class.
     */
    W.clsMix = function (constr, mixin) {
        var i, clazz;
        
        // Precondition:
        console.assert(typeof constr === 'function', 'constr should be function');
        for (i = 1; i < arguments.length; i += 1) {
            console.assert(typeof arguments[i] === 'function', 'mixin should be function');
        }

        try {
            clazz = WinJS.Class.mix.apply(null, arguments);
        } catch (e) {
            console.log(e);
        }
        
        // Postcondition:
        console.assert(clazz !== undefined, 'clazz should not be undefined');
        console.assert(clazz !== null, 'clazz should not be null');
        console.assert(typeof clazz === 'function', 'clazz should be function');
        
        return clazz;
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
     * @param {boolean} [useCapture=false] - If true, initiates capture, otherwise false. 
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

        control.addEventListener(type, listener, typeof useCapture !== 'undefined' ? useCapture : false);
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
     *
     * @example <caption>Example of observable proxy:</caption>
     * <body>                
     *     <div id="yourTemplate" data-win-control="WinJS.Binding.Template">
     *         <input data-win-bind="value: someProperty" name="someProperty" type="text" />
     *     </div>
     *     <div id="yourTargetContainer"></div>        
     *     <script>
     *         (function () {
     *             'use strict';
     *             var ViewModel = W.clsDef(function () {
     *                     // this is the constructor function
     *                 }, {
     *                     // object literal for methods and attributes on the "class"		
     *                     _someProperty: undefined,
     *                     someProperty: {
     *                         set: function (value) { this._someProperty = value; },
     *                         get: function () { return this._someProperty; }
     *                     }
     *                 }),
     *                 vm,
     *                 tplEl,
     *                 targetContainer;
     *             vm = new W.ObsPrx(ViewModel, function (self) { self.someProperty = "test"; });
     *             vm.bind("someProperty", function () { console.log("Value changed!"); });
     *             W.pageParsed(function () {
     *                 tplEl = document.getElementById("yourTemplate");
     *                 targetContainer = document.getElementById("yourTargetContainer");
     *                 W.uiCtrlRender(function () {
     *                     tplEl.winControl.render(vm, targetContainer).then(function (e) {
     *                         var el = targetContainer.querySelector("input[name='someProperty']");
     *                         if (el) {
     *                             el.addEventListener("change", function (e) {
     *                                 var propName = e.target.getAttribute("name");
     *                                 vm.setProperty(propName, e.target.value);
     *                             });
     *                         }
     *                     });
     *                 });
     *             });
     *         }());
     *     </script>
     * </body>
     *
     * @class
     * @memberof W
     * @param {} data - Just a plain object (and not a Date, Array, or nonobject).
     * @param {} constructor
     */
    W.ObsPrx = WinJS.Class.mix(function (data, constructor) {
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
     *
     * @example <caption>Example of creating bindable list:</caption>
     * <head>
     *     <style>
     *         #basicListView { height: 100%; margin-top: 10px; margin-right: 20px; }
     *         #templateContainer { display: -ms-grid; -ms-grid-columns: 1fr; min-height: 150px; }
     *         #itemContainer { background-color: lightgray; width: 100%; padding: 10px; }
     *     </style>
     * </head>
     * <body class="win-type-body">
     *     <div id="flavorItemTemplate" data-win-control="WinJS.Binding.Template">
     *         <div id="templateContainer">
     *             <div id="itemContainer">
     *                 <h4 data-win-bind="innerText: title"></h4>
     *                 <h6 data-win-bind="innerText: text"></h6>
     *             </div>
     *         </div>
     *     </div>
     *     <div id="basicListView" data-win-control="WinJS.UI.ListView"
     *          data-win-options="{ itemDataSource: DataExample.flavorList.dataSource,
     *                              itemTemplate: select('#flavorItemTemplate'),
     *                              selectionMode: 'none',
     *                              layout: { type: WinJS.UI.ListLayout } }">
     *     </div>
     *     <script>
     *         (function () {
     *             'use strict';
     *             var flavors = [{ title: "Basic banana", text: "Low-fat frozen yogurt" },
     *                 { title: "Banana blast", text: "Ice cream" },
     *                 { title: "Brilliant banana", text: "Frozen custard" },
     *                 { title: "Orange surprise", text: "Sherbet" },
     *                 { title: "Original orange", text: "Sherbet" },
     *                 { title: "Vanilla", text: "Ice cream" },
     *                 { title: "Very vanilla", text: "Frozen custard" },
     *                 { title: "Marvelous mint", text: "Gelato" },
     *                 { title: "Succulent strawberry", text: "Sorbet" }],
     *                 flavorList = W.bndLstNew(flavors);
     *             W.nsDef("DataExample", { flavorList: flavorList });
     *             W.uiCtrlRender();
     *         }());
     *     </script>
     * </body>
     *
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
     *
     * @example <caption>Example of binding the data properties of the business object to HTML elements on the UI:</caption>
     * <body class="win-type-body">
     *     <div id="container">
     *         <h3>Name:</h3>
     *         <h2><span data-win-bind="innerText: name"></span></h2>
     *         <h3>Age:</h3>
     *         <h2><span data-win-bind="innerText: age"></span></h2>
     *         <h3>Designation:</h3>
     *         <h2><span data-win-bind="innerText: designation"></span></h2>
     *         <h3>City:</h3>
     *         <h2><span data-win-bind="innerText: city"></span></h2>
     *         <h3>Fav Color:</h3>
     *         <div data-win-bind="style.background: favcolor">
     *             <div class="favcolor" data-win-bind="innerText: favcolor"></div>
     *         </div>
     *     </div>
     *     <script>
     *         (function () {
     *             'use strict';
     *             var person = {
     *                     name: "Abbas Gussenov",
     *                     age: 26,
     *                     designation: "Software Developer",
     *                     city: "Terekty",
     *                     favcolor: "green"
     *                 };
     *             W.bndDat2El('container', person);
     *         }());
     *     </script>
     * </body>
     *
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
     *
     * @example <caption>Example of creating observable constructor:</caption>
     * <body class="win-type-body">
     *     <div id="templateDiv" data-win-control="WinJS.Binding.Template">
     *         <div class="templateItem" data-win-bind="style.background: color" style="color: white">
     *             <ol>
     *                 <li><span>Name: </span><span data-win-bind="textContent: name"></span></li>
     *                 <li><span>Birthday: </span><span data-win-bind="textContent: birthday"></span></li>
     *                 <li><span>Pet's name: </span><span data-win-bind="textContent: petname"></span></li>
     *                 <li><span>Dessert: </span><span data-win-bind="textContent: dessert"></span></li>
     *             </ol>
     *         </div>
     *     </div>
     *     <div id="renderDiv"></div>
     *     <fieldset id="templateControlObject">
     *         <legend>Pick a name:</legend>
     *         <select id="templateControlObjectSelector">
     *             <option value="0">Show John Doe</option>
     *             <option value="1">Show Jane Dow</option>
     *             <option value="2">Show Jake Doe</option>
     *         </select>
     *     </fieldset>
     *     <script>
     *         (function () {
     *             'use strict';
     *             var Person = W.bndClsNew({ name: "", color: "", birthday: "", petname: "", dessert: "" }),
     *                 people = [
     *                     new Person({ name: "John Doe", color: "red", birthday: "2/2/2002", petname: "Spot", dessert: "chocolate cake" }),
     *                     new Person({ name: "Jane Doe", color: "green", birthday: "3/3/2003", petname: "Xena", dessert: "cherry pie" }),
     *                     new Person({ name: "Jake Doe", color: "blue", birthday: "2/2/2002", petname: "Pablo", dessert: "ice cream" })
     *                 ],
     *                 selector;
     *             function handleChange(evt) {
     *                 var templateElement = document.querySelector("#templateDiv"),
     *                     renderElement = document.querySelector("#renderDiv"),
     *                     selected = evt.target.selectedIndex,
     *                     templateControl = templateElement.winControl;
     *                 renderElement.innerHTML = "";
     *                 templateElement.winControl.render(people[selected], renderElement);
     *             }
     *             selector = document.querySelector("#templateControlObjectSelector");
     *             W.evtHndAdd(selector, "change", handleChange, false);
     *             W.uiCtrlRender();
     *         }());
     *     </script>
     * </body>
     *
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
     *
     * @example <caption>Example of creating a Rating control:</caption>
     * <body class="win-type-body">
     *     <h1>Example 1 (declaratively)</h1>
     *     <div data-win-control="WinJS.UI.Rating" data-win-options="{ maxRating: 4, enableClear: false }"></div>
     *     <h1>Example 2 (programmatically)</h1>
     *     <div id="rating"></div>
     *     <button class="action win-button" id="btnInc" type="button">Increase</button>
     *     <script>
     *         (function () {
     *             'use strict';
     *             W.uiCtrlRender();
     *             var ratingCtrl = W.uiCtrlRatingNew();
     *             W.evtHndAdd(document.getElementById("btnInc"), "click", function () {
     *                 var ratingControl = W.uiCtrlGet("rating");
     *                 ratingControl.userRating += 1;
     *             });
     *         }());
     *     </script>
     * </body>
     *
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
     *
     * @example <caption>Example of creating a DatePicker control:</caption>
     * <body class="win-type-body">
     *     <h3>Example 1 (programmatically)</h3>
     *     <div id="birthday"></div>
     *     <div id="info"></div>
     *     <h3>Example 2 (declaratively)</h3>
     *     <div data-win-control="WinJS.UI.DatePicker"
     *          data-win-options="{ monthPattern: '{month.abbreviated}', 
     *                               datePattern: '{day.integer(2)}', 
     *                               yearPattern: '{year.abbreviated}' }">
     *     </div>
     *     <script>
     *         (function () {
     *             'use strict';
     *             var datePick, infoEl = document.getElementById("info");
     *             W.uiCtrlRender();
     *             datePick = new W.uiCtrlDateNew("birthday", function (args) {
     *                 infoEl.innerHTML = "The selected date is " + datePick.current.toDateString();
     *             }, '{month.abbreviated}', '{day.integer(2)}', '{year.abbreviated}');
     *         }());
     *     </script>
     * </body>
     *
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
     *
     * @example <caption>Example of creating a TimePicker control:</caption>
     * <body class="win-type-body">
     *     <h3>Example 1 (programmatically)</h3>
     *     <div id="timeSelector"></div>        
     *     <div id="info"></div>        
     *     <h3>Example 2 (declaratively)</h3>
     *     <div data-win-control="WinJS.UI.TimePicker" 
     *          data-win-options="{ clock: '24HourClock', minuteIncrement: 15 }">
     *     </div>
     *     <script>
     *         (function () {
     *             'use strict';
     *             var timePick, infoEl = document.getElementById("info");
     *             W.uiCtrlRender();
     *             timePick = new W.uiCtrlTimeNew("timeSelector", function (args) {
     *                 infoEl.innerHTML = "The selected time is " + timePick.current.toTimeString();
     *             }, '24HourClock', 15, 'Hour: {hour.integer(2)}', 'Min: {minute.integer(2)}', '{period.abbreviated(2)}');
     *         }());
     *     </script>
     * </body>
     *
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
     *
     * @example <caption>Example of creating a Repeater control:</caption>
     * <body class="win-type-body">        
     *     <h1>Example 1 (programmatically)</h1>
     *     <table>
     *         <thead>
     *             <tr>
     *                 <th>Employee ID</th>
     *                 <th>Employee Name</th>
     *                 <th>Employee Designation</th>
     *             </tr>
     *         </thead>
     *         <tbody id="repeaterData">
     *             <tr>
     *                <td data-win-bind="textContent:id"></td>
     *                <td data-win-bind="textContent:name"></td>
     *                <td data-win-bind="textContent:designation"></td>
     *             </tr>
     *         </tbody>
     *     </table>
     * 
     *     <h1>Example 2 (declaratively)</h1>
     *     <div id="repeaterData2" data-win-control="WinJS.UI.Repeater">
     *         <div data-win-control="WinJS.UI.ItemContainer" data-win-bind="dataset.name:name">
     *             <div data-win-bind="textContent:name"></div>
     *         </div>
     *     </div>
     * 
     *     <script>
     *         (function () {
     *             'use strict';
     *             var employees = W.bndLstNew([{ id: 1, name: "Abbas Gussenov", designation: "Software Developer" },
     *                     { id: 2, name: "John Smith", designation: "Web Designer" }]),
     *                 repeaterControl1;
     *             repeaterControl1 = W.uiCtrlRepeaterNew("repeaterData");
     *             repeaterControl1.data = employees;
     * 
     *             W.uiCtrlRender(function () {
     *                 var repeaterControl2 = document.getElementById('repeaterData2').winControl;
     *                 repeaterControl2.data = employees;
     *                 repeaterControl2.addEventListener("invoked", function (e) {
     *                     console.log(e.target.dataset.name);
     *                 });
     *             });
     *         }());
     *     </script>
     * </body>
     *
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
     *
     * @example <caption>Example of creating a FlipView control:</caption>
     * <body class="win-type-body">        
     *     <h1>Example 1 (programmatically)</h1>
     *     <div id="template">
     *         <div>
     *             <h4 data-win-bind="innerText: name"></h4>
     *             <h6 data-win-bind="innerText: vendor"></h6>
     *         </div>
     *     </div>
     *     <div id="flipView1" style="height: 128px;"></div>        
     *     <h1>Example 2 (declaratively)</h1>
     *     <div id="template2" data-win-control="WinJS.Binding.Template">
     *         <div>
     *             <h4 data-win-bind="innerText: name"></h4>
     *             <h6 data-win-bind="innerText: vendor"></h6>
     *         </div>
     *     </div>
     *     <div id="flipView2" style="height: 128px;" data-win-control="WinJS.UI.FlipView"
     *         data-win-options="{ itemTemplate: select('#template2'), itemDataSource: SampleData.Products.dataSource }">
     *     </div>
     *     <script>
     *         (function () {
     *             'use strict';
     *             var Products = W.bndLstNew([{ id: 1, name: "iPad", vendor: "Apple" },
     *                     { id: 2, name: "iPhone", vendor: "Apple" }]);
     *             W.nsDef("SampleData", {
     *                 Products: Products
     *             });
     *             var template = W.bndTplNew("template"),
     *                 flipView1 = W.uiCtrlFlipNew("flipView1", template, SampleData.Products);
     *             W.uiCtrlRender();
     *         }());
     *     </script>
     * </body>
     *
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
     *
     * @example <caption>Example of creating a ListView control:</caption>
     * <body class="win-type-body">
     *     <h3>Example 1 (programmatically)</h3>
     *     <div id="template">
     *         <div style="height: 60px; width: 100px;">
     *             <h4 data-win-bind="innerText: name"></h4>
     *             <h6 data-win-bind="innerText: vendor"></h6>
     *         </div>
     *     </div>
     *     <div id="listView1" style="height: 128px;"></div>
     *     <h3>Example 2 (declaratively)</h3>
     *     <div id="template2" data-win-control="WinJS.Binding.Template">
     *         <div style="height: 60px; width: 100px;">
     *             <h4 data-win-bind="innerText: name"></h4>
     *             <h6 data-win-bind="innerText: vendor"></h6>
     *         </div>
     *     </div>
     *     <div data-win-control="WinJS.UI.ListView" style="height: 180px;"
     *         data-win-options="{ itemTemplate: select('#template2'), 
     *                             layout: { type: WinJS.UI.GridLayout, maximumRowsOrColumns: 5 },
     *                             itemDataSource: SampleData.Products.dataSource }">
     *     </div>
     *     <script>
     *         (function () {
     *             'use strict';
     *             var Products = W.bndLstNew([{ id: 1, name: "iPad", vendor: "Apple" },
     *                 { id: 2, name: "iPhone", vendor: "Apple" },
     *                 { id: 3, name: "Kindle", vendor: "Amazon" },
     *                 { id: 4, name: "Xbox", vendor: "Microsoft" },
     *                 { id: 5, name: "PlayStation", vendor: "Sony" },
     *                 { id: 6, name: "Galaxy", vendor: "Samsung" },
     *                 { id: 7, name: "MacBook", vendor: "Apple" },
     *                 { id: 8, name: "ZenBook", vendor: "ASUS" },
     *                 { id: 9, name: "Core i7", vendor: "Intel" },
     *                 { id: 10, name: "GeForce", vendor: "NVIDIA" }]),
     *                 listControl1, template;
     *             W.nsDef("SampleData", { Products: Products });
     *             template = W.bndTplNew("template");
     *             listControl1 = W.uiCtrlLstNew("listView1", "grid", template, SampleData.Products, 0);
     *             listControl1.addEventListener("iteminvoked", function (e) {
     *                 var index = e.detail.itemIndex;
     *                 e.detail.itemPromise.then(function (item) {
     *                     console.log(item.data.name);
     *                 });
     *             });
     *             W.uiCtrlRender();
     *         }());
     *     </script>
     * </body>
     *
     * @memberof W
     * @method
     * @param {} id - 
     * @param {} [layoutType=grid] - The overall appearance of the control.
     * @param {} itemTemplate - 
     * @param {} itemDataSource - The data source that implements the IListDataSource interface.
     * @param {} [layoutMaxRowsOrColumns=1] -
     * @returns 
     */
    W.uiCtrlLstNew = function (id, layoutType, itemTemplate, itemDataSource, layoutMaxRowsOrColumns) {
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
     *
     * @example <caption>Example of filtering items in the ListView control:</caption>
     * <body class="win-type-body">
     *     <div id="template">
     *         <div style="height: 60px; width: 100px;">
     *             <h4 data-win-bind="innerText: name"></h4>
     *             <h6 data-win-bind="innerText: vendor"></h6>
     *         </div>
     *     </div>
     *     <div id="listView1" style="height: 128px;"></div>
     *     <div><input id="txtSearch" /></div>
     *     <script>
     *         (function () {
     *             'use strict';
     *             var Products = W.bndLstNew([{ id: 1, name: "iPad", vendor: "Apple" },
     *                 { id: 2, name: "iPhone", vendor: "Apple" },
     *                 { id: 3, name: "Kindle", vendor: "Amazon" },
     *                 { id: 4, name: "Xbox", vendor: "Microsoft" },
     *                 { id: 5, name: "PlayStation", vendor: "Sony" },
     *                 { id: 6, name: "Galaxy", vendor: "Samsung" },
     *                 { id: 7, name: "MacBook", vendor: "Apple" },
     *                 { id: 8, name: "ZenBook", vendor: "ASUS" },
     *                 { id: 9, name: "Core i7", vendor: "Intel" },
     *                 { id: 10, name: "GeForce", vendor: "NVIDIA" }]),
     *                 listControl1, template, filterText;
     *             W.nsDef("SampleData", { Products: Products });
     *             template = W.bndTplNew("template");
     *             listControl1 = W.uiCtrlLstNew("listView1", "grid", template, SampleData.Products, 0);
     *             listControl1.addEventListener("iteminvoked", function (e) {
     *                 var index = e.detail.itemIndex;
     *                 e.detail.itemPromise.then(function (item) {
     *                     console.log(item.data.name);
     *                 });
     *             });
     *             filterText = document.getElementById('txtSearch');
     *             filterText.addEventListener("keyup", function () {
     *                 W.uiCtrlLstFilter(listControl1, SampleData.Products, "vendor", filterText.value);
     *             });
     *         }());
     *     </script>
     * </body>
     *
     * @memberof W
     * @method
     * @param {} listView - 
     * @param {} bindableList - 
     * @param {} searchField - 
     * @param {} searchText - 
     * @returns 
     */
    W.uiCtrlLstFilter = function (listView, bindableList, searchField, searchText) {
        var filteredData = bindableList.createFiltered(function (item) {
            var result = item[searchField].toLowerCase().indexOf(searchText.toLowerCase());
            return result === 0;
        });
        listView.itemDataSource = filteredData.dataSource;
    };
    
    /**
     * @access public
     *
     * @example <caption>Example of grouping items in the ListView control:</caption>
     * <body class="win-type-body">
     *     <div id="GroupHeader" data-win-control="WinJS.Binding.Template">
     *         <div data-win-bind="innerText: vendor"></div>
     *     </div>
     *     <div id="product" data-win-control="WinJS.Binding.Template">
     *         <div data-win-bind="innerText:name" style="width:128px;"></div>
     *     </div>
     *     <div id="lvProducts" style="height: 180px;" data-win-control="WinJS.UI.ListView"
     *         data-win-options="{ itemTemplate: select('#product'), 
     *                           groupHeaderTemplate: select('#GroupHeader'),
     *                           itemDataSource: SampleData.Products.dataSource }">
     *     </div>
     *     <script>
     *         (function () {
     *             'use strict';
     *             var products = W.bndLstNew([{ id: 1, name: "iPad", vendor: "Apple" },
     *                     { id: 2, name: "iPhone", vendor: "Apple" },
     *                     { id: 3, name: "Kindle", vendor: "Amazon" },
     *                     { id: 4, name: "Xbox", vendor: "Microsoft" },
     *                     { id: 5, name: "PlayStation", vendor: "Sony" },
     *                     { id: 6, name: "Galaxy", vendor: "Samsung" },
     *                     { id: 7, name: "MacBook", vendor: "Apple" },
     *                     { id: 8, name: "ZenBook", vendor: "ASUS" },
     *                     { id: 9, name: "Core i7", vendor: "Intel" },
     *                     { id: 10, name: "GeForce", vendor: "NVIDIA"}]),
     *                 listControl1;
     *             W.nsDef("SampleData", {
     *                 Products: products
     *             });
     *             W.uiCtrlRender(function () {
     *                 W.uiCtrlGet("lvProducts", function (listView1) {
     *                     W.uiCtrlLstGrp(listView1, SampleData.Products, "vendor");
     *                 });
     *             });
     *         }());
     *     </script>
     * </body>
     *
     * @memberof W
     * @method
     * @param {} listView - 
     * @param {} bindableList - 
     * @param {} groupKey - 
     * @returns 
     */
    W.uiCtrlLstGrp = function (listView, bindableList, groupKey) {
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
     *
     * @example <caption>Example of viewing data at two different zoom levels:</caption>
     * <body class="win-type-body">        
     *     <div id="GroupHeader" data-win-control="WinJS.Binding.Template">
     *         <div data-win-bind="innerText: vendor"></div>
     *     </div>
     * 
     *     <div id="ProductTemplate" data-win-control="WinJS.Binding.Template">
     *         <div data-win-bind="innerText:name" style="width:128px;"></div>
     *     </div>
     * 
     *     <!-- Zoom out-->
     *     <div id="VendorTemplate" data-win-control="WinJS.Binding.Template">
     *         <div data-win-bind="innerText: vendor" style="width:128px;"></div>
     *     </div>
     * 
     *     <div data-win-control="WinJS.UI.SemanticZoom" style="height:170px;">
     *         <!-- Zoom In-->
     *         <div id="lvProducts" data-win-control="WinJS.UI.ListView"
     *             data-win-options="{ itemTemplate: select('#ProductTemplate'), 
     *                                 groupHeaderTemplate: select('#GroupHeader'),
     *                                 itemDataSource: SampleData.Products.dataSource }">
     *         </div>
     * 
     *         <!-- Zoom Out-->
     *         <div id="lvVendors" data-win-control="WinJS.UI.ListView"
     *             data-win-options="{ itemTemplate: select('#VendorTemplate')}">
     *         </div>
     *     </div>
     * 
     *     <script>
     *         (function () {
     *             'use strict';
     *             var products = W.bndLstNew([{ id: 1, name: "iPad", vendor: "Apple" },
     *                 { id: 2, name: "iPhone", vendor: "Apple" },
     *                 { id: 3, name: "Kindle", vendor: "Amazon" },
     *                 { id: 4, name: "Xbox", vendor: "Microsoft" },
     *                 { id: 5, name: "PlayStation", vendor: "Sony" },
     *                 { id: 6, name: "Galaxy", vendor: "Samsung" },
     *                 { id: 7, name: "MacBook", vendor: "Apple" },
     *                 { id: 8, name: "ZenBook", vendor: "ASUS" },
     *                 { id: 9, name: "Core i7", vendor: "Intel" },
     *                 { id: 10, name: "GeForce", vendor: "NVIDIA" }]);
     *             W.nsDef("SampleData", {
     *                 Products: products
     *             });
     *             W.uiCtrlRender(function () {
     *                 W.uiCtrlLstZoom(W.uiCtrlGet("lvProducts"), W.uiCtrlGet("lvVendors"), SampleData.Products, "vendor");
     *             });
     *         }());
     *     </script>
     * </body>
     *
     * @memberof W
     * @method
     * @param {} listView1 - 
     * @param {} listView2 - 
     * @param {} bindableList - 
     * @param {} groupKey - 
     * @returns 
     */
    W.uiCtrlLstZoom = function (listView1, listView2, bindableList, groupKey) {
        var grouped = W.uiCtrlLstGrp(listView1, bindableList, groupKey);
        listView2.itemDataSource = grouped.groups.dataSource;
    };

    /**
     *
     * @access public
     *
     * @example <caption>Example of placing commands in the appbar:</caption>
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
     *
     * @example <caption>Example of appbar:</caption>
     * <body class="win-type-body">
     *     <div id="appBar" data-win-control="WinJS.UI.AppBar">
     *         <button data-win-control="WinJS.UI.AppBarCommand"
     *                 data-win-options="{ id: 'cmdAdd', label: 'Add', icon: 'add', section: 'primary', tooltip: 'Add' }">
     *         </button>
     *         <button data-win-control="WinJS.UI.AppBarCommand"
     *                 data-win-options="{ id: 'cmdRemove', label: 'Remove', icon: 'remove', section: 'primary', tooltip: 'Remove' }">
     *         </button>
     *         <button data-win-control="WinJS.UI.AppBarCommand"
     *                 data-win-options="{ id: 'cmdCamera', label: 'Click Photo', icon: 'camera', section: 'secondary', tooltip: 'click' }">
     *         </button>
     *     </div>
     *     <script>
     *         (function () {
     *             'use strict';
     *             function addMethod() { console.log("Add Button Pressed"); }
     *             function removeMethod() { console.log("Remove button pressed"); }
     *             function cameraMethod() { console.log("Camera button pressed"); }
     *             W.pageReady("control_appbar_declarative.html", function (el, options) {
     *                 el.querySelector("#cmdAdd").addEventListener("click", addMethod, false);
     *                 el.querySelector("#cmdRemove").addEventListener("click", removeMethod, false);
     *                 el.querySelector("#cmdCamera").addEventListener("click", cameraMethod, false);
     *             });
     *         }());
     *     </script>
     * </body>
     *
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
     * @example <caption>Example of placing commands in the toolbar:</caption>
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
     *
     * @example <caption>Example of Connecting to URL:</caption>
     * <body>        
     *     <div>
     *         <input id="inputurl" value="https:     * api.github.com" />
     *         <button class="action win-button" id="connect" type="button">Connect</button>
     *         <button class="action win-button" id="cancel" type="button">Cancel</button>
     *     </div>        
     *     <div id="output"></div>
     *     <script>
     *         (function () {
     *             'use strict';
     *             var input = document.getElementById("inputurl"),
     *                 cancelBtn = document.getElementById("cancel"),
     *                 connectBtn = document.getElementById("connect"),
     *                 xhrPromise;
     *             function connect(url) {
     *                 var resultDiv = document.getElementById("output");
     *                 xhrPromise = W.netUrlConnect(url, function (result, status) {
     *                     if (result.status === 200) {
     *                         resultDiv.style.backgroundColor = "Green";
     *                         resultDiv.innerText = "Success";
     *                     }
     *                 }, function (e) {
     *                     resultDiv.style.backgroundColor = "red";
     *                     resultDiv.innerText = e.statusText;
     *                 });
     *             }
     *             W.evtHndAdd(input, "change", function (e) {
     *                 connect(e.target.value);
     *             });
     *             W.evtHndAdd(cancelBtn, "click", function () {
     *                 xhrPromise.cancel();
     *             }, false);
     *             W.evtHndAdd(connectBtn, "click", function () {
     *                 connect(input.value);
     *             }, false);
     *         }());
     *     </script>
     * </body>
     *
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