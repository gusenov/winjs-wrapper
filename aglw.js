/*jslint browser: true, devel: true, nomen: true */
/*global WinJS, Windows */

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
     * Marks a event handler function as being compatible with declarative processing.
     * @memberof AGLibWinJS
     * @method
     * @param {Object} handler - The handler to be marked as compatible with declarative processing.
     * @returns {Object} The handler, marked as compatible with declarative processing.
     */
    AGLibWinJS.markEventHandler = function (handler) {
        var object = WinJS.UI.eventHandler(function (ev) {
            handler(ev);
        });
        return object;
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
     * Creates a WinJS.Binding.List object.
     * @memberof AGLibWinJS
     * @method
     * @param {Array} list - The array containing the elements to initalize the list.
     * @returns 
     */
    AGLibWinJS.createBindingList = function (list) {
        return new WinJS.Binding.List(list);
    };
    
    /**
     * Provides a reusable declarative binding element.
     * @memberof AGLibWinJS
     * @method
     * @param {} id - 
     * @returns 
     */
    AGLibWinJS.newTemplateObject = function (id) {
        var object = new WinJS.Binding.Template(document.getElementById(id));
        return object;
    };
    
    /**
     * Bind the data properties of the business object to HTML elements on the UI.
     * @memberof AGLibWinJS
     * @method
     * @param {} containerId - 
     * @param {} businessObject - A simple business object with data properties. 
     * @returns 
     */
    AGLibWinJS.bindDataToElement = function (containerId, businessObject) {
        var container = document.querySelector('#' + containerId),
            prmise = WinJS.UI.processAll().then(function () {
                WinJS.Binding.processAll(container, businessObject);
            });
        return prmise;
    };
    
    /**
     * Creates a new constructor function that supports observability with the specified set of properties.
     * @memberof AGLibWinJS
     * @method
     * @param {object} data - The object to use as the pattern for defining the set of properties. 
     * @returns {function} A constructor function with 1 optional argument that is the initial state of the properties.
     */
    AGLibWinJS.createObservableConstructor = function (data) {
        var someFunction = WinJS.Binding.define(data);
        return someFunction;
    };




    /**
     * 
     * @memberof AGLibWinJS
     * @method
     */
    AGLibWinJS.startApplication = function () {
        var app = WinJS.Application;
        app.start();
    };
    
    /**
     * Parse the HTML page, identify the attributes with the data-win-control, and generate the control accordingly.
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
    
    var isFirstActivation = true;
    
    /**
     *
     * @memberof AGLibWinJS
     * @method
     * @param {Function} callback - A function that executes after the DOMContentLoaded event has occurred.
     * @param {} [async=false] - If true, the callback should be executed asynchronously.
     * @returns 
     */
    AGLibWinJS.onAppActivated = function (callback, async) {
        var app = WinJS.Application;
        app.onactivated = function (args) {
            var prmise = WinJS.Utilities.ready(function () {
                callback(isFirstActivation);
                isFirstActivation = false;
            }, typeof async !== 'undefined' ? async : false);
        };
    };
    
    /**
     * Provide a ready method that will be called when the page is loaded.
     * @memberof AGLibWinJS
     * @method
     * @param {} uri - The URI for the content that defines the page.
     * @param {} readyMethod - This function is called after the page control contents have been loaded, controls have been activated, and the resulting elements have been parented to the DOM.
     * @returns {}
     */
    AGLibWinJS.callReadyMethodWhenPageIsLoaded = function (uri, readyMethod) {
        WinJS.UI.Pages.define(uri, {
            ready: function (element, options) {
                readyMethod(element, options);
            }
        });
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
        if (onComplete) {
            WinJS.UI.processAll().done(function () {
                var control = document.getElementById(id).winControl;
                onComplete(control);
            }, onError, onProgress);
        } else {
            var control = document.getElementById(id).winControl;
            return control;
        }
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
    
    /**
     * Create the TimePicker control on the page using the WinJS.UI.TimePicker.
     * @memberof AGLibWinJS
     * @method
     * @param {} id - 
     * @param {} [changeEventHandler] - This event is triggered when you change the state of the control.
     * @param {} [clock=24HourClock] - Clock format.
     * @param {} [minuteIncrement=15] - The increment values of the minute list.
     * @param {} [hourPattern={hour.integer(2)}] - This displays the specified number of digits for hours.
     * @param {} [minutePattern={minute.integer(2)}] - This displays the specified number of digits for minutes.
     * @param {} [periodPattern={period.abbreviated(2)}] - Display pattern for the period based on the value passed as parameter.
     * @returns A reference to the TimePicker Control on a page.
     */
    AGLibWinJS.newTimePickerControl = function (id, changeEventHandler, clock, minuteIncrement, hourPattern, minutePattern, periodPattern) {
        var timepick = new WinJS.UI.TimePicker(document.getElementById(id));
        timepick.clock = typeof clock !== 'undefined' ? clock : '24HourClock';
        timepick.minuteIncrement = typeof minuteIncrement !== 'undefined' ? minuteIncrement : 15;
        
        timepick.hourPattern = typeof hourPattern !== 'undefined' ? hourPattern : '{hour.integer(2)}';
        timepick.minutePattern = typeof minutePattern !== 'undefined' ? minutePattern : '{minute.integer(2)}';
        timepick.periodPattern = typeof periodPattern !== 'undefined' ? periodPattern : '{period.abbreviated(2)}';
        
        if (changeEventHandler) {
            timepick.addEventListener('change', changeEventHandler);
        }
        return timepick;
    };
    
    /**
     * Create the Tooltip control on the page using the WinJS.UI.Tooltip.
     * @memberof AGLibWinJS
     * @method
     * @param {} id - 
     * @param {} innerHTML - The text for the tooltip control. This text can contain HTML tags too.
     * @returns A reference to the Tooltip Control on a page.
     */
    AGLibWinJS.newTooltipControl = function (id, innerHTML) {
        var tooltip = new WinJS.UI.Tooltip(document.getElementById(id));
        tooltip.innerHTML = innerHTML;
        return tooltip;
    };
    
    /**
     * Create the Repeater control on the page using the WinJS.UI.Repeater.
     * @memberof AGLibWinJS
     * @method
     * @param {} id - 
     * @returns A reference to the Repeater Control on a page.
     */
    AGLibWinJS.newRepeaterControl = function (id) {
        var repeater = new WinJS.UI.Repeater(document.getElementById(id));
        return repeater;
    };
    
    /**
     * Create the FlipView control on the page using the WinJS.UI.FlipView.
     * @memberof AGLibWinJS
     * @method
     * @param {} id - 
     * @param {} itemTemplate - A Template or function that defines the HTML for each item's page.
     * @param {} itemDataSource - Data source that provides the FlipView with items to display. The FlipView displays one item at a time, on its own page.
     * @returns A reference to the FlipView Control on a page.
     */
    AGLibWinJS.newFlipViewControl = function (id, itemTemplate, itemDataSource) {
        var flipView;
        try {
            
            function rendererTemplatingFunction(itemPromise) {
                return itemPromise.then(function (item) {
                    return itemTemplate.render(item.data);
                });
            }
            
            flipView = new WinJS.UI.FlipView(document.getElementById(id),
                { itemDataSource: itemDataSource.dataSource, itemTemplate: rendererTemplatingFunction });
        } catch (e) {
            console.log(e);
        }

        return flipView;
    };
    
    /**
     * Create an interactive list of items on the page.
     * @memberof AGLibWinJS
     * @method
     * @param {} id - 
     * @param {} [layoutType=grid] - The overall appearance of the control.
     * @param {} itemTemplate - 
     * @param {} itemDataSource - The data source that implements the IListDataSource interface.
     * @param {} [layoutMaxRowsOrColumns=1] -
     * @returns 
     */
    AGLibWinJS.newListViewControl = function (id, layoutType, itemTemplate, itemDataSource, layoutMaxRowsOrColumns) {
        var listView;
        
        try {
            listView = new WinJS.UI.ListView(document.getElementById(id));

            switch (typeof layoutType !== 'undefined' ? layoutType : 'grid') {
            case "grid":
                listView.layout.type = WinJS.UI.GridLayout;
                break;
            case "cellSpanning":
                listView.layout.type = WinJS.UI.cellSpanningLayout;
                break;
            case "list":
                listView.layout.type = WinJS.UI.ListLayout;
                break;
            }

            function rendererTemplatingFunction(itemPromise) {
                return itemPromise.then(function (item) {
                    return itemTemplate.render(item.data);
                });
            }
            listView.itemTemplate = rendererTemplatingFunction;

            listView.itemDataSource = itemDataSource.dataSource;

            listView.layout.maximumRowsOrColumns =
                typeof layoutMaxRowsOrColumns !== 'undefined' ? layoutMaxRowsOrColumns : 1;
        } catch (e) {
            console.log(e);
        }
        
        return listView;
    };

    /**
     * 
     * @memberof AGLibWinJS
     * @method
     * @param {} id - This uniquely identifies the AppBarCommand.
     * @param {} label - The content displayed in the AppBarCommand.
     * @param {} icon - The built-in icons for the AppBarCommand.
     * @param {} section - The section within the AppBar where the command should be displayed. This value can be primary or secondary.
     * @param {} tooltip - The text to be displayed when you mouse-over the command button.
     * @param {} method - Command function.
     * @returns 
     */
    AGLibWinJS.newAppBarCommand = function (id, label, icon, section, tooltip, method) {
        var cmd, element;
        try {
            element = document.getElementById(id);
            cmd = new WinJS.UI.AppBarCommand(element, { id: id, section: section });
            cmd.label = label;
            cmd.icon = icon;
            cmd.tooltip = tooltip;
            
            element.addEventListener("click", method, false);
        } catch (e) {
            console.log(e);
        }
        return cmd;
    };
    
    /**
     * Add an app bar to your page.
     * @memberof AGLibWinJS
     * @method
     * @param {} id - 
     * @returns 
     */
    AGLibWinJS.newAppBar = function (id) {
        var appBar;
        try {
            appBar = new WinJS.UI.AppBar(document.getElementById(id));
        } catch (e) {
            console.log(e);
        }
        return appBar;
    };
    
    /**
     * 
     * @memberof AGLibWinJS
     * @method
     * @param {} id - Defines the identifier for the command.
     * @param {} label -  Defines the text to be displayed for the command.
     * @param {} section - Defines the area in the toolbar where the command should appear. This can take a primary or secondary value.
     * @param {} type - The value is set to “button” to display a button control.
     * @param {} icon - Displays a built-in icon for the command.
     * @param {} onClick - An event that fires and calls the corresponding JavaScript method.
     * @returns 
     */
    AGLibWinJS.newCommand = function (id, label, section, type, icon, onClick) {
        var cmd;
        try {
            cmd = new WinJS.UI.Command(document.getElementById(id), { id: id, section: section });
            cmd.label = label;
            cmd.type = type;
            if (icon) { cmd.icon = icon; }
            cmd.onclick = WinJS.UI.eventHandler(function (ev) {
                onClick(ev);
            });
        } catch (e) {
            console.log(e);
        }
        return cmd;
    };
    
    /**
     * 
     * @memberof AGLibWinJS
     * @method
     * @param {} id - 
     * @returns 
     */
    AGLibWinJS.newToolBar = function (id) {
        var toolbar;
        try {
            toolbar = new WinJS.UI.ToolBar(document.getElementById(id));
        } catch (e) {
            console.log(e);
        }
        return toolbar;
    };
    
    
    
    
    /**
     * 
     * @memberof AGLibWinJS
     * @method
     * @param {String} content - The message displayed to the user.
     * @returns 
     */
    AGLibWinJS.showMessage = function (content) {
        if (typeof Windows !== 'undefined') {
            var message = new Windows.UI.Popups.MessageDialog(content);
            message.showAsync();
            return message;
        } else {
            alert(content);
        }
    };
    
    
    
    
    /**
     * Filter the items displayed in a ListView by filtering it from the data source associated with the ListView.
     * @memberof AGLibWinJS
     * @method
     * @param {} listView - 
     * @param {} bindableList - 
     * @param {} searchField - 
     * @param {} searchText - 
     * @returns 
     */
    AGLibWinJS.filterList = function (listView, bindableList, searchField, searchText) {
        var filteredData = bindableList.createFiltered(function (item) {
            var result = item[searchField].toLowerCase().indexOf(searchText.toLowerCase());
            return result === 0;
        });
        listView.itemDataSource = filteredData.dataSource;
    };
    
    AGLibWinJS.groupItemsByCategoryInList = function (listView, bindableList, groupKey) {
        var grouped = bindableList.createGrouped(
            function (item) {
                return item[groupKey];
            },
            function (item) {
                var groupData = {};
                groupData[groupKey] = item[groupKey];
                return groupData;
            },
            function (group1, group2) {
                return group1 > group2 ? 1 : -1;
            }
        );
        listView.groupDataSource = grouped.groups.dataSource;
        listView.itemDataSource = grouped.dataSource;
        return grouped;
    };
    
    AGLibWinJS.viewDataAtTwoDifferentZoomLevels = function (listView1, listView2, bindableList, groupKey) {
        var grouped = AGLibWinJS.groupItemsByCategoryInList(listView1, bindableList, groupKey);
        listView2.itemDataSource = grouped.groups.dataSource;
    };




    return AGLibWinJS;
}());