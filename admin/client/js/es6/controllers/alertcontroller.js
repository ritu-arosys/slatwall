/// <reference path='../../../../client/typings/slatwallTypescript.d.ts' />
/// <reference path='../../../../client/typings/tsd.d.ts' />
var slatwalladmin;
(function (slatwalladmin) {
    var alertController = (function () {
        function alertController($scope, alertService) {
            this.$scope = $scope;
            this.alertService = alertService;
            $scope.$id = "alertController";
            $scope.alerts = alertService.getAlerts();
        }
        // $inject annotation.
        // It provides $injector with information about dependencies to be injected into constructor
        // it is better to have it close to the constructor, because the parameters must match in count and type.
        // See http://docs.angularjs.org/guide/di
        alertController.$inject = [
            '$scope',
            'alertService'
        ];
        return alertController;
    })();
    slatwalladmin.alertController = alertController;
})(slatwalladmin || (slatwalladmin = {}));
var slatwalladmin;
(function (slatwalladmin) {
    angular.module('slatwalladmin').controller('alertController', slatwalladmin.alertController);
})(slatwalladmin || (slatwalladmin = {}));

//# sourceMappingURL=../controllers/alertcontroller.js.map