/**
 * Handles rendering the body of the markdown on click.
 */

slatdocs
		.controller(
				'SlatwallDocsControllerMarkDownBody',
				function($scope, $http, $rootScope, $route, $location) {
					//console.log($location);
					//Try to find the route paths.
					
					$rootScope.$on('$routeChangeSuccess', function (currentRoute, previousRoute) {
			            console.log($route.current.params);
						if ($route.current.action === "renderMarkDown") {
							 render("/index.cfm?slatAction=api:main.getMarkDownItem&item=" +
							 		"/" + $route.current.params.meta +
							 		"/" + $route.current.params.docs +
							 		"/" + $route.current.params.md    +
							 		"/" + $route.current.params.markDownItem + ".md");
						}else if ($route.current.action === "renderMarkDownLeaf"){
							render("/index.cfm?slatAction=api:main.getMarkDownItem&item=" +
							 		"/" + $route.current.params.base +
							 		"/" + $route.current.params.leaf +
							 		"/" + $route.current.params.markDownItem + ".md");
						}
						
			        });
					//Setup the url to display.
					function render(item){
					$scope.url = item;
					console.log($scope.url);
					
					$http.get($scope.url).success(
							function(response) {
								$scope.body = response.BODY;
								
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
								body.innerHTML = marked(response.BODY); //Render the markdown
								$( 'table' ).addClass( "table table-bordered table-striped" ); //Add some basic styling if a table is in the markdown.

					});
					
					}
					
					
});

