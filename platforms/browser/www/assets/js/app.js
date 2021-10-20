$(document).ready(function(){
    // Apply app settings for customization (names and styling)
    setProducts(productArray)
    $(".lbl_app_name").text(settings.app.name);
    $(".lbl_your_name").text(settings.app.yourname);
    $(".btn_buynow").text(settings.app.buy_label);
    $(".pay_label").text(settings.app.pay_label);
    if (settings.app.ecommerce === false) {
	    $(".ecommerce").hide();
    }
 
    $("#img_news_1").attr('src', settings.app.images[0])
    $("#img_news_2").attr('src', settings.app.images[1])
    $("#img_news_3").attr('src', settings.app.images[2])
    $("#img_news_4").attr('src', settings.app.images[3])
    $(".news_image").show();

    $("h1").css('background', settings.app.color);
    document.title = settings.app.title;
    $("#logo").show();
    $("#nav").show();
    $("#lbl_settings").text(JSON.stringify(settings, null, 2));

    // Set urls to JS libraries based on app url
    // These are overwritten so that the Okta Sign In Widget will also use these files
    $(".lib_jquery").attr('src', browser_address+'assets/js/jquery.min.js');
    $(".lib_dropotron").attr('src', browser_address+'assets/js/jquery.dropotron.min.js');
    $(".lib_browser").attr('src', browser_address+'assets/js/browser.min.js');
    $(".lib_break").attr('src', browser_address+'assets/js/breakpoints.min.js');
    $(".lib_util").attr('src', browser_address+'assets/js/util.js');
    $(".lib_main").attr('src', browser_address+'assets/js/main.js');
    $(".lib_app").attr('src', browser_address+'app.js');

    // Determine the event/state the app is handling based on url or localStorage
    var event = getParameterByName('event');
    if (event) {
      // Store the event/state in localstorage for browser and mobile to return to state after being redirected
      localStorage.setItem('event', event);
    } else {
      // If the url does not contain a new event/state, use the one from local storage
      event = localStorage.getItem('event');
    }
    
    // Handle the event/state and redirect where needed
    writeLog('*** Handling app event = '+ event);
    switch(event) {
      case 'login':
      // Event: Whenuser clicks the login button on home
        var login_code          = getParameterByName('code');
        if (login_code) {
          var login_scopes        = window.settings.okta.basic_scopes + ' ' + settings.okta.access_low_scope + ' offline_access'
          var login_redirecturi   = window.settings.urls.callbackurl;  
          getTokensWithCode(login_code, login_scopes, login_redirecturi, 'home');
        } else {
          startApp('home');  
        }
        break;

      case 'logout':
      // Event: When user clicks the logout button in the top menu
      window.localStorage.clear();
      window.location = 'index.html?event=home'
      break;

      case 'load_full_profile':
      // Event: Get full access token for revealing unmasked profile data
        authorisationCode   = getParameterByName('code');
        if (authorisationCode) {
        var redirectUri     = settings.urls.renewurl
        var requestedScopes   = settings.okta.basic_scopes + ' ' + settings.okta.access_full_scope
            getTokensWithCode(authorisationCode, requestedScopes, redirectUri, 'profile');
        } else {
          startApp('profile');  
        }
        break;

      case 'buy_step_1_load_data':
      // Event: Get full access token for revealing unmasked address on purchase
        authorisationCode   = getParameterByName('code');
        if (authorisationCode) {
        var redirectUri     = settings.urls.renewurl
        var requestedScopes   = settings.okta.basic_scopes + ' ' + settings.okta.access_full_scope
            getTokensWithCode(authorisationCode, requestedScopes, redirectUri, 'buy_step_1_load_data');
        } else {
          startApp('buy_step_1');  
        }
      
        break;

      case 'buy_step_2_afterpay':
      // Event: Get full access token for afterpay purchase
        authorisationCode   = getParameterByName('code');
        if (authorisationCode) {
        var redirectUri     = settings.urls.renewurl
        var requestedScopes   = settings.okta.basic_scopes + ' ' + settings.okta.access_full_scope
            getTokensWithCode(authorisationCode, requestedScopes, redirectUri, 'confirmation');
        } else {
          alert('Something went wrong, maybe no auth code?');
          startApp('confirmation');  
        }
        break;
      
      case 'buy':
        startApp('buy_step_1');
        break;

      case 'profile':
        startApp('profile');
        break;

      case 'pay':
        startApp('buy_step_2');
        break;

      case 'confirmation':
        startApp('buy_step_3');
        break;
 
      default:
        localStorage.removeItem('lastProductIndex')
        startApp('home');
    }    
  })

  function setProducts(productArray) {
    var lastProductIndex = localStorage.getItem('lastProductIndex')
    for (i = 0; i < 3; i++) {
      if (productArray[i].image) {
        $(".lbl_image_"+i).attr('src',productArray[i].image);
        $(".lbl_image_"+i).show();
      }
      $(".lbl_title_"+i).text(productArray[i].title);
      $(".lbl_subtitle_"+i).text(productArray[i].subtitle);
      $(".lbl_intro_"+i).text(productArray[i].intro);
      $(".lbl_price_"+i).text(productArray[i].price);
    }
    if (lastProductIndex) {
      lastProductIndex = parseInt(lastProductIndex);
      if (productArray[lastProductIndex].image) {
        $(".lbl_image_buy").attr('src',productArray[lastProductIndex].image);
        $(".lbl_image_buy").show();
      }
      $(".lbl_description_buy").text(productArray[lastProductIndex].description);
      $(".lbl_title_buy").text(productArray[lastProductIndex].title);
      $(".lbl_subtitle_buy").text(productArray[lastProductIndex].subtitle);
      $(".lbl_price_buy").text(productArray[lastProductIndex].price);
    }
  }


  // Execute user interaction with the application
  $(document).on('click', '.lnk_login', function(){
    // Login the user
    var codeVerifier        = generateCodeVerifier();
    var codeChallenge       = generateCodeChallenge(codeVerifier);
    var login_scopes        = settings.okta.basic_scopes + ' ' + settings.okta.access_low_scope + ' offline_access'
    var login_redirecturi   = settings.urls.callbackurl;
    localStorage.setItem('codeverifier', codeVerifier);
    localStorage.setItem('event', 'login')
    
    // Redirect to Okta and get authorization code
    getAuthorisationCode(codeChallenge, login_scopes, login_redirecturi);
  })

  $(document).on('click', '.lnk_okta_logout', function(){
    // End the Okta session
    alert('This will end your Okta session, to simulate the app not being used for a while. It does not logout the user from the app or invalidate the refresh token.');
    window.location         = settings.urls.oktalogout;
  })

  $(document).on('click', '.lnk_home', function(){
    // Go back to home
    window.location         = 'index.html?event=home'
  })

  $(document).on('click', '.lnk_loadprofile', function(){
    // Load the profile of the user with a full_access scoped token
    var codeVerifier        = generateCodeVerifier();
    var codeChallenge       = generateCodeChallenge(codeVerifier);
    var targetPage          = $(this).attr('targetPage');
    var login_redirecturi   = settings.urls.renewurl
    var login_scopes        = settings.okta.basic_scopes + ' ' + settings.okta.access_full_scope
    localStorage.setItem('event', targetPage)
    localStorage.setItem('codeverifier', codeVerifier);

    getAuthorisationCode(codeChallenge, login_scopes, login_redirecturi);
  })

  $(document).on('click', '.btn_product', function(){
    // Quick buy a product by clicking on the buy button per product
    var productIndex        = $(this).attr('productIndex');
    localStorage.setItem('lastProductIndex', productIndex);
    window.location         = 'index.html?event=buy'
  })

  $(document).on('click', '.lnk_register', function(){
    // Register buttonis clicked
    alert('This is included in the demo (yet) ... stay tuned!');
  })  

  $(document).on('click', '.lnk_tokens', function(){
    // Show and hide debug data like tokens and settings
    $(".cnt_tokens").slideToggle();
    if ($(".lnk_tokens").hasClass('fa-arrow-circle-up')===true) {
      $(".lnk_tokens").removeClass('fa-arrow-circle-up');
      $(".lnk_tokens").addClass('fa-arrow-circle-down');
    } else {
      $(".lnk_tokens").removeClass('fa-arrow-circle-down');
      $(".lnk_tokens").addClass('fa-arrow-circle-up');
    }
  })

  $(document).on('click', '.lnk_buy_prepay', function(){
    // Move to payment page
    window.location         = 'index.html?event=pay'  
  })

  $(document).on('click', '.lnk_buy_afterpay', function(){
    // Get full access scoped token for after pay option
    var codeVerifier        = generateCodeVerifier();
    var codeChallenge       = generateCodeChallenge(codeVerifier);
    var targetPage          = $(this).attr('targetPage');
    var requestedScopes     = window.settings.okta.basic_scopes + ' ' + settings.okta.access_full_scope
    var redirectUri         = window.settings.urls.renewurl

    localStorage.setItem('codeverifier', codeVerifier);
    localStorage.setItem('event', targetPage)
    getAuthorisationCode(codeChallenge, requestedScopes, redirectUri);
  })

  $(document).on('click', '.lnk_finishpayment', function(){
    // Move from payment to confirmation page
    window.location         = 'index.html?event=confirmation'  
  })

   $(document).on('click', '.btn_renewtokens', function(){
    // Get new low_access scoped token
    var refresh_token       = $("#lbl_refreshtoken").text();
    renewTokens(refresh_token);
  })

  // Event listeners for mobile, as the user returns to the app, a document ready is not fired
  // Listener: Handles callbacks with a authorization code so that the app will get the tokens from Okta
  document.addEventListener("deviceready", function () {
      universalLinks.subscribe('ul_callBack', function (eventData) {
        var authorisationCode   = getParameterFromString(eventData.url, 'code');
        var landingPage         = 'home'
        if (authorisationCode) {
          var requestedScopes   = settings.okta.basic_scopes + ' ' + settings.okta.access_low_scope + ' offline_access'
          var redirectUri       = settings.urls.callbackurl
          getTokensWithCode(authorisationCode, requestedScopes, redirectUri, landingPage);            
        } else {
          startApp(landingPage);
        }
    });
  });

  // cListener: Handles callbacks for full profile loads, both for profile page as well as in buying process
  document.addEventListener("deviceready", function () {
      universalLinks.subscribe('ul_fullaccess', function (eventData) {
      var redirectUri         = settings.urls.renewurl
      var requestedScopes     = settings.okta.basic_scopes + ' ' + settings.okta.access_full_scope
      var authorisationCode   = getParameterFromString(eventData.url, 'code');
      if (localStorage.getItem('event') == 'buy_step_1_load_data') {
        landingPage           = 'buy'
      } else {
        landingPage           = 'profile'
      }
          getTokensWithCode(authorisationCode, requestedScopes, redirectUri, landingPage);
      });
  });
