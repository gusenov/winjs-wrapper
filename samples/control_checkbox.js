/*jslint browser: true, devel: true, nomen: true */
/*global AGLibWinJS */

(function () {
    'use strict';

    var isFirstActivation = true,
        toggleButton,
        InfoElement;
    
    function changeEventHandler(args) {
        if (toggleButton.checked) {
            InfoElement.innerHTML = "Location Services enabled";
        } else {
            InfoElement.innerHTML = "Location Services disabled";
        }
    }
    
    AGLibWinJS.onAppActivated(function () {
        if (isFirstActivation) {
            AGLibWinJS.renderControls();
            
            toggleButton = AGLibWinJS.newToggleSwitchControl("locationServices",
                                                             'Location Services',
                                                             'Disabled',
                                                             'Enabled',
                                                             true,
                                                             changeEventHandler);
            InfoElement = document.getElementById("info");
        }
        
        isFirstActivation = false;
        
    }, false);
    
}());