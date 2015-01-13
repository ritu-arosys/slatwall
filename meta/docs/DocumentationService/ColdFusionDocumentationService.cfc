/*
Slatwall - An Open Source eCommerce Platform
    Copyright (C) ten24, LLC
	
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
	
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
	
    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
    
    Linking this program statically or dynamically with other modules is
    making a combined work based on this program.  Thus, the terms and
    conditions of the GNU General Public License cover the whole
    combination.
	
    As a special exception, the copyright holders of this program give you
    permission to combine this program with independent modules and your 
    custom code, regardless of the license terms of these independent
    modules, and to copy and distribute the resulting program under terms 
    of your choice, provided that you follow these specific guidelines: 

	- You also meet the terms and conditions of the license of each 
	  independent module 
	- You must not alter the default display of the Slatwall name or logo from  
	  any part of the application 
	- Your custom code must not alter or create any files inside Slatwall, 
	  except in the following directories:
		/integrationServices/

	You may copy and distribute the modified version of this program that meets 
	the above guidelines as a combined work under the terms of GPL for this program, 
	provided that you include the source code of that other code when and as the 
	GNU GPL requires distribution of source code.
    
    If you modify this program, you may extend this exception to your version 
    of the program, but you are not obligated to do so.

Notes:
*/
component extends="BaseDocumentationService" hint="Handles finding and serving ColdFusion Documentation Files .cfc" output="false"
{
	/**
	*  Initializes this service.
	*/
	public any function init( required applicationName  = "", 
	                          required fileExtention    = "",
	                          required projectDirectory = "" )
	{
		super.init( arguments.applicationName, arguments.fileExtention, arguments.projectDirectory );
		return this;
	}
	
	/**
	* This will return all a list of documentation for a file type such as .cfc
	*/
	public struct function getAllDocumentationItems()
	{
		var fList = {}; 
		var cfFileList = findAllColdFusionFiles();
		variables.Files = getDotPathsFromFileListing( cfFileList );
		var allDocumentationList = getDotPathsFromFileListing(variables.Files);
		
		return {list="#allDocumentationList#"};
	}
	
	/**
	* Returns the meta data for an item indexed by name.
	* @return The meta data for the file specified by fileName argument
	* @param name is the dot.path.name of the item to get meta for.
	*/
	
	public any function getDocumentationItemMeta( name="" )
	{
			return findItemsMeta( arguments.name );
	}
	
	/**
	*Helper method to get meta from a cold fusion source file.
	*/
	public any function findItemsMeta( name="" )
	{
			try 
			{
				var meta = getComponentMetaData("#arguments.name#");
				if (!StructIsEmpty(meta)){
					return meta;
				}else{
					return {error="There was an error retrieving the meta content for #arguments.name#."};
				}
			}catch(any e)
			{
				return {error="Unable to find documentation for #arguments.name#."};
			}
	}
	
	/**
	 * Simply returns all files stored in the File[] as dot path
	 */
	
	private any function getDotPathsFromFileListing( fileList )
	{
		var fFile = [];
		fFile = arguments.fileList;
		//Iterate through the fileList and trim and remove and add to master array.
		for(var i = 1; i <= ArrayLen( fFile ); i++)
		{
			fFile[i] = replaceSlashesWithDots(fFile[i]);
			
		    var rightPadding = Len(variables.fileExtention);
			if(right( fFile[i], rightPadding ) == variables.fileExtention)
			{
				var finalName = trimAndRemoveExt(variables.fileExtention, fFile[i]);
				finalName = variables.applicationName & "." & finalName;
				ArrayAppend( variables.AllDocumentationItemsList, finalName );
			}
			
			}
			
				return variables.allDocumentationItemsList;		
	}
	
	/**
	 *@hint Removes the leading '/' and replaces the rest with '.'
	 *@return=Returns the filename as a dot path                         
	 */
	private any function replaceSlashesWithDots( fileName )
	{
		arguments.fileName = replace( arguments.fileName, "/", "" );
		arguments.fileName = replace( arguments.fileName, "/", ".", "all" );
		return arguments.fileName;
	}
	
	/**
	  * @Hint This scan the filesystem for all .cfc files.
	  * @Description Finds all the files starting with root.       
	  * @Return Array listing of all those files as array.         
	  */
	private Array function findAllColdFusionFiles()
	{
		var slatRoot = ExpandPath( "/" );
		var asc = "directory=ASC";
		var name = "*#variables.applicationName#*";
		var rootDirectory = slatRoot;
		var recurse = true;
		var listInfo = "name";
		var filter = asc; 
		return DirectoryList( rootDirectory, recurse, "array", "*.cfc", filter );
	}
	
	/**
	 * Takes a fileName with full path (Dot notation) and grabs the meta data
	 * and pushes it into the AllDocumentationItems.
	 */
	private any function addFileNameToArray( filePath )
	{
		var rightPadding = Len(variables.fileExtention);
			if(right( arguments.filePath, rightPadding ) == variables.fileExtention && find(variables.applicationName, arguments.filePath))
			{
				var finalName = trimAndRemoveExt(variables.fileExtention, arguments.filePath);
				finalName = variables.applicationName & "." & finalName;
				ArrayAppend( variables.AllDocumentationItemsList, finalName );
			}
	}
	
	/**
	 * Helper method trimAndRemoveExt
	 */
	private any function trimAndRemoveExt( ext , filePath) 
	{
		var splitToken = "Slatwall.";//For dev, will remove.
		var finalName = filePath.split( splitToken, 2 );
		var nameExtRemoved = replace( finalName[2], ".cfc", "" );
		//nameExtRemoved = replace( nameExtRemoved, "Slatwall.", "", "all");		
		return nameExtRemoved;
	}
	
	
}