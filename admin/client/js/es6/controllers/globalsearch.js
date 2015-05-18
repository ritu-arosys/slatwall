/// <reference path='../../../../client/typings/slatwallTypescript.d.ts' />
/// <reference path='../../../../client/typings/tsd.d.ts' />
var slatwalladmin;
(function (slatwalladmin) {
    var globalSearch = (function () {
        function globalSearch($scope, $log, $window, $timeout, $slatwall) {
            this.$scope = $scope;
            this.$log = $log;
            this.$window = $window;
            this.$timeout = $timeout;
            this.$slatwall = $slatwall;
        }
        // $inject annotation.
        // It provides $injector with information about dependencies to be injected into constructor
        // it is better to have it close to the constructor, because the parameters must match in count and type.
        // See http://docs.angularjs.org/guide/di
        globalSearch.$inject = [
            '$scope',
            '$log',
            '$window',
            '$timeout',
            '$slatwall'
        ];
        return globalSearch;
    })();
    slatwalladmin.globalSearch = globalSearch;
})(slatwalladmin || (slatwalladmin = {}));

//# sourceMappingURL=../controllers/globalsearch.js.map