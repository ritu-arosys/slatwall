"use strict";
'use strict';
angular.module('slatwalladmin').directive('swContentList', ['$log', '$timeout', '$slatwall', 'partialsPath', 'paginationService', 'observerService', function($log, $timeout, $slatwall, partialsPath, paginationService, observerService) {
  return {
    restrict: 'E',
    templateUrl: partialsPath + 'content/contentlist.html',
    link: function(scope, element, attr) {
      $log.debug('slatwallcontentList init');
      var pageShow = 50;
      if (scope.pageShow !== 'Auto') {
        pageShow = scope.pageShow;
      }
      scope.pageShowOptions = [{
        display: 10,
        value: 10
      }, {
        display: 20,
        value: 20
      }, {
        display: 50,
        value: 50
      }, {
        display: 250,
        value: 250
      }];
      scope.loadingCollection = false;
      scope.selectedSite;
      scope.orderBy;
      var orderByConfig;
      scope.getCollection = function(isSearching) {
        var columnsConfig = [{
          propertyIdentifier: '_content.contentID',
          isVisible: false,
          ormtype: 'id',
          isSearchable: true
        }, {
          propertyIdentifier: '_content.site.siteID',
          isVisible: false,
          ormtype: 'id',
          isSearchable: false
        }, {
          propertyIdentifier: '_content.allowPurchaseFlag',
          isVisible: true,
          ormtype: 'boolean',
          isSearchable: false
        }, {
          propertyIdentifier: '_content.productListingPageFlag',
          isVisible: true,
          ormtype: 'boolean',
          isSearchable: false
        }, {
          propertyIdentifier: '_content.activeFlag',
          isVisible: true,
          ormtype: 'boolean',
          isSearchable: false
        }];
        var options = {
          currentPage: scope.currentPage,
          pageShow: paginationService.getPageShow(),
          keywords: scope.keywords
        };
        var column = {};
        if (!isSearching || scope.keywords === '') {
          var filterGroupsConfig = [{"filterGroup": [{
              "propertyIdentifier": "_content.parentContent",
              "comparisonOperator": "is",
              "value": 'null'
            }]}];
          column = {
            propertyIdentifier: '_content.title',
            isVisible: true,
            ormtype: 'string',
            isSearchable: true
          };
          columnsConfig.unshift(column);
        } else {
          var filterGroupsConfig = [{"filterGroup": [{
              "propertyIdentifier": "_content.excludeFromSearch",
              "comparisonOperator": "!=",
              "value": true
            }]}];
          column = {
            propertyIdentifier: '_content.title',
            isVisible: false,
            ormtype: 'string',
            isSearchable: true
          };
          columnsConfig.unshift(column);
          var titlePathColumn = {
            propertyIdentifier: '_content.titlePath',
            isVisible: true,
            ormtype: 'string',
            isSearchable: false
          };
          columnsConfig.unshift(titlePathColumn);
        }
        if (angular.isDefined(scope.selectedSite)) {
          var selectedSiteFilter = {
            logicalOperator: "AND",
            propertyIdentifier: "_content.site.siteID",
            comparisonOperator: "=",
            value: scope.selectedSite.siteID
          };
          filterGroupsConfig[0].filterGroup.push(selectedSiteFilter);
        }
        if (angular.isDefined(scope.orderBy)) {
          var orderByConfig = [];
          orderByConfig.push(scope.orderBy);
          options.orderByConfig = angular.toJson(orderByConfig);
        }
        options.filterGroupsConfig = angular.toJson(filterGroupsConfig);
        options.columnsConfig = angular.toJson(columnsConfig);
        var collectionListingPromise = $slatwall.getEntity(scope.entityName, options);
        collectionListingPromise.then(function(value) {
          scope.collection = value;
          scope.collectionConfig = angular.fromJson(scope.collection.collectionConfig);
          scope.collectionConfig.columns = columnsConfig;
          scope.collection.collectionConfig = scope.collectionConfig;
          scope.firstLoad = true;
          scope.loadingCollection = false;
        });
      };
      scope.keywords = "";
      scope.loadingCollection = false;
      var searchPromise;
      scope.searchCollection = function() {
        if (searchPromise) {
          $timeout.cancel(searchPromise);
        }
        searchPromise = $timeout(function() {
          $log.debug('search with keywords');
          $log.debug(scope.keywords);
          $('.childNode').remove();
          paginationService.setCurrentPage(1);
          scope.loadingCollection = true;
          scope.getCollection(true);
        }, 500);
      };
      var siteChanged = function(selectedSiteOption) {
        scope.selectedSite = selectedSiteOption;
        scope.getCollection();
      };
      observerService.attach(siteChanged, 'optionsChanged', 'siteOptions');
      var sortChanged = function(orderBy) {
        scope.orderBy = orderBy;
        scope.getCollection();
      };
      observerService.attach(sortChanged, 'sortByColumn', 'siteSorting');
      var optionsLoaded = function() {
        observerService.notify('selectFirstOption');
      };
      observerService.attach(optionsLoaded, 'optionsLoaded', 'siteOptionsLoaded');
      scope.$on('$destroy', function handler() {
        observerService.detachByEvent('optionsChanged');
        observerService.detachByEvent('sortByColumn');
      });
    }
  };
}]);

//# sourceMappingURL=../../directives/content/swcontentlist.js.map