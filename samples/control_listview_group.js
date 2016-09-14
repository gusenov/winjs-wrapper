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
        }]),
        listControl1;
    
    AGLibWinJS.defineNamespace("SampleData", {
        Products: Products
    });
    
    AGLibWinJS.onAppActivated(function () {
        
        if (isFirstActivation) {
            AGLibWinJS.getControl("lvProducts", function (listView1) {
                AGLibWinJS.groupItemsByCategoryInList(listView1, SampleData.Products, "vendor");
            });
        }
        
        isFirstActivation = false;
        
    }, false);
    
}());