<!--- Make sure that only a super user can export a report --->
<cfset isSuperUser =  $.slatwall.getAccount().getSuperUserFlag() />
<cfif isSuperUser EQ "YES">
	<cfset collectionsExport("#rc#") />
</cfif>
<cfscript>
/**
 * @description CollectionsExport Takes a json representation of a collection or a collection description and returns a csv file.
 * @param rc struct required
 */
public void function collectionsExport(required struct rc) {

		param name="rc.date" default="#dateFormat(now(), 'mm/dd/yyyy')#";
		param name="rc.downloadReport" default="0" type="boolean";
		param name="rc.collectionExportFileName" default="" type="string";    	//<--The fileName of the report to export.
		param name="rc.collectionExportID" default="" type="string"; 					//<--The collection the export ID
		param name="rc.collectionExportKeywords" default="" type="string"; 		//<--The collection the export Keywords
		
		var collection = {};
		/** Iterate over the struct and turn it into a query */
		if(arguments.rc.downloadReport) {
			if ( !isNull(rc.collectionExportID) && len(rc.collectionExportID)){
				//Local variables
				var keywords = rc.collectionExportKeywords;
				var collectionID = rc.collectionExportID;
				var fileName = rc.collectionExportFileName;
				var hibachiService = request.SlatwallScope.getService("HibachiService");
				var result = hibachiService.getSmartList("collection");
					  result.addFilter("collectionID", collectionID);
				var records = result.getRecords();
				var count = 1;
				var outterLen = ArrayLen(records);
				var numberOfRows = 0;
				var numberOfColumns = 0;
				var columnNames = "";
				var myValues = "";
				var arrayOfStruct = [];
				var columnNamesArray = [];
				
				//Push all cleaned records into an array of structs.
				for (rec in records){
					var id = rec.getCollectionID();
					//Make sure we have the correct collection.
					if (id == collectionID){
						var innerRecords = rec.getRecords();
						numberOfRows = ArrayLen(innerRecords);
						if (numberOfRows){
							var currentCount = 0;
							/** Now we have all the records as they are displayed. We should simply allow them to configure the collection and export it. */
							for (var header in innerRecords){
								ArrayAppend(arrayOfStruct, header);
								numberOfColumns = StructCount(header);
								//Clean the undefined fields in the struct so that they don't cause trouble later
								for (var column in header){
									currentCount++;
									//Make sure the value is not undefined
									if (!StructKeyExists(header, "#column#")){
										header["#column#"] = "";
									}

									if (currentCount <= numberOfColumns){
										var value = hibachiService.nullReplace("#column#", "");
										
										columnNames &= ",#value#";
										
									}
									var value = hibachiService.nullReplace(header["#column#"], "");
									myValues &= ",#value#";	
								}//<--end columns
							}//<--end records 
						}//<--end number of rows
					}//<--end id
				}//<--end clean records
				//Now we have a valid arrayOfStructs that contains our records.
				numberOfColumns= ArrayLen(columnNamesArray);
				if (Left(columnNames, 1) == ","){
					columnNamesList = RemoveChars(columnNames, 1, 1);
				}else{
					columnNamesList = columnNames;
				}
				if ( !isNull(arrayOfStruct) ){
					hibachiService.export( arrayOfStruct, columnNamesList, columnNamesList, "ExportCollection", "csv" );
				}
			}
		}	
	}
</cfscript>