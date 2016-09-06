/*jslint browser: true, devel: true, nomen: true */
/*global AGLibWinJS */

(function () {
    'use strict';
    
    var Person, myPerson,
        listener;
    
    Person = AGLibWinJS.createClass(function (weight) {
        this.weight = weight;
    }, {
        _weightValue: undefined,
        weight: {
            get: function () {
                return this._weightValue;
            },
            set: function (val) {
                this._weightValue = val;
                AGLibWinJS.raiseEvent(this, "WeightChanged");
            }
        }
    });
    
    AGLibWinJS.addEventManagementFunctionality(Person);
    AGLibWinJS.defineEvents(Person, "WeightChanged");
    
    myPerson = new Person(99);
    listener = function (evt) {
        console.log("WeightChanged event fired!");
        console.log(myPerson.weight);
    };
    AGLibWinJS.addEventListener(myPerson, "WeightChanged", listener);
    myPerson.weight += 1;
    myPerson.weight -= 1;
    
    AGLibWinJS.removeEventListener(myPerson, "WeightChanged", listener);
    myPerson.weight = 90;
    
}());