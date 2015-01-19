##How-to create documentation

Adding additional to your Slatwall installation is simple. It involves creating a .md (markdown) file using a text editor and placing it anywhere in your directory tree, followed by adding a link to your markdown file.

###Creating a markdown (.md) file.

**Markdown** is a simple text-based formatting language that compiles to regular HTML. The particular flavor of Markdown that Slatwall documentation uses supports not only all markdown syntax, but also Github's particular additions to the markdown language (called GFM).

####Example Usage
The following is an example of a markdown file and the rendered content:

	####This is an h4
	###This is h3
	##This is h2
	#This an h1

	_This is italic._

	**This is my bold text.**

	`This is mono spaced`

	1. Thing One
	2. Thing Two
	    * Sub-thing
	3. Thing Three
	    * Another sub-thing

	>This is a block quote

	~~~
	foo(){
	    //This is a code block.
	}
	~~~

	A table is written like so:

	| Tables   |      Are      |  Cool |
	|----------|:-------------:|------:|
	| col 1 is |  left-aligned | $1600 |
	| col 2 is |    centered   |   $12 |
	| col 3 is | right-aligned |    $1 |


___

>The above markdown will render to the following:

####This is h4
###This is h3
##This is h2
#This an h1

_This is italic._

**This is my bold text.**

`This is mono spaced`

1. Thing One
2. Thing Two
    * Sub-thing
3. Thing Three
    * Another sub-thing

>This is a block quote

~~~
foo(){
    //This is a code block.
}
~~~

A table is written like so:

| Tables   |      Are      |  Cool |
|----------|:-------------:|------:|
| col 1 is |  left-aligned | $1600 |
| col 2 is |    centered   |   $12 |
| col 3 is | right-aligned |    $1 |

**Note** the '|' do not have to line up.
___

For a complete markdown reference, visit the [markdown cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)

In addition to normal markup, GFM reference can be found on [GitHub](https://help.github.com/articles/github-flavored-markdown/).

Once your markdown file is authored, save it to any directory within your Slatwall installation using a file name of your choice with the extension .md

**For example**
If you wanted to add additional documentation to the custom tag portion of your installation, you might create a file named readme.md that resides in the /custom/tags/ directory.
	
	/custom/tags/readme.md	

**Adding a link**
You may add a link to your new documentation file by navigating to /meta/docs/md/slatdocs_navigation.md file and adding a link reference to the top of the page, followed by the actual link under one of the navigation headers.

An example link reference for the above example might look like:

	[My Custom Tags]: #/custom/tags/readme

>Note that it is unnessasary to include a file extension on the link reference, as Slatwall documentation already knows that information.

And finally, add link by calling that link reference under one of the navigation headers:

	####Other
	* [Integration Services]
	* [Tags]
	* [Templates]
	* [Resource Bundles]
	* [Assets]
	* [Tests]
	* [My Custom Tags]

That's it. Your documentation is now part of the core.
