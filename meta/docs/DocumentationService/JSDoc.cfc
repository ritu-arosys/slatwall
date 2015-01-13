
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
	*Processes a file for jsdoc comments.
	*/
	public any function processFile(f, fname, inputdir, out){
		
	}
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
		
	}
	
	
	

}