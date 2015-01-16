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
        <link rel="stylesheet" href="../css/main.css">
        <script src="../js/controllers/navController.js"></script>
		<script src="../js/markdown.min.js"></script>

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
                    	 <li class="active"><a href="reference">Reference<span class="sr-only">(current)</span></a></li>
                        <li><a href="../index.cfm">Docs<span class="sr-only"></span></a></li>
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
        <div class="container-fluid" ng-controller="SlatwallDocsControllerMarkDown">
            <div class="row-fluid">
                <!-- Begin left sidebar -->
                	<textarea id="text-input" oninput="this.editor.update()">{{ nav }}
              		</textarea>
    				<div id="preview"> </div>
                	<!-- End left sidebar   -->
                	<!-- Begin content area -->
                	<div class="col-md-7" style="overflow:scroll;height:675px;">
                    </div>
                <!-- End content area   -->
            </div>
        </div>
        <!-- /.container -->
        <!-- End Devdocs Site -->
        </div><!-- End ng-app -->
    </body>
</html>