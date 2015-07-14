angular.module('slatwalladmin')
.directive('swButton', [
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
			templateUrl: partialsPath+'button.html',
			scope: {
				action:"=", 
				text:"=", 
				url:"=", 
				title:"=", 
				class:"=", 
				icon:"=", 
				iconOnly:"=", 
				submit:"=", 
				name:"=", 
				confirm:"=", 
				confirmText:"=", 
				disabled:"=", 
				disabledText:"=", 
				modal:"=", 
				modalFullWidth:"=",
				id:"=",
				tag:"="
			},
			link:function(scope,element,attrs){	
				
			}
		};
	}
])