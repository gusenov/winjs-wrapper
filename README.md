# wJS

* [What is wJS?](#what-is-wjs)
* [Examples](#examples)
    * [Namespaces](#namespaces)
        * [Example of namespace definition](#example-of-namespace-definition)
        * [Example of namespace population](#example-of-namespace-population)
    * [Add a namespace to an existing namespace](#add-a-namespace-to-an-existing-namespace)
        * [Example of namespace in namespace](#example-of-namespace-in-namespace)
        * [Example of adding members to nested namespace](#example-of-adding-members-to-nested-namespace)
    * [Creating a class](#creating-a-class)
        * [Example of class Robot](#example-of-class-robot)
        * [Example of class Car](#example-of-class-car)
        * [Example of class Person](#example-of-class-person)
    * [Deriving a class](#deriving-a-class)
        * [Example of classes MechanicalCar and ElectricCar](#example-of-classes-mechanicalcar-and-electriccar)
        * [Example of class Employee](#example-of-class-employee)
    * [Create mixins](#create-mixins)
        * [Example of class HybridCar](#example-of-class-hybridcar)
    * [Manage events](#manage-events)
        * [Example of adding event management functionality to the class Person](#example-of-adding-event-management-functionality-to-the-class-person)
        * [Example of defining event in the class Person](#example-of-defining-event-in-the-class-person)
        * [Example of adding event handler](#example-of-adding-event-handler)
        * [Example of dispatching an event in the class Person](#example-of-dispatching-an-event-in-the-class-person)
        * [Example of removing event handler](#example-of-removing-event-handler)
        * [Example of marking an event handler function as being compatible with declarative processing](#example-of-marking-an-event-handler-function-as-being-compatible-with-declarative-processing)
    * [Controls](#controls)
        * [Example of creating a ToggleSwitch control](#example-of-creating-a-toggleswitch-control)
        * [Example of creating a Tooltip control](#example-of-creating-a-tooltip-control)
        * [Example of creating an AppBarCommand](#example-of-creating-an-appbarcommand)
        * [Example of creating a Toolbar control](#example-of-creating-a-toolbar-control)

What is wJS?
-----------------

wJS is a collection of frequently used functions for WinJS apps.

Examples
-----------------

### Namespaces ###

#### Example of namespace definition: ####

```js
// Define the namespace ProgrammingLanguages and create the JavaScript under it.
W.nsDef("ProgrammingLanguages", {
    JavaScript: {
        getDescription: function () {
            return 'JavaScript is the programming language of HTML and the Web.';
        }
    }
});
console.log(ProgrammingLanguages.JavaScript.getDescription());
```

#### Example of namespace population: ####

```js
// Define the namespace ProgrammingLanguages.
W.nsDef("ProgrammingLanguages");

// JavaScript created in the ProgrammingLanguages namespace.
ProgrammingLanguages.JavaScript = {
    getDescription: function () {
        return 'JavaScript is the programming language of HTML and the Web.';
    }
};
console.log(ProgrammingLanguages.JavaScript.getDescription());
```

### Add a namespace to an existing namespace ###

#### Example of namespace in namespace: ####

```js
W.nsDefChild(ProgrammingLanguages, "CLI", {
    Bash: {
        getDescription: function () {
            return "Bash is the shell, or command language interpreter, for the GNU operating system.";
        }
    }
});
console.log(ProgrammingLanguages.CLI.Bash.getDescription());
```

#### Example of adding members to nested namespace: ####

```js
W.nsDefChild(ProgrammingLanguages, "CLI");
ProgrammingLanguages.CLI.Bash = {
    getDescription: function () {
        return "Bash is the shell, or command language interpreter, for the GNU operating system.";
    }
};
console.log(ProgrammingLanguages.CLI.Bash.getDescription());
```

### Creating a class ###

#### Example of class Robot: ####

```js
var Robot = W.clsDef(function (name) {
        this.name = name;
    }, {
        modelName: "",
        on: function () { },
        off: function () { }
    }, {
        harmsHumans: false,
        getModels: function () { return ["R2-D2", "WALL-E", "Bender"]; }
    }),
    models = Robot.getModels(),
    r = new Robot("Artoo-Detoo");
r.model = "R2-D2";
r.on();
Robot.harmsHumans = false;
console.log(models);
```

#### Example of class Car: ####

```js
var Car = W.clsDef(function (model) {
        this.model = model;
    }, {
        _model: undefined,
        model: {
            set: function (value) { this._model = value; },
            get: function () { return this._model; }
        }
    });
```

#### Example of class Person: ####

```js
var Person = W.clsDef(function (firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }, {
        _firstName: undefined,
        _lastName: undefined,
        firstName: {
            set: function (value) { this._firstName = value; },
            get: function () { return this._firstName; }
        },
        lastName: {
            set: function (value) { this._lastName = value; },
            get: function () { return this._lastName; }
        }
    }),
    ag = new Person("Abbas", "Gussenov");
console.log(ag.firstName + ' ' + ag.lastName);
```

### Deriving a class ###

#### Example of classes MechanicalCar and ElectricCar: ####

```js
var MechanicalCar = W.clsDefChild(Car, function (model, fuelTank) {
        this.model = model;
        this.fuelTank = fuelTank;
    }, {
        _fuelTank: undefined,
        fuelTank: {
            set: function (value) { this._fuelTank = value; },
            get: function () { return this._fuelTank; }
        }
    }),

    ElectricCar = W.clsDefChild(Car, function (model, batteryType) {
        this.model = model;
        this.batteryType = batteryType;
    }, {
        _batteryType: undefined,
        batteryType: {
            set: function (value) { this._batteryType = value; },
            get: function () { return this._batteryType; }
        }
    });
```

#### Example of class Employee: ####

```js
var Employee = W.clsDefChild(Person, function (firstName, lastName, position, hireDate) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.position = position;
        this.hireDate = hireDate;
    }, {
        _hireDate: undefined,
        _position: undefined,
        hireDate: {
            set: function (value) { this._hireDate = value; },
            get: function () { return this._hireDate; }
        },
        position: {
            set: function (value) { this._position = value; },
            get: function () { return this._position; }
        },
        getDescription: function () {
            var options = { day: 'numeric', month: 'long', year: 'numeric' };
            return this.firstName + " " + this.lastName
                + " was hired as a " + this.position
                + " on the " + this.hireDate.toLocaleString("en-US", options) + ".";
        }
    }),
    ag = new Employee("Abbas", "Gussenov", "software developer", new Date(2016, 8, 20));
console.log(ag.getDescription());
```

### Create mixins ###

#### Example of class HybridCar: ####

```js
var HybridCar = W.clsMix(function (model, fuelTank, batteryType) {
        this.model = model;
        this.fuelTank = fuelTank;
        this.batteryType = batteryType;
    }, MechanicalCar, ElectricCar),

    c = new HybridCar("Toyota Prius 2016", 43, "NiMH");

console.log("Specs for " + c.model
    + "\nBattery type: " + c.batteryType
    + "\nFuel tank: " + c.fuelTank + " l");
```

### Manage events

#### Example of adding event management functionality to the class Person: ####

```js
W.evtMgmtAdd(Person);
```

#### Example of defining event in the class Person: ####

```js
W.evtDef(Person, "WeightChanged");
```

#### Example of adding event handler: ####

```js
var myPerson = new Person(64),
    listener = function (evt) {
        console.log("WeightChanged event fired!");
        console.log(myPerson.weight);
    };
W.evtHndAdd(myPerson, "WeightChanged", listener);
myPerson.weight += 1;
myPerson.weight -= 1;
```

#### Example of dispatching an event in the class Person: ####

```js
var Person = W.clsDef(function (weight) {
        this.weight = weight;
    }, {
        _weightValue: undefined,
        weight: {
            get: function () {
                return this._weightValue;
            },
            set: function (val) {
                this._weightValue = val;
                W.evtRaise(this, "WeightChanged");
            }
        }
    });
```

#### Example of removing event handler: ####

```js
W.evtHndDel(myPerson, "WeightChanged", listener);
myPerson.weight = 90;
```

#### Example of marking an event handler function as being compatible with declarative processing: ####

![](demo/control_toolbar_declarative.gif)

```html
<body class="win-type-body">
    <div class="basicToolbar" data-win-control="WinJS.UI.ToolBar">
        <!-- Primary commands -->
        <button data-win-control="WinJS.UI.Command" data-win-options="{ id: 'cmdAdd',    label: 'Add',    section: 'primary', type: 'button', icon: 'add',    onclick: cmd.click }"></button>
        <button data-win-control="WinJS.UI.Command" data-win-options="{ id: 'cmdEdit',   label: 'Edit',   section: 'primary', type: 'button', icon: 'edit',   onclick: cmd.click }"></button>
        <button data-win-control="WinJS.UI.Command" data-win-options="{ id: 'cmdDelete', label: 'Delete', section: 'primary', type: 'button', icon: 'delete', onclick: cmd.click }"></button>
        <!-- Secondary command -->
        <button data-win-control="WinJS.UI.Command" data-win-options="{ id: 'cmdShare', label: 'Share', section: 'secondary', type: 'button', onclick: cmd.click }"></button>
    </div>
    <script>
        (function () {
            'use strict';
            W.nsDef("cmd", {
                click: W.evtHndMark(function (e) {
                    var t = e.currentTarget;
                    if (t.winControl) {
                        console.log(t.winControl.label);
                    }
                })
            });
            W.uiCtrlRender();
        }());
    </script>        
</body>
```

### Controls

#### Example of creating a ToggleSwitch control: ####

![](demo/control_checkbox.gif)

```html
<body class="win-type-body">                
    <div id="locationServices"></div>
    <div id="info"></div>                
    <div data-win-control="WinJS.UI.ToggleSwitch" 
         data-win-options="{title :'Wi-Fi', labelOff: 'OFF', labelOn:'ON', checked:true}">
    </div>
    <script>
        (function () {
            'use strict';

            var toggleBtn,
                infoEl;

            function chgEvtHnd(args) {
                if (toggleBtn.checked) {
                    infoEl.innerHTML = 'Location Services enabled';
                } else {
                    infoEl.innerHTML = 'Location Services disabled';
                }
            }

            W.uiCtrlRender(function () {
                toggleBtn = W.uiCtrlToggleNew('locationServices', 'Location Services', 'Disabled', 'Enabled', true, chgEvtHnd);
                infoEl = document.getElementById('info');
            });

        }());
    </script>
</body>
```

#### Example of creating a Tooltip control: ####

![](demo/control_tooltip.gif)

```html
<head>
    <style>
        .win-tooltip
        {
            background-color: bisque;
            border-radius:30px;
            border-color:red;
        }
    </style>
</head>
<body class="win-type-body">
    <button id="btnSave" class="action win-button">Save</button>
    <button data-win-control="WinJS.UI.Tooltip" class="action win-button"
            data-win-options="{ innerHTML: 'Removes the <b>Employee</b> record' }">Remove</button>
    <script>
        (function () {
            'use strict';
            W.pageParsed(function () {
                var tooltip = W.uiCtrlTipNew("btnSave", 'Saves the <b>Employee</b> record');
                W.uiCtrlRender();
            });
        }());
    </script>
</body>
```

#### Example of creating an AppBarCommand: ####

![](demo/control_appbar.gif)

```html
<body class="win-type-body">
    <div id="appBar">
        <button id="cmdAdd"></button>
        <button id="cmdRemove"></button>
        <button id="cmdCamera"></button>
    </div>
    <script>
        (function () {
            'use strict';

            function addMethod() { console.log("Add button pressed"); }
            function remMethod() { console.log("Remove button pressed"); }
            function camMethod() { console.log("Camera button pressed"); }

            var cmdAdd = W.uiCtrlBarCmdNew('cmdAdd', 'Add', 'add', addMethod),
                cmdRem = W.uiCtrlBarCmdNew('cmdRemove', 'Remove', 'remove', remMethod),
                cmdCam = W.uiCtrlBarCmdNew('cmdCamera', 'Click Photo', 'camera', camMethod),
                appBar = W.uiCtrlBarNew('appBar');

            W.uiCtrlRender();
        }());
    </script>
</body>
```

#### Example of creating a Toolbar control: ####

![](demo/control_toolbar.gif)

```html
<body class="win-type-body">
    <div class="basicToolbar" id="tb">
        <!-- Primary commands -->
        <button id="cmdAdd"></button>
        <button id="cmdEdit"></button>
        <button id="cmdDelete"></button>
        <!-- Secondary command -->
        <button id="cmdShare"></button>
    </div>
    <script>
        (function () {
            'use strict';    
            W.nsDef("samples", {
                clickcommand: function (ev) {
                    var command = ev.currentTarget;
                    if (command.winControl) {
                        console.log(command.winControl.label);
                    }
                }
            });    
            var cmdAdd = W.uiCmdNew('cmdAdd', 'Add', 'primary', 'button', 'add', samples.clickcommand),
                cmdEdit = W.uiCmdNew('cmdEdit', 'Edit', 'primary', 'button', 'edit', samples.clickcommand),
                cmdDelete = W.uiCmdNew('cmdDelete', 'Delete', 'primary', 'button', 'delete', samples.clickcommand),
                cmdShare = W.uiCmdNew('cmdShare', 'Share', 'secondary', 'button', null, samples.clickcommand),
                toolbar = W.uiCtrlTbNew('tb');
        }());
    </script>
</body>
```
