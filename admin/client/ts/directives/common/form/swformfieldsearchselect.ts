angular.module('slatwalladmin')
.directive('swFormFieldSearchSelect', [
'$http',
'$log',
'$slatwall',
'formService',
'partialsPath',
	function(
	$http,
	$log,
	$slatwall,
	formService,
	partialsPath
	){
		return{
			templateUrl:partialsPath+'formfields/search-select.html',
			require:"^form",
			restrict: 'E',
			scope:{
				propertyDisplay:"="
			},
			link:function(scope,element,attr,formController){
				
				
				//set up selectionOptions
				scope.selectionOptions = {
					value:[],
					$$adding:false
				};
				//match in matches track by
				//function to set state of adding new item 
				scope.setAdding = function(isAdding){
					scope.isAdding = isAdding;
					scope.showAddBtn = false;
				};
				
				scope.selectedOption = {};
				scope.showAddBtn = false;
				var propertyMetaData = scope.propertyDisplay.object.$$getMetaData(scope.propertyDisplay.property);
				//create basic 
				var object = $slatwall.newEntity(propertyMetaData.cfc);
				
//				scope.propertyDisplay.template = '';
//				//check for a template
//				//rules are tiered: check if an override is specified at scope.template, check if the cfc name .html exists, use
//				var templatePath = partialsPath + 'formfields/searchselecttemplates/';
//				if(angular.isUndefined(scope.propertyDisplay.template)){
//					var templatePromise = $http.get(templatePath+propertyMetaData.cfcProperCase+'.html',function(){
//						$log.debug('template');
//						scope.propertyDisplay.template = templatePath+propertyMetaData.cfcProperCase+'.html';
//					},function(){
//						scope.propertyDisplay.template = templatePath+'index.html';
//						$log.debug('template');
//						$log.debug(scope.propertyDisplay.template);
//					});
//				}
				
				//set up query function for finding related object
				scope.cfcProperCase = propertyMetaData.cfcProperCase;
				scope.selectionOptions.getOptionsByKeyword=function(keyword){
				/*	var filterGroupsConfig = 
                    [  
                        {    
                           "filterGroup":[    
                              {  
                                  propertyIdentifier: "_" + scope.cfcProperCase.toLowerCase()  +"."+  scope.cfcProperCase  + "Name",
                                  comparisonOperator:"like",  
                                  ormtype:"string",  
                                  value : "keyword" 
                              }  
                           ]  
                      }  
                    ];*/
                  var filterGroupsConfig = '['+  
                      ' {  '+
                          '"filterGroup":[  '+
                             '{'+
                                ' "propertyIdentifier":"_'+scope.cfcProperCase.toLowerCase()+'.'+scope.cfcProperCase+'Name",'+
                                ' "comparisonOperator":"like",'+
                                 ' "ormtype":"string",'+
                                ' "value":"%'+keyword+'%"'+
                           '  }'+
                         ' ]'+
                      ' }'+
                    ']'; 
                   var filterGroupsConfigTemp = angular.fromJson(filterGroupsConfig);
                    $log.debug("FilterGroupsConfig");
                    $log.debug(filterGroupsConfigTemp); 
                    if (angular.isDefined(scope.propertyDisplay.filters)){
                        $log.debug("Adding Filter");
                        $log.debug(scope.propertyDisplay.filters);
                        var myFilter = angular.fromJson(scope.propertyDisplay.filters);
                        
                              for (var filter in myFilter){
                                  $log.debug("filter: " + filter);
                                    //Loop through the comma seperated list of filters adding them to the filter group
                                       var filterTemplate = {};
                                       filterTemplate.propertyIdentifier = filter.propertyIdentifier;
                                       filterTemplate.comparisonOperator = filter.comparisonOperator;
                                       filterTemplate.value = filter.value;
                                        $log.debug(filterTemplate);
                                       filterGroupsConfigTemp[0].filterGroup.push(filterTemplate);
                                        
                              } 
                        if (angular.isArray(angular.fromJson(scope.propertyDisplay.filters))){
                            
                        }else if(angular.isObject(angular.fromJson(scope.propertyDisplay.filter))){
                             $log.debug("Object filter: " + filter);
                           var filterTemplate = {};
                               filterTemplate.propertyIdentifier = scope.propertyDisplay.filter.propertyIdentifier;
                               filterTemplate.comparisonOperator = scope.propertyDisplay.filter.comparisonOperator;
                               filterTemplate.value = scope.propertyDisplay.filter.value;
                                $log.debug(filterTemplate);
                               filterGroupsConfigTemp[0].filterGroup.push(filterTemplate);
                                $log.debug(filterGroupsConfig);
                        }
                    }
                    
                    //filterGroupsConfig = angular.toJson(filterGroupConfigTemp, false);
                    
					return $slatwall.getEntity(propertyMetaData.cfc, {filterGroupsConfig:filterGroupsConfig})
					.then(function(value){
						$log.debug('typesByKeyword');
						$log.debug(value);
						scope.selectionOptions.value = value.pageRecords;
						
						var myLength = keyword.length;
						
						if (myLength > 0) {
							scope.showAddBtn = true;
						}else{
							scope.showAddBtn = false;
						}
						return scope.selectionOptions.value;
					});
				};
				var propertyPromise = scope.propertyDisplay.object['$$get'+propertyMetaData.nameCapitalCase]();
				propertyPromise.then(function(data){
					
				});
				
				//set up behavior when selecting an item
				scope.selectItem = function ($item, $model, $label) {
				    scope.$item = $item;
				    scope.$model = $model;
				    scope.$label = $label;
				    scope.showAddBtn = false; //turns off the add btn on select
				    //angular.extend(inflatedObject.data,$item);
				    object.$$init($item);
				    $log.debug('select item');
				    $log.debug(object);
				    scope.propertyDisplay.object['$$set'+propertyMetaData.nameCapitalCase](object);
				};
				
//				if(angular.isUndefined(scope.propertyDipslay.object[scope.propertyDisplay.property])){
//					$log.debug('getmeta');
//					$log.debug(scope.propertyDisplay.object.metaData[scope.propertyDisplay.property]);
//					
//					//scope.propertyDipslay.object['$$get'+]
//				}
//				
//				scope.propertyDisplay.object.data[scope.propertyDisplay.property].$dirty = true;
	        }
		};
	}
]);
	
