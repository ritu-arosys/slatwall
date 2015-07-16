angular.module('slatwalladmin')
.directive('swActionDropdown', [
	'$log',
	'$timeout',
	'$http',
	'partialsPath',
	function(
		$log, 
		$timeout,
		partialsPath
	){
	return{
			restrict:'E',
			templateUrl: 'http://cf11.slatwall/admin/client/partials/actiondropdown.html',
			scope: {
				actionDropdownAttributes:"=attributes"
			},
			link:function(scope,element,attrs){	
				
			}
		};
	}
])