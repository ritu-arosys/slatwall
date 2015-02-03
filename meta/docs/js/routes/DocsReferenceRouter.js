/**
 * Handles displaying the rendered reference file on a nav click.
 * @module slatwallDocs
 * @class DocsReferenceRouter
 */
var slatdocs = angular.module('slatdocs', ['ngRoute']);
slatdocs.config(
        function( $routeProvider ){

            $routeProvider
                   .when(
                    "reference/modules/:module",
                    {
                        templateUrl: "/meta/docs/build/module/{{classes.name}}.html",
                    })
                    .when(
                    "/reference/classes/:class",
                    {
                        templateUrl: "/meta/docs/build/:class.html"
                    })
                .otherwise({
                		redirectTo: '/meta/docs/md/intro'
                })

        }
    );