<!DOCTYPE html>
<html lang="en">
     <cfinclude template="templates/_header.cfm" >

    <body>
        <!-- Begin Devdocs Site -->
        <div ng-app="slatdocs"><!-- begin ng-app -->
        <cfinclude template="templates/_navbar.cfm" >
        <div class="container-fluid">
            <div class="row-fluid">
                <!-- Begin left sidebar -->
                	<div class="col-md-5" style="overflow:scroll;height:675px;" ng-controller="SlatwallDocsControllerList">
                    <!-- I will be injecting the item names here. -->
                    
                </div>
                <!-- End left sidebar   -->
                <!-- Begin content area -->
                	<div class="col-md-7" style="overflow:scroll;height:675px;">
                		Welcome to the docs site.
                	</div>   	
                <!-- End content area   -->
            </div>
        </div>
        <!-- /.container -->
        <!-- End Devdocs Site -->
        </div><!-- End ng-app -->	
        
    </body>
</html>