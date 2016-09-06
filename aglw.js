/*global WinJS */

var AGLibWinJS = (function () {
    'use strict';
    
    /**
     * @constructs AGLibWinJS
     */
    function AGLibWinJS() {
    }




    /**
     * Declare a namespace.
     * @memberof AGLibWinJS
     * @method
     * @param {string} name -  This is the first parameter and represents the name of the new namespace.
     * @param {object} [members] - This parameter represents the list of objects that need to be added to the namespace being defined.
     * @returns {Object} The newly-defined namespace.
     */
    AGLibWinJS.defineNamespace = function (name, members) {
        WinJS.Namespace.define(name, members);
    };
    
    /**
     * Add a namespace to the existing namespace and define your functionalities.
     * @memberof AGLibWinJS
     * @method
     * @param {object} parent - The first parameter is the name of the parent namespace.
     * @param {string} childName - This is the name of the namespace to be added to the parent namespace.
     * @param {object} childMembers - The list of objects to be added to the new namespace. This is an optional parameter.
     * @returns {Object} - The newly-defined namespace.
     */
    AGLibWinJS.defineChildNamespace = function (parent, childName, childMembers) {
        return WinJS.Namespace.defineWithParent(parent, childName, childMembers);
    };




    /**
     * Create a class.
     * @memberof AGLibWinJS
     * @method
     * @param {Function} constructor - The first parameter lets developers initialize a new object.
     * @param {Object} instanceMembers - The second parameter is the collection of instance members, which includes properties and methods.
     * @param {} staticMembers -  The third parameter includes static properties and static methods.
     * @returns {Object} The newly-defined type.
     */
    AGLibWinJS.createClass = function (constructor, instanceMembers, staticMembers) {
        return WinJS.Class.define(constructor, instanceMembers, staticMembers);
    };
    
    /**
     * Derive one class from another.
     * @memberof AGLibWinJS
     * @method
     * @param {Object} baseClass - The class that the current class needs to inherit from.
     * @param {Function} constructor - This parameter refers to the constructor function that can be used to initialize the class members.
     * @param {Object} instanceMembers - This parameter defines instance members, which includes properties and methods.
     * @param {Object} staticMembers - This parameter defines static properties and static methods.
     * @returns {Object} The newly-defined type.
     */
    AGLibWinJS.deriveClass = function (baseClass, constructor, instanceMembers, staticMembers) {
        return WinJS.Class.derive(baseClass, constructor, instanceMembers, staticMembers);
    };
    
    /**
     * Combine methods and properties from multiple JavaScript objects.
     * @memberof AGLibWinJS
     * @method
     * @param {Function} constructor - The first parameter, which is used to initialize the class members.
     * @param {} mixin - The second parameter is the array that takes the mixin methods.
     * @returns {Object} The newly defined class.
     */
    AGLibWinJS.createMixin = function (constructor, mixin) {
        return WinJS.Class.mix(constructor, mixin);
    };




    /**
     * Add the event management functionality to any type that you define.
     * @memberof AGLibWinJS
     * @method
     * @param {} type
     * @returns This method does not return a value.
     */
    AGLibWinJS.addEventManagementFunctionality = function (type) {
        WinJS.Class.mix(type, WinJS.Utilities.eventMixin);
    };
    
    /**
     * Define events.
     * @memberof AGLibWinJS
     * @method
     * @param {} type
     * @param {object} events - A variable list of property names.
     * @returns This method does not return a value.
     */
    AGLibWinJS.defineEvents = function (type, events) {
        WinJS.Class.mix(type, WinJS.Utilities.createEventProperties(events));
    };
    
    /**
     * Adds an event listener to the control.
     * @memberof AGLibWinJS
     * @method
     * @param {} control
     * @param {string} type - The type (name) of the event.
     * @param {function} listener - The listener to invoke when the event gets raised.
     * @param {Boolean} useCapture - If true, initiates capture, otherwise false. 
     * @returns This method does not return a value.
     */
    AGLibWinJS.addEventListener = function (control, type, listener, useCapture) {
        control.addEventListener(type, listener, useCapture);
    };
    
    /**
     * Removes an event listener from the control.
     * @memberof AGLibWinJS
     * @method
     * @param {} control
     * @param {string} type - The type (name) of the event.
     * @param {function} listener - The listener to remove.
     * @param {Boolean} useCapture - true if capture is to be initiated, otherwise false.
     * @returns This method does not return a value.
     */
    AGLibWinJS.removeEventListener = function (control, type, listener, useCapture) {
        control.removeEventListener(type, listener, useCapture);
    };
    
    /**
     * Raises an event of the specified type and with the specified additional properties.
     * @memberof AGLibWinJS
     * @method
     * @param {} control
     * @param {string} type - The type (name) of the event.
     * @param {object} eventProperties - The set of additional properties to be attached to the event object when the event is raised.
     * @returns {Boolean} true if preventDefault was called on the event.
     */
    AGLibWinJS.raiseEvent = function (control, type, eventProperties) {
        return control.dispatchEvent(type, eventProperties);
    };
    
    return AGLibWinJS;
}());