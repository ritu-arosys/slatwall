$(document).ready(function(e){

	//////////AJAX CHECKOUT SCRIPTS//////////

	//Account login
	$('body').on('click', '#j-user-login button', function(e){
		e.preventDefault();

		var userId = $('#j-user-login #username').val();
		var userPassword = $('#j-user-login #password').val();

		$.slatwall.doAction(
			'public:account.login',
			{
				'emailAddress': userId,
				'password': userPassword
			}
		);

		$.ajax({
			type: "POST",
			url: "onepagecheckout.cfm",
			beforeSend: function(){
				$('#j-login-content-box').addClass('s-disabled');
			},
			success: function(result) {
				var success =  $(result).find('#j-checkout-content').html();
				$('#j-checkout-content').html(success);
				$('#j-login-content-box').removeClass('s-disabled');
			},
			error: function(xhr, textStatus, errorThrown) {
				$('#j-login-content-box').removeClass('s-disabled');
			}
		});

		// console.log($.slatwall.doAction('public:ajax.account'));
	});
	
	//BILLING SAME AS SHIPPING - find and change billing inputs
	function sameAsShippingInput(key){
		var inputType = $(key).attr('data-field-type');
		var inputSibling = $('#j-newBillingAddress').find("[data-field-type='" + inputType + "']");
		var inputVal = $(key).val();
		$(inputSibling).val(inputVal);
	};

	//BILLING SAME AS SHIPPING - find and change billing selects
	function sameAsShippingSelect(key){
		var selectType = $(key).attr('data-field-type');
		var selectSibling = $('#j-newBillingAddress').find("[data-field-type='" + selectType + "']");
		var selectVal = $(key).val();
		$(selectSibling).val(selectVal).change();
	};

	//BILLING SAME AS SHIPPING - live change the inputs and selects
	function sameAsShipping(){
		$('#newShippingAddress input').keyup(function(){
		  sameAsShippingInput(this);
		});

		$('#newShippingAddress select').change(function(){
			sameAsShippingSelect(this);
		});
	};

  //BILLING SAME AS SHIPPING - run sameAsShipping() if same as shipping else unbind fields
	var checkIf = $('#shippingToggle input');
	$('body').on('change', '#shippingToggle input', function(e){
		if(this.checked) {
			sameAsShippingAll();
			sameAsShipping();
		}else{
			$('#j-newBillingAddress input').val('');
			$('#newShippingAddress select').unbind('change');
			$('#newShippingAddress input').unbind('keyup');
		};
	});
	
	//BILLING SAME AS SHIPPING - if same as shipping on page load
	if( $('#shippingToggle input').attr('checked') == 'checked' ) {
		sameAsShippingAll();
		sameAsShipping();
	}

	//BILLING SAME AS SHIPPING - set all same as shipping
	function sameAsShippingAll(){
		//BILLING SAME AS SHIPPING - set same as shipping on page load for inputs
		$('#newShippingAddress input').each(function(){
			sameAsShippingInput(this);
		});

		//BILLING SAME AS SHIPPING - set same as shipping on page load for selects
		$('#newShippingAddress select').each(function(){
			sameAsShippingSelect(this);
		});
	};

	//BILLING SAME AS SHIPPING - set same as shipping for all inputs/selects on page load
	sameAsShippingAll();


    //Place Order
    $('body').on('click', '#j-place-order', function(e){

        // e.preventDefault();

        //Shipping address
        var shippingName = $('.s-shipping-address-content input[name="orderFulfillments[1].shippingAddress.name"]').val();
		var shippingCompany = $('.s-shipping-address-content input[name="orderFulfillments[1].shippingAddress.company"').val();
		var shippingAddress = $('.s-shipping-address-content input[name="orderFulfillments[1].shippingAddress.streetAddress"').val();
		var shippingAddressTwo = $('.s-shipping-address-content input[name="orderFulfillments[1].shippingAddress.street2Address"').val();
		var shippingCountry = $('.s-shipping-address-content select[name="orderFulfillments[1].shippingAddress.countryCode"').val();
        var shippingCity = $('.s-shipping-address-content input[name="orderFulfillments[1].shippingAddress.city"').val();
        var shippingState = $('.s-shipping-address-content select[name="orderFulfillments[1].shippingAddress.stateCode"').val();
        var shippingPostalCode = $('.s-shipping-address-content input[name="orderFulfillments[1].shippingAddress.postalCode"').val();
		var orderFulfillmentID = $('.s-orderFulfillmentID').val();

	  	//Shipping method
	  	var shippingMethod = $('#j-shipping-method input[type="radio"]:checked').val();

        //Billing address
        var billingName = $('#j-shippingShow input[name="newOrderPayment.billingAddress.name"]').val();
		var billingCompany = $('#j-shippingShow input[name="newOrderPayment.billingAddress.company"').val();
		var billingAddress = $('#j-shippingShow input[name="newOrderPayment.billingAddress.streetAddress"').val();
		var billingAddressTwo = $('#j-shippingShow input[name="newOrderPayment.billingAddress.street2Address"').val();
		var billingCountry = $('#j-shippingShow select[name="newOrderPayment.billingAddress.countryCode"').val();
        var billingCity = $('#j-shippingShow input[name="newOrderPayment.billingAddress.city"').val();
        var billingState = $('#j-shippingShow select[name="newOrderPayment.billingAddress.stateCode"').val();
        var billingPostalCode = $('#j-shippingShow input[name="newOrderPayment.billingAddress.postalCode"').val();


//THIS WAS WORKING
		$.slatwall.doAction(
			'public:public:cart.update',
			{
			    'shippingAddress.name': shippingName,
				'shippingAddress.addressID': '',
		        'shippingAddress.company': shippingCompany,
		        'shippingAddress.streetAddress': shippingAddress,
		        'shippingAddress.street2Address': shippingAddressTwo,
		        'shippingAddress.countryCode': shippingCountry,
		        'shippingAddress.city': shippingCity,
		        'shippingAddress.stateCode': shippingState,
		        'shippingAddress.postalCode': shippingPostalCode,
				'orderFulfillments[1].orderFulfillmentID': orderFulfillmentID,
				'orderFulfillments[1].shippingMethod.shippingMethodID': shippingMethod
			}
			
		);

//THIS WAS NOT GOING THROUGH
		$.slatwall.doAction(
			'public:cart.placeOrder',
			{
				'billingAddress.name': billingName,
				'billingAddress.addressID': '',
		        'billingAddress.company': billingCompany,
		        'billingAddress.streetAddress': billingAddress,
		        'billingAddress.street2Address': billingAddressTwo,
		        'billingAddress.countryCode': billingCountry,
		        'billingAddress.city': billingCity,
		        'billingAddress.stateCode': billingState,
		        'billingAddress.postalCode': billingPostalCode,
				'newOrderPayment.nameOnCreditCard': 'reyjay',
		        'newOrderPayment.creditCardNumber': '4111111111111111',
		        'newOrderPayment.securityCode': '111',
		        'newOrderPayment.expirationMonth': '07',
		        'newOrderPayment.expirationYear': '15'
			}
			
		);








       console.log('shipping'+
           shippingName,
           shippingCompany,
           shippingAddress,
           shippingAddressTwo,
           shippingCountry,
           shippingCity,
           shippingState,
           shippingPostalCode
       );

       console.log('billing' +
           billingName,
           billingCompany,
           billingAddress,
           billingAddressTwo,
           billingCountry,
           billingCity,
           billingState,
           billingPostalCode
       );




//        $.ajax({
//            type: "POST",
//            url: "onepagecheckout.cfm",
//            beforeSend: function(){
//                $('#j-checkout-content').addClass('s-disabled');
//            },
//            success: function(result) {
//                var success =  $(result).find('#j-checkout-content').html();
//                $('#j-checkout-content').html(success);
//                $('#j-checkout-content').removeClass('s-disabled');
//            },
//            error: function(xhr, textStatus, errorThrown) {
//                $('#j-checkout-content').removeClass('s-disabled');
//            }
//        });
    });

	//Account logout
	$('body').on('click', '#j-logout-btn', function(e){
		e.preventDefault();

		$.slatwall.doAction(
			'public:account.logout'
		);

		$.ajax({
			type: "POST",
			url: "onepagecheckout.cfm",
			beforeSend: function(){
				$('#j-checkout-content').addClass('s-disabled');
			},
			success: function(result) {
				var success =  $(result).find('#j-checkout-content').html();
				$('#j-checkout-content').html(success);
				$('#j-checkout-content').removeClass('s-disabled');
			},
			error: function(xhr, textStatus, errorThrown) {
				$('#j-checkout-content').removeClass('s-disabled');
			}
		});

		// console.log($.slatwall.doAction('public:ajax.account'));
	});

	//Account Create
	$('body').on('click', '#j-create-account-form button', function(e){
		e.preventDefault();

		var userFirstName = $('#j-create-account-form #firstName').val();
		var userLastName = $('#j-create-account-form #lastName').val();
		var userPhoneNumber = $('#j-create-account-form #phoneNumber').val();
		var userEmail = $('#j-create-account-form #email').val();
		var userEmailConfirm = $('#j-create-account-form #emailConfirm').val();
		var userPassword = $('#j-create-account-form #password').val();
		var userPasswordConfirm = $('#j-create-account-form #passwordConfirm').val();


		if( $('#j-create-account-form #accountToggle input').prop('checked') ){
			$.slatwall.doAction(
				'public:cart.guestaccount',
				{
					'firstName': userFirstName,
					'lastName': userLastName,
					'phoneNumber': userPhoneNumber,
					'emailAddress': userEmail,
					'emailAddressConfirm': userEmailConfirm
				}
			);
		}else{
			$.slatwall.doAction(
				'public:account.create',
				{
					'firstName': userFirstName,
					'lastName': userLastName,
					'phoneNumber': userPhoneNumber,
					'emailAddress': userEmail,
					'emailAddressConfirm': userEmailConfirm,
					'password': userPassword,
					'passwordConfirm': userPasswordConfirm
				}
			);
			$.slatwall.doAction(
				'public:account.login',
				{
					'emailAddress': userEmail,
					'password': userPassword
				}
			);
		};

		$.ajax({
			type: "POST",
			url: "onepagecheckout.cfm",
			beforeSend: function(){
				$('#j-login-content-box').addClass('s-disabled');
			},
			success: function(result) {
				var success =  $(result).find('#j-checkout-content').html();
				$('#j-checkout-content').html(success);
				$('#j-login-content-box').removeClass('s-disabled');
			},
			error: function(xhr, textStatus, errorThrown) {
				$('#j-login-content-box').removeClass('s-disabled');
			}
		});

		// console.log($.slatwall.doAction('public:ajax.account'));
	});


	/////////OTHER SCRIPTS//////////

	//Toggle forgot password
    $('body').on('click', '#j-forgot-password-btn', function(e){
        $(this).closest('#j-user-login').hide();
        $('#j-forgot-password').show();
    });
    $('body').on('click', '#j-back-login-btn', function(e){
        $(this).closest('#j-forgot-password').hide();
        $('#j-user-login').show();
    });

    //Toggle billing address
    $('body').on('change', '#shippingToggle input[type="checkbox"]', function(e){
      if($(this).is(':checked')) {
        $('#j-shippingShow').toggle('fast');
        $('#j-shippingHide').toggle('fast');
//        $('#j-newBillingAddress .s-required').removeAttr('required');
      }else{
        $('#j-shippingHide').toggle('fast');
        $('#j-shippingShow').toggle('fast');
//        $('#j-newBillingAddress .s-required').attr('required','required');
      };
    });

    //Toggle Password
    $('body').on('change', '#accountToggle', function(e){
        $('.j-createAccount-hide').toggle('fast');
    });

    //Guest Checkout Button
    $('body').on('click', '#guestCheckoutBtn', function(e){
        var emailVal = $(this).siblings('#guestCheckout').children('input').val();
        if(emailVal){
            $('#emailAddressinput').val(emailVal);
            $('#firstInput').focus();
            $('html,body').animate({ scrollTop: $('#firstInput').offset().top- 130 }, 'slow');
        };
    });

    //Toggle password display
    $('body').on('click', '#showPass', function(e){
        var thisVal = $(this).prop('checked');
        if(thisVal == true){
            $('#accountPassword').attr('type', 'password');
        }else{
            $('#accountPassword').attr('type', 'text');
        };
    });

	//Billing same as shipping
	// $('body').on('keyup', , function(){
	// 	var billlingName = $('input[name="orderFulfillments[1].billingAddress.name"]');
	// 	var shippingName = $('input[name="orderFulfillments[1].shippingAddress.name"]');
	//
	// 	var thisValue = $(this).val();
	// 	console.log(thisValue);
	// 	//   $(billlingName).val(thisValue);
	// });

	//Credit Card Validation
	// $('#full-page-form').bootstrapValidator({
	//     feedbackIcons: {
	//         valid: 'glyphicon glyphicon-ok',
	//         invalid: 'glyphicon glyphicon-remove',
	//         validating: 'glyphicon glyphicon-refresh',
	//     },
	//     live: 'enabled',
	//     fields: {
	//         postcode: {
	//             validators: {
	//                 zipCode: {
	//                     message: 'The value is not a valid postcode'
	//                 }
	//             }
	//         },
	//         ccNumber: {
	//             validators: {
	//                 creditCard: {
	//                     message: 'The credit card number is not valid'
	//                 }
	//             }
	//         },
	//         cvvNumber: {
	//             validators: {
	//                 cvv: {
	//                     creditCardField: 'ccNumber',
	//                     message: 'The CVV number is not valid'
	//                 }
	//             }
	//         }
	//     }
	// });
	//
	// //Other form validation
	// $('form').bootstrapValidator({
	//     feedbackIcons: {
	//         valid: 'glyphicon glyphicon-ok',
	//         invalid: 'glyphicon glyphicon-remove',
	//         validating: 'glyphicon glyphicon-refresh'
	//     },
	//     live: 'enabled',
	// });

    //Change the required shipping field if not used
    function changeRequired(valueObj){
        if( $(valueObj).val() ){
            $('#new-shipping-address1 .s-required').removeAttr('required');
        }else{
            $('#new-shipping-address1 .s-required').attr('required','required');
        };
    };

    $('#j-shipping-select').change(function(){
        changeRequired(this);
    });

    changeRequired('#j-shipping-select');

});
