/**
 * Handles displaying the rendered MD on a nav click.
 * @module slatwallDocs
 * @class docsMDRouter
 */
var slatdocs = angular.module('slatdocs', ['ngRoute']);
slatdocs.config(
        function( $routeProvider ){

        		$routeProvider
        
                   .when(
                    "/:base/:markDownItem",
                    {
                        action: "renderMarkDownBase"
                    })
                 .when(
                    "/:base/:leaf/:markDownItem",
                    {
                        action: "renderMarkDownLeaf"
                    })
                .when(
                    "/:meta/:docs/:md/:markDownItem",
                    {
                        action: "renderMarkDown"
                    })
                 .when(
                    "/:base/:leaf/:node/:subnode/:markDownItem",
                    {
                        action: "renderMarkDownSubNode"
                    })
                 .when(
                    "/:base/:leaf/:node/:subnode/:subsubnode/:markDownItem",
                    {
                        action: "renderMarkDownSubSubNode"
                    })
                .otherwise({
                		redirectTo: '/meta/docs/md/intro'
                })

        }
    );


