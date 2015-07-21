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
				if(angular.isDefined(scope.processCaller.text)){
					
					switch(scope.processCaller.text.toLowerCase()){
						case "create": 
							scope.processCaller.class = "btn-default"; 
							scope.processCaller.icon = "";
							break
					

						case "edit": 
							scope.processCaller.class = "btn-default"; 
							scope.processCaller.icon = "";
							break;
					

						case "cancel": 
							scope.processCaller.class = "btn-default"; 
							scope.processCaller.icon = "remove icon-white";
							break; 
					

						case "save": 
							scope.processCaller.class = "btn-success"; 
							scope.processCaller.icon = "ok icon-white";
							break;
					

						case "delete": 
							scope.processCaller.class = "btn-default s-remove"; 
							scope.processCaller.icon = "trash icon-white";
							break; 
					}
				}
			}
		};
	}
])