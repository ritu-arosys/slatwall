/**
 * This is the main logic for grabbing doc item list and doc item content for
 * slatdocs
 */
var slatdocs = angular.module('slatdocs', []); // ngResource for rest...

//This service is to bridge communicate between the two controllers below.
slatdocs.factory('docSharedService', function($rootScope) {
	  var docService = {};
	  docService.message = "";
	  docService.prepForBroadcast = function(msg) {
	    this.message = msg;
	    this.broadcastItem();
	  };
	  docService.broadcastItem = function() {
	    $rootScope.$broadcast('handleBroadcast');
	  };
	  return docService;
	});

// Setup our controller for grabbing the list of documentation items
slatdocs
		.controller(
				'SlatwallDocsControllerList',
				function($scope, docSharedService, $http) {
					$scope.url = "list";
					$http
							.get(
									'/index.cfm?slatAction=api:main.getDocData&slatdocs=' + $scope.url)
							.success(function(response) {
								//---
								//Make sense of the array list...
								var responseArray = new Array();
								for ( var key in response) {
									if (response.hasOwnProperty(key)) {
										if (response[key] != "") {
											var val = response[key];
											var temp = val.toString().split(",");
											//------
											for (var i = 0; i <= temp.length -1; i++){
												responseArray.push(temp[i]);
											};
										}
									}
								}
								$scope.docs = responseArray;
								
								$scope.displayMeta = function(name) {
								    docSharedService.prepForBroadcast(name);
								};
								
							});
});

//This controller handles just the meta content.
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
					    $scope.url = $scope.message.replace("SlatwallDoc.", "");//Just for dev will be removed.
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
