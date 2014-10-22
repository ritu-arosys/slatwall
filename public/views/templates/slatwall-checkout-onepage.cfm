<!---

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

    The core of the checkout revolves around a value called the 'orderRequirementsList'
    There are 3 major elements that all need to be in place for an order to be placed:

    account
    fulfillment
    payment

    With that in mind you will want to display different UI elements & forms based on
    if one ore more of those items are in the orderRequirementsList.  In the eample
    below we go in that order listed above, but you could very easily do it in a
    different order if you like.


--->
<cfinclude template="_slatwall-header.cfm" />

<!--- This import allows for the custom tags required by this page to work --->
<cfimport prefix="sw" taglib="../../tags" />

<!---[DEVELOPER NOTES]

    If you would like to customize any of the public tags used by this
    template, the recommended method is to uncomment the below import,
    copy the tag you'd like to customize into the directory defined by
    this import, and then reference with swc:tagname instead of sw:tagname.
    Technically you can define the prefix as whatever you would like and use
    whatever directory you would like but we recommend using this for
    the sake of convention.

    <cfimport prefix="swc" taglib="/Slatwall/custom/public/tags" />

--->

<!--- IMPORTANT: Get the orderRequirementsList to drive your UI Below --->
<cfset orderRequirementsList = $.slatwall.cart().getOrderRequirementsList() />

<!---[DEVELOPER NOTES]

    IMPORTANT: The orderRequirementsList just makes sure that there is an
    account attached to the order, however it does not ensure that the user be
    logged in because we allow by default for "guest checkout".  By leaving in
    the conditionals below it will require that the user is logged in, or that
    they are currently submitting the form as a guest checkout person

--->

<!--- Because we are going to potentially be dynamically adding 'account' back into the orderRequirementsList, we need to make sure that it isn't already part of the list, and that the session account ID's doesn't match the cart account ID --->
<cfif not listFindNoCase(orderRequirementsList, "account") and $.slatwall.cart().getAccount().getAccountID() neq $.slatwall.account().getAccountID()>

    <!--- Add account to the orderRequirements list --->
    <cfset orderRequirementsList = listPrepend(orderRequirementsList, "account") />

    <!--- OPTIONAL: This should be left in if you would like to allow for guest checkout --->
    <cfif $.slatwall.cart().getAccount().getGuestAccountFlag()>

        <!--- OPTIONAL: This condition can be left in if you would like to make it so that a guest checkout is only valid if the page submitted with a slatAction.  This prevents guest checkouts from still being valid if the user navigates away, and then back --->
        <cfif arrayLen($.slatwall.getCalledActions())>
            <cfset orderRequirementsList = listDeleteAt(orderRequirementsList, listFindNoCase(orderRequirementsList, "account")) />
        </cfif>
        <!--- IMPORTANT: If you delete the above contitional so that a guest can move about the site without loosing their checkout data, then you will want to uncomment below --->
        <!--- <cfset orderRequirementsList = listDeleteAt(orderRequirementsList, listFindNoCase(orderRequirementsList, "account")) /> --->

    </cfif>
</cfif>

<!--- IMPORTANT: This is here so that the checkout layout is never cached by the browser --->
<cfheader name="cache-control" value="no-cache, no-store, must-revalidate" />
<cfheader name="cache-control" value="post-check=0, pre-check=0" />
<cfheader name="last-modified" value="#now()#" />
<cfheader name="pragma"  value="no-cache" />

<!--- We are paraming this variable so that we can use it later to see if a specific step was clicked on.  Using the url.step is just a templating thing and it has nothing to do really with the core of Slatwall.  This could be changed to anything --->
<cfparam name="url.step" default="" />

