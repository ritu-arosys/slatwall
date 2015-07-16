<article> 
	<header> 
		<h1>MASTER-FULL DIRECTIVES</h1>
	</header>
	

	<!--- 
		<hb:HibachiEntityActionBarButtonGroup>
			<hb:HibachiActionCallerDropdown title="#$.slatwall.rbKey('define.create')#" icon="plus" dropdownClass="pull-right">
				<li><a ng-click="openPageDialog( 'productbundle/createproductbundle' )">#rc.$.slatwall.rbKey('define.bundleProduct')#</a></li>
				<hb:HibachiProcessCaller action="admin:entity.preprocessproduct" entity="product" processContext="create" text="#rc.$.slatwall.rbKey('define.contentAccess')# #rc.$.slatwall.rbKey('entity.product')#" querystring="baseProductType=contentAccess" disabled="#!$.slatwall.getSmartList("Content").getRecordsCount()#" disabledText="#$.slatwall.rbKey('admin.entity.listproduct.createNoContent')#" type="list" />
				<hb:HibachiProcessCaller action="admin:entity.preprocessproduct" entity="product" processContext="create" text="#rc.$.slatwall.rbKey('define.event')# #rc.$.slatwall.rbKey('entity.product')#" querystring="baseProductType=event" type="list" />
				<hb:HibachiProcessCaller action="admin:entity.preprocessproduct" entity="product" processContext="create" text="#rc.$.slatwall.rbKey('define.merchandise')# #rc.$.slatwall.rbKey('entity.product')#" querystring="baseProductType=merchandise" type="list" />
				<hb:HibachiProcessCaller action="admin:entity.preprocessproduct" entity="product" processContext="create" text="#rc.$.slatwall.rbKey('define.subscription')# #rc.$.slatwall.rbKey('entity.product')#" querystring="baseProductType=subscription" type="list" disabled="#!$.slatwall.getSmartList("SubscriptionTerm").getRecordsCount() or !$.slatwall.getSmartList("SubscriptionBenefit").getRecordsCount()#"  disabledText="#$.slatwall.rbKey('admin.entity.listproduct.createNoSubscriptionBenefitOrTerm')#" />
			</hb:HibachiActionCallerDropdown>
		</hb:HibachiEntityActionBarButtonGroup>
	</hb:HibachiEntityActionBar>
	 ---> 
	 
	<div ng-controller="jaspersCoolController">
		<sw-entity-action-bar attributes="attributes"></sw-entity-action-bar>
	</div>

</article>