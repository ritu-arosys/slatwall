angular.module('slatwalladmin')
.directive('swAnchor', [
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
			templateUrl: partialsPath+'anchor.html',
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
				if(!scope.disabled){ 
					
					element.removeAttr("data-disabled"); 

					if (!scope.modal){
						element.removeAttr("data-toggle"); 
						element.removeAttr("data-target");
					}
				} else { 
					element.removeAttr("data-toggle"); 
					element.removeAttr("data-target");
				}

				if(!scope.confirm){ 
					element.removeAttr("confirmText"); 
				}
			}
		};
	}
])