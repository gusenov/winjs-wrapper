/*jslint browser: true, devel: true, nomen: true */
/*global AGLibWinJS */

(function () {
    'use strict';
    
    var Project, project1,
        OpenSourceProject, openSourceProject1,
        Repository,
        ProjectHosting, projectHosting1;




    console.log(" -- Creating a Class in WinJS -- ");
    
    Project = AGLibWinJS.createClass(
        function (author, title) {
            this.author = author;
            this.title = title;
            this.accessToSourceCode = false;
        },
        {
            _Author: undefined,
            _title: undefined,
            _accessToSourceCode: undefined,
            author: {
                set: function (value) {
                    this._Author = value;
                },
                get: function () {
                    return this._Author;
                }
            },
            title: {
                set: function (value) {
                    this._title = value;
                },
                get: function () {
                    return this._title;
                }
            },
            accessToSourceCode: {
                set: function (value) {
                    this._accessToSourceCode = value;
                },
                get: function () {
                    return this._accessToSourceCode;
                }
            }
        }
    );
    
    project1 = new Project("Abbas Gussenov", "Online SNT Test Prep");
    console.log(project1.author);
    console.log(project1.title);
    console.log(project1.accessToSourceCode);




    console.log(" -- Deriving a Class in WinJS -- ");
    
    OpenSourceProject = AGLibWinJS.deriveClass(Project, function (author, title) {
        this.author = author;
        this.title = title;
        this.accessToSourceCode = true;
    });
    
    openSourceProject1 = new OpenSourceProject("Abbas Gussenov", "AGLibWinJS");
    console.log(openSourceProject1.author);
    console.log(openSourceProject1.title);
    console.log(openSourceProject1.accessToSourceCode);



    
    console.log(" -- Create Mixins in WinJS -- ");
    
    Repository = AGLibWinJS.createClass(
        function (url) {
            this.url = url;
        },
        {
            _url: undefined,
            url: {
                set: function (value) {
                    this._url = value;
                },
                get: function () {
                    return this._url;
                }
            }
        }
    );
    
    ProjectHosting = AGLibWinJS.createMixin(function (author, title, url) {
        this.author = author;
        this.title = title;
        this.accessToSourceCode = true;
        this.url = url;
    }, OpenSourceProject, Repository);
    
    projectHosting1 = new ProjectHosting("Abbas Gussenov", "AGLibWinJS", "https://github.com/Gussenov/AGLibWinJS.git");
    console.log(projectHosting1.author);
    console.log(projectHosting1.title);
    console.log(projectHosting1.accessToSourceCode);
    console.log(projectHosting1.url);
    
}());