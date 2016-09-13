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
        }, {
            id: 3,
            name: "Kindle",
            vendor: "Amazon"
        }, {
            id: 4,
            name: "Xbox",
            vendor: "Microsoft"
        }, {
            id: 5,
            name: "PlayStation",
            vendor: "Sony"
        }, {
            id: 6,
            name: "Galaxy",
            vendor: "Samsung"
        }, {
            id: 7,
            name: "MacBook",
            vendor: "Apple"
        }, {
            id: 8,
            name: "ZenBook",
            vendor: "ASUS"
        }, {
            id: 9,
            name: "Core i7",
            vendor: "Intel"
        }, {
            id: 10,
            name: "GeForce",
            vendor: "NVIDIA"
        }]);
    
    AGLibWinJS.defineNamespace("SampleData", {
        Products: Products
    });

    function example1() {
        var template = AGLibWinJS.newTemplateObject("template"),
            listControl1;
        
        listControl1 = AGLibWinJS.newListViewControl("listView1",
            "grid",
            template,
            SampleData.Products,
            0);
        
        listControl1.addEventListener("iteminvoked", function (e) {
            var index = e.detail.itemIndex;
            e.detail.itemPromise.then(function (item) {
                AGLibWinJS.showMessage(item.data.name);
            });
        });
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