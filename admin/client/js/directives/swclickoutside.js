'use strict';
angular.module('slatwalladmin')
.directive('swClickOutside', [
	'$document',
	'$parse',
	'$timeout',
	'dialogService',
	function(
		$document,
		$parse,
		$timeout,
		dialogService
	){
		return {
			restrict: 'A',
			scope:{
				callback:'&'
			},
			link: function(scope, element, attrs){
				dialogService.addSwClickOutsideCallback(element, scope.callback);
				scope.$on('destroy', function(){
					dialogService.removeSwClickOutsideCallback(element);
				});
			}
		};
	}
]);
	
