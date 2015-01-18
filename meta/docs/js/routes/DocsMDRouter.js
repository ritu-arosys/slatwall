/**
 * Handles displaying the rendered MD on a nav click.
 */
var slatdocs = angular.module('slatdocs', ['ngRoute']);
slatdocs.config(
        function( $routeProvider ){

            $routeProvider
                .when(
                    "/:meta/:docs/:md/:markDownItem",
                    {
                        action: "renderMarkDown"
                    })
                .otherwise({
                		redirectTo: '/meta/docs/md/intro'
                })

        }
    );