<style media="screen">
    /* ====== Global Color ====== */
    .primary {
      color: #357EBD;
    }
    .success {
      color: #3C763D;
    }
    .s-hide {
        display:none;
    }
    .required {
      color: #DD6565;
      font-size: 6px;
      top: -6px;
    }
    .group {
      margin-bottom: 15px;
    }
    /* ====== Global Class ====== */

    .s-disabled {
        pointer-events:none;
        opacity:.5;
        transition: all 0.2s ease-in-out;
    }
    .s-disabled:after {
        font-family:'fontAwesome';
        content:'\f021';
        position: absolute;
        top: 30px;
        left:50%;
        margin:auto;
        font-size:80px;
        -webkit-animation: fa-spin 2s infinite linear;
        animation: fa-spin 2s infinite linear;
    }
    .zero-right {
      padding-right: 0px;
      margin-right: 0px;
    }
    .zero-left {
      padding-left: 0px;
      margin-left: 0px;
    }
    .zero-padding {
      padding: 0px;
    }
    .zero-margin {
      margin: 0px;
    }
    .dotted-top {
      border-top: 1px dotted #EEE;
    }
    .dotted-bottom {
      border-bottom: 1px dotted #EEE;
    }
    .underline {
      border-bottom: 1px solid #EEE;
      padding-top: 5px;
    }
    /* ===== Body ====== */
    .wrapper {
      margin-top: 30px;
    }
    .checkout-content label {
      font-weight: normal;
      padding-left: 0px;
      padding-right: 0px;
    }
    .totalPrice hr {
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .radio, .checkbox {
        margin-left: 22px;
    }
    .s-forgot-password {
        font-size:12px;
    }
    .checkout-content button {
        width:100%;
    }
    /* ====== Header ====== */
    /* ====== Footer ====== */
    /* ====== Mobile ====== */
    @media (max-width: 991px) {
      .margin-bottom {
        margin-bottom: 20px !important;
      }
      .noPadding {
        padding-left: 0px;
        padding-right: 0px;
      }
      .signInBox {
        padding-left: 0px;
        margin-top: 30px;
      }
    }

</style>



<cfoutput>

    <cfset addressIndex = 0 />
    <cfset resourceSections = [] />
    <cfloop array="#$.slatwall.account().getAccountAddresses()#" index="address">

        <cfset addressIndex++ />
        <cfset accountId = address.getaccountAddressID() />
        <cfset accountAddress = $.slatwall.getEntity('AccountAddress', accountId) />

        <cfset addressData[addressIndex] = {} />
        <cfset addressData[addressIndex].id = accountId />
        <cfset addressData[addressIndex].name = accountAddress.getAddress().getName() />
        <cfset addressData[addressIndex].company = accountAddress.getAddress().getCompany() />
        <cfset addressData[addressIndex].streetAddress = accountAddress.getAddress().getStreetAddress() />
        <cfset addressData[addressIndex].street2Address = accountAddress.getAddress().getStreet2Address() />
        <cfset addressData[addressIndex].city = accountAddress.getAddress().getCity() />
        <cfset addressData[addressIndex].stateCode = accountAddress.getAddress().getStateCode() />
        <cfset addressData[addressIndex].postalCode = accountAddress.getAddress().getPostalCode() />
        <cfset addressData[addressIndex].countryCode = accountAddress.getAddress().getCountry().getCountryCode() />

        <cfset arrayAppend(resourceSections , addressData[addressIndex] ) />

    </cfloop>

    <!--- <cfdump var = "#resourceSections[1]#"> --->




    <!--- START CEHECKOUT EXAMPLE 1 --->
    <div class="row">
        <div class="col-md-12">
            <!--- <p>shipping: <cfdump var = "#$.slatwall.cart().getshippingAddress().getsimpleRepresentation()#" top="3"></p> --->

            <!--- Display any errors associated with actually placing the order, and running those transactions --->
            <sw:ErrorDisplay object="#$.slatwall.cart()#" errorName="runPlaceOrderTransaction" displayType="p" />
        </div>
    </div>

    <!--- ============== Verify that there are items in the cart ========================================= --->
    <cfif arrayLen($.slatwall.cart().getOrderItems())>

        <!-- Main Content -->
        <div class="container wrapper">
            <div class="row">
                <div class="col-md-12">
                    <div class="row">

                        <!-- Left Side Checkout -->
                        <div class="col-md-9 checkout-content" id="j-checkout-content">
                            <div class="well" id="j-login-content-box">

                                <!--- Account Details --->
                                <cfif not listFindNoCase(orderRequirementsList, "account") and not $.slatwall.cart().getAccount().isNew()>
                                    <legend>Account Details <cfif $.slatwall.cart().getAccount().getGuestAccountFlag()><a href="?step=account">edit</a></cfif></legend>

                                    <p>
                                        <!--- Name --->
                                        <strong>#$.slatwall.cart().getAccount().getFullName()#</strong><br />

                                        <!--- Email Address --->
                                        <cfif len($.slatwall.cart().getAccount().getEmailAddress())>#$.slatwall.cart().getAccount().getEmailAddress()#<br /></cfif>

                                        <!--- Phone Number --->
                                        <cfif len($.slatwall.cart().getAccount().getPhoneNumber())>#$.slatwall.cart().getAccount().getPhoneNumber()#<br /></cfif>

                                        <!--- Logout Link --->
                                        <cfif not $.slatwall.cart().getAccount().getGuestAccountFlag()>
                                            <br />
                                            <a href="##" id="j-logout-btn">That isn't me ( Logout )</a>
                                        </cfif>
                                    </p>

                                <cfelse>

                                    <!--- Sets up the account login processObject --->
                                    <cfset accountLoginObj = $.slatwall.getAccount().getProcessObject('login') />

                                    <!-- Account Login -->
                                    <form action="?s=1" method="post" id="j-user-login">

                                        <!--- This hidden input is what tells slatwall to try and login the account --->
                                        <!--- <input type="hidden" name="slatAction" value="public:account.login" /> --->

                                        <div class="col-md-6 signInBox">
                                            <legend>Returning Customer</legend>
                                            <div class="form-group">
                                                <label for="username">Username</label>
                                                <sw:FormField type="text" valueObject="#accountLoginObj#" valueObjectProperty="emailAddress" class="form-control s-required" fieldAttributes=" id='username' required='required'"  />
                                                <p class="help-block"><sw:ErrorDisplay object="#accountLoginObj#" errorName="emailAddress" /></p>
                                            </div>
                                            <div class="form-group">
                                                <label for="password">Passsword</label>
                                                <sw:FormField type="password" valueObject="#accountLoginObj#" valueObjectProperty="password" class="form-control j-accountPassword s-required" fieldAttributes=" id='password' required='required'" />
                                                <p class="help-block"><sw:ErrorDisplay object="#accountLoginObj#" errorName="password" /></p>
                                            </div>
                                            <div class="form-group">
                                                <label>
                                                    <input type="checkbox" value="" id="showPass">
                                                    Hide Password
                                                </label>
                                            </div>
                                            <button type="submit" class="btn btn-primary">Login</button>
                                            <a href="##" id="j-forgot-password-btn" style="text-decoration:underline;font-size:11px;">Forgot Password</a>
                                        </div>
                                    </form>

                                    <!-- Forgot Password -->

                                    <!--- Sets up the account login processObject --->
                                    <cfset forgotPasswordObj = $.slatwall.getAccount().getProcessObject('forgotPassword') />

                                    <form action="?s=1" method="post" id="j-forgot-password" style="display:none;">

                                        <!--- This hidden input is what tells slatwall to try and login the account --->
                                        <input type="hidden" name="slatAction" value="public:account.forgotPassword" />

                                        <div class="col-md-6 signInBox">
                                            <legend>Forgot Password</legend>
                                            <div class="form-group">
                                                <label for="username">Email</label>
                                                <sw:FormField type="text" valueObject="#accountLoginObj#" valueObjectProperty="emailAddress" class="form-control s-required" fieldAttributes=" id='username' required='required'"  />
                                                <p class="help-block"><sw:ErrorDisplay object="#forgotPasswordObj#" errorName="emailAddress" /></p>
                                            </div>
                                            <button type="submit" class="btn btn-primary">Reset Password</button>
                                            <a href="##" id="j-back-login-btn" style="text-decoration:underline;font-size:11px;">Back To Login</a>
                                        </div>
                                    </form>

                                    <!-- New User Login -->

                                    <!--- Sets up the account login processObject --->
                                    <cfset accountLoginObj = $.slatwall.getAccount().getProcessObject('login') />

                                    <!--- Sets up the create account processObject --->
                                    <cfset createAccountObj = $.slatwall.account().getProcessObject('create') />


                                    <!--- Create Account Form --->
                                    <form action="?s=1" method="post" id="j-create-account-form" novalidate>

                                        <!--- This hidden input is what tells slatwall to 'create' an account, it is then chained by the 'login' method so that happens directly after --->
                                        <input type="hidden" name="slatAction" value="public:account.create" />
                                        <!--- <input type="hidden" name="slatAction" value="public:account.login" /> --->

                                        <div class="col-md-6 zero-left">
                                            <legend>
                                                New Customer
                                                <label id="accountToggle" style="font-size:12px;float:right;margin-top: 7px;">
                                                    <input type="checkbox" value="" >
                                                    Checkout as guest
                                                </label>
                                            </legend>
                                            <div class="row">
                                                <div class="col-md-6 form-group">
                                                    <label for="firstName" class="control-label">First Name</label>
                                                    <sw:FormField type="text" valueObject="#createAccountObj#" valueObjectProperty="firstName" class="form-control s-required" fieldAttributes=" id='firstName' required='required'"/>
                                                    <p class="help-block"><sw:ErrorDisplay object="#createAccountObj#" errorName="firstName" /></p>
                                                </div>
                                                <div class="col-md-6 form-group">
                                                    <label for="lastName" class="control-label">Last Name</label>
                                                    <sw:FormField type="text" valueObject="#createAccountObj#" valueObjectProperty="lastName" class="form-control s-required" fieldAttributes=" id='lastName' required='required'" />
                                                    <p class="help-block"><sw:ErrorDisplay object="#createAccountObj#" errorName="lastName" /></p>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="phone" class="control-label">Phone Number</label>
                                                <sw:FormField type="text" valueObject="#createAccountObj#" valueObjectProperty="phoneNumber" class="form-control s-required" fieldAttributes=" id='phoneNumber' required='required'"/>
                                                <p class="help-block"><sw:ErrorDisplay object="#createAccountObj#" errorName="phoneNumber" /></p>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6 form-group">
                                                    <label for="phone" class="control-label">Email</label>
                                                    <sw:FormField type="text" valueObject="#createAccountObj#" valueObjectProperty="emailAddress" class="form-control s-required" fieldAttributes=" id='email' required='required'" />
                                                </div>
                                                <div class="col-md-6 form-group">
                                                    <label for="email" class="control-label">Comfirm Email</label>
                                                    <sw:FormField type="text" valueObject="#createAccountObj#" valueObjectProperty="emailAddressConfirm" class="form-control s-required" fieldAttributes=" id='emailConfirm' required='required'" />
                                                </div>
                                                <div class="col-md-12">
                                                    <p class="help-block"><sw:ErrorDisplay object="#createAccountObj#" errorName="emailAddress" /></p>
                                                    <p class="help-block"><sw:ErrorDisplay object="#createAccountObj#" errorName="emailAddressConfirm" /></p>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6 form-group j-createAccount-hide">
                                                    <label for="password" class="control-label">Password</label>
                                                    <sw:FormField type="password" valueObject="#createAccountObj#" valueObjectProperty="password" class="form-control s-required" fieldAttributes=" id='password' required='required'"/>
                                                    <p class="help-block"><sw:ErrorDisplay object="#createAccountObj#" errorName="password" /></p>
                                                </div>
                                                <div class="col-md-6 form-group j-createAccount-hide">
                                                    <label for="password" class="control-label">Re-Enter Password</label>
                                                    <sw:FormField type="password" valueObject="#createAccountObj#" valueObjectProperty="passwordConfirm" class="form-control s-required" fieldAttributes=" id='passwordConfirm' required='required'" />
                                                    <p class="help-block"><sw:ErrorDisplay object="#createAccountObj#" errorName="password" /></p>
                                                </div>
                                            </div>

                                            <button type="submit" class="btn btn-primary" id="guestCheckoutBtn">Create Account</button>
                                        </div>
                                    </form>

                                </cfif>

                                <div class="clearfix"></div>
                            </div>

                            <!--- Place order form --->
                            <form action="?s=1" method="post" id="full-page-form" novalidate>

                                <!--- Hidden slatAction to trigger a cart update with the new fulfillment information --->
                                <input type="hidden" name="slatAction" value="public:cart.update" />
                                <input type="hidden" name="slatAction" value="public:cart.placeOrder" />

                                <!--- Setup a fulfillment index, so that when the form is submitted all of the data is is compartmentalized --->
                                <cfset orderFulfillmentIndex = 1 />
                                <cfset orderFulfillment = $.slatwall.cart().getOrderFulfillments()[1] />

								<input type="hidden" name="orderFulfillments[#orderFulfillmentIndex#].orderFulfillmentID" value="#orderFulfillment.getOrderFulfillmentID()#" />

								<!--- SHIPPING --->
								<cfif orderFulfillment.getFulfillmentMethod().getFulfillmentMethodType() eq "shipping">

									<!--- Get the options that the person can choose from --->
									<cfset accountAddressOptions = orderFulfillment.getAccountAddressOptions() />

									<!--- Add a 'New' Attribute so that we can drive the new form below --->
									<cfset arrayAppend(accountAddressOptions, {name='New', value=''}) />

									<!--- As long as there are no errors for the orderFulfillment, we can setup the default accountAddress value to be selected --->
									<cfset accountAddressID = "" />

									<cfif !isNull(orderFulfillment.getAccountAddress())>
										<cfset accountAddressID = orderFulfillment.getAccountAddress().getAccountAddressID() />
									<cfelseif orderFulfillment.getShippingAddress().getNewFlag() && not orderFulfillment.getShippingAddress().hasErrors()>
										<cfset accountAddressID = $.slatwall.cart().getAccount().getPrimaryAddress().getAccountAddressID() />
									</cfif>

									<!-- Shipping Address -->
									<div class="row s-shipping-address-content">
										<div class="col-md-6">
											<div class="well margin-bottom" style="margin-bottom:0px;">
												<legend>Shipping Address</legend>

												<!--- If there are existing account addresses, then we can allow the user to select one of those --->
												<!--- <cfif arrayLen(accountAddressOptions) gt 1>

													<!--- Account Address --->
													<div class="form-group">
														<label for="accountAddress">Select Address</label>
														<sw:FormField type="select" name="shippingAccountAddress.accountAddressID" valueObject="#orderFulfillment#" valueObjectProperty="accountAddress" valueOptions="#accountAddressOptions#" value="#accountAddressID#" class="form-control" />
														<p class="help-block"><sw:ErrorDisplay object="#orderFulfillment#" errorName="accountAddress" /></p>
													</div>

												</cfif> --->

												<!--- If there are existing account addresses, then we can allow the user to select one of those --->
												<cfif arrayLen(accountAddressOptions) gt 1>

													<!--- Account Address --->
													<div class="form-group">
														<label for="accountAddress">Select Address</label>
														<sw:FormField type="select" name="orderFulfillments[#orderFulfillmentIndex#].accountAddress.accountAddressID" valueObject="#orderFulfillment#" valueObjectProperty="accountAddress" valueOptions="#accountAddressOptions#" value="#accountAddressID#" class="form-control" fieldAttributes=" id='j-shipping-select' " />
														<p class="help-block"><sw:ErrorDisplay object="#orderFulfillment#" errorName="accountAddress" /></p>
													</div>
													<hr />

												</cfif>

												<!--- New Shipping Address --->
												<div id="new-shipping-address#orderFulfillmentIndex#"<cfif len(accountAddressID)> class="s-hide"</cfif>>
													<cfif isNull(orderFulfillment.getAccountAddress())>
														<sw:AddressForm id="newShippingAddress" address="#orderFulfillment.getAddress()#" fieldNamePrefix="orderFulfillments[#orderFulfillmentIndex#].shippingAddress." fieldClass="shipping-input" class="form-control" />
													<cfelse>
														<sw:AddressForm id="newShippingAddress" address="#orderFulfillment.getNewPropertyEntity( 'shippingAddress' )#" fieldNamePrefix="orderFulfillments[#orderFulfillmentIndex#].shippingAddress." fieldClass="shipping" class="form-control" />
													</cfif>

													<!--- As long as the account is not a guest account, and this is truely new address we are adding, then we can offer to save as an account address for use on later purchases --->
													<cfif not $.slatwall.getCart().getAccount().getGuestAccountFlag()>

														<!--- Save As Account Address --->
														<div class="form-group">
															<label for="saveAccountAddressFlag">Save In Address Book</label>
															<sw:FormField type="yesno" name="orderFulfillments[#orderFulfillmentIndex#].saveAccountAddressFlag" valueObject="#orderFulfillment#" valueObjectProperty="saveAccountAddressFlag" />
														</div>

														<!--- Save Account Address Name --->
														<div id="save-account-address-name#orderFulfillmentIndex#"<cfif not orderFulfillment.getSaveAccountAddressFlag()> class="s-hide"</cfif>>
															<div class="form-group">
																<label for="saveAccountAddressName">Address Nickname (optional)</label>
																<sw:FormField type="text" name="orderFulfillments[#orderFulfillmentIndex#].saveAccountAddressName" valueObject="#orderFulfillment#" valueObjectProperty="saveAccountAddressName" class="form-control" />
															</div>
														</div>

													</cfif>

												</div>

												<!--- SCRIPT IMPORTANT: This jQuery is just here for example purposes to show/hide the new address field if there are account addresses --->
												<script type="text/javascript">
													(function($){
														$(document).ready(function(){
															$('body').on('change', 'select[name="orderFulfillments[#orderFulfillmentIndex#].accountAddress.accountAddressID"]', function(e){
																if( $(this).val() === '' ) {
																	$('##new-shipping-address#orderFulfillmentIndex#').show('slide');
																} else {
																	$('##new-shipping-address#orderFulfillmentIndex#').hide('slide');
																}
															});
															$('body').on('change', 'input[name="orderFulfillments[#orderFulfillmentIndex#].saveAccountAddressFlag"]', function(e){
																if( $(this).val() === '1' ) {
																	$('##save-account-address-name#orderFulfillmentIndex#').show('slide');
																} else {
																	$('##save-account-address-name#orderFulfillmentIndex#').hide('slide');
																}
															});
															$('select[name="orderFulfillments[#orderFulfillmentIndex#].accountAddress.accountAddressID"]').change();
														});
													})( jQuery )
												</script>

											</div>
										</div>

										<!-- Shipping Options -->
										<div class="col-md-6">

											<!-- Shipping Options -->
											<div class="row">
												<div class="col-md-12">
													<div class="well">
														<legend>Shipping Method</legend>

														<!--- If there are multiple shipping methods to select from, then display that --->
														<cfif arrayLen(orderFulfillment.getShippingMethodOptions()) gt 1>

															<!--- Start: Shipping Method Example 1 --->
															<div class="form-group" id="j-shipping-method">
															<label for="shippingMethod">Shipping Method Example</label>
																<!--- OPTIONAL: You can use this formField display to show options as a select box
																<sw:FormField type="select" name="orderFulfillments[#orderFulfillmentIndex#].shippingMethod.shippingMethodID" valueObject="#orderFulfillment#" valueObjectProperty="shippingMethod" valueOptions="#orderFulfillment.getShippingMethodOptions()#" class="col-md-4" />
																--->
																<cfset shippingMethodID = "" />
																<cfif not isNull(orderFulfillment.getShippingMethod())>
																	<cfset shippingMethodID = orderFulfillment.getShippingMethod().getShippingMethodID() />
																</cfif>

																<sw:FormField type="radiogroup" name="orderFulfillments[#orderFulfillmentIndex#].shippingMethod.shippingMethodID" value="#shippingMethodID#" valueOptions="#orderFulfillment.getShippingMethodOptions()#" />
																<p class="help-block"><sw:ErrorDisplay object="#orderFulfillment#" errorName="shippingMethod" /></p>
															  </div>
															<!--- End: Shipping Method Example 1 --->

														<!--- If there is only 1 shipping method option that comes back, then we can just tell the customer how there order will be shipped --->
														<cfelseif arrayLen(orderFulfillment.getShippingMethodOptions()) and len(orderFulfillment.getShippingMethodOptions()[1]['value'])>

															<!--- We should still pass the shipping method as a hidden value --->
															<input type="text" name="orderFulfillments[#orderFulfillmentIndex#].shippingMethod.shippingMethodID" value="#orderFulfillment.getShippingMethodOptions()[1]['value']#" id="j-hidden-shipping-method" />

															<p>This order will be shipped via: #orderFulfillment.getFulfillmentShippingMethodOptions()[1].getShippingMethodRate().getShippingMethod().getShippingMethodName()# ( #orderFulfillment.getFulfillmentShippingMethodOptions()[1].getFormattedValue('totalCharge')# )</p>

														<!--- Show message to customer telling them that they need to fill in an address before we can provide a shipping method quote --->
														<cfelse>

															<!--- If the user has not yet defined their shipping address, then we can display a note for them --->
															<cfif orderFulfillment.getAddress().getNewFlag()>
																<p>Please update your shipping address first so that we can provide you with the correct shipping rates.</p>

															<!--- If they have already provided an address, and there are still no shipping method options, then the address they entered is not one that can be shipped to --->
															<cfelse>

																<p>Unfortunately the shipping address that you have provided is not one that we ship to.  Please update your shipping address and try again, or contact customer service for more information.</p>

															</cfif>

														</cfif>

													</div>
												</div>
											</div>
										</div>
									</div>
									<hr/>
								</cfif>



                                <!-- Credit Card Info -->
                                <div class="row payment">
                                    <div class="col-md-6">
                                        <div class="well">

                                            <cfset addOrderPaymentObj = $.slatwall.cart().getProcessObject("addOrderPayment") />
                                            <input type="hidden" name="newOrderPayment.paymentMethod.paymentMethodID" value="444df303dedc6dab69dd7ebcc9b8036a" />
                                            <input type="hidden" name="newOrderPayment.billingAddress.addressID" value="#addOrderPaymentObj.getNewOrderPayment().getBillingAddress().getAddressID()#" />

                                            <div class="col-md-12">
                                                <sw:ErrorDisplay object="#$.slatwall.cart()#" errorName="addOrderPayment" class="validetta-bubble" />
                                                <sw:ErrorDisplay object="#$.slatwall.cart()#" errorName="runPlaceOrderTransaction" displayType="p" class="validetta-bubble" />
                                            </div>

                                            <legend>Billing Address</legend>

                                            <div class="form-group">
                                                <div class="checkbox" id="shippingToggle">
                                                    <label>
                                                        <input type="checkbox" value="" checked>
                                                        Billing address is the same as shipping address
                                                    </label>
                                                </div>
                                            </div>

                                            <div id="j-shippingShow" style="display:none;">
                                                <sw:AddressForm id="j-newBillingAddress" address="#addOrderPaymentObj.getNewOrderPayment().getBillingAddress()#" fieldNamePrefix="newOrderPayment.billingAddress."/>
                                            </div>

                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="well">
                                            <fieldset>
                                                <legend>Payment</legend>
                                                <div class="form-group">

                                                    <label class="control-label" for="card-holder-name">Name on Card</label>
                                                    <sw:FormField type="text" name="newOrderPayment.nameOnCreditCard" valueObject="#addOrderPaymentObj.getNewOrderPayment()#" valueObjectProperty="nameOnCreditCard" class="form-control" fieldAttributes=" id='card-holder-name' required" />
                                                    <sw:ErrorDisplay object="#addOrderPaymentObj.getNewOrderPayment()#" errorName="nameOnCreditCard" />

                                                </div>
                                                <div class="row">
                                                    <div class="form-group col-md-8">

                                                        <label class="control-label" for="card-number">Card Number</label>
                                                        <sw:FormField type="text" name="newOrderPayment.creditCardNumber" valueObject="#addOrderPaymentObj.getNewOrderPayment()#" valueObjectProperty="creditCardNumber" class="form-control" fieldAttributes=" id='card-number' required " />
                                                        <p class="help-block"><sw:ErrorDisplay object="#addOrderPaymentObj.getNewOrderPayment()#" errorName="creditCardNumber" /></p>

                                                    </div>
                                                    <div class="form-group col-md-4">

                                                        <label class="control-label" for="cvv">CVV</label>
                                                        <sw:FormField type="text" name="newOrderPayment.securityCode" valueObject="#addOrderPaymentObj.getNewOrderPayment()#" valueObjectProperty="securityCode" class="form-control" fieldAttributes=" id='cvv' required " />
                                                        <sw:ErrorDisplay object="#addOrderPaymentObj.getNewOrderPayment()#" errorName="securityCode" />

                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label class="control-label" for="expiry-month">Expiration Date</label>

                                                    <div class="row">
                                                        <div class="col-xs-6 noPadding">

                                                            <sw:FormField type="select" name="newOrderPayment.expirationMonth" valueObject="#addOrderPaymentObj.getNewOrderPayment()#" valueObjectProperty="expirationMonth" valueOptions="#addOrderPaymentObj.getNewOrderPayment().getExpirationMonthOptions()#" class="form-control col-sm-3" fieldAttributes=" id='expiry-month' " />

                                                        </div>
                                                        <div class="col-xs-6">

                                                            <sw:FormField type="select" name="newOrderPayment.expirationYear" valueObject="#addOrderPaymentObj.getNewOrderPayment()#" valueObjectProperty="expirationYear" valueOptions="#addOrderPaymentObj.getNewOrderPayment().getExpirationYearOptions()#" class="form-control" fieldAttributes="" />

                                                        </div>
                                                        <div class="col-md-12">
                                                            <p class="help-block"><sw:ErrorDisplay object="#addOrderPaymentObj.getNewOrderPayment()#" errorName="expirationMonth" /></p>
                                                            <p class="help-block"><sw:ErrorDisplay object="#addOrderPaymentObj.getNewOrderPayment()#" errorName="expirationYear" /></p>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div class="form-group">
                                                    <button type="submit" class="btn btn-success" id="j-place-order" style="width:100%;">Place Order</button>
                                                </div>
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <!-- Right Side Product Bar -->
                        <div class="col-md-3">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="row">
                                        <div class="col-xs-6"><strong>PRODUCT</strong></div>
                                        <div class="col-xs-6 text-right"><strong>SUBTOTAL</strong></div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <hr style="margin-top:0px;"/>
                                        </div>
                                    </div>

                                    <cfset loopIndex=0 />
                                    <cfloop array="#$.slatwall.cart().getOrderItems()#" index="orderItem">
                                        <cfset loopIndex++ />

                                        <!--- This hidden field ties any other form elements below to this orderItem by defining the orderItemID allong with this loopIndex that is included on all other form elements --->
                                        <input type="hidden" class="col-md-1 " name="orderItems[#loopIndex#].orderItemID" value="#orderItem.getOrderItemID()#" />

                                        <div class="row">
                                            <div class="col-xs-3 zero-right"><img src="#orderItem.getSku().getResizedImagePath()#" class="img-responsive" alt="Place Holder"></div>
                                            <div class="col-xs-5 zero-right">#orderItem.getSku().getProduct().getTitle()#</div>
                                            <div class="col-xs-4 text-right"><strong>#orderItem.getFormattedValue('extendedPriceAfterDiscount')#</strong></div>
                                            <div class="col-xs-12 text-right"><hr class="dotted-top"/></div>
                                        </div>

                                    </cfloop>


                                    <div class="row totalPrice">
                                        <div class="col-xs-6">Subtotal</div>
                                        <div class="col-xs-6 text-right">#$.slatwall.cart().getFormattedValue('subtotal')#</div>
                                        <div class="col-xs-12"><hr class="dotted-top"/></div>
                                    </div>
                                    <div class="row totalPrice">
                                        <div class="col-xs-6">Shipping</div>
                                        <div class="col-xs-6 text-right">#$.slatwall.cart().getFormattedValue('fulfillmentTotal')#</div>
                                        <div class="col-xs-12"><hr class="dotted-top"/></div>
                                    </div>
                                    <div class="row totalPrice">
                                        <div class="col-xs-6">Tax</div>
                                        <div class="col-xs-6 text-right">#$.slatwall.cart().getFormattedValue('taxTotal')#</div>
                                        <div class="col-xs-12"><hr class="dotted-top"/></div>
                                    </div>

                                    <!--- If there were discounts they would be displayed here --->
                                    <cfif $.slatwall.cart().getDiscountTotal() gt 0>
                                        <div class="row totalPrice">
                                            <div class="col-xs-6">Discounts</div>
                                            <div class="col-xs-6 text-right">#$.slatwall.cart().getFormattedValue('discountTotal')#</div>
                                            <div class="col-xs-12"><hr class="dotted-top"/></div>
                                        </div>
                                    </cfif>

                                    <div class="row totalPrice">
                                        <div class="col-xs-7 zero-right"><strong style="font-size:18px;">Grand Total</strong></div>
                                        <div class="col-xs-5 text-right primary zero-left"><strong style="font-size:18px;">#$.slatwall.cart().getFormattedValue('total')#</strong></div>
                                        <div class="col-xs-12"><br/></div>
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="row">
                                <div class="col-xs-12 well">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">PROMO CODE</label>
                                        <input type="text" class="form-control" id="examplePromoCode">
                                        <p class="help-block">Enter your promo/discount code here.</p>
                                    </div>
                                    <button type="submit" class="btn btn-primary">Submit</button>
                                </div>
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
        </div> <!-- /container -->
        <!-- /main content -->

    <!--- ======================= ORDER PLACED & CONFIRMATION ============================= --->
    <cfelseif not isNull($.slatwall.getSession().getLastPlacedOrderID())>

        <h2 class="col-md-12" style="text-align:center;">It actually worked</h2>

    <!--- ======================= NO ITEMS IN CART ============================= --->
    <cfelse>

        <div class="row">
            <div class="col-md-12">
                <p>There are no items in your cart.</p>
            </div>
        </div>

    </cfif>

<script charset="utf-8">
    $('##shippingToggle input[type="checkbox"]').attr('checked','checked');

    var addressObj = #SerializeJSON(resourceSections)#;

    var selected = $('##j-shipping-select').val();

    $('##j-shipping-select').change(function(){
        var selected = $(this).val();

        $.each(addressObj, function(i, address) {

            if(selected === address.ID & $('##shippingToggle input').is(':checked') ){

                if(selected === ''){
                    var name = $('.s-shipping-address-content input[name="orderFulfillments[1].shippingAddress.name"]').val();
                    var company = address.COMPANY;
                    var address1 = address.STREETADDRESS;
                    var address2 = address.STREET2ADDRESS;
                    var city = address.CITY;
                    var country = address.COUNTRYCODE;
                    var state = address.STATECODE;
                    var postalcode = address.POSTALCODE;
                }else{
                    var id = address.ID;
                    var name = address.NAME;
                    var company = address.COMPANY;
                    var address1 = address.STREETADDRESS;
                    var address2 = address.STREET2ADDRESS;
                    var city = address.CITY;
                    var country = address.COUNTRYCODE;
                    var state = address.STATECODE;
                    var postalcode = address.POSTALCODE;
                }

                $('##j-newBillingAddress input[name="newOrderPayment.billingAddress.name"]').val(name);
                $('##j-newBillingAddress input[name="newOrderPayment.billingAddress.company"]').val(company);
                $('##j-newBillingAddress input[name="newOrderPayment.billingAddress.streetAddress"]').val(address1);
                $('##j-newBillingAddress input[name="newOrderPayment.billingAddress.street2Address"]').val(address2);
                $('##j-newBillingAddress input[name="newOrderPayment.billingAddress.city"]').val(city);
                $('##j-newBillingAddress input[name="newOrderPayment.billingAddress.postalCode"]').val(postalcode);
                $('##j-newBillingAddress select[name="newOrderPayment.billingAddress.stateCode"]').val(state);
                $('##j-newBillingAddress select[name="newOrderPayment.billingAddress.countryCode"]').val(country);


            };

        });



    });





</script>


</cfoutput>



<script src="onepage-checkout.js"></script>

<cfinclude template="_slatwall-footer.cfm" />
