"use strict";
angular.module('slatwalladmin').directive('swWorkflowTrigger', ['$log', '$slatwall', 'metadataService', 'workflowPartialsPath', function($log, $slatwall, metadataService, workflowPartialsPath) {
  return {
    restrict: 'A',
    replace: true,
    scope: {
      workflowTrigger: "=",
      workflowTriggers: "="
    },
    templateUrl: workflowPartialsPath + "workflowtrigger.html",
    link: function(scope, element, attrs) {
      $log.debug('workflow trigger init');
      scope.selectWorkflowTrigger = function(workflowTrigger) {
        $log.debug('SelectWorkflowTriggers');
        scope.done = false;
        $log.debug(workflowTrigger);
        scope.finished = false;
        scope.workflowTriggers.selectedTrigger = undefined;
        var filterPropertiesPromise = $slatwall.getFilterPropertiesByBaseEntityName(scope.workflowTrigger.data.workflow.data.workflowObject);
        filterPropertiesPromise.then(function(value) {
          scope.filterPropertiesList = {
            baseEntityName: scope.workflowTrigger.data.workflow.data.workflowObject,
            baseEntityAlias: "_" + scope.workflowTrigger.data.workflow.data.workflowObject
          };
          metadataService.setPropertiesList(value, scope.workflowTrigger.data.workflow.data.workflowObject);
          scope.filterPropertiesList[scope.workflowTrigger.data.workflow.data.workflowObject] = metadataService.getPropertiesListByBaseEntityAlias(scope.workflowTrigger.data.workflow.data.workflowObject);
          metadataService.formatPropertiesList(scope.filterPropertiesList[scope.workflowTrigger.data.workflow.data.workflowObject], scope.workflowTrigger.data.workflow.data.workflowObject);
          scope.workflowTriggers.selectedTrigger = workflowTrigger;
        });
      };
      scope.deleteEntity = function(entity) {
        $log.debug("Delete Called");
        $log.debug(entity);
        scope.deleteTrigger(entity);
      };
      scope.deleteTrigger = function(workflowTrigger) {
        var deleteTriggerPromise = $slatwall.saveEntity('WorkflowTrigger', workflowTrigger.data.workflowTriggerID, {}, 'Delete');
        deleteTriggerPromise.then(function(value) {
          $log.debug('deleteTrigger');
          scope.workflowTriggers.splice(workflowTrigger.$$index, 1);
        });
      };
      scope.setHidden = function(trigger) {
        if (!angular.isObject(trigger) || angular.isUndefined(trigger.hidden)) {
          trigger.hidden = false;
        } else {
          $log.debug("setHidden()", "Setting Hide Value To " + !trigger.hidden);
          trigger.hidden = !trigger.hidden;
        }
      };
    }
  };
}]);

//# sourceMappingURL=../../directives/workflow/swworkflowtrigger.js.map