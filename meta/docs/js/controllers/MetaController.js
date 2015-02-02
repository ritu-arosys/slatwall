/**
 * This controller handles just the meta content.
 * @class SlatwallDocsControllerMeta
 */
slatdocs
		.controller(
				'SlatwallDocsControllerMeta',
				function($scope, docSharedService, $http) {
					function load(){
					$http.get('/index.cfm?slatAction=api:main.getDocData&slatdocs=' + (($scope.url!=null) ? $scope.url : 'Application'))
							.success(function(response) {
								//console.log(response);
								
								//Start grabbing all the info we need and adding it to scope.
								$scope.funcs = response.docsData.DOCSDATA.FUNCTIONS;
								//console.log($scope.funcs);
								//---
								//Make sense of the array list...
								var responseArray = new Array();
								for ( var key in response) {
									if (key == "docsData"){
										if (response.hasOwnProperty(key)) {
											if (response[key] != "") {
												$scope.docs  = keysToUpperCase(response[key]);
												console.log($scope.docs);
											}
										}
									 }
									
								} 
							});
					  }
					  load();//loads the meta body.
					  $scope.$on('handleBroadcast', function() {
					    $scope.message = docSharedService.message;
					    $scope.url = $scope.message.replace("Slatwall.", "");//Just for dev will be removed.
					    load(); //Reloads the http data when we get a new click.
					  });
					  
					  //Transforms an object key into UPPERCASE
					  function keysToUpperCase(obj){
						    Object.keys(obj).forEach(function(key){
						        var k=key.toUpperCase();
						        if(k!= key){
						            obj[k]= obj[key];
						            delete obj[key];
						        }
						    });
						    return (obj);
						}
					  
				});




//meta.docs.DocumentationService.ColdFusionDocumentationService
//model.dao.AccountDAO
//model.entity.Account