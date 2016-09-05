/*jslint browser: true, devel: true */
/*global AGLibWinJS, AG, GitHub */


AGLibWinJS.defineNamespace("AG");
AG.Utilities = {
    DisplayMessage: function () {
        'use strict';
        return "Message from AG Namespace";
    }
};
console.log(AG.Utilities.DisplayMessage());


AGLibWinJS.defineNamespace("GitHub", {
    Utilities: {
        DisplayMessage: function () {
            'use strict';
            return "Message from GitHub Namespace";
        }
    }
});
console.log(GitHub.Utilities.DisplayMessage());


AGLibWinJS.defineChildNamespace(GitHub, "Projects", {
    Utilities: {
        DisplayMessage: function () {
            'use strict';
            return "Message from GitHub.Projects Namespace";
        }
    }
});
console.log(GitHub.Projects.Utilities.DisplayMessage());