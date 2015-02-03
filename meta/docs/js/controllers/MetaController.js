/**
 * This controller handles just the meta content.
 * @module slatwallDocs
 * @class SlatwallDocsControllerMeta
 */
slatdocs
		.controller(
				'SlatwallDocsControllerMeta',
				function($scope, docSharedService, $http) {
					$scope.url = "list";
					$http
							.get('/index.cfm?slatAction=api:main.getReferenceList')
							.success(function(response) {
								var data = response.DATA || "";
								var dataObj = JSON.parse(data);
								console.dir(dataObj);
								$scope.docs = dataObj.classes;	
							});
					
	});

slatdocs.config(
        function( $routeProvider ){
        	console.log("myRoute");
    		$routeProvider
               .when(
                "/reference/modules/:module",
                {
                    templateUrl: "/meta/docs/build/modules/index.html"
                });
        });
                


//meta.docs.DocumentationService.ColdFusionDocumentationService
//model.dao.AccountDAO
//model.entity.Account