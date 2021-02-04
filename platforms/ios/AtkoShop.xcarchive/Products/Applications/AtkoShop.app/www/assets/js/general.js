// ------------------------------------------------------------------------------------------
// generic functions
// ------------------------------------------------------------------------------------------

function writeLog(message) {
	
	if (localStorage.getItem('logging') == 'true') {
		console.log(message);
	} 
}

function getParameterByName( name ) 
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getParameterFromString( urlString, name ) 
{
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
	// decode the token
	var prettyJwt = parseJwt(jwtToken);
	// get the token indented and on multiple lines
	prettyJwt = JSON.stringify(prettyJwt, null, 2); 
	return prettyJwt
}

function processMessage(message) {
    if (message) {
    // Display message
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
// session management
// ------------------------------------------------------------------------------------------

	function getAuthorisationCode(codeChallenge, requestedScopes, redirectUri, prompt) {
        if(requestedScopes == null || requestedScopes == '') {
   			requestedScopes = localStorage.getItem('scopes') +' offline_access'
		}
		if (redirectUri == null || redirectUri == '') {
			redirectUri = localStorage.getItem('portalcallbackurl');
		}
		if (prompt === false) {
			var addParams = '&prompt=none'
		} else {
			var addParams = '';
		}
        var codeUrl = localStorage.getItem('oktaurl') + '/oauth2/'+ localStorage.getItem('authorizationserver') +'/v1/authorize?client_id='+ localStorage.getItem('clientid')  +'&response_type=code&scope='+ requestedScopes +'&redirect_uri='+ redirectUri +'&state=x&nonce=y&code_challenge_method=S256&code_challenge='+ codeChallenge + addParams
//		alert(codeUrl);
//		alert('addParams='+addParams);
		writeLog('-> getting an authorisation here: '+ codeUrl);
		window.open(codeUrl, '_self', 'location=yes'); 
	}

	function renewTokens(refresh_token) {
		writeLog('-> renewing tokens with the refresh token ('+ refresh_token +')')
	    var token_url = localStorage.getItem('oktaurl') + '/oauth2/default/v1/token';
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
			    'client_id': localStorage.getItem('clientid'),
			    'grant_type': 'refresh_token',
			    'redirect_uri': localStorage.getItem('portalcallbackurl'),
			    'refresh_token': refresh_token
			  }
			};
			if (localStorage.getItem('platform') == 'mobile') {
			    cordova.plugin.http.sendRequest(token_url, settings, function(response) {
			      var responseData = JSON.parse(response.data)
			      var access_token = responseData.access_token
			      var id_token = responseData.id_token
			      var refresh_token = responseData.refresh_token
				  processTokens(access_token, id_token, refresh_token);

			    }, function(response) {
					alert('Okta returned an error while renewing the tokens on mobile, please try again');
			    });
			} else {
				$.ajax(settings)
				.done(function (response) {
					processTokens(response.access_token, response.id_token, response.refresh_token);
				})
				.fail(function (response) {
					alert('Okta returned an error while renewing the tokens on desktop, please try again')
				});

			}

		} else {
			alert('There os no refresh token to renew your tokens');
		}

	}



	function getTokensWithCode(authorisationCode, requestedScopes, redirectUri) {
		writeLog('-> getting tokens with the code ('+ authorisationCode +')')
		var token_url = localStorage.getItem('oktaurl') + '/oauth2/default/v1/token'
        if(requestedScopes == null || requestedScopes == '') {
   			requestedScopes = localStorage.getItem('scopes') +' offline_access'
		}
		if (redirectUri == null || redirectUri == '') {
			redirectUri = localStorage.getItem('portalcallbackurl');
		}
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
			    'client_id': localStorage.getItem('clientid'),
			    'scope': localStorage.getItem('scopes'),
			    'grant_type': 'authorization_code',
			    'redirect_uri': redirectUri,
			    'code_verifier': localStorage.getItem('codeverifier'),
			    'code': authorisationCode
			  }
			};
			if (localStorage.getItem('platform') == 'mobile') {
				// if the user is on mobile execute this:
			    cordova.plugin.http.sendRequest(token_url, settings, function(response) {
			      var responseData = JSON.parse(response.data)
			      var access_token = responseData.access_token
			      var id_token = responseData.id_token
			      var refresh_token = responseData.refresh_token
				  processTokens(access_token, id_token, refresh_token);

			    }, function(response) {
			    	alert(JSON.stringify(response));
					alert('Okta returned an error while exchanging the code for a token on mobile, please try again');
			    });

			} else {
				// if the user is in the browser, do this:
				$.ajax(settings)
				.done(function (response) {
					processTokens(response.access_token, response.id_token, response.refresh_token);
				})
				.fail(function (response) {
					alert('Okta returned an error while exchanging the code for a token on desktop, please try again');
				});				
			}
		

}
	}

	function processTokens(access_token, id_token, refresh_token) {
		if (refresh_token) {
			writeLog('-> code returned a refresh token');
			writeLog(refresh_token)
			localStorage.setItem('refresh_token', refresh_token);
		} 		
		if (access_token) {
			writeLog('-> code returned an access token');
			writeLog(access_token)
			localStorage.setItem('access_token', access_token);
		} else {
			alert('some error occurred on the access token');
		}
		if (id_token) {
			writeLog('-> code returned an ID token');
			writeLog(id_token)
			localStorage.setItem('id_token', id_token);
			checkAuthentionStatus()
			window.location = localStorage.getItem('portalurl') + '?message=login successful'
		} else {
			alert('some error occurred on the id token');
			window.location = localStorage.getItem('portalurl') + '?message=login failed'
		}
	}



	function validateToken(tokenType) {
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

	function trashToken(tokenType) {
		localStorage.removeItem(tokenType);
	}

	function checkAuthentionStatus() {
		//alert('see if you have a token dude!');
		var jwt_validity = validateToken('id_token');

		// Set welcome header according to Okta session
		if (jwt_validity === true) {
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
			if (red_state) {
				var firstname	= parsed_id_token.red_firstname
				var lastname	= parsed_id_token.red_lastname
				var street		= parsed_id_token.red_street
				var postalcode	= parsed_id_token.red_postalcode
				var city		= parsed_id_token.red_city
				var country 	= parsed_id_token.red_country				
				var phone 		= parsed_id_token.red_phone
			} else {
				var firstname	= parsed_id_token.firstname
				var lastname	= parsed_id_token.lastname
				var street		= parsed_id_token.street
				var postalcode	= parsed_id_token.postalcode
				var city		= parsed_id_token.city
				var country 	= parsed_id_token.country				
				var phone 		= parsed_id_token.phone
			}
			if (firstname) { 
				$("#inp_firstname").val(firstname)
			}
			if (lastname) {
				$("#inp_lastname").val(lastname)

			}
			if (street) {
				$("#inp_street").val(street)

			}
			if (postalcode) {
				$("#inp_postalcode").val(postalcode)

			}
			if (city) {
				$("#inp_city").val(city)

			}
			if (country) {
				$("#inp_country").val(country)

			}
			if (phone) {
				$("#inp_phone").val(phone)

			}
			//other stuff
			$("#cnt_Auth").css('display','flex'); 
			$("#cnt_noAuth").hide();
			$("#btn_logout_menu").css('display','inline'); 
			$("#btn_profile_menu").css('display','inline'); 
			$("#btn_login_menu").hide();
			$(".lbl_displayName").text(localStorage.getItem('jwt_id_name')) 
			writeLog('-> a valid id_token is present in localStorage');
		} else {
//			alert('no valid token found');
			$("#cnt_Auth").hide(); 
			$("#cnt_noAuth").css('display','flex'); 
			$("#btn_login_menu").css('display','inline'); 
			$("#btn_logout_menu").hide();
			$("#btn_profile_menu").hide();
			writeLog('-> there is no valid id_token present in localStorage');
		};		
	}

