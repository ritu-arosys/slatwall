angular.module('slatwalladmin')
.directive('swListAnchor', [
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
			templateUrl: partialsPath+'listanchor.html',
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