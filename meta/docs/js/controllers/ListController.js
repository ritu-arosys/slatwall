/**
 * Setup our controller for grabbing the list of documentation items
 * @class SlatwallDocsControllerList
 */
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