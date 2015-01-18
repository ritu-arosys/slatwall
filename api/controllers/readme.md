##Public API: slatAction

####Overview

**REST API** is a very important because it allows the communication between the front and back ends of Slatwall.

The frontend of your site will pass data back to Slatwall typically by using the frontend action paramater called 'slatAction'. This lets Slatwall know that you would like to trigger some type of action, and it can be passed as either a URL paramater or FORM paramater. For example the 'addToCart' action could either be called as:

        <input type="hidden" name="slatAction" value="public:cart.addOrderItem" />

**Or via a URL paramater as:**

        <a href="?slatAction=public:cart.addOrderItem">Add To Cart</a>
 
**Chaining Together slatAction's**

One of the great features about slatActions is that they are able to be chained together. A common use case for this is to create a new account and then directly after log that account in. An example of a chained actions would look like this:

        <input type="hidden" name="slatAction" value="public:account.create,public:account.login" />
 
**Redirects**

Sometimes after calling an action you will want to redirect the user to a specific url. There are three different paramaters that can be used to facilitate this behavior.

>Warning: Using redirects can sometimes have unintended consequences because as soon as the redirect happens you will lose all server side validation, success & failure information.

**Best Practice:** To avoid loosing the data, whenever possible, it is best to change either the form action you are posting to, or the url that you are getting to be the page that you would like the user to end up on after the action is complete. Because actions are called before any rendering you will then be able to display the results on that new page.

If you do need to use a redirect, then you can use the following paramaters again as either a URL paramater or hidden form field.

**redirectURL**

The url will be redirected to regardless of the outcome from the action that was called.

**sRedirectURL**

The url will only be redirected to if the action was a success. If you have chained multiple actions together it will be redirected to if ALL actions were successful.

**fRedirectURL**
The url will only be redirected to if the action was a failure. If you have chained multiple actions together it will be redirected to if ANY action failed.

**Example as a form:**

        <input type="hidden" name="sRedirectURL" value="http://www.mysite.com/order-confirmation/" />


