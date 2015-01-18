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
						}
						else{
							render("/index.cfm?slatAction=api:main.getMarkDownItem&item=/meta/docs/md/intro.md");
						}
			        });
					//Setup the url to display.
					function render(item){
					$scope.url = item;
					console.log($scope.url);
					
					$http.get($scope.url).success(
							function(response) {
								$scope.body = response.BODY;
								//console.log($scope.body);
								//Render the markdown
								body.innerHTML = markdown
								.toHTML(response.BODY);
								
					});
					
					}
					
					
});

