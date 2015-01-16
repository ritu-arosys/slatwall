<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>
            Slatdocs
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!--- JQuery  --->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.2/jquery.js"></script>
        <!--- Bootstrap CSS & JS --->
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">
        <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>
        <!--- Angular --->
        <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.5/angular.min.js"></script>
        <link rel="stylesheet" href="css/main.css">
        <script src="js/slatwalldocs.js"></script>
    </head>
    <body>
        <!-- Begin Devdocs Site -->
        <div ng-app="slatdocs"><!-- begin ng-app -->
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">Slatwall</a>
                </div>
                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav">
                    	<li><a href="views/reference.cfm">Reference<span class="sr-only"></span></a></li>
                        <li class="active"><a href="#">Docs <span class="sr-only">(current)</span></a></li>
                        <li><a href="#">Tutorials</a></li>
                    </ul>
                    <form class="navbar-form navbar-left" role="search">
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="Search" ng-model="searchDocs">
                        </div>
                        <button type="submit" class="btn btn-default">Submit</button>
                    </form>
                    <ul class="nav navbar-nav navbar-right">
                        <li><a href="http://docs.getslatwall.com/">Help</a></li>
                    </ul>
                </div>
                <!-- /.navbar-collapse -->
            </div>
            <!-- /.container-fluid -->
        </nav>
        <div class="container-fluid">
            <div class="row-fluid">
                <!-- Begin left sidebar -->
                	<div class="col-md-5" style="overflow:scroll;height:675px;" ng-controller="SlatwallDocsControllerList">
                    <!-- I will be injecting the item names here. -->
                    <ul class="list-unstyled">
                        <span><h5>Search Results: {{searchDocs}} </h5></span>
                        <li ng-repeat="doc in docs | filter: searchDocs" ng-click="displayMeta(doc)">
                        	<small><a href="#">{{doc}}</a></small>
                        </li>
                    </ul>
                    </div>
                <!-- End left sidebar   -->
                <!-- Begin content area -->
                	<div class="col-md-7" style="overflow:scroll;height:675px;">
                    	<div class="metaContent" ng-controller="SlatwallDocsControllerMeta">
                    		<!-- This is where we will inject the main content for each item -->
                        	<div ng-repeat="doc in docs">
                        		<p>
                        			<p class="page-header">
                        			<h3>{{ doc.NAME }}</h3><!-- Get component name -->
                        			<h5><span>{{ doc.HINT }}</span><br></h5><!-- Get component path-->
                        			<h5><span ng-show="doc.TABLE.length > 0">Table: {{ doc.TABLE }}</span></h5>
                        			<h6>{{ doc.PATH }}</h6><!-- Get component hint-->
                        			</p>
                        			<hr>
                        			
                        			<h4><span class="label label-primary">functions</span></h4><!-- Get all functions -->
                        			<ul ng-repeat="(funKey, funVal) in funcs">
                        								<span ng-show="funVal.NAME.length > 0">
                        					 			<li><b>{{ funVal.NAME | lowercase }}</b>
                        					 				<small>{{ funVal.RETURNTYPE }}</small>
                        					 				<small>{{ funVal.ACCESS }}</small><br>
                        					 			</li>
                        								<span> {{ funVal.HINT }}</span>
                        								<ul ng-repeat="(l, w) in funVal['PARAMETERS']"><!-- Function Parameters-->
                        									<li>{{ w['NAME'] }} {{ w['TYPE']|lowercase }}</li>
                        					 			</ul>
                        					 			</span>
                        			</ul>
                        			
                        			<hr>
                        				<h4><span class="label label-primary">Extends</span></h4>	
                        				<div ng-repeat="(c, d) in doc"><!-- Get Extend Data -->
                        					<p>
                        						 <b>{{ d.NAME }}</b>
                        						 	{{ d.HINT }}
                        							{{ d.TYPE }}
                        						        <ul ng-repeat="(k, v) in d.FUNCTIONS"><!-- Super Functions -->
                        								<span ng-show="v.NAME.length > 0">
                        								<li><b>{{ v.NAME }}</b></li>
                        								<span> {{ v.HINT }} </span>	
                        								</span><!-- END SHOW -->
                        								<ul ng-repeat="(l, w) in v.PARAMETERS"><!-- Function Parameters-->
                        								   <li>{{ w.NAME }}</li>
                        								</ul>
                        								
                        							</ul>
                        							
                        					</p>
                        				</div><!-- End extends -->
                        			<!-- BEGIN Properties for Entities -->
                        			<h4><span class="label label-primary">Properties</span></h4>
                        				<table class="table" ng-show="doc.PROPERTIES.length > 0">
                        					<thead>
                        						<tr><th>Name</th><th>Orm Type</th><th>Field Type</th><th>Length</th></tr>	
                        					</thead>
                        					<tbody>
                        					<tr ng-repeat="(k, v) in doc.PROPERTIES"><!-- Properties -->
                        								<td ng-show="v.NAME.length > 0">
                        								<b> {{ v.NAME      }}</b></td>
                        								<td>{{ v.ORMTYPE   }}</td>
                        								<td>{{ v.FIELDTYPE }}</td>
                        								<td>{{ v.LENGTH    }}</td>
                        					</tr>	
                        					</tbody>
                        					<tfoot>
                        						<tr><td colspan="4"></td></tr>
                        					</tfoot>
                        				</table>
                        				
                        			<!-- END Properties for Entities   -->
                        		</p>
                        	</div>
                        
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