angular.module('slatwalladmin')
.directive('swActionDropdownSideNav', [
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
			templateUrl: partialsPath+'actiondropdownsidenav.html',
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