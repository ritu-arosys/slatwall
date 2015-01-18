##Connecting Slatwall to a Custom App
If you would like to get Slatwall connected to your larger CFML based application, follow these short, simple steps:

**First: Tell Slatwall about your app**

1. Drop the Slatwall directory somewhere inside of your application.
2. Add the following file to Slatwall:
        /custom/config/configApplication.cfm
3. Then add parent application's name to that file, so that Slatwall and your application share the same application scope (don't worry all of Slatwall is namespaced):
        this.name="myappname";
4. You will probably want to add another line in this file to define your apps datasource (again all table names are namespaced):

        this.datasource.name="mydatasourcename";

**Now tell your app about Slatwall**

1. Inside of your application file, you will need to add a mapping as well as enable ORM, and tell the ORM about the Slatwall entity directories. It should look something like this:
        this.mappings["/Slatwall"] = "fullSystemPathToSlatwall";
        this.ormEnabled = true;
        this.ormSettings.cfclocation = ["/Slatwall/model/entity","/Slatwall/integrationServices"];
        this.ormSettings.dbcreate = "update";
        this.ormSettings.flushAtRequestEnd = false;
        this.ormsettings.eventhandling = true;
        this.ormSettings.automanageSession = false;

Now that the two applications know about each other, you can navigate to the Slatwall directory in your browser to make sure it works. As you can imagine, there are a number of other configurations that can be set for Slatwall, so please review the App Config Files documentation.

**Next, lets setup your app to talk with ours**

The good news is that for both client side & server side, there is a single API to integrate with Slatwall: the "Slatwall Scope." The Slatwall Scope serves two functions: to pull information from Slatwall to process logic on your side, or display to users, and to accept information from the application & users by listening for actions. Set up Slatwall Scope using the steps below.

1. You will want to add the following code to the onRequestStart() or something that runs on every request.

        if (!structKeyExists(application, "slatwallFW1Application")) {
            application.slatwallFW1Application = createObject("component", "Slatwall.Application");
        }
        application.slatwallFW1Application.bootstrap();

2. Now that the setupGlobalRequest() has been called, the SlatwallScope is available via request.slatwallScope to be used to pull any information out of slatwall, or manually call service functions.
3. Next we want to setup the second half of the API that listens for actions from the user. That is done by adding
    
        if(structKeyExists(form, "slatAction")) {
            request.slatwallScope.doAction( form.slatAction );
        } else if (structKeyExists(url, "slatAction")) {
            request.slatwallScope.doAction( url.slatAction );
        }

4. Lastly, we recommend at the top of your application templates you add the following to provide a consistent API on both client side and server side. 
    
        $.slatwall = request.slatwallScope;
        #$.slatwall.renderJSObject()# 

The second line gives you client side access to the entire Slatwall api to pull objects back a JSON, and can be great for running functions like adding items to the cart, or updating you product listings via AJAX.


     
     
 
    
