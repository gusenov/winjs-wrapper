/*global WinJS */

var AGLibWinJS = (function () {
    'use strict';
    
    function AGLibWinJS() {
    }
    
    AGLibWinJS.defineNamespace = function (name, members) {
        WinJS.Namespace.define(name, members);
    };
    
    AGLibWinJS.defineChildNamespace = function (parent, childName, childMembers) {
        WinJS.Namespace.defineWithParent(parent, childName, childMembers);
    };
    
    return AGLibWinJS;
}());