// ------------------------------------------------------------------------------------------
// generic functions
// ------------------------------------------------------------------------------------------
function writeLog(message) {
	if (settings.app.logging === true) {
		console.log(message);
	} 
}

function getParameterByName( name ) {
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getParameterFromString( urlString, name ) {
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( urlString );
  if( results == null )
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}

function parseJwt(token) {
    if (token) {
	    var base64Url = token.split('.')[1];
	    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
	        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	    }).join(''));
	    return JSON.parse(jsonPayload);
    } else {
    	return false;
    }
}

function prettifyJWT(jwtToken) {
	var prettyJwt = parseJwt(jwtToken);
	prettyJwt = JSON.stringify(prettyJwt, null, 2); 
	return prettyJwt
}

function processMessage(message) {
    if (message) {
		writeLog('-> a message was found: '+ message);
		$("#lbl_message").text(message);
	} else {
		$("#lbl_message").text('');
    }
}

function getTokenValidity(jwtToken) {
	writeLog('-> calculating validity for token: '+ jwtToken)
	if (jwtToken) {
		jwtToken 				= parseJwt(jwtToken);
		var tokenTimeStamp 		= jwtToken.exp;
		var currentTimeStamp 	= Math.floor(Date.now() / 1000);
		var minutesLeft			= Math.floor((tokenTimeStamp - currentTimeStamp)/60);
		writeLog(tokenTimeStamp + ' - ' + currentTimeStamp + ' = '+ minutesLeft)
		writeLog(minutesLeft)
		return minutesLeft + ' minutes'

	} else {
		return 'unknown'

	}
}

