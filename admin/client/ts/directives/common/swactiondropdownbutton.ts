angular.module('slatwalladmin')
.directive('swActionDropdownButton', [
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
			templateUrl: partialsPath+'actiondropdownsidebutton.html',
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