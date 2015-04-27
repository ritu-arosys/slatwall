"use strict";
'use strict';
angular.module('slatwalladmin').factory('alertService', alertService);
var slatwalladmin;
(function(slatwalladmin) {
  var Alert = (function() {
    function Alert(msg, type) {
      this.msg = msg;
      this.type = type;
    }
    return Alert;
  })();
  slatwalladmin.Alert = Alert;
  var AlertService = (function() {
    function AlertService($timeout, alerts) {
      this.$timeout = $timeout;
      this.alerts = alerts;
      this.alerts = new Alerts([]);
    }
    AlertService.prototype.get = function() {
      return this.alerts;
    };
    AlertService.$inject = ['$timeout'];
    return AlertService;
  })();
  slatwalladmin.AlertService = AlertService;
})(slatwalladmin || (slatwalladmin = {}));

//# sourceMappingURL=../services/alertservice.js.map