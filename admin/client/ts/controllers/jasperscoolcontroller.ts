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
			type:"Listing", 
			showCreate:"false",  
			buttonGroups:{ 
				actionCallerDropdown:{
					title:"Create", 
					icon:"plus", 
					dropdownClass:"pull-right", 
					type:"button",
					processCallers:{
						contentAccess:{ 
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
						merchandise:{ 
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
						subscription:{ 
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
						eventProduct:{ 
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