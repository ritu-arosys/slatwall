/**
* @name DocumentationWebService                                                     
* @description This will be the primary web service to access the documentation API.
* @info Access to the public methods will be via http GET request only.             
*
*/
component rest="true" restpath="docs"      
{
	this.Files = []; //Holds the list of all files
	this.Directories = []; //Holds the list of all directories
	this.AllDocumentationItemNames = []; //Holds a list of all item names
	this.currentFile = []; //Hold a list of the current js file being parsed
	this.currentDirectory = []; //Holds a list of the current directory being read from.
	
   /*
	*	@author			Developer's name
	*	@constructor	Marks a function as a constructor
	*	@deprecated		Marks a method as deprecated
	*	@exception		Synonym for @throws
	*	@exports		Identifies a member that is exported by the module
	*	@param			Documents a method parameter; a datatype indicator can be added between curly braces
	*	@private		Signifies that a member is private
	*	@returns		Synonym for @return
	*	@see			Documents an association to another object
	*	@this			Specifies the type of the object to which the keyword "this" refers within a function.
	*	@throws			Documents an exception thrown by a method
	*	@version		Provides the version number of a library
	* 	@custom 		Indicates that the component is a custom component in Slatwall specific to the installation
	* 	@ignore			This will ignore 
	*   @link			Indicates a link to more information.
	*/
	this.annotations = 
		{
			author="@author", 
			contructor="@constructor",	
			deprecated="@deprecated",
			exception="@exception",		
			exports="@exports",		
			param="@param",			
			private="@private",		 			
			returns="@returns",		
			see="@see",					
			this="@this",			
			throws="@throws",		
			version="@version",
			custom="@custom",
			ignore="@ignore",
			link="@link"
		};
	
	
	remote any function getDocumentationNames() httpmethod="GET" restpath="list"           
	{
		this.Files = findAllSlatwallComponents();
		this.Files = getDotPathsFromFileListing( this.Files );
		return this.AllDocumentationItemNames;
	}
	
	/**
	*@return any The meta data for the file specified by fileName argument
	*/
	remote any function getDocumentationContent( String fileName ) httpmethod="GET" restpath="content"          
	{
		//Make sure to add a check if the filename exists in our list
		
			//try to get the meta data.
			try 
			{
				var meta = getComponentMetaData("#arguments.fileName#");
				if (!StructIsEmpty(meta)){
					return meta;
				}else{
					writeOutput("The struct was empty");
				}
			}catch(any e)
			{
				writeDump({error="Error:#e#"});
				//yell about the e!
			}	
	}
	

	/**
	 * Simply returns all files stored in the File[] as dot path
	 */
	
	private Array function getDotPathsFromFileListing( Array fileList )
	{
		for(var i = 1; i <= ArrayLen( fileList ); i++)
		{
			fileList[i] = replaceSlashesWithDots( fileList[i] );
			AddFileNameToArray( fileList[i] );
		}
	
		return fileList;
	}
	
	/**
	 *@description=Removes the leading '/' and replaces the rest with '.'
	 *@return=Returns the filename as a dot path                         
	 */
	
	private function replaceSlashesWithDots( fileName )
	{
		arguments.fileName = replace( arguments.fileName, "/", "" );
		arguments.fileName = replace( arguments.fileName, "/", ".", "all" );
		return arguments.fileName;
	}
	
	/**
	  * @Description Finds all the files starting with root.       
	  * @Return Array listing of all those files as array.            
	  *------------------------------------------------------------
	  */
	
	private Array function findAllSlatwallComponents()
	{
		var slatRoot = ExpandPath( "/" );
		var asc = "directory=ASC";
		var rootDirectory = slatRoot;
		var recurse = true;
		var listInfo = "name";
		var filter = asc;
		return DirectoryList( rootDirectory, recurse );
	}
	
	/**
	 * Takes a fileName with full path (Dot notation) and grabs the meta data
	 * and pushes it into the AllDocumentationItems.
	 */
	
	private any function addFileNameToArray( String filePath )
	{

			if(right( filePath, 4 ) == ".cfc")
			{
				var finalName = trimAndRemoveExt(".cfc", filePath);
				ArrayAppend( this.AllDocumentationItemNames, finalName );
			}
			//Need to check and parse js files here.
			if(right( filePath, 3 ) == ".js")
			{
				var finalName = trimAndRemoveExt(".js", filePath);
				parseJSFile(filePath);
			}
	}
	
	/**
	*Parse JS file and add back into the file list
	*
	*/
	private any function parseJSFile(String fileName){
		//stub
	}
	/**
	* Helper method trimAndRemoveExt
	*/
	private any function trimAndRemoveExt( String ext , String filePath) {
		
		var finalName = arguments.filePath.split( "SlatwallDoc.", 2 );
		finalName = replace( finalName[2], arguments.ext, "" );
		return finalName;
	
	}
	/**
	*This will return true if the list has another directory and false if the end is reached
	*/
	private boolean function hasNextDirectory(){
		//stub
	}
	
	/**
	*This will return true if the list has another file and false if the end is reached
	*/
	private boolean function hasNextFile(){
		//stub
	}
	
	/**
	*Parse custom annotations list
	*/
 	private any function parseCustomAnnotations(any a){
		//stub
	}
	
	/**
	*	This will return true on an annotation match, false otherwise.
	*/
	private any function isAnnotation(any a){
		if (StructKeyExists(this.annotations, arguments.a)){
			return true;
		}else{
			return false;
		}
	}
	/**
	*Processes a comment in a file and returns a struct of tags for that file
	*@param The comment to process
	*@param The name of the file where the comment was found
	*/
	private struct function processComment(string comment, string fname){
		var tags = {}; //This will hold all the tags we find.
		//define a regex that can find any of the annotations.
		var regex = "/\*\*([^\*]|\*(?!/))*?@annotationhere.*?\*/";
	}
	
	/**
	* Gets the next comment in a file
	* A comment here is defined as the multiline comment (docs style) found
	* in both coldfusion and javascrip.
	*/
	private string function getComment(string fname){
		
		//define a regex that can find jsdoc style comments.
		var regex = "/\*\*([^\*]|\*(?!/))*?@annotationhere.*?\*/";
		var open  = "/**";
		var close = "*/";
		
	}
	
	/**
	*Search file will return a struct of matched text in a file using passed in regex or plain text.
	*/
	private any function searchFileForText(string fname, string isRegex, string text){
		
	}
	
}
