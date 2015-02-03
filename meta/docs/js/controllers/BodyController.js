/**
 * Handles rendering the body of the markdown on click.
 * @module slatwallDocs
 * @class SlatwallDocsControllerMarkDownBody
 */
slatdocs
		.controller(
				'SlatwallDocsControllerMarkDownBody',
				function($scope, $http, $rootScope, $route, $location) {
					//console.log($location);
					//Try to find the route paths.
					
					/**
					 * Handles routing the content area of the documentation markdown
					 * @event routeChangeSuccess
					 * @name routeChangeSuccess
					 * $type any
					 */
					$rootScope.$on('$routeChangeSuccess', function (currentRoute, previousRoute) {
			            console.log($route.current.params);
			            
			            //By default, slatwall documentation will only discover 
			            //.md files that are within the first five levels of the installation directory tree.
			            //To allow further markdown, the following would need to be modified as well as
			            //The 'docsMDRouter.js routes file.
			            
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
						}else if ($route.current.action === "renderMarkDownSubNode"){
							render("/index.cfm?slatAction=api:main.getMarkDownItem&item=" +
							 		"/" + $route.current.params.base +
							 		"/" + $route.current.params.leaf +
							 		"/" + $route.current.params.node +
							 		"/" + $route.current.params.subnode +
							 		"/" + $route.current.params.markDownItem + ".md");
						}else if ($route.current.action === "renderMarkDownSubSubNode"){
							render("/index.cfm?slatAction=api:main.getMarkDownItem&item=" +
							 		"/" + $route.current.params.base +
							 		"/" + $route.current.params.leaf +
							 		"/" + $route.current.params.node +
							 		"/" + $route.current.params.subnode +
							 		"/" + $route.current.params.subsubnode +
							 		"/" + $route.current.params.markDownItem + ".md");
						}
						else if ($route.current.action === "renderMarkDownBase"){
							render("/index.cfm?slatAction=api:main.getMarkDownItem&item=" +
							 		"/" + $route.current.params.base +
							 		"/" + $route.current.params.markDownItem + ".md");
						}
						
			        });
					
					/**
					 * renders the passed in markdown item
					 * @name render
					 * @param item {any}
					 */
					function render(item){
					$scope.url = item;
					console.log($scope.url);
					
					/**
					 * Executed when the GET request was sucessfull.
					 * @name $http.get($scope.url).success
					 */
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

