/*jslint browser: true, devel: true, nomen: true */
/*global AGLibWinJS */

(function () {
    'use strict';
    
    var ViewModel = AGLibWinJS.createClass(function () {
            // this is the constructor function                        
        }, {
            // object literal for methods and attributes on the "class"		
            _someProperty: undefined,
            someProperty: {
                set: function (value) {
                    this._someProperty = value;
                },
                get: function () {
                    return this._someProperty;
                }
            }
        }),
        vm,
        yourTemplateElement,
        yourTargetContainer;
    
    vm = new AGLibWinJS.ObservableProxy(ViewModel, function (self) {
        self.someProperty = "test";
    });
    
    function onValueChanged() {
        console.log("Value changed!");
    }
    
    vm.bind("someProperty", onValueChanged);
    
    function onChange(e) {
        var propName = e.target.getAttribute("name");
        vm.setProperty(propName, e.target.value);
    }
    
    document.addEventListener("DOMContentLoaded", function () {
        yourTemplateElement = document.getElementById("yourTemplate");
        yourTargetContainer = document.getElementById("yourTargetContainer");
        
        AGLibWinJS.waitUntilAllControlsAreCreated(function () {
            yourTemplateElement.winControl.render(vm, yourTargetContainer).then(function (e) {
                var element = yourTargetContainer.querySelector("input[name='someProperty']");
                if (element) {
                    element.addEventListener("change", onChange);
                }
            });
        });
    });
    
}());