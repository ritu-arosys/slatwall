angular.module('slatwalladmin')
.directive('swProcessCaller', [
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
			restrict:'A',
			templateUrl: 'http://cf11.slatwall/admin/client/partials/processcaller.html',
			scope: {
				processCaller:"=attributes"
			},
			link:function(scope,element,attrs){	
				if(scope.processCaller.type == "divider"){ 
					element.attr("class", "divider");
				}
			}
		};
	}
])