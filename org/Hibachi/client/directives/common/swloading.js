'use strict';
//Thanks to AdamMettro
angular.module('slatwalladmin')
.directive('swLoading', ['$log','hibachiPartialsPath',

function ($log,hibachiPartialsPath) {
    return {
        restrict: 'A',
        transclude:true,
        templateUrl:hibachiPartialsPath+'loading.html',
        scope:{
        	swLoading:'='
        },
        link: function (scope,attrs,element) {
        }
    };
}]);