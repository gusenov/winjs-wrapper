/*jslint browser: true, devel: true, nomen: true */
/*global W */

(function () {
    'use strict';
    
    var ViewModel = W.clsDef(function () {
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
    
    vm = new W.ObservableProxy(ViewModel, function (self) {
        self.someProperty = "test";
    });
    
    vm.bind("someProperty", function () {
        console.log("Value changed!");
    });
    
    W.pageParsed(function () {
        yourTemplateElement = document.getElementById("yourTemplate");
        yourTargetContainer = document.getElementById("yourTargetContainer");
        
        W.uiCtrlRender(function () {
            yourTemplateElement.winControl.render(vm, yourTargetContainer).then(function (e) {
                var element = yourTargetContainer.querySelector("input[name='someProperty']");
                if (element) {
                    element.addEventListener("change", function (e) {
                        var propName = e.target.getAttribute("name");
                        vm.setProperty(propName, e.target.value);
                    });
                }
            });
        });
    });
    
}());