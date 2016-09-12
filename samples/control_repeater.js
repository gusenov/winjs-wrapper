/*jslint browser: true, devel: true, nomen: true */
/*global AGLibWinJS */

(function () {
    'use strict';

    var isFirstActivation = true,
        Employees = AGLibWinJS.createBindingList([{
            id: 1,
            name: "Abbas Gussenov",
            designation: "Software Developer"
        }]);
    
    function example1() {
        var repeaterControl1 = AGLibWinJS.newRepeaterControl("repeaterData");
        repeaterControl1.data = Employees;
    }
    
    function example2() {
        AGLibWinJS.waitUntilAllControlsAreCreated(function () {
            var repeaterControl2 = document.getElementById('repeaterData2').winControl;
            repeaterControl2.data = Employees;
            repeaterControl2.addEventListener("invoked", function (e) {
                AGLibWinJS.showMessage(e.target.dataset.name);
            });
        });
    }
    
    AGLibWinJS.onAppActivated(function () {
        if (isFirstActivation) {
            example1();
            example2();
        }
        
        isFirstActivation = false;
        
    }, false);
    
}());