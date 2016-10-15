/*jslint browser: true, devel: true, nomen: true */
/*global AGLibWinJS */

(function () {
    'use strict';

    var isFirstActivation = true;
    
    function AddMethod() { W.uiMsgShow("Add Button Pressed"); }
    function RemoveMethod() { W.uiMsgShow("Remove button pressed"); }
    function CameraMethod() { W.uiMsgShow("Camera button pressed"); }

    W.pageReady("control_appbar_declarative.html", function (element, options) {
        element.querySelector("#cmdAdd").addEventListener("click", AddMethod, false);
        element.querySelector("#cmdRemove").addEventListener("click", RemoveMethod, false);
        element.querySelector("#cmdCamera").addEventListener("click", CameraMethod, false);
    });

    
}());