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