var slatwalladmin;
(function (slatwalladmin) {
    var Column = (function () {
        function Column(propertyIdentifier, title, isVisible, isDeletable, isSearchable, isExportable, attributeID, attributeSetObject) {
            this.propertyIdentifier = propertyIdentifier;
            this.title = title;
            this.isVisible = isVisible;
            this.isDeletable = isDeletable;
            this.isSearchable = isSearchable;
            this.isExportable = isExportable;
            this.attributeID = attributeID;
            this.attributeSetObject = attributeSetObject;
        }
        return Column;
    })();
    var Filter = (function () {
        function Filter(propertyIdentifier, value, comparisonOperator, logicalOperator) {
            this.propertyIdentifier = propertyIdentifier;
            this.value = value;
            this.comparisonOperator = comparisonOperator;
            this.logicalOperator = logicalOperator;
        }
        return Filter;
    })();
    var Join = (function () {
        function Join(associationName, alias) {
            this.associationName = associationName;
            this.alias = alias;
        }
        return Join;
    })();
    var OrderBy = (function () {
        function OrderBy(propertyIdentifier, direction) {
            this.propertyIdentifier = propertyIdentifier;
            this.direction = direction;
        }
        return OrderBy;
    })();
    var CollectionConfig = (function () {
        function CollectionConfig($slatwall, baseEntityName, baseEntityAlias, columns, filterGroups, joins, orderBy, currentPage, pageShow, keywords) {
            if (filterGroups === void 0) { filterGroups = [{ filterGroup: [] }]; }
            if (currentPage === void 0) { currentPage = 1; }
            if (pageShow === void 0) { pageShow = 10; }
            if (keywords === void 0) { keywords = ''; }
            this.$slatwall = $slatwall;
            this.baseEntityName = baseEntityName;
            this.baseEntityAlias = baseEntityAlias;
            this.columns = columns;
            this.filterGroups = filterGroups;
            this.joins = joins;
            this.orderBy = orderBy;
            this.currentPage = currentPage;
            this.pageShow = pageShow;
            this.keywords = keywords;
            if (!angular.isUndefined(this.baseEntityName)) {
                this.collection = this.$slatwall['new' + this.getEntityName()]();
                if (angular.isUndefined(this.baseEntityAlias)) {
                    this.baseEntityAlias = '_' + this.baseEntityName.toLowerCase();
                }
            }
        }
        CollectionConfig.prototype.loadJson = function (jsonCollection) {
            //if json then make a javascript object else use the javascript object
            if (angular.isString(jsonCollection)) {
                jsonCollection = angular.fromJson(jsonCollection);
            }
            this.baseEntityAlias = jsonCollection.baseEntityAlias;
            this.baseEntityName = jsonCollection.baseEntityName;
            this.columns = jsonCollection.columns;
            this.currentPage = jsonCollection.currentPage;
            this.filterGroups = jsonCollection.filterGroups;
            this.joins = jsonCollection.joins;
            this.keywords = jsonCollection.keywords;
            this.orderBy = jsonCollection.orderBy;
            this.pageShow = jsonCollection.pageShow;
        };
        CollectionConfig.prototype.getJson = function () {
            var config = this;
            //delete config['$slatwall'];
            return angular.toJson(config);
        };
        CollectionConfig.prototype.getEntityName = function () {
            return this.baseEntityName.charAt(0).toUpperCase() + this.baseEntityName.slice(1);
        };
        CollectionConfig.prototype.getOptions = function () {
            return {
                columnsConfig: angular.toJson(this.columns),
                filterGroupsConfig: angular.toJson(this.filterGroups),
                joinsConfig: angular.toJson(this.joins),
                currentPage: this.currentPage,
                pageShow: this.pageShow,
                keywords: this.keywords
            };
        };
        CollectionConfig.prototype.debug = function () {
            return this;
        };
        CollectionConfig.prototype.formatCollectionName = function (propertyIdentifier, property) {
            if (property === void 0) { property = true; }
            var collection = '', parts = propertyIdentifier.split('.');
            if (!this.collection)
                this.collection = this.$slatwall['new' + this.getEntityName()]();
            for (var i = 0; i < parts.length; i++) {
                if (typeof this.$slatwall['new' + this.capitalize(parts[i])] !== "function") {
                    if (property)
                        collection += ((i) ? '' : this.baseEntityAlias) + '.' + parts[i];
                    if (!angular.isObject(this.collection.metaData[parts[i]]))
                        break;
                }
                else {
                    collection += '_' + parts[i].toLowerCase();
                }
            }
            return collection;
        };
        CollectionConfig.prototype.addJoin = function (associationName) {
            var joinFound = false, parts = associationName.split('.'), collection = '';
            if (angular.isUndefined(this.joins)) {
                this.joins = [];
            }
            for (var i = 0; i < parts.length; i++) {
                joinFound = false;
                if (typeof this.$slatwall['new' + this.capitalize(parts[i])] !== "function")
                    break;
                collection += '.' + parts[i];
                this.joins.map(function (_join) {
                    if (_join.associationName == collection.slice(1)) {
                        joinFound = true;
                        return;
                    }
                });
                if (!joinFound) {
                    this.joins.push(new Join(collection.slice(1), collection.toLowerCase().replace(/\./g, '_')));
                }
            }
        };
        CollectionConfig.prototype.addAlias = function (propertyIdentifier) {
            var parts = propertyIdentifier.split('.');
            if (parts.length > 1 && parts[0] !== this.baseEntityAlias) {
                return this.baseEntityAlias + '.' + propertyIdentifier;
            }
            return propertyIdentifier;
        };
        CollectionConfig.prototype.capitalize = function (s) {
            return s && s[0].toUpperCase() + s.slice(1);
        };
        CollectionConfig.prototype.addColumn = function (column, title, options) {
            if (title === void 0) { title = ''; }
            if (options === void 0) { options = {}; }
            var isVisible = true, isDeletable = true, isSearchable = true, isExportable = true;
            if (angular.isUndefined(this.columns)) {
                this.columns = [];
            }
            if (!angular.isUndefined(options['isVisible'])) {
                isVisible = options['isVisible'];
            }
            if (!angular.isUndefined(options['isDeletable'])) {
                isDeletable = options['isDeletable'];
            }
            if (!angular.isUndefined(options['isSearchable'])) {
                isSearchable = options['isSearchable'];
            }
            if (!angular.isUndefined(options['isExportable'])) {
                isExportable = options['isExportable'];
            }
            if (angular.isUndefined(options['isExportable']) && !isVisible) {
                isExportable = false;
            }
            this.columns.push(new Column(column, title, isVisible, isDeletable, isSearchable, isExportable, options['attributeID'], options['attributeSetObject']));
        };
        CollectionConfig.prototype.setDisplayProperties = function (propertyIdentifier, title, options) {
            var _this = this;
            if (title === void 0) { title = ''; }
            if (options === void 0) { options = {}; }
            var _DividedColumns = propertyIdentifier.trim().split(',');
            var _DividedTitles = title.trim().split(',');
            if (_DividedColumns.length > 0) {
                _DividedColumns.forEach(function (column, index) {
                    column = column.trim();
                    _this.addJoin(column);
                    if (_DividedTitles[index] !== undefined && _DividedTitles[index] != '') {
                        title = _DividedTitles[index].trim();
                    }
                    else {
                        title = _this.$slatwall.getRBKey("entity." + _this.baseEntityName.toLowerCase() + "." + column.toLowerCase());
                    }
                    _this.addColumn(_this.formatCollectionName(column), title, options);
                });
            }
            else {
                this.addJoin(propertyIdentifier);
                propertyIdentifier = this.addAlias(propertyIdentifier);
                if (title == '')
                    title = this.$slatwall.getRBKey("entity." + this.baseEntityName.toLowerCase() + "." + propertyIdentifier.toLowerCase());
                this.addColumn(this.formatCollectionName(propertyIdentifier), title, options);
            }
        };
        CollectionConfig.prototype.addFilter = function (propertyIdentifier, value, comparisonOperator, logicalOperator) {
            if (comparisonOperator === void 0) { comparisonOperator = '='; }
            this.addJoin(propertyIdentifier);
            if (this.filterGroups[0].filterGroup.length && !logicalOperator)
                logicalOperator = 'AND';
            this.filterGroups[0].filterGroup.push(new Filter(propertyIdentifier, value, comparisonOperator, logicalOperator));
        };
        CollectionConfig.prototype.setOrderBy = function (propertyIdentifier, direction) {
            if (direction === void 0) { direction = 'DESC'; }
            if (angular.isUndefined(this.orderBy)) {
                this.orderBy = [];
            }
            this.addJoin(propertyIdentifier);
            this.orderBy.push(new OrderBy(this.formatCollectionName(propertyIdentifier), direction));
        };
        CollectionConfig.prototype.setCurrentPage = function (pageNumber) {
            this.currentPage = pageNumber;
        };
        CollectionConfig.prototype.setPageShow = function (NumberOfPages) {
            this.pageShow = NumberOfPages;
        };
        CollectionConfig.prototype.setKeywords = function (keyword) {
            this.keywords = keyword;
        };
        return CollectionConfig;
    })();
    slatwalladmin.CollectionConfig = CollectionConfig;
})(slatwalladmin || (slatwalladmin = {}));

//# sourceMappingURL=../model/collectionConfig.js.map