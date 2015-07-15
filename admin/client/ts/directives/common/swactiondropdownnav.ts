angular.module('slatwalladmin')
.directive('swActionDropdownNav', [
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
			templateUrl: partialsPath+'actiondropdownnav.html',
			transclude:true,
			scope: {
				title:"=", 
				icon:"=", 
				dropdownClass:"=", 
				dropdownID:"=", 
				buttonClass:"="
			},
			link:function(scope,element,attrs){	
				
			}
		};
	}
])