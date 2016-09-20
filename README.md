# AGLibWinJS
AGLibWinJS is a collection of frequently used functions for WinJS apps.

Examples
-----------------

### Namespaces in JavaScript ###

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

```js
W.nsDefChild(ProgrammingLanguages, "CLI");
ProgrammingLanguages.CLI.Bash = {
    getDescription: function () {
        return "Bash is the shell, or command language interpreter, for the GNU operating system.";
    }
};
console.log(ProgrammingLanguages.CLI.Bash.getDescription());
```

### Creating a Class in WinJS ###

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

### Deriving a Class in WinJS ###

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

### Create Mixins in WinJS ###

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
