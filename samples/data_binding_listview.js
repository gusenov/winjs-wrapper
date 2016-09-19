/*jslint browser: true, devel: true, nomen: true */
/*global AGLibWinJS */

(function () {
    'use strict';

    var flavors = [{
            title: "Basic banana",
            text: "Low-fat frozen yogurt"
        }, {
            title: "Banana blast",
            text: "Ice cream"
        }, {
            title: "Brilliant banana",
            text: "Frozen custard"
        }, {
            title: "Orange surprise",
            text: "Sherbet"
        }, {
            title: "Original orange",
            text: "Sherbet"
        }, {
            title: "Vanilla",
            text: "Ice cream"
        }, {
            title: "Very vanilla",
            text: "Frozen custard"
        }, {
            title: "Marvelous mint",
            text: "Gelato"
        }, {
            title: "Succulent strawberry",
            text: "Sorbet"
        }],
        flavorList = AGLibWinJS.createBindingList(flavors);
    
    AGLibWinJS.defineNamespace("DataExample", {
        flavorList: flavorList
    });
    
    AGLibWinJS.renderControls();
    
}());