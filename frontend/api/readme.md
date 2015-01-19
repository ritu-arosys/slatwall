##The SlatwallScope

###Overview

One of the most important objects to understand, especially for frontend development, is the SlatwallScope. It operates as the primary progromatical interface for getting information both in and out of Slatwall. The SlatwallScope is created on every request and stored in request.slatwallScope, however by convention a reference to this will be stored in every template as $.slatwall.

###Request Objects

The SlatwallScope contains all of the contextual information for that page request including all of the current request objects like the session, account, and cart. In addition when you are on specific "detail" pages the slatwall will also contain those request objects like the product, productType or brand. The convention for accessing these objects is very simple, and follows the following example syntax:

| Method                                    | Description                                                                                                                                                                             |
|-------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| $.slatwall.getAccount()                   | Returns the current account object.                                                                                                                                                     |
| $.slatwall.account()                      | Shorthand for returning the current account object, the result is the exact same as above.                                                                                              |
| $.slatwall.account( 'firstName' )         | Shorthand for returning a specific property of the object, this is the exact same as doing $.slatwall.getAccount().getFirstName().                                                      |
| $.slatwall.account( 'firstName', 'John' ) | Shorthand for setting a specific property of the object which can then later be persisted to the database. This is the exact same as doing $.slatwall.getAccount().setFirstName('John') |

The request objects that get set in the SlatwallScope are:
     
        $.slatwall.getAccount()
        $.slatwall.getBrand()
        $.slatwall.getCart()
        $.slatwall.getProduct()
        $.slatwall.getProductList()
        $.slatwall.getProductType()
        $.slatwall.getSession()

###Request Helpers

In addtion to the request objects there are some helper methods that will get you some quick insights about the request

Method	Return Type	Description
$.slatwall.getLoggedInFlag()	Boolean	Returns true / false if the current request is a logged in account. If it isn't then $.slatwall.getAccount() will just return a new account object that has not been persisted to the database.
$.slatwall.getLoggedInAsAdminFlag()	Boolean	Similar to the method above, but returns true / false if the current account that is logged in belongs to any of the admin permission groups.
Custom Request Values
The SlatwallScope also has the ability to store custom request values directly inside of it. This can be very useful for setting custom values, and then calling them back up somewhere else in the request.

Method	Arguments	Return Type	Description
$.slatwall.hasValue( key )	key (string)	Boolean	Returns true / false if a value has been set for that key.
$.slatwall.getValue( key )	key (string)	Any	Returns the value of a key that was set.
$.slatwall.setValue( key, value )	key (string)
value (any)	Void	Shorthand for returning a specific property of the object, this is the exact same as doing $.slatwall.getAccount().getFirstName().
General Entity Access
All of the objects that have been described above like account, cart, ect are actually a specific type of object called an "Entity". Entities are just objects that get saved to the database. However there are a lot more entities in the Slatwall database that you may want to read, update, delete and save. Again the SlatwallScope provides a consistent API for working with all of the entities. The easiest way to know what entities are available as well as their properties is just to open the /Slatwall/model/entity directory.

Method	Arguments	Return Type	Description
$.slatwall.newEntity( entityName )	entityName (string)	Object	Returns a new entity that when saved will turn into a single row in the database. For example you could call: $.slatwall.newEntity( 'Product' )
$.slatwall.getEntity( entityName, entityID, [returnNewOnNotFoundFlag] )	entityName (string)
entityID (string)
returnNewOnNotFoundFlag (boolean)	Object || Null	Loads an entity by it's ID property. If the ID is not found in the database, and returnNewWhenNotFoundFlag is true then you will get the same result as newEntity(). For example you could call: $.slatwall.getEntity( 'Product', '22d919cefca3bafd8c6f35d792287683', true)
$.slatwall.saveEntity( entity, [data] )	entity (object)
data (struct)	Object	Calling this method will persist the object to the database so that it is saved as long as it passes 'save' context validation. The data argument will allow a structure of property values to be populated into the entity before saving. For example you could call: $.slatwall.saveEntity( $.slatwall.newEntity('brand'), {brandName="Nike", brandWebsite="http://www.nike.com"} ) Keep in mind, that because Slatwall runs on a persistent ORM framework, and you make changes to an existing entity that was pulled out of the database those changes will be saved even WITHOUT calling saveEntity(), however calling saveEntity() will ensure that it passes validation.
$.slatwall.getEntity( entityName, entityID, [returnNewOnNotFoundFlag] )	entityName (string)	Boolean	This will delete the entity from the database so long as it passes 'delete' context validation. It will return true / false based on if the object passed validation.
$.slatwall.getSmartList( entityName, [data] )	entityName (string)
data (struct)	Object	This will return a SmartList of all of a specific type of entity. The data argument allows you to pass in specific values for filtering, sorting, paging, ranges & searching. For example you can call $.slawall.getSmartList('product', {orderBy="productName"}).
