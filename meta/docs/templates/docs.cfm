<!DOCTYPE html>
<html lang="en">
    <cfinclude template="../templates/_header.cfm" >
    <body>
        <!-- Begin Devdocs Site -->
        <div ng-app="slatdocs"><!-- begin ng-app -->
        <cfinclude template="_navbar.cfm" >
        <div class="container-fluid">
            <div class="row-fluid">
                <!-- Begin left sidebar -->
                <div class="col-md-3" ng-controller="SlatwallDocsControllerMarkDownList">
                        <input type="hidden" id="md-nav" value="{{nav}}"/>
    					<div id="preview"></div>
    				</div>
                	<!-- End left sidebar   -->
                	 	<!-- Begin content area -->
                <div class="col-md-9" ng-controller="SlatwallDocsControllerMarkDownBody">
                		<div id="body" value="{{body}}"></div>		
                		
                 </div>
                <!-- End content area   -->
            </div>
        </div>
        <!-- /.container -->
        <!-- End Devdocs Site -->
        </div><!-- End ng-app -->
    </body>
</html>