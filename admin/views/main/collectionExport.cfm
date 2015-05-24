<!--- Make sure that only a super user can export a report --->
<cfset isSuperUser =  $.slatwall.getAccount().getSuperUserFlag() />
<cfif isSuperUser EQ "YES">
	<cfset collectionsExport("#rc#") />
</cfif>
<cfscript>
/**
 * @description CollectionsExport Takes a collection ID and list of collection column names and returns a csv file.
 * @param rc struct required
 * @param rc.data The current Date
 * @param rc.downloadReport When st to 1, the report export is active
 * @param rc.collectionExport Filename is the name of the exported file
 * @param rc.collectionExportID The collection to exports ID
 * @param rc.collectionExportKeywords The column names that need to be populated.
 */
public void function collectionsExport(required struct rc) {

		param name="rc.date" default="#dateFormat(now(), 'mm/dd/yyyy')#";
		param name="rc.downloadReport" default="0" type="boolean";
		param name="rc.collectionExportFileName" default="" type="string";    	//<--The fileName of the report to export.
		param name="rc.collectionExportID" default="" type="string"; 					//<--The collection to export ID
		param name="rc.collectionExportKeywords" default="" type="string"; 		//<--The collection columns to export names (headers)
		param name="rc.collectionColumnsToExport" default="" type="string"; 		//<--The collection columns to export
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
				var arrayOfStruct = [];
				var columnNamesArray = [];
				var columnsToIncludeInExport = rc.collectionColumnsToExport;
				writeDump("#columnsToIncludeInExport#");
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
									//Clean the undefined out of each column and add to our columnNames:Value lists but only if the column was exportable.
									if (currentCount <= numberOfColumns){
										var value = hibachiService.nullReplace("#column#", "");
										
										//Make sure we actually need to list this 
										if (ListFind(columnsToIncludeInExport, value)){
											columnNames &= ",#value#";//We only add if this is in our list of exportable columns.
											
										}//<--end adding colukn
									}//<--end check column count	
								}//<--end columns
							}//<--end records 
						}//<--end number of rows
					}//<--end id verification
				}//<--end clean all record values
				//<<Now we have a valid cleaned (no undefined fields) arrayOfStructs that contains our records.>>
				
				/* Handle the columns to include in the query. */
				var columnsToInclude = "";
				//numberOfColumns= ArrayLen(columnNamesArray);
				if (Left(columnNames, 1) == ","){
					columnsToInclude = RemoveChars(columnNames, 1, 1);
				}else{
					columnsToInclude = columnNames;
				}
				/* Handle the column names to label those columns with. */
				if (Len(columnsToInclude)){
					if (Right(columnsToIncludeInExport, 1) == ","){
							columnNamesList = RemoveChars(columnsToIncludeInExport, 1, 1);
						}else{
							columnNamesList = columnsToIncludeInExport;
					}
				}else{
					columnsNameList = columnsToInclude;
				}
				//Make sure we have a populated array
				if ( !isNull(arrayOfStruct) ){
					hibachiService.export( arrayOfStruct, columnsToInclude, columnsToInclude, "ExportCollection", "csv" );
				}
			}
		}	
	}
</cfscript>