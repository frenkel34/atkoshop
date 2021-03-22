window.settings = {
	"okta": {
		"oktaurl": "https://account.atkoinc.nl",
		"clientid": "0oaxvw2ynlVA6FcgH0h7",
		"authorizationserver": "default",
		"basic_scopes": "openid profile",
		"access_low_scope": "access_low",
		"access_full_scope": "access_full"
	},
	"urls": {}, // See settings below
	"app": {
		"run_local": false,
		"local_address": "http://localhost:8000",
		"hosted_address": "https://tototrucks.netlify.app",
		"name": "Shop Toto",
		"color": "#000000",
		"title": "Webshop: Toto",
		"logging": true,
		"yourname": 'Terry Tate',
		"buy_label": "Buy Now",
		"pay_label": "Pay",
		"ecommerce": true,
		"images": [
			"https://www.macktrucks.com/-/media/images/blog-images/pps_1648_cropped.png",
			"https://www.macktrucks.com/-/media/images/blog-images/colinmcguire_adm0119_a_e5a2965-thumb.jpg",
			"https://www.macktrucks.com/-/media/images/blog-images/heavy-lifting-required-thumb-large.jpg",
			"https://www.macktrucks.com/-/media/images/blog-images/pps_1648_cropped.png"
			],
		"headers": {
			"profile": {
				"title": "Your profile",
				"subtitle": "This is what we got on you",
				"button_caption": "Start"
			},
			"unauthenticated": {
				"title": "Toto Trucks",
				"subtitle": "Own it!",
				"button_caption": "Sign on"
			},
			"authenticated": {
				"title": "Howdy partner!",
				"subtitle": "Lets us know how we can help",
				"button_caption": "Start"
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
	"title": "Toto Mayhem",
	"subtitle": "Born of the American spirit",
	"image": "https://www.macktrucks.com/-/media/images/product-images/trucks/anthem_card.png",
	"intro": "Donec quis finibus erat, a maximus ligula. Nulla hendrerit magna turpis, ut porta metus ornare nec. In sit amet mattis justo. In id fermentum ante, nec aliquam dolor. Vivamus ut mauris tempus tellus vulputate pharetra. Maecenas laoreet leo sapien, a aliquam orci accumsan eu.",
	"price": '$ 99.000',
	"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at efficitur mauris. Quisque eros nulla, pulvinar ac efficitur non, tempor at ante. Etiam facilisis molestie magna, gravida maximus massa molestie ut. Nunc ac velit finibus, blandit purus sed, tempor erat. Aliquam posuere augue scelerisque rutrum congue. Donec quis finibus erat, a maximus ligula. Nulla hendrerit magna turpis, ut porta metus ornare nec. In sit amet mattis justo. In id fermentum ante, nec aliquam dolor. Vivamus ut mauris tempus tellus vulputate pharetra. Maecenas laoreet leo sapien, a aliquam orci accumsan eu. Nunc quis nulla rhoncus, convallis lectus id, posuere erat. Integer sit amet metus nec risus eleifend porta nec eget odio."
}, {
	"title": "Toto Rock",
	"subtitle": "carry heavy loads while staying nimble",
	"image": "https://www.macktrucks.com/-/media/images/product-images/trucks/granite_card4.png",
	"intro": "Donec quis finibus erat, a maximus ligula. Nulla hendrerit magna turpis, ut porta metus ornare nec. In sit amet mattis justo. In id fermentum ante, nec aliquam dolor. Vivamus ut mauris tempus tellus vulputate pharetra. Maecenas laoreet leo sapien, a aliquam orci accumsan eu.",
	"price": '$ 180.000',
	"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at efficitur mauris. Quisque eros nulla, pulvinar ac efficitur non, tempor at ante. Etiam facilisis molestie magna, gravida maximus massa molestie ut. Nunc ac velit finibus, blandit purus sed, tempor erat. Aliquam posuere augue scelerisque rutrum congue. Donec quis finibus erat, a maximus ligula. Nulla hendrerit magna turpis, ut porta metus ornare nec. In sit amet mattis justo. In id fermentum ante, nec aliquam dolor. Vivamus ut mauris tempus tellus vulputate pharetra. Maecenas laoreet leo sapien, a aliquam orci accumsan eu. Nunc quis nulla rhoncus, convallis lectus id, posuere erat. Integer sit amet metus nec risus eleifend porta nec eget odio."
}, {
	"title": "Toto RL",
	"subtitle": "carry heavy loads while staying nimble",
	"image": "https://www.macktrucks.com/-/media/images/product-images/trucks/lr_card4.png",
	"intro": "Donec quis finibus erat, a maximus ligula. Nulla hendrerit magna turpis, ut porta metus ornare nec. In sit amet mattis justo. In id fermentum ante, nec aliquam dolor. Vivamus ut mauris tempus tellus vulputate pharetra. Maecenas laoreet leo sapien, a aliquam orci accumsan eu.",
	"price": '$288.500',
	"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at efficitur mauris. Quisque eros nulla, pulvinar ac efficitur non, tempor at ante. Etiam facilisis molestie magna, gravida maximus massa molestie ut. Nunc ac velit finibus, blandit purus sed, tempor erat. Aliquam posuere augue scelerisque rutrum congue. Donec quis finibus erat, a maximus ligula. Nulla hendrerit magna turpis, ut porta metus ornare nec. In sit amet mattis justo. In id fermentum ante, nec aliquam dolor. Vivamus ut mauris tempus tellus vulputate pharetra. Maecenas laoreet leo sapien, a aliquam orci accumsan eu. Nunc quis nulla rhoncus, convallis lectus id, posuere erat. Integer sit amet metus nec risus eleifend porta nec eget odio."
}];




