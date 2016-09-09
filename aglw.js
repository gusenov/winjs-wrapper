/*jslint nomen: true */
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
    
    
    
    
    /**
     * This function is used to add binding management functionality, 
     * in which developers can bind a user-defined object to a control that is capable of notifying listeners when the value of a property changes.
     * This is helpful for wiring up two-way data binding, 
     * something that WinJS doesn’t do itself, but isn’t too hard to pull together. 
     * @class
     * @memberof AGLibWinJS
     * @param {} data - Just a plain object (and not a Date, Array, or nonobject).
     * @param {} constructor
     */
    AGLibWinJS.ObservableProxy = WinJS.Class.mix(function (data, constructor) {
        var self = this;

        self._initObservable(data);

        // The Object.defineProperties() method defines new or modifies existing properties directly on an object, 
        // returning the object.
        // WinJS.Binding.expandProperties function wraps the specified object so that all its properties are instrumented for binding. 
        // This is meant to be used in conjunction with the binding mixin.
        Object.defineProperties(this, WinJS.Binding.expandProperties(data));

        constructor(self);
        
    }, WinJS.Binding.dynamicObservableMixin);




    /**
     *  Parse the HTML page, identify the attributes with the data-win-control, and generate the control accordingly.
     * @memberof AGLibWinJS
     * @method
     */
    AGLibWinJS.renderControls = function () {
        WinJS.UI.processAll();
    };
    
    /**
     * Wait until all the controls are created and parsed in the document.
     * @memberof AGLibWinJS
     * @method
     * @param {function} onComplete - The function to be called if the promise is fulfilled successfully with a value.
     * @param {function} onError - The function to be called if the promise is fulfilled with an error.
     * @param {function} onProgress - The function to be called if the promise reports progress.
     * @returns {Boolean} true if preventDefault was called on the event.
     */
    AGLibWinJS.waitUntilAllControlsAreCreated = function (onComplete, onError, onProgress) {
        WinJS.UI.processAll().done(onComplete, onError, onProgress);
    };
    
    /**
     *
     * @memberof AGLibWinJS
     * @method
     * @param {Function} callback - A function that executes after the DOMContentLoaded event has occurred.
     * @param {} [async=false] - If true, the callback should be executed asynchronously.
     * @returns {Promise} A promise that completes after the DOMContentLoaded event has occurred.
     */
    AGLibWinJS.onAppActivated = function (callback, async) {
        return WinJS.Utilities.ready(function () {
            callback();
        }, typeof async !== 'undefined' ? async : false);
    };
    
    
    
    
    /**
     * This function wraps the calls made to the XMLHttpRequest in a promise.
     * @memberof AGLibWinJS
     * @method
     */
    AGLibWinJS.connectToUrl = function (url, completed, error) {
        return WinJS.xhr({
            url: url
        }).then(function (result) {
            completed(result, result.status);
        }, function (e) {
            error(e);
        });
    };
    
    
    
    
    /**
     * Get the control from the HTML page’s DOM element.
     * @memberof AGLibWinJS
     * @method
     */
    AGLibWinJS.getControl = function (id, onComplete, onError, onProgress) {
        WinJS.UI.processAll().done(function () {
            var control = document.getElementById(id).winControl;
            onComplete(control);
        }, onError, onProgress);
    };

    /**
     * Create a new instance of the WinJS.UI.Rating JavaScript class.
     * @memberof AGLibWinJS
     * @method
     * @param {} [id=rating] - The rating div element's id attribute value.
     * @param {} [maxRating=4] - The Rating control’s maximum ratings.
     * @param {} [enableClear=false] - If the enableClear property is set to true, then the user can slide to the left of the control to clear the rating value.
     * @param {} [userRating=2] - 
     * @returns A reference to the Rating Control on a page.
     */
    AGLibWinJS.newRatingControl = function (id, maxRating, enableClear, userRating) {
        var ratingDiv = document.getElementById(typeof id !== 'undefined' ? id : "rating"),
            ratingCtrl = new WinJS.UI.Rating(ratingDiv);
        
        ratingCtrl.maxRating = typeof maxRating !== 'undefined' ? maxRating : 4;
        ratingCtrl.enableClear = typeof enableClear !== 'undefined' ? enableClear : false;
        ratingCtrl.userRating = typeof userRating !== 'undefined' ? userRating : 2;
        
        return ratingCtrl;
    };
    
    /**
     * Create the ToggleSwitch control on the page using the WinJS.UI.ToggleSwitch.
     * @memberof AGLibWinJS
     * @method
     * @param {} id - 
     * @param {} title - The title sets the title content for the ToggleSwitch.
     * @param {} [labelOff=Disabled] - The labelOff property identify the text that needs to be displayed next to the ToggleSwitch based on the unchecked (Off) state of the control.
     * @param {} [labelOn=Enabled] - The labelOn property identify the text that needs to be displayed next to the ToggleSwitch based on the checked (On) state of the control.
     * @param {} [checked=true] - The current state (checked or unchecked) of the ToggleSwitch.
     * @param {} [changeEventHandler] - This event is triggered when you change the state of the control.
     * @returns A reference to the ToggleSwitch Control on a page.
     */
    AGLibWinJS.newToggleSwitchControl = function (id, title, labelOff, labelOn, checked, changeEventHandler) {
        var toggleButton = new WinJS.UI.ToggleSwitch(document.getElementById(id));
        toggleButton.title = title;
        toggleButton.labelOff = typeof labelOff !== 'undefined' ? labelOff : "Disabled";
        toggleButton.labelOn = typeof labelOn !== 'undefined' ? labelOn : "Enabled";
        toggleButton.checked = typeof checked !== 'undefined' ? checked : true;
        if (changeEventHandler) {
            toggleButton.addEventListener('change', changeEventHandler);
        }
        return toggleButton;
    };
    
    /**
     * Create the DatePicker control on the page using the WinJS.UI.DatePicker.
     * Also, check out {@link https://github.com/winjs/winjs/issues/1530|DatePicker - Patterns  · Issue #1530 · winjs/winjs}.
     * @memberof AGLibWinJS
     * @method
     * @param {} id - 
     * @param {} [changeEventHandler] - This event is triggered when you change the state of the control.
     * @param {} [monthPattern={month.abbreviated}] - Display pattern for the month.
     * @param {} [datePattern={day.integer(2)}] - Display pattern for the date in the DatePicker control. 
     * @param {} [yearPattern='{year.abbreviated}'] - Display pattern for the year. 
     * @returns A reference to the DatePicker Control on a page.
     */
    AGLibWinJS.newDatePickerControl = function (id, changeEventHandler, monthPattern, datePattern, yearPattern) {
        var datepick = new WinJS.UI.DatePicker(document.getElementById(id));
        datepick.monthPattern = typeof monthPattern !== 'undefined' ? monthPattern : '{month.abbreviated}';
        datepick.datePattern = typeof datePattern !== 'undefined' ? datePattern : '{day.integer(2)}';
        datepick.yearPattern = typeof yearPattern !== 'undefined' ? yearPattern : '{year.abbreviated}';
        if (changeEventHandler) {
            datepick.addEventListener('change', changeEventHandler);
        }
        return datepick;
    };
    
    return AGLibWinJS;
}());