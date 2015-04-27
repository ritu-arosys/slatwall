/*services return promises which can be handled uniquely based on success or failure by the controller*/
'use strict';
angular.module('slatwalladmin').factory('alertService', alertService);
var slatwalladmin;
(function (slatwalladmin) {
    //model
    var Alert = (function () {
        function Alert(msg, type) {
            this.msg = msg;
            this.type = type;
        }
        return Alert;
    })();
    slatwalladmin.Alert = Alert;
    var AlertService = (function () {
        function AlertService($timeout, alerts) {
            this.$timeout = $timeout;
            this.alerts = alerts;
            this.alerts = new Alerts([]);
        }
        /*STORAGE_ID = 'todos-angularjs-typescript';

        get (): TodoItem[] {
            return JSON.parse(localStorage.getItem(this.STORAGE_ID) || '[]');
        }

        put(todos: TodoItem[]) {
            localStorage.setItem(this.STORAGE_ID, JSON.stringify(todos));
        }*/
        AlertService.prototype.get = function () {
            return this.alerts;
        };
        AlertService.$inject = [
            '$timeout'
        ];
        return AlertService;
    })();
    slatwalladmin.AlertService = AlertService;
})(slatwalladmin || (slatwalladmin = {}));
/*[
'$timeout',
function(
    $timeout
){
    
    
    var alertService = {
        
    };
    
    return alertService;
}
]);*/

//# sourceMappingURL=../services/alertservice.js.map