/// <reference path='../../../../client/typings/slatwallTypescript.d.ts' />
/// <reference path='../../../../client/typings/tsd.d.ts' />

module slatwalladmin{
    export class alertController {
        // $inject annotation.
        // It provides $injector with information about dependencies to be injected into constructor
        // it is better to have it close to the constructor, because the parameters must match in count and type.
        // See http://docs.angularjs.org/guide/di
        public static $inject = [
            '$scope',
            'alertService'
        ];
        
        constructor(
            private $scope: ng.IScope,
            private alertService: slatwalladmin.IAlertService
        ) {
            $scope.$id="alertController";
            $scope.alerts = alertService.getAlerts();
        }
    }
}
module slatwalladmin{
    angular.module('slatwalladmin').controller('alertController',alertController);
}