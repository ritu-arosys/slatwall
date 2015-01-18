//This service is to bridge communicate between the two controllers below.
slatdocs.factory('docSharedService', function($rootScope) {
	  var docService = {};
	  docService.message = "";
	  docService.prepForBroadcast = function(msg) {
	    this.message = msg;
	    this.broadcastItem();
	  };
	  docService.broadcastItem = function() {
	    $rootScope.$broadcast('handleBroadcast');
	  };
	  return docService;
	});