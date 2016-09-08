/*jslint browser: true, devel: true, nomen: true */
/*global AGLibWinJS */

(function () {
    'use strict';

    var isFirstActivation = true;
    
    AGLibWinJS.onAppActivated(function () {
        
        if (isFirstActivation) {
            AGLibWinJS.waitUntilAllControlsAreCreated(function () {
                var ratingCtrl = AGLibWinJS.newRatingControl();
            });
            
            document.getElementById("btnInc").addEventListener("click", function () {
                AGLibWinJS.getControl("rating", function (ratingControl) {
                    ratingControl.userRating += 1;
                });
            }, false);
        }
        
        isFirstActivation = false;
        
    }, false);
    
}());