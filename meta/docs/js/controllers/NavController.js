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
 * @class SlatwallDocsControllerMarkDownList
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
								marked.setOptions({
									  renderer: new marked.Renderer(),
									  gfm: true,
									  tables: true,
									  breaks: false,
									  pedantic: false,
									  sanitize: true,
									  smartLists: true,
									  smartypants: false
									});
								preview.innerHTML = marked(response.NAVLIST); //Render the markdown
								$( 'table' ).addClass( "table table-bordered table-striped" ); //Add some basic styling if a table is in the markdown.
								
					});
					
});
