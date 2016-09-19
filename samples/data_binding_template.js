/*jslint browser: true, devel: true, nomen: true */
/*global AGLibWinJS */

(function () {
    'use strict';

    var Person = AGLibWinJS.createObservableConstructor({
        name: "",
        color: "",
        birthday: "",
        petname: "",
        dessert: ""
    }), people = [
        new Person({
            name: "John Doe",
            color: "red",
            birthday: "2/2/2002",
            petname: "Spot",
            dessert: "chocolate cake"
        }),
        new Person({
            name: "Jane Doe",
            color: "green",
            birthday: "3/3/2003",
            petname: "Xena",
            dessert: "cherry pie"
        }),
        new Person({
            name: "Jake Doe",
            color: "blue",
            birthday: "2/2/2002",
            petname: "Pablo",
            dessert: "ice cream"
        })
    ];
    
    function handleChange(evt) {
        var templateElement = document.querySelector("#templateDiv"),
            renderElement = document.querySelector("#renderDiv"),
            selected = evt.target.selectedIndex,
            templateControl = templateElement.winControl;
        renderElement.innerHTML = "";
        templateElement.winControl.render(people[selected], renderElement);
    }

    AGLibWinJS.onAppActivated(function (isFirstActivation) {
        if (isFirstActivation) {
            var selector = document.querySelector("#templateControlObjectSelector");
            selector.addEventListener("change", handleChange, false);
            
            AGLibWinJS.renderControls();
        }
    }, false);
    
    AGLibWinJS.startApplication();
    
}());