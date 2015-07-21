angular.module('slatwalladmin').controller('jaspersCoolController', [
	'$scope',
	'$log',
	'$slatwall',
	function(
		$scope,
		$log,
		$slatwall	
	){
		$scope.attributes = {
			pageTitle:"Create",
			type:"listing", 
			showCreate:"false",  
			buttonGroups:{ 
				actionCallerDropdown:{
					title:"Create", 
					icon:"plus", 
					dropdownClass:"pull-right", 
					type:"button",
					processCallers:{
						a:{ 
							entity:"product", 
							text:"Content Access",
							confirmText:"Are you sure?",
							disabledText:"", 
							type:"list",
							url:"http://cf11.slatwall",
							class:"adminentitypreprocessproduct"
						},
						b:{  
							entity:"product", 
							text:"Merchandise",
							confirmText:"Are you sure?",
							disabledText:"", 
							type:"list",
							url:"http://cf11.slatwall",
							class:"adminentitypreprocessproduct"
						},
						c:{
							type:"divider"
						},
						d:{ 
							entity:"product", 
							text:"Subscription",
							confirmText:"Are you sure?",
							disabledText:"", 
							type:"list",
							url:"http://cf11.slatwall",
							class:"adminentitypreprocessproduct"
						},
						e:{ 
							entity:"", 
							text:"Event",
							confirmText:"Are you sure?",
							disabledText:"", 
							type:"list",
							url:"http://cf11.slatwall",
							class:"adminentitypreprocessproduct"
						}
					}
				}
			}
		}

	}
]);

angular.module('slatwalladmin').controller('anotherCoolController', [
	'$scope',
	'$log',
	'$slatwall',
	function(
		$scope,
		$log,
		$slatwall	
	){
		$scope.attributes = {
			pageTitle:"A Detail Product View",
			type:"detail", 
			showCreate:"false",  
			back:{
				action:"backaction", 
				type:"button",
				class:"btn btn-default", 
				icon:"arrow-left", 
				text:"Back"
			},
			delete:{ 
				action:"deleteaction", 
				type:"button",
				text:"Delete"
			}, 
			cancel:{ 
				action:"cancelaction",
				type:"button",
				text:"Cancel"
			},
			save:{
				action:"saveaction", 
				type:"button",
				text:"Save",
				class:"btn-success",
				icon:"ok icon-white",
				submit:"true"
			}, 
			buttonGroups:{ 
				actionCallerDropdown:{
					title:"A Detail Product View", 
					icon:"plus", 
					buttonClass:"btn-default",
					dropdownClass:"pull-right", 
					type:"button",
					processCallers:{
						a:{
							action:"admin:entity.preprocessproduct",
							text:"Update Skus"
						}, 
						b:{ 
							action:"admin:entity.preprocessproduct",
							text:"Update Default Image Filenames"
						}, 
						c:{
							type:"divider"
						}, 
						d:{ 
							action:"admin:entity.preprocessproduct",
							text:"Add Option Group"
						}, 
						e:{
							action:"admin:entity.preprocessproduct",
							text:"Add Option"
						}, 
						f:{ 
							action:"admin:entity.preprocessproduct",
							text:"Add Sku"
						},
						g:{ 
							action:"admin:entity.preprocessproduct",
							text:"Add Subscription Sku"
						}, 
						h:{
							action:"admin:entity.createImage", 
							text:"Create Image"
						},
						i:{
							action:"admin:entity.createfile",  
							text:"Create File"
						},
						j:{
							action:"admin:entity.createcomment", 
							text:"Create Comment"
						}
												
					}
				}
			}
		}

	}
]);