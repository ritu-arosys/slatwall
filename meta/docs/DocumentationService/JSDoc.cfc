
/**
* jsDoc is a port of jsDoc from javascript to coldfusion. It parses jsDoc comments.
* @name jsDoc
* @usage Takes a file text as a string and returns the parsed comments as a JSON object Tree.
* @link https://code.google.com/p/jsdoc-toolkit/wiki/TagReference
*/
component  hint="JSDoc is a port of jsDoc from javascript to coldfusion" output="false"
{
	var functionDocArray = [];
	var inputDirName = "";
	var indexFileArray = [];
	var indexFile = "";
	var indexFileName = "index_files";
	var indexFunctionArray = [];
	var indexFunction = "";
	var indexFunctionName = "index_functions";
	var FileList = [];
	var DirList = [];
	var outputdir = null;
	var debug = 0;
	
	//All jsDoc regular expressions.
	var RE_COMMENT_ANNOTS = "\/\*\*([^\*]|\*(?!\/))*?@.*?\*\/";
	var RE_COMMENT_START  = "\/\*\*(.*)";
	var RE_COMMENT_END	  = "(.*)\*\/";
	var RE_COMMENT_REPLACE= "@(\w+)\s+([^@]*";
	var RE_FUNCTION = "^\s*function\s+((\w+)|(\w+)(\s+))\(([^)]*)\)";
	var RE_METHOD_BOUND_PROTOTYPE = "^\s*(\w*)\.prototype\.(\w*)\s*=\s*function\s*\(([^)]*)\)";
	var RE_TAGS = "/@(\w+)\s+([^@]*";
	var RE_ANNOTS_REPLACE = "(\w+)\s+(.*)";
	
	
	/**
	*When function is found in a file, this proceses it.
	*/
	public any function processFunction(name, args, comment) {
		
	}
	
	/**
	*When a function prototype is found, this processes it.
	*/
	public any function processPrototypeMethod(proto, name, args, comment) {
		
	}
	
	/**
	*When a comment is found this parses the tags from the comment.
	*/
	public any function processComment(comment,firstLine,fname) {
		
	}
	
	/**
	*This is the main parser that calls the other methods.
	*/
	public any function processJSFile(filename,inputdir){
		//Hardcoded path just for dev, will use variables.projectPath
		files = DirectoryList( "/Users/ianhickey/Sites/Slatwall", 
				true, 
				"array", 
				"*.js", 
				"asd");	//FindAllJavaScriptFiles();
		//Make sure we found files.
    	for(var i = 1; i <= ArrayLen( files ); i++)
    	{
    		var oFile = FileRead( files[i] );
    		matchArray = REFindMatches( RE_DOC_COMMENT, oFile);
    		if (ArrayLen(matchArray)){
        		ArrayAppend(comments, matchArray);
    		}
    	}
    	//Now that we have all comments in comment array, extract all tags.
    	processComment(comments);
    	
		
	}
	
	/**
	*Helper method for finding and grabbing all regex matches in this case, javadoc comments.
	*/
	private array function reFindMatches(required string regex, required string str) {
    var start   = 1;
    var result  = [];
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
	

}