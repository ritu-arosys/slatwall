/*services return promises which can be handled uniquely based on success or failure by the controller*/
'use strict';
angular.module('slatwalladmin')
.factory('alertService',alertService);

module slatwalladmin{
    //model
    export class Alert {
        msg:string;
        type:string;
        constructor(
            msg: string,
            type: string
        ) { 
            this.msg = msg;
            this.type = type;   
        }
    }
    
    /*export class Alerts {
        alerts:Alert[];
        constructor(
            alerts:Alert[]
        ){
            this.alerts = alerts;  
        }
        
        addAlert(alert:Alert){
            this.alerts.push(alert);
        }
        removeAlert(alert:Alert){
            var index:number = this.alerts.indexOf(alert, 0);
            if (index != undefined) {
               this.alerts.splice(index, 1);
            }
        }
    }*/
    //service
    
    export interface IAlertService {
        get (): Alert[];
        put(alerts: Alert[]);
    }
    
    export class AlertService implements IAlertService{
        public static $inject = [
            '$timeout'
        ];
        
        constructor(
            private $timeout: ng.ITimeoutService,
            private alerts:Alerts
        ) {
            this.alerts = new Alerts([]);
        }
        
        /*STORAGE_ID = 'todos-angularjs-typescript';

        get (): TodoItem[] {
            return JSON.parse(localStorage.getItem(this.STORAGE_ID) || '[]');
        }

        put(todos: TodoItem[]) {
            localStorage.setItem(this.STORAGE_ID, JSON.stringify(todos));
        }*/
        get(): Alerts{
            return this.alerts;
        }
       // put(alerts:)
       
        /*addAlert(alert:Alert){
            this.alerts.addAlert(alert);
            $timeout(function() {
              this.alerts.removeAlert(alert);
            }, 3500);
        }
        addAlerts(alerts:Alert[]){
            alerts.forEach(function(alert:Alert){
                this.addAlert(alert)
            });
        }
        
        removeAlert(alert:Alert){
            this.alerts.removeAlert(alert);
        }*/
       /* formatMessagesToAlerts: (messages:string[]){
            var alerts = [];
            for(var message in messages){
                var alert = new Alert(){
                    msg:messages[message].message,
                    type:messages[message].messageType
                };
                alerts.push(alert);
                if(alert.type === 'success' || alert.type === 'error'){
                     $timeout(function() {
                      alert.fade = true;
                    }, 3500);
                    
                    alert.dismissable = false;
                    
                }else{
                    alert.fade = false;
                    alert.dismissable = true;
                }
            }
            return alerts;
        }*/
        
//        removeOldestAlert() =>{
//            this._alerts.splice(0,1);
//        }
    }    
}

    
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
