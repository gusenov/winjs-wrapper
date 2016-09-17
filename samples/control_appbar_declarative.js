/*jslint browser: true, devel: true, nomen: true */
/*global AGLibWinJS */

(function () {
    'use strict';

    var isFirstActivation = true;
    
    function AddMethod() { AGLibWinJS.showMessage("Add Button Pressed"); }
    function RemoveMethod() { AGLibWinJS.showMessage("Remove button pressed"); }
    function CameraMethod() { AGLibWinJS.showMessage("Camera button pressed"); }

    AGLibWinJS.onAppActivated(function () {
        if (isFirstActivation) {
            AGLibWinJS.waitUntilAllControlsAreCreated(function () {

                AGLibWinJS.callReadyMethodWhenPageIsLoaded("control_appbar_declarative.html", function (element, options) {
                    element.querySelector("#cmdAdd").addEventListener("click", AddMethod, false);
                    element.querySelector("#cmdRemove").addEventListener("click", RemoveMethod, false);
                    element.querySelector("#cmdCamera").addEventListener("click", CameraMethod, false);
                });
                
            });
        }
        
        isFirstActivation = false;
        
    }, false);
    
}());