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
            'use strict';
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
        'use strict';
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
            'use strict';
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
        'use strict';
        return "Bash is the shell, or command language interpreter, for the GNU operating system.";
    }
};
console.log(ProgrammingLanguages.CLI.Bash.getDescription());
```