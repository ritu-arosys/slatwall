/**
 * Handles generating a navigation bar from the readme.md files that live throughout Slatwall.
 * Reference Section:
 * 		API Access Points
 * 			REST API readme.md with other references coming from the main.cfc in the API directory
 * 			ColdFusion API readme.md in Hibachi Scope with examples
 * 			AngularJS  API readme.md in slatscope
 * 
 * 		Model
 * 			Entities + Custom
 * 			Services + Custom
 * 			DAO		 + Custom
 * 			Other    + Custom
 * 				Process
 * 				Handler + Custom
 * 				Report + Custom
 * 				Service
 * 				Transient 
 * 				Validation + Custom
 * 		Other
 * 			IntegrationServices
 * 			Tags
 * 			Templates
 * 			Resource Bundles
 * 			Assets
 * 			Tests
 * 			Tags	
 */

slatdocs
		.controller(
				'SlatwallDocsControllerMarkDownList',
				function($scope, $http) {

					$scope.url = "/index.cfm?slatAction=api:main.getNavData";
					$http.get($scope.url).success(
							function(response) {
								$scope.nav = response.NAVLIST;
								//console.log($scope.nav);
								//Render the markdown
								preview.innerHTML = markdown
								.toHTML($scope.nav);
								
					});
					
});
