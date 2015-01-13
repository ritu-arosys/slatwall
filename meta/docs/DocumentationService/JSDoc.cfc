
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
	var RE_COMMENT_BLOCK = "";
	/**
	*Processes a file for jsdoc comments.
	*/
	function processFile(f, fname, inputdir, out){
		
	}
	
	
	
	

}