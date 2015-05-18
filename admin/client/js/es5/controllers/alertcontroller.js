"use strict";
var slatwalladmin;
(function(slatwalladmin) {
  var alertController = (function() {
    function alertController($scope, alertService) {
      this.$scope = $scope;
      this.alertService = alertService;
      $scope.$id = "alertController";
      $scope.alerts = alertService.getAlerts();
    }
    alertController.$inject = ['$scope', 'alertService'];
    return alertController;
  })();
  slatwalladmin.alertController = alertController;
})(slatwalladmin || (slatwalladmin = {}));
var slatwalladmin;
(function(slatwalladmin) {
  angular.module('slatwalladmin').controller('alertController', slatwalladmin.alertController);
})(slatwalladmin || (slatwalladmin = {}));

//# sourceMappingURL=../controllers/alertcontroller.js.map