/**
 * Handles generating a navigation bar from the readme.md files that live throughout Slatwall.
 * @module slatwallDocs
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
