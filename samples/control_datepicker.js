/*jslint browser: true, devel: true, nomen: true */
/*global AGLibWinJS */

(function () {
    'use strict';

    var isFirstActivation = true,
        datepick,
        InfoElement;
    
    function changeEventHandler(args) {
        InfoElement.innerHTML = "The selected date is " + datepick.current.toDateString();
    }
    
    AGLibWinJS.onAppActivated(function () {
        if (isFirstActivation) {
            AGLibWinJS.renderControls();
            
            datepick = new AGLibWinJS.newDatePickerControl("Birthday",
                                                           changeEventHandler,
                                                           '{month.abbreviated}',
                                                           '{day.integer(2)}',
                                                           '{year.abbreviated}');
            InfoElement = document.getElementById("info");
        }
        
        isFirstActivation = false;
        
    }, false);
    
}());