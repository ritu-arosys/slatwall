<!DOCTYPE html>
<html lang="en">
     <cfinclude template="_header.cfm" >

    <body>
        <!-- Begin Devdocs Site -->
        <div ng-app="slatdocs"><!-- begin ng-app -->
        <cfinclude template="_navbar.cfm" >
        <div class="container-fluid">
            <div class="row-fluid">
                <!-- Begin left sidebar -->
                	<div class="col-md-5" style="overflow:scroll;height:675px;" ng-controller="SlatwallDocsControllerList">
                    <!-- I will be injecting the item names here. -->
                    <ul class="list-unstyled">
                        <span><h5>Modules </h5></span>
                        <li ng-repeat="doc in modules | filter: searchDocs" ng-click="displayMeta(doc)">
                        	<small><a href="#/reference/modules/{{doc.name}}.html">{{doc.name}}</a></small>
                        </li>
                    </ul>
                    <ul class="list-unstyled">
                        <span><h5>Classes: {{searchDocs}} </h5></span>
                        <li ng-repeat="doc in classes | filter: searchDocs" ng-click="displayMeta(doc)">
                        	<small><a href="#/reference/classes/{{doc.name}}.html">{{doc.name}}</a></small>
                        </li>
                    </ul>
                </div>
                <!-- End left sidebar   -->
                <!-- Begin content area -->
                	<div class="col-md-7" style="overflow:scroll;height:675px;"  ng-controller="SlatwallDocsControllerMeta">
                    	<div class="metaContent">
                    		<!-- This is where we will inject the main content for each item -->
                        {{ docs }}
                    	</div>
                 </div>
                <!-- End content area   -->
            </div>
        </div>
        <!-- /.container -->
        <!-- End Devdocs Site -->
        </div><!-- End ng-app -->	
        
    </body>
</html>