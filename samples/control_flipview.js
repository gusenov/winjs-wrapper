/*jslint browser: true, devel: true, nomen: true */
/*global AGLibWinJS, SampleData */

(function () {
    'use strict';

    var isFirstActivation = true,
        Products = AGLibWinJS.createBindingList([{
            id: 1,
            name: "iPad",
            vendor: "Apple"
        }, {
            id: 2,
            name: "iPhone",
            vendor: "Apple"
        }]);
    
    AGLibWinJS.defineNamespace("SampleData", {
        Products: Products
    });

    function example1() {
        var template = AGLibWinJS.newTemplateObject("template"),
            flipView1;
        flipView1 = AGLibWinJS.newFlipViewControl("flipView1",
              template,
              SampleData.Products);
    }
    
    function example2() {
        AGLibWinJS.renderControls();
    }
    
    AGLibWinJS.onAppActivated(function () {
        
        if (isFirstActivation) {
            example1();
            example2();
        }
        
        isFirstActivation = false;
        
    }, false);
    
}());