"use strict";
var slatwalladmin;
(function(slatwalladmin) {
  var globalSearch = (function() {
    function globalSearch($scope, $log, $window, $timeout, $slatwall) {
      this.$scope = $scope;
      this.$log = $log;
      this.$window = $window;
      this.$timeout = $timeout;
      this.$slatwall = $slatwall;
    }
    globalSearch.$inject = ['$scope', '$log', '$window', '$timeout', '$slatwall'];
    return globalSearch;
  })();
  slatwalladmin.globalSearch = globalSearch;
})(slatwalladmin || (slatwalladmin = {}));

//# sourceMappingURL=../controllers/globalsearch.js.map