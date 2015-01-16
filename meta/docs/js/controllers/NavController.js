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

var slatdocs = angular.module('slatdocs', []); 
slatdocs
		.controller(
				'SlatwallDocsControllerMarkDown',
				function($scope, $http) { 
					
					$scope.url = "http://cf10.slatwall/index.cfm?slatAction=api:main.getNavData";
					$http.get($scope.url).success(function(response) {
								$scope.nav = response.NAVLIST;
								console.log($scope.nav);
					
								function Editor(input, preview) {
			        				this.update = function () {
			          				preview.innerHTML = markdown.toHTML(input.value);
			        					};
			       				 	input.editor = this;
			       				 	this.update();
			     				 	}
			      					var $ = function (id) { return document.getElementById(id); };
			      						new Editor($("text-input"), $("preview"));
								
								
					});
				});