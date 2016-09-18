/*jslint browser: true, devel: true, nomen: true */
/*global AGLibWinJS, samples */

(function () {
    'use strict';

    var isFirstActivation = true;
    
    AGLibWinJS.defineNamespace("samples", {
        clickcommand: function (ev) {
            var command = ev.currentTarget;
            if (command.winControl) {
                AGLibWinJS.showMessage(command.winControl.label);
            }
        }
    });
    
    AGLibWinJS.onAppActivated(function () {
        if (isFirstActivation) {
            var cmdAdd = AGLibWinJS.newCommand('cmdAdd', 'add', 'primary', 'button', 'add', samples.clickcommand),
                cmdEdit = AGLibWinJS.newCommand('cmdEdit', 'Edit', 'primary', 'button', 'edit', samples.clickcommand),
                cmdDelete = AGLibWinJS.newCommand('cmdDelete', 'delete', 'primary', 'button', 'delete', samples.clickcommand),
                cmdShare = AGLibWinJS.newCommand('cmdShare', 'share', 'secondary', 'button', null, samples.clickcommand),
                toolbar = AGLibWinJS.newToolBar('tb');
        }
        
        isFirstActivation = false;
        
    }, false);
    
}());