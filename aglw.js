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
    
    AGLibWinJS.createClass = function (constructor, instanceMembers, staticMembers) {
        return WinJS.Class.define(constructor, instanceMembers, staticMembers);
    };
    
    AGLibWinJS.deriveClass = function (baseClass, constructor, instanceMembers, staticMembers) {
        return WinJS.Class.derive(baseClass, constructor, instanceMembers, staticMembers);
    };
    
    AGLibWinJS.createMixin = function (constructor, mixin) {
        return WinJS.Class.mix(constructor, mixin);
    };
    
    return AGLibWinJS;
}());