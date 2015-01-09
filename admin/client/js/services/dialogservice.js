'use strict';
angular.module('slatwalladmin').factory('dialogService', [
	'partialsPath',
	function(
		partialsPath
	){
		var _pageDialogs = [];
		var _clickOutsideCallbacks = [];
		
		var dialogService = {
			
			addPageDialog: function( name ){
				var newDialog = {
					'path' : partialsPath + name + '.html'
				};
				_pageDialogs.push( newDialog );
			},
			
			removePageDialog: function( index ){
				_pageDialogs.splice(index, 1);
			},
			
			getPageDialogs: function(){
				return _pageDialogs;
			},
			
			runClickOutsideCallbacks: function( event ) {
				for(var index in _clickOutsideCallbacks) {
					if(!jQuery(event.target).closest(jQuery(_clickOutsideCallbacks[index].element)).length) {
						_clickOutsideCallbacks[index].callbackFunction();
					}
				}
			},
			
			addSwClickOutsideCallback: function( element, callbackFunction ) {
				_clickOutsideCallbacks.push({element:element, callbackFunction:callbackFunction});
			},
			
			removeSwClickOutsideCallback: function( element ) {
				for(var clickOutside in _clickOutsideCallbacks){
					if(clickOutside.element === element) {
						// splice here
						console.log('You should have spliced this!');
					}
				}
			}
		};
		
		return dialogService;
	}
]);