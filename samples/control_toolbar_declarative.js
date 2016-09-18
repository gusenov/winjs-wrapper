/*jslint browser: true, devel: true, nomen: true */
/*global AGLibWinJS, samples */

(function () {
    'use strict';

    var isFirstActivation = true;
    
    AGLibWinJS.defineNamespace("samples", {
        clickcommand: AGLibWinJS.markEventHandler(function (ev) {
            var command = ev.currentTarget;
            if (command.winControl) {
                AGLibWinJS.showMessage(command.winControl.label);
            }
        })
    });
    
    AGLibWinJS.onAppActivated(function () {
        if (isFirstActivation) {
            AGLibWinJS.renderControls();
        }
        
        isFirstActivation = false;
        
    }, false);
    
}());