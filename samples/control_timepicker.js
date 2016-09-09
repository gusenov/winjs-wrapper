/*jslint browser: true, devel: true, nomen: true */
/*global AGLibWinJS */

(function () {
    'use strict';

    var isFirstActivation = true,
        timepick,
        InfoElement;
    
    function changeEventHandler(args) {
        InfoElement.innerHTML = "The selected time is " + timepick.current.toTimeString();
    }
    
    AGLibWinJS.onAppActivated(function () {
        if (isFirstActivation) {
            AGLibWinJS.renderControls();
            
            timepick = new AGLibWinJS.newTimePickerControl("timeSelector",
                                                           changeEventHandler,
                                                           '24HourClock',
                                                           15,
                                                          'Hour: {hour.integer(2)}',
                                                          'Min: {minute.integer(2)}',
                                                          '{period.abbreviated(2)}');
            InfoElement = document.getElementById("info");
        }
        
        isFirstActivation = false;
        
    }, false);
    
}());