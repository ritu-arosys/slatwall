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
							action:"admin:entity.preprocessproduct", 
							entity:"product", 
							processContext:"create", 
							text:"Content Access",
							icon:"plus",
							queryString:"baseProductType=contentAccess",
							confirmText:"Are you sure?",
							disabled:false,
							disabledText:"", 
							type:"button",
							url:"http://cf11.slatwall",
							class:"adminentitypreprocessproduct"
						},
						b:{ 
							action:"admin:entity.preprocessproduct", 
							entity:"product", 
							processContext:"create", 
							text:"Merchandise",
							icon:"plus",
							queryString:"baseProductType=contentAccess",
							confirmText:"Are you sure?",
							disabled:false,
							disabledText:"", 
							type:"list",
							url:"http://cf11.slatwall",
							class:"adminentitypreprocessproduct"
						},
						c:{
							type:"divider"
						},
						d:{ 
							action:"admin:entity.preprocessproduct", 
							entity:"product", 
							processContext:"create", 
							text:"Subscription",
							icon:"plus",
							queryString:"baseProductType=contentAccess",
							confirmText:"Are you sure?",
							disabled:false,
							disabledText:"", 
							type:"list",
							url:"http://cf11.slatwall",
							class:"adminentitypreprocessproduct"
						},
						e:{ 
							action:"admin:entity.preprocessproduct", 
							entity:"product", 
							processContext:"create", 
							text:"Event",
							icon:"plus",
							queryString:"baseProductType=contentAccess",
							confirmText:"Are you sure?",
							disabled:false,
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
				queryString:"backquerystring",
				type:"button",
				class:"btn btn-default", 
				icon:"arrow-left", 
				text:"Back"
			},
			delete:{ 
				action:"deleteaction",
				querystring:"query", 
				type:"button",
				text:"delete",
				class:"btn-default s-remove",
				icon:"trash icon-white"
			}, 
			cancel:{ 
				action:"cancelaction",
				querystring:"query", 
				type:"button",
				text:"cancel",
				class:"btn-default s-remove",
				icon:"remove icon-white"
			},
			save:{
				action:"saveaction",
				querystring:"query", 
				type:"button",
				text:"save",
				class:"btn-success s-remove",
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
							processContext:"updateSkus",
							type:"list", 
							text:"Update Skus", 
							modal:"true" 
						}, 
						b:{ 
							action:"admin:entity.preprocessproduct",
							processContext:"updateDefaultImageFileNames",
							type:"list", 
							text:"Update Default Image Filenames",
							modal:"true"
						}, 
						c:{
							type:"divider"
						}, 
						d:{ 
							action:"admin:entity.preprocessproduct",
							processContext:"addOptionGroup",
							type:"list", 
							text:"Add Option Group",
							modal:"true"
						}, 
						e:{
							action:"admin:entity.preprocessproduct",
							processContext:"addOption",
							type:"list", 
							text:"Add Option",
							modal:"true"
						}, 
						f:{ 
							action:"admin:entity.preprocessproduct",
							processContext:"addSku",
							type:"list", 
							text:"Add Sku",
							modal:"true"
						},
						g:{ 
							action:"admin:entity.preprocessproduct",
							processContext:"addSubscriptionSku",
							type:"list", 
							text:"Add Subscription Sku",
							modal:"true"
						}, 
						h:{
							action:"admin:entity.createImage", 
							querystring:"somequery", 
							type:"list", 
							text:"Create Image",
							modal:"true"
						},
						i:{
							action:"admin:entity.createfile", 
							querystring:"somequery", 
							type:"list", 
							text:"Create File",
							modal:"true"
						},
						j:{
							action:"admin:entity.createcomment", 
							querystring:"somequery", 
							type:"list", 
							text:"Create Comment",
							modal:"true"
						}
												
					}
				}
			}
		}

	}
]);