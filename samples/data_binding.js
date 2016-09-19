/*jslint browser: true, devel: true, nomen: true */
/*global AGLibWinJS, samples */

(function () {
    'use strict';

    var person = {
            name: "Abbas Gussenov",
            age: 26,
            designation: "Software Developer",
            city: "Terekty",
            favcolor: "green"
        };
    
    AGLibWinJS.onAppActivated(function (isFirstActivation) {
        if (isFirstActivation) {
            AGLibWinJS.bindDataToElement('container', person);
        }
    }, false);
    
    AGLibWinJS.startApplication();
    
}());