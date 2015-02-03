<cfcomponent output="false" accessors="true" extends="HibachiObject">
	<cfproperty name="applicationKey" type="string" />
	<cfproperty name="hibachiAuditService" type="any" />
	
	<cfscript>
		/**
		* HibachiDAO Handles all of the data access objects.
		*@module Hibachi
		*@class HibachiDAO
		*/
		
		/**
		Get is a entity helper method for retreiving entities by entity name.
		@method get
		@param entityname {string}
		@param idOrFilter {any}
		@param isReturnNewOnNotFound {boolean}
		@return entity
		*/
		public any function get( required string entityName, required any idOrFilter, boolean isReturnNewOnNotFound = false ) {
			// Adds the Applicatoin Prefix to the entityName when needed.
			if(left(arguments.entityName, len(getApplicationKey()) ) != getApplicationKey()) {
				arguments.entityName = "#getApplicationKey()##arguments.entityName#";
			}
			
			if ( isSimpleValue( idOrFilter ) && len( idOrFilter ) ) {
				var entity = entityLoadByPK( entityName, idOrFilter );
			} else if ( isStruct( idOrFilter ) ){
				var entity = entityLoad( entityName, idOrFilter, true );
			}
			
			if ( !isNull( entity ) ) {
				return entity;
			}
	
			if ( isReturnNewOnNotFound ) {
				return new( entityName );
			}
		}
	
		/**
		List of entities
		@method list
		@param entityname {string}
		@param filterCriteria {struct}
		@param sortOrder {string}
		@param options {struct}
		@return entity
		*/
		public any function list( string entityName, struct filterCriteria = {}, string sortOrder = '', struct options = {} ) {
			// Adds the Applicatoin Prefix to the entityName when needed.
			if(left(arguments.entityName, len(getApplicationKey()) ) != getApplicationKey()) {
				arguments.entityName = "#getApplicationKey()##arguments.entityName#";
			}
			
			return entityLoad( entityName, filterCriteria, sortOrder, options );
		}
	
		/**
		Returns a new entity by entity name
		@method new
		@param entityname {string}
		@return entity
		*/
		public any function new( required string entityName ) {
			// Adds the Applicatoin Prefix to the entityName when needed.
			if(left(arguments.entityName, len(getApplicationKey()) ) != getApplicationKey()) {
				arguments.entityName = "#getApplicationKey()##arguments.entityName#";
			}
			
			return entityNew( entityName );
		}
	
		/**
		Save an entity
		@method save
		@param target {required}
		@return target
		*/
		public any function save( required target ) {
			
			// Save this entity
			entitySave( target );
			
			// Digg Deeper into any populatedSubProperties and save those as well.
			if(!isNull(target.getPopulatedSubProperties())) {
				for(var p in target.getPopulatedSubProperties()) {
            		if(isArray(target.getPopulatedSubProperties()[p])) {
            			for(var e=1; e<=arrayLen(target.getPopulatedSubProperties()[p]); e++) {
            				this.save(target=target.getPopulatedSubProperties()[p][e]);	
            			}
            		} else {
            			this.save(target=target.getPopulatedSubProperties()[p]);
            		}
            	}
            }
			
			return target;
		}
		/**
		Delete an entity
		@method delete
		@param target {required}
		@return void
		*/
		public void function delete(required target) {
			if(isArray(target)) {
				for(var object in target) {
					delete(object);
				}
			} else {
				// Log audit only if admin user
				if(!getHibachiScope().getAccount().isNew() && getHibachiScope().getAccount().getAdminAccountFlag() ) {
					getHibachiAuditService().logEntityDelete(target);
				}
				entityDelete(target);	
			}
		}
		/**
		count by entity name
		@method count
		@param entityname {any}
		@return any
		*/
		public any function count(required any entityName) {
			// Adds the Applicatoin Prefix to the entityName when needed.
			if(left(arguments.entityName, len(getApplicationKey()) ) != getApplicationKey()) {
				arguments.entityName = "#getApplicationKey()##arguments.entityName#";
			}
			
			return ormExecuteQuery("SELECT count(*) FROM #arguments.entityName#",true);
		}
		/**
		Reloads an entity
		@method reloadEntity
		@param entity {any}
		@return void
		*/
		public void function reloadEntity(required any entity) {
	    	entityReload(arguments.entity);
	    }
	    /**
		Flushes the ORM session
		@method flushORMSession
		@return void
		*/
	    public void function flushORMSession() {
	    	// Initate the first flush
	    	ormFlush();
	    	
	    	// Loop over the modifiedEntities to call updateCalculatedProperties
	    	for(var entity in getHibachiScope().getModifiedEntities()){
	    		entity.updateCalculatedProperties();
	    	}
	    	
	    	// flush again to persist any changes done during ORM Event handler
			ormFlush();
	    }
	    
	    /**
		Clears the ORM session
		@method clearORMSession
		@return void
		*/
	    public void function clearORMSession() {
	    	ormClearSession();
	    }
	    
	    /**
	    Returns a smartlist by entityName and data
		@method getSmartList
		@param entityName {string}
		@param data {struct}
		@return smartlist
		*/
	    public any function getSmartList(required string entityName, struct data={}){
			// Adds the Applicatoin Prefix to the entityName when needed.
			if(left(arguments.entityName, len(getApplicationKey()) ) != getApplicationKey()) {
				arguments.entityName = "#getApplicationKey()##arguments.entityName#";
			}
			
			var smartList = getTransient("hibachiSmartList").setup(argumentCollection=arguments);
	
			return smartList;
		}
		/**
		Returns an export query
		@method getExportQuery
		@param tableName {string}
		@return any
		*/
		public any function getExportQuery(required string tableName) {
			var qry = new query();
			qry.setName("exportQry");
			var result = qry.execute(sql="SELECT * FROM #arguments.tableName#"); 
	    	exportQry = result.getResult(); 
			return exportQry;
		}
		/**
		Returns an Account by the auth token
		@method getAccountByAuthToken
		@param authToken {string}
		@return any
		*/
		public any function getAccountByAuthToken(required string authToken) {
			var account = ormExecuteQuery("SELECT acc FROM SlatwallAccountAuthentication accauth INNER JOIN accauth.account acc WHERE (accauth.expirationDateTime is null or accauth.expirationDateTime > :now) and accauth.authToken is not null and accauth.authToken = :authToken", {now=now(), authToken=arguments.authToken}, true);
			if(isNull(account)) {
				return entityNew("SlatwallAccount");
			}
			return account;
		}
		
		// ===================== START: Private Helper Methods ===========================
		
		// =====================  END: Private Helper Methods ============================
		
	</cfscript>
	
	<!--- hint: This method is for doing validation checks to make sure a property value isn't already in use --->
	<cffunction name="isUniqueProperty">
		<cfargument name="propertyName" required="true" />
		<cfargument name="entity" required="true" />
		
		<cfset var property = arguments.entity.getPropertyMetaData( arguments.propertyName ).name />  
		<cfset var entityName = arguments.entity.getEntityName() />
		<cfset var entityID = arguments.entity.getPrimaryIDValue() />
		<cfset var entityIDproperty = arguments.entity.getPrimaryIDPropertyName() />
		<cfset var propertyValue = arguments.entity.getValueByPropertyIdentifier( arguments.propertyName ) />
		
		<cfset var results = ormExecuteQuery(" from #entityName# e where e.#property# = :propertyValue and e.#entityIDproperty# != :entityID", {propertyValue=propertyValue, entityID=entityID}) />
		
		<cfif arrayLen(results)>
			<cfreturn false />
		</cfif>
		
		<cfreturn true />		
	</cffunction>
	
	<cffunction name="getTableTopSortOrder">
		<cfargument name="tableName" type="string" required="true" />
		<cfargument name="contextIDColumn" type="string" />
		<cfargument name="contextIDValue" type="string" />
		
		<cfset var rs = "" />
		
		<cfquery name="rs">
			SELECT
				COALESCE(max(sortOrder), 0) as topSortOrder
			FROM
				#tableName#
			<cfif structKeyExists(arguments, "contextIDColumn") && structKeyExists(arguments, "contextIDValue")>
				WHERE
					#contextIDColumn# = <cfqueryparam cfsqltype="cf_sql_varchar" value="#arguments.contextIDValue#" />		
			</cfif>
		</cfquery>
		
		<cfreturn rs.topSortOrder />
	</cffunction>

	<cffunction name="updateRecordSortOrder">
		<cfargument name="recordIDColumn" />
		<cfargument name="recordID" />
		<cfargument name="tableName" />
		<cfargument name="newSortOrder" />
		<cfargument name="contextIDColumn" />
		<cfargument name="contextIDValue" />
		
		<cfset var rs = "" />
		<cfset var rs2 = "" />


			<cflock timeout="60" name="updateSortOrder#arguments.tableName#">
				<cftransaction>
					
					<!--- get the current sort order of the dropped row --->
					<cfquery name="rs">
						SELECT sortOrder FROM #arguments.tableName# 
						WHERE #recordIDColumn# = <cfqueryparam cfsqltype="cf_sql_varchar" value="#arguments.recordID#" />
					</cfquery>
					
					<!--- if the dropped row is less than the new sort order increment the current sortorder by one else decrement it by one--->
					<cfif arguments.newSortOrder gt rs.sortOrder> 
						
						<cfquery name="rs">
							UPDATE
								#arguments.tableName#
							SET
								sortOrder = sortOrder - 1
							WHERE
								sortOrder <= <cfqueryparam cfsqltype="cf_sql_integer" value="#arguments.newSortOrder#" />
								AND
									sortOrder > <cfqueryparam cfsqltype="cf_sql_integer" value="#rs.sortOrder#" />
								<cfif structKeyExists(arguments, "contextIDColumn") and len(arguments.contextIDColumn)>
								  AND
									#arguments.contextIDColumn# = <cfqueryparam cfsqltype="cf_sql_varchar" value="#arguments.contextIDValue#" />
								</cfif>
						</cfquery>
					<cfelse>
						<cfquery name="rs">
							UPDATE
								#arguments.tableName#
							SET
								sortOrder = sortOrder + 1
							WHERE
								sortOrder >= <cfqueryparam cfsqltype="cf_sql_integer" value="#arguments.newSortOrder#" />
								AND
									sortOrder < <cfqueryparam cfsqltype="cf_sql_integer" value="#rs.sortOrder#" />
								<cfif structKeyExists(arguments, "contextIDColumn") and len(arguments.contextIDColumn)>
								  AND
									#arguments.contextIDColumn# = <cfqueryparam cfsqltype="cf_sql_varchar" value="#arguments.contextIDValue#" />
								</cfif>
						</cfquery>
					</cfif>
					
					<!--- update the current sort order to the value calculated above --->
					<cfquery name="rs">
						UPDATE
							#arguments.tableName#
						SET
							sortOrder = <cfqueryparam cfsqltype="cf_sql_integer" value="#arguments.newSortOrder#" />
						WHERE
							#recordIDColumn# = <cfqueryparam cfsqltype="cf_sql_varchar" value="#arguments.recordID#" />
					</cfquery>
					
					<!--- get all the newly sorted rows --->
					<cfquery name="rs2">
						SELECT #recordIDColumn#, sortOrder FROM #arguments.tableName# 
						<cfif structKeyExists(arguments, "contextIDColumn") and len(arguments.contextIDColumn)>
							WHERE #arguments.contextIDColumn# = <cfqueryparam cfsqltype="cf_sql_varchar" value="#arguments.contextIDValue#" />
						</cfif>
						ORDER BY sortOrder ASC	
					</cfquery>
					
					
					<cfset var count = 1 />
					<cfset var recordIDCol = "rs2." & recordIDColumn />
					
					<!--- reset the sort order to fill any gaps --->
					<cfloop query="rs2">
						<cfif rs2.sortOrder neq count>
							<cfquery name="rs">
								UPDATE
									#arguments.tableName#
								SET
									sortOrder = <cfqueryparam cfsqltype="cf_sql_integer" value="#count#" />
								WHERE
									#recordIDColumn# = <cfqueryparam cfsqltype="cf_sql_varchar" value="#evaluate(recordIDCol)#" />
							</cfquery>
						</cfif>
						<cfset count++ />
					</cfloop>

				</cftransaction>
			</cflock>
		
	</cffunction>
</cfcomponent>
