angular.module('slatwalladmin')
.directive('swEntityActionBar', [
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
			templateUrl: 'http://cf11.slatwall/admin/client/partials/entityactionbar.html',
			scope: {
				actionBarAttributes:"=attributes"
			},
			link:function(scope,element,attrs){	
				//if modal display only hibachimessagedisplay	

				//type logic

				//listing

				//detail

				//process


			}
		};
	}
])