/**
 * Setup our controller for grabbing the list of reference documentation items
 * @module slatwallDocs
 * @class SlatwallDocsControllerList
 */
slatdocs
		.controller(
				'SlatwallDocsControllerList',
				function($scope, docSharedService, $http) {
					$scope.url = "list";
					$http
							.get(
									'/index.cfm?slatAction=api:main.getReferenceList')
							.success(function(response) {
								var data = response.DATA || "";
								var dataObj = JSON.parse(data);
								console.dir(dataObj);
								$scope.docs = dataObj.classes;
								$scope.classes = dataObj.classes;
								$scope.modules = dataObj.modules;
								$scope.displayMeta = function(name) {
								    docSharedService.prepForBroadcast(name);
								}
								
							});
});
