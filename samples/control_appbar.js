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
            var cmdAdd = AGLibWinJS.newAppBarCommand('cmdAdd', 'Add', 'add', 'primary', 'Add', AddMethod),
                cmdRemove = AGLibWinJS.newAppBarCommand('cmdRemove', 'Remove', 'remove', 'primary', 'Remove', RemoveMethod),
                cmdCamera = AGLibWinJS.newAppBarCommand('cmdCamera', 'Click Photo', 'camera', 'secondary', 'click', CameraMethod),
                appBar = AGLibWinJS.newAppBar('appBar');
        }
        
        isFirstActivation = false;
        
    }, false);
    
}());