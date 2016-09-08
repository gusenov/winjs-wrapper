/*jslint browser: true, devel: true, nomen: true */
/*global AGLibWinJS */

(function () {
    'use strict';
    
    var xhrPromise;
    
    function connect(url) {
        var resultDiv = document.getElementById("output");
        xhrPromise = AGLibWinJS.connectToUrl(url, function (result, status) {
            if (result.status === 200) {
                resultDiv.style.backgroundColor = "Green";
                resultDiv.innerText = "Success";
            }
        }, function (e) {
            resultDiv.style.backgroundColor = "red";
            resultDiv.innerText = e.statusText;
        });
    }

    function changeEvent(e) {
        connect(e.target.value);
    }
    
    AGLibWinJS.onAppActivated(function () {
        var input = document.getElementById("inputurl"),
            cancelBtn = document.getElementById("cancel"),
            connectBtn = document.getElementById("connect");
        
        input.addEventListener("change", changeEvent);
        
        cancelBtn.addEventListener("click", function () {
            xhrPromise.cancel();
        }, false);
        
        connectBtn.addEventListener("click", function () {
            connect(input.value);
        }, false);
        
    }, false);

}());