"use strict";
angular.module('slatwalladmin').directive('swFormFieldSearchSelect', ['$http', '$log', '$slatwall', 'formService', 'partialsPath', function($http, $log, $slatwall, formService, partialsPath) {
  return {
    templateUrl: partialsPath + 'formfields/search-select.html',
    require: "^form",
    restrict: 'E',
    scope: {propertyDisplay: "="},
    link: function(scope, element, attr, formController) {
      scope.selectionOptions = {
        value: [],
        $$adding: false
      };
      scope.setAdding = function(isAdding) {
        scope.isAdding = isAdding;
        scope.showAddBtn = false;
      };
      scope.selectedOption = {};
      scope.showAddBtn = false;
      var propertyMetaData = scope.propertyDisplay.object.$$getMetaData(scope.propertyDisplay.property);
      var object = $slatwall.newEntity(propertyMetaData.cfc);
      scope.cfcProperCase = propertyMetaData.cfcProperCase;
      scope.selectionOptions.getOptionsByKeyword = function(keyword) {
        var filterGroupsConfig = '{filterGroups:[' + ' {  ' + '"filterGroup":[  ' + '{' + ' "propertyIdentifier":"_' + scope.cfcProperCase.toLowerCase() + '.' + scope.cfcProperCase + 'Name",' + ' "comparisonOperator":"like",' + ' "ormtype":"string",' + ' "value":"%' + keyword + '%"' + '  }' + ' ]' + ' }' + ']}';
        var filterGroupsConfigTemp = angular.fromJson(filterGroupsConfig);
        var definedFilters = scope.propertyDisplay.filters;
        $log.debug("FilterGroupsConfig");
        $log.debug(filterGroupsConfigTemp);
        if (angular.isDefined(definedFilters)) {
          $log.debug("filter");
          $log.debug(definedFilters);
          var filterTemplate = {
            propertyIdentifier: "",
            comparisonOperator: "",
            value: ""
          };
          filterTemplate.propertyIdentifier = definedFilters.filterGroup.propertyIdentifier;
          filterTemplate.comparisonOperator = definedFilters.filterGroup.comparisonOperator;
          filterTemplate.value = definedFilters.filterGroup.value;
          $log.debug(filterTemplate);
          filterGroupsConfigTemp[0].filterGroup.push(filterGroup);
          filterGroupsConfig = filterGroupsConfigTemp;
          $log.debug("New filter Groups Config");
          $log.debug(filterGroupsConfig);
        }
        return $slatwall.getEntity(propertyMetaData.cfc, {filterGroupsConfig: filterGroupsConfig}).then(function(value) {
          $log.debug('typesByKeyword');
          $log.debug(value);
          scope.selectionOptions.value = value.pageRecords;
          var myLength = keyword.length;
          if (myLength > 0) {
            scope.showAddBtn = true;
          } else {
            scope.showAddBtn = false;
          }
          return scope.selectionOptions.value;
        });
      };
      var propertyPromise = scope.propertyDisplay.object['$$get' + propertyMetaData.nameCapitalCase]();
      propertyPromise.then(function(data) {});
      scope.selectItem = function($item, $model, $label) {
        scope.$item = $item;
        scope.$model = $model;
        scope.$label = $label;
        scope.showAddBtn = false;
        object.$$init($item);
        $log.debug('select item');
        $log.debug(object);
        scope.propertyDisplay.object['$$set' + propertyMetaData.nameCapitalCase](object);
      };
    }
  };
}]);