// ------------------------------------------------------------------------------------------
// authentication
// ------------------------------------------------------------------------------------------
//
// Some calls have a origin header, this is done in order to change the origin on mobile. 
// As modern browsers ignore this instruction due to security issues, it is always added	

	function getAuthorisationCode(codeChallenge, requestedScopes, redirectUri) {
   		authorizationServer = window.settings.okta.oktaurl + '/oauth2/'+ window.settings.okta.authorizationserver +'/v1';
        var codeUrl = authorizationServer + '/authorize?client_id='+ window.settings.okta.clientid  +'&response_type=code&scope='+ requestedScopes +'&redirect_uri='+ redirectUri +'&state=x&nonce=y&code_challenge_method=S256&code_challenge='+ codeChallenge
		writeLog('Getting an authorisation code here: '+ codeUrl);
		window.open(codeUrl, '_self', 'location=yes'); 
	}

	function getTokensWithCode(authorisationCode, requestedScopes, redirectUri, landingPage) {
		authorizationServer = window.settings.okta.oktaurl + '/oauth2/'+ window.settings.okta.authorizationserver +'/v1';
		var token_url = authorizationServer + '/token'
		writeLog('Getting with code '+ authorisationCode +' tokens at '+ token_url);
		if (authorisationCode) {
			var settings = {
			  'url': token_url,
			  'method': 'POST',
			  'timeout': 0,
			  'headers': {
			    'Accept': 'application/json',
			    'Content-Type': 'application/x-www-form-urlencoded',
	            'Access-Control-Allow-Origin': '*',
	            'origin': 'https://www.atkoinc.nl/callback'
			  },
			  'data': {
			    'client_id': window.settings.okta.clientid,
			    'scope': window.settings.okta.basic_scopes,
			    'grant_type': 'authorization_code',
			    'redirect_uri': redirectUri,
			    'code_verifier': localStorage.getItem('codeverifier'),
			    'code': authorisationCode
			  }
			};
			if (window.settings.urls.platform == 'mobile') {
			    cordova.plugin.http.sendRequest(token_url, settings, function(response) {
			      var responseData = JSON.parse(response.data)
			      var access_token = responseData.access_token
			      var id_token = responseData.id_token
			      var refresh_token = responseData.refresh_token
				  processTokens(access_token, id_token, refresh_token, redirectUri, landingPage);

			    }, function(response) {
			    	alert(JSON.stringify(response));
					alert('Okta returned an error while exchanging the code for a token on mobile, please try again');
			    });

			} else {
				$.ajax(settings)
				.done(function (response) {
					processTokens(response.access_token, response.id_token, response.refresh_token, redirectUri, landingPage);
				})
				.fail(function (response) {
					alert(JSON.stringify(response));
					alert('Okta returned an error while exchanging the code for a token on desktop, please try again');
				});				
			}
		}
	}

	function renewTokens(refresh_token) {
		writeLog('-> renewing tokens with the refresh token ('+ refresh_token +')')
	    var token_url = window.settings.okta.oktaurl + '/oauth2/default/v1/token';
		var redirectUri = window.settings.urls.callbackurl
		if (refresh_token) {
			var settings = {
			  'url': token_url,
			  'method': 'POST',
			  'timeout': 0,
			  'headers': {
			    'Accept': 'application/json',
			    'Content-Type': 'application/x-www-form-urlencoded',
	            'Access-Control-Allow-Origin': '*',
	            'origin': 'https://www.atkoinc.nl/callback'
			  },
			  'data': {
			    'client_id': window.settings.okta.clientid,
			    'grant_type': 'refresh_token',
			    'redirect_uri': redirectUri,
			    'refresh_token': refresh_token
			  }
			};
			if (window.settings.urls.platform == 'mobile') {
			    cordova.plugin.http.sendRequest(token_url, settings, function(response) {
			      var responseData = JSON.parse(response.data)
			      var access_token = responseData.access_token
			      var id_token = responseData.id_token
			      var refresh_token = responflocalseData.refresh_token
				  processTokens(access_token, id_token, refresh_token, redirectUri);

			    }, function(response) {
					alert('Okta returned an error while renewing the tokens on mobile, please try again');
			    });
			} else {
				$.ajax(settings)
				.done(function (response) {
					processTokens(response.access_token, response.id_token, response.refresh_token, redirectUri);
				})
				.fail(function (response) {
					alert('Okta returned an error while renewing the tokens on desktop, please try again')
				});

			}

		} else {
			alert('There is no refresh token to renew your tokens');
		}

	}

	function processTokens(access_token, id_token, refresh_token, redirectUri, landingPage) {
		// process access token
		if (access_token) {
			localStorage.setItem('access_token', access_token);
			writeLog(access_token)
		} else {
			alert('some error occurred on the access token');
		}
		// process id token
		if (id_token) {
			writeLog('-> code returned an ID token');
			writeLog(id_token)
			localStorage.setItem('id_token', id_token);
			window.location = 'index.html?event='+landingPage;
		} else {
			alert('some error occurred on the id token');
			window.location = window.settings.urls.url + '?page=error'
		}
		// process refresh token
		if (refresh_token) {
			writeLog('-> code returned a refresh token');
			writeLog(refresh_token)
			localStorage.setItem('refresh_token', refresh_token);
		} 		


	}

	function validateToken(tokenType) {
	// WARNING: Note that this is not full validation of the token and it is an insecure way to do this!	
		var raw_idToken = localStorage.getItem(tokenType);
		var expValidity = false
		if (raw_idToken) {
			var jwt_idToken = parseJwt(raw_idToken)
			// validate exp
			var currentTimeStamp = Date.now() / 1000
			var expValidity = jwt_idToken.exp > currentTimeStamp
			writeLog('-> the token validity is ' + expValidity +' (for user: '+ jwt_idToken.name +')')
			// store data in localStorage
			var jwt_id_name = jwt_idToken.name;
			writeLog(jwt_idToken);
			localStorage.setItem('jwt_id_name', jwt_id_name);

		} else {
			expValidity = false
		}
		return expValidity;
	}

	function getAuthentionStatus() {
		var jwt_validity = validateToken('id_token');

		// Set welcome header according to Okta session
		if (jwt_validity === true) {
		} else {

		};		
		return jwt_validity
	}

	function startApp(page) {
    writeLog('-> starting the app for page: '+ page);
    // hide all pages and show spinner page while loading
	$(".menu_item_"+ page).addClass('current');
	$(".page").hide();
	$("#pag_loading").show();
    	// Setup the app for the user, all is fine!
		if (validateToken('id_token') === true) {
			// Set the app based on the data in the id_token
			// populate token debug area for demo purposes
			var access_token		= localStorage.getItem('access_token')
			var id_token			= localStorage.getItem('id_token')
			var refresh_token		= localStorage.getItem('refresh_token')
			var prettyAccessToken 	= prettifyJWT(access_token);
			var prettyIdToken 		= prettifyJWT(id_token);
			var accessTokenExp 		= getTokenValidity(access_token);
			var idTokenExp 			= getTokenValidity(id_token);

			$("#lbl_accesstoken").html(prettyAccessToken)
			$("#lbl_idtoken").html(prettyIdToken)
			$("#lbl_accesstoken_exp").html(accessTokenExp)
			$("#lbl_idtoken_exp").html(idTokenExp);
			$("#lnk_accesstoken_inspect").attr('href', 'https://token.dev#'+access_token);
			$("#lnk_idtoken_inspect").attr('href', 'https://token.dev#'+id_token);
			$("#lbl_refreshtoken").text(refresh_token);

		// Set values on profile page
			parsed_id_token = parseJwt(id_token);
			var red_state = parsed_id_token.red_state
			var access_token_okta = localStorage.getItem('okta_access_token');
			// take the data from the token
				if (red_state) {
					var firstname	= parsed_id_token.red_firstname
					var lastname	= parsed_id_token.red_lastname
					var street		= parsed_id_token.red_street
					var postalcode	= parsed_id_token.red_postalcode
					var city		= parsed_id_token.red_city
					var country 	= parsed_id_token.red_country				
					var phone 		= parsed_id_token.red_phone
					$(".lbl_show_low_access").show();
					$(".lbl_show_full_access").hide();
				} else {
					var firstname	= parsed_id_token.firstname
					var lastname	= parsed_id_token.lastname
					var street		= parsed_id_token.street
					var postalcode	= parsed_id_token.postalcode
					var city		= parsed_id_token.city
					var country 	= parsed_id_token.country				
					var phone 		= parsed_id_token.phone
					$(".lbl_show_low_access").hide();
					$(".lbl_show_full_access").show();
				}
			// set the data in the app
			$(".inp_firstname").val(firstname)
			$(".inp_lastname").val(lastname)
			$(".inp_street").val(street)
			$(".inp_postalcode").val(postalcode)
			$(".inp_city").val(city)
			$(".inp_country").val(country)
			$(".inp_phone").val(phone)				

			// Set some other stuff
			$(".lnk_app_logout").css('display','inline'); 
			$(".lnk_profile").css('display','inline'); 
			$("#btn_login_menu").hide();
			$(".lbl_displayName").text(localStorage.getItem('jwt_id_name')) 
			writeLog('-> a valid id_token is present in localStorage');
		} else {
			// Set the app to the state where the user is not authenticated
			$(".lnk_app_logout").hide(); 
			$(".lnk_profile").hide();
			$("#btn_profile_menu").hide();

			writeLog('-> there is no valid id_token present in localStorage');	
		}

		// Change thew top buttons based on the page that is being displayed
		if (page === 'profile') {
			$("#lbl_title").text(settings.app.headers.profile.title);
			$(".lbl_firstname").text(firstname);
			$("#lbl_oneliner").text(settings.app.headers.profile.subtitle);
			$("#btn_header_primary").text(settings.app.headers.profile.button_caption);
			$("#btn_header_primary").attr('targetpage','home')
			$("#btn_header_primary").addClass('lnk_home');
			$("#btn_header_secondary").text('Debug');
			$("#btn_header_secondary").addClass('lnk_tokens');
		} else {
			if (validateToken('id_token') === true) {
				$("#lbl_title").text(settings.app.headers.authenticated.title);
				$("#lbl_oneliner").text(settings.app.headers.authenticated.subtitle);
				$("#btn_header_primary").text(settings.app.headers.authenticated.button_caption);
				$("#btn_header_primary").addClass('lnk_home');
				$("#btn_header_secondary").text('Debug');
				$("#btn_header_secondary").addClass('lnk_tokens');
			} else {
				$("#lbl_title").text(settings.app.headers.unauthenticated.title);
				$("#lbl_oneliner").text(settings.app.headers.unauthenticated.subtitle);
				$(".btn_buynow").hide();
				$("#btn_header_primary").text(settings.app.headers.unauthenticated.button_caption);
				$("#btn_header_primary").addClass('lnk_login');
				$("#btn_header_secondary").text('Register');
				$("#btn_header_secondary").addClass('lnk_register');

			}
		}
		// show the page that the user needs to see
		$("#pag_loading").hide();
		$("#banner-wrapper").slideDown();
		$("#pag_"+page).slideDown();
	}



