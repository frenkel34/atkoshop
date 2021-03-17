window.settings = {
	"okta": {
		"oktaurl": "https://finance.atkoinc.nl/",
		"clientid": "0oa1cewk0vC82i4kZ0x7",
		"authorizationserver": "default",
		"basic_scopes": "openid profile",
		"access_low_scope": "access_low",
		"access_full_scope": "access_full"
	},
	"urls": {}, // See settings below
	"app": {
		"run_local": false,
		"local_address": "http://localhost:8000",
		"hosted_address": "https://atkoinsurance.netlify.app",
		"name": "Atko Finance",
		"color": "#0000ff",
		"title": "Atko Insurance",
		"logging": true,
		"yourname": 'Ronald',
		"buy_label": "Sign up",
		"pay_label": "confirm",
		"ecommerce": true,
		"images": [
			"https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
			"https://images.pexels.com/photos/17739/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
			"https://images.pexels.com/photos/17679/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
			"https://images.pexels.com/photos/4475524/pexels-photo-4475524.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
			],
		"headers": {
			"profile": {
				"title": "Your profile",
				"subtitle": "This is what we got on you",
				"button_caption": "Home"
			},
			"unauthenticated": {
				"title": "Please login",
				"subtitle": "Check your policies and imvoices",
				"button_caption": "Lets do it"
			},
			"authenticated": {
				"title": "Your personal portal",
				"subtitle": "There is nothing you cant do here!",
				"button_caption": "Home"
			}

		}
	}
}

// Check if the code runs on mobile or in the browser
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(navigator.userAgent))
	{
		window.settings.urls.platform 		= 'mobile';
		window.settings.urls.url 			= 'nl.atkoinc.shop';
		window.settings.urls.renewurl 		= 'https://www.atkoinc.nl/renew';
		window.settings.urls.callbackurl 	= 'https://www.atkoinc.nl/callback';
// TODO: Figure out this logout url!
		window.settings.urls.oktalogout 	= settings.okta.oktaurl + '/login/signout?fromURI=https://www.atkoinc.nl/app/?message=okta session ended'
	} else {
		window.settings.platform 			= 'browser';
		if (settings.app.run_local == true) {
			browser_address = window.settings.app.local_address
		} else {
			browser_address = window.settings.app.hosted_address
		}
		window.settings.urls.url 			= browser_address;
		window.settings.urls.renewurl 		= browser_address;
		window.settings.urls.callbackurl 	= browser_address;
		window.settings.urls.oktalogout 	= settings.okta.oktaurl + '/login/signout?fromURI='+ settings.urls.url;
	}

if (settings.app.logging) {
	console.log('settings:');
	console.log(settings);
}

// Product settings
productArray = [{
	"title": "Retirement services",
	"subtitle": "Rest insured and covered",
	"image": "https://images.pexels.com/photos/1642883/pexels-photo-1642883.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
	"intro": "Our services specialy design for both young professionals as well as senior citizens, basicly everybody.",
	"price": '',
	"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at efficitur mauris. Quisque eros nulla, pulvinar ac efficitur non, tempor at ante. Etiam facilisis molestie magna, gravida maximus massa molestie ut. Nunc ac velit finibus, blandit purus sed, tempor erat. Aliquam posuere augue scelerisque rutrum congue. Donec quis finibus erat, a maximus ligula. Nulla hendrerit magna turpis, ut porta metus ornare nec. In sit amet mattis justo. In id fermentum ante, nec aliquam dolor. Vivamus ut mauris tempus tellus vulputate pharetra. Maecenas laoreet leo sapien, a aliquam orci accumsan eu. Nunc quis nulla rhoncus, convallis lectus id, posuere erat. Integer sit amet metus nec risus eleifend porta nec eget odio."
}, {
	"title": "Health insurance",
	"subtitle": "COVID-19 Vaccin covered",
	"image": "https://images.pexels.com/photos/4506109/pexels-photo-4506109.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
	"intro": "We have you covered, in these crazy times as well as any other time, we even have a 99% discount on first surgery.",
	"price": '',
	"description": "Proin elementum eget tellus at imperdiet. Phasellus pellentesque vulputate fringilla. Proin suscipit eleifend ligula sit amet porttitor. Etiam rhoncus purus magna, vitae dictum massa convallis non. Ut venenatis iaculis congue. Quisque blandit consequat lacus. Nulla tellus massa, egestas sed lacus eget, pharetra elementum orci. Cras placerat gravida cursus. Quisque dignissim rhoncus justo, nec ullamcorper magna. Aliquam volutpat lacus a eros eleifend cursus. Curabitur luctus enim turpis, nec venenatis nibh euismod et. Praesent vel enim ac lectus fermentum maximus a vitae eros. Morbi sagittis mi arcu, et fermentum augue viverra id. Donec luctus, sem sit amet mattis feugiat, ligula tellus sollicitudin mauris, quis fringilla risus tortor eget felis. Aliquam et viverra mauris."
}, {
	"title": "Car insurance",
	"subtitle": "All risk coverage 30% off",
	"image": "https://images.pexels.com/photos/620335/pexels-photo-620335.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
	"intro": "You are covered from open roads to dense city streets, your new sportscar as well as classics and junk-cars.",
	"price": '',
	"description": "Duis eleifend rhoncus odio quis ornare. Ut a tincidunt arcu. Cras suscipit at augue eget euismod. Maecenas imperdiet porta lorem sed vestibulum. Phasellus massa leo, laoreet non turpis in, efficitur sagittis mauris. Etiam maximus tincidunt velit, at accumsan arcu lacinia eget. Cras sodales purus feugiat mi ullamcorper aliquam. In dictum dui dui. Vivamus ac efficitur dui. Phasellus porta quis nisl nec auctor."
}];