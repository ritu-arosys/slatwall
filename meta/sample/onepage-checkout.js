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
				$('#j-login-content-box').removeClass('s-disabled');
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
			alert('gues');
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
			alert('create');
			$.slatwall.doAction(
				'public:account.create , public:account.login',
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
			console.log('end');
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
    $('body').on('change', '#shippingToggle', function(e){
      if(this.checked) {
        $('#shippingShow').toggle('fast');
        $('#shippingHide').toggle('fast');
      }else{
        $('#shippingHide').toggle('fast');
        $('#shippingShow').toggle('fast');
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



});
