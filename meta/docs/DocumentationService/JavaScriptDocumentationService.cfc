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
component extends="BaseDocumentationService" hint="Handles Javascript Documentation Files .js" output="false"
{
	/**
	*  Initializes this service to search for a specific file extension in a specific directory.
	*/
	
	public any function init( required string applicationName  = "", 
	                          required string fileExtention    = "",
	                          required string projectDirectory = "" )
	{
		super.init( arguments.applicationName, arguments.fileExtention, arguments.projectDirectory );
		return this;
	}
	
	/**
	* This will return all a list of documentation for a file type such as .js
	*/
	
	public struct function getAllDocumentationItems()
	{
		var fList = {}; 
		var cfFileList = findAllJavaScriptFiles();
		variables.Files = getDotPathsFromFileListing( cfFileList );
		var last = getDotPathsFromFileListing(variables.Files);
		return {list="#last#"};
	}
	
	/**
	* Returns the meta data for an item indexed by name.
	* @returns The meta data for the file specified by fileName argument
	* @param name is the dot.path.name of the item to get meta for.
	*/
	
	public any function getDocumentationItemMeta( name="" )
	{
		variables.allDocumentationItemsList[1] = arguments.name;
		if(ArrayFind( variables.allDocumentationItemsList, arguments.name ))
		{
			return findItemsMeta( arguments.name );
		}else
		{
			var errorMsg = arguments.name & "::" & variables.allDocumentationItemsList;
			return { error="Documentations list is empty::" & errorMsg};
		}
	}
	
	/**
	*Helper method to get meta from a cold fusion source file.
	*/
	public any function findItemsMeta( name="" )
	{
			try 
			{
				var meta = getJSComponentMetaData("#arguments.name#");
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
		//Iterate through the fileList and trim, remove, and add to master array.
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
	 *@description=Removes the leading '/' and replaces the rest with '.'
	 *@returns=Returns the filename as a dot path                         
	 */
	
	private function replaceSlashesWithDots( fileName )
	{
		arguments.fileName = replace( arguments.fileName, "/", "" );
		arguments.fileName = replace( arguments.fileName, "/", ".", "all" );
		return arguments.fileName;
	}
	
	/**
	  * @description Finds all the files starting with root.       
	  * @returns Array listing of all those files as array.            
	  */
	
	private Array function findAllJavaScripFiles()
	{
		var slatRoot = ExpandPath( "/" );
		var asc = "directory=ASC";
		var name = "*#variables.applicationName#*";
		var rootDirectory = slatRoot;
		var recurse = "true";
		var listInfo = "name";
		var filter = asc; 
		return DirectoryList( rootDirectory, recurse );
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
		var splitToken = "Slatwall.";
		var finalName = filePath.split( splitToken, 2 );
		var nameExtRemoved = replace( finalName[2], ".js", "" );
		return nameExtRemoved;
	}
	/**
	* Parses JS files for meta data.
	*/
	private any function getJSComponentMetaData( required string name="") {
		//Get a list of js files.
		var files = [];
		var comments = [];
		var files = [];
		var tags = [];
		var RE_DOC_COMMENT = "\/\*\*([^\*]|\*(?!\/))*?@.*?\*\/";
		var RE_TAG_COMMENT = "";
		var annots = variables.annotations;
		
		//Hardcoded path just for dev, will use variables.projectPath
		files = DirectoryList( "/Users/ianhickey/Sites/Slatwall", true, "array", "*.js", "asd");//FindAllJavaScriptFiles();
		//Make sure we found files.
    	for(var i = 1; i <= ArrayLen( files ); i++)
    	{
    		var oFile = FileRead( files[i] );
    		matchArray = REFindMatches( RE_DOC_COMMENT, oFile);
    		if (ArrayLen(matchArray)){
    		//ArrayAppend(comments, {file="#files[i]#"});
    		ArrayAppend(comments, matchArray);
    		}
    	}
    	//Iterate through comments and extract all tags (IE name, param, return, etc);
    	for (var c=1; c <= ArrayLen( comments ); c++)
    	{
    		var comment = comments[c];
    		matchArray = REFindMatches(RE_TAG_COMMENT, comment);
    		if (ArrayLen(matchArray)){
    		//ArrayAppend(comments, {file="#files[i]#"});
    		ArrayAppend(comments, matchArray);
    		}
    	}
    	
		return {comments="#comments#"};
	}
	/**
	*Helper method for finding and grabbing all regex matches in this case, javadoc comments.
	*/
	private array function reFindMatches(required string regex, required string str) {
    var start = 1;
    var result = [];
    var matches = [];
    var match = '';
    do {
        matches = ReFind(arguments.regex, arguments.str, start, true);
        if ( matches.pos[1] ) {
            match = matches.len[1] ? Mid(arguments.str, matches.pos[1], matches.len[1]) : '';
            ArrayAppend(result, match);
            start = matches.pos[1] + matches.len[1];
        }
    } while(matches.pos[1]);
        return result;
	}
	
	/**
	*Helper function for finding annotations inside of comments.
	*/
	private array function reFindAnnots()
	{
		//stub
	}
	
	
	
}