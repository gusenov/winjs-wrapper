/*jslint browser: true, devel: true, nomen: true */
/*global AGLibWinJS */

(function () {
    'use strict';

    var isFirstActivation = true;
    
    AGLibWinJS.onAppActivated(function () {
        if (isFirstActivation) {                        
            AGLibWinJS.renderControls();
            
            var tooltip = AGLibWinJS.newTooltipControl("btnSave", 'Saves the <b>Employee</b> record');
        }
        
        isFirstActivation = false;
        
    }, false);
    
}());