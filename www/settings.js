window.settings = {
	"okta": {
		"oktaurl": "https://account.atkoinc.nl",
		"clientid": "0oaxtw9c1nZuHph6c0h7",
		"authorizationserver": "default",
		"basic_scopes": "openid profile",
		"access_low_scope": "access_low",
		"access_full_scope": "access_full"
	},
	"urls": {}, // See settings below
	"app": {
		"run_local": false,
		"local_address": "http://localhost:8000",
		"hosted_address": "https://atkotrucks.netlify.app",
		"name": "Atko Trucks",
		"color": "#1251b5",
		"title": "Webshop: Atko",
		"logging": true,
		"yourname": 'Frank',
		"buy_label": "Buy Now",
		"pay_label": "Pay",
		"ecommerce": true,
		"images": [
			"https://www.volvotrucks.nl/content/dam/volvo/volvo-trucks/masters/press-releases/2020/feb/pr-2952-range/1860x1050-R2A8182.jpg",
			"https://www.volvotrucks.nl/content/dam/volvo/volvo-trucks/masters/press-releases/2020/feb/pr-2952-fmx/banner.jpg",
			"https://www.volvotrucks.nl/content/dam/volvo/volvo-trucks/masters/press-releases/2020/feb/pr-2952-fh/high-res-08A3977-FH-4x2-semi-trailer-long-haul-on-road.jpg",
			"https://www.volvotrucks.nl/content/dam/volvo/volvo-trucks/masters/press-releases/2020/feb/pr-2952-awareness/1860x1050-VTT_komp1_V001.jpg"
			],
		"headers": {
			"profile": {
				"title": "Your profile",
				"subtitle": "This is what we got on you",
				"button_caption": "Garage"
			},
			"unauthenticated": {
				"title": "Atko Trucks",
				"subtitle": "Login for crazy discounts",
				"button_caption": "Login"
			},
			"authenticated": {
				"title": "Howdy partner!",
				"subtitle": "Lets us know how we can help",
				"button_caption": "Garage"
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
	"title": "Atko FH",
	"subtitle": "Designed for international transport",
	"image": "https://www.volvotrucks.nl/nl-nl/trucks/trucks/new-heavy-duty-range/_jcr_content/root/responsivegrid/layoutcontainer_copy/columncontrol/parsys1/teaser.coreimg.jpeg/1582975923115/volvo-trucks-features-volvo-fh-frontview.jpeg",
	"intro": "Donec quis finibus erat, a maximus ligula. Nulla hendrerit magna turpis, ut porta metus ornare nec. In sit amet mattis justo. In id fermentum ante, nec aliquam dolor. Vivamus ut mauris tempus tellus vulputate pharetra. Maecenas laoreet leo sapien, a aliquam orci accumsan eu.",
	"price": '$ 115.000',
	"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at efficitur mauris. Quisque eros nulla, pulvinar ac efficitur non, tempor at ante. Etiam facilisis molestie magna, gravida maximus massa molestie ut. Nunc ac velit finibus, blandit purus sed, tempor erat. Aliquam posuere augue scelerisque rutrum congue. Donec quis finibus erat, a maximus ligula. Nulla hendrerit magna turpis, ut porta metus ornare nec. In sit amet mattis justo. In id fermentum ante, nec aliquam dolor. Vivamus ut mauris tempus tellus vulputate pharetra. Maecenas laoreet leo sapien, a aliquam orci accumsan eu. Nunc quis nulla rhoncus, convallis lectus id, posuere erat. Integer sit amet metus nec risus eleifend porta nec eget odio."
}, {
	"title": "Atko FH16",
	"subtitle": "Powerful and elegant",
	"image": "https://www.volvotrucks.nl/nl-nl/trucks/trucks/new-heavy-duty-range/_jcr_content/root/responsivegrid/layoutcontainer_copy/columncontrol/parsys2/teaser.coreimg.jpeg/1582975932582/volvo-trucks-features-volvo-fh16-frontview.jpeg",
	"intro": "Donec quis finibus erat, a maximus ligula. Nulla hendrerit magna turpis, ut porta metus ornare nec. In sit amet mattis justo. In id fermentum ante, nec aliquam dolor. Vivamus ut mauris tempus tellus vulputate pharetra. Maecenas laoreet leo sapien, a aliquam orci accumsan eu.",
	"price": '$ 144.000',
	"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at efficitur mauris. Quisque eros nulla, pulvinar ac efficitur non, tempor at ante. Etiam facilisis molestie magna, gravida maximus massa molestie ut. Nunc ac velit finibus, blandit purus sed, tempor erat. Aliquam posuere augue scelerisque rutrum congue. Donec quis finibus erat, a maximus ligula. Nulla hendrerit magna turpis, ut porta metus ornare nec. In sit amet mattis justo. In id fermentum ante, nec aliquam dolor. Vivamus ut mauris tempus tellus vulputate pharetra. Maecenas laoreet leo sapien, a aliquam orci accumsan eu. Nunc quis nulla rhoncus, convallis lectus id, posuere erat. Integer sit amet metus nec risus eleifend porta nec eget odio."
}, {
	"title": "Atko FM",
	"subtitle": "Comfort for on the road",
	"image": "https://www.volvotrucks.nl/nl-nl/trucks/trucks/new-heavy-duty-range/_jcr_content/root/responsivegrid/layoutcontainer_4627/columncontrol/parsys1/teaser.coreimg.jpeg/1582975946767/volvo-trucks-features-volvo-fm-frontview.jpeg",
	"intro": "Donec quis finibus erat, a maximus ligula. Nulla hendrerit magna turpis, ut porta metus ornare nec. In sit amet mattis justo. In id fermentum ante, nec aliquam dolor. Vivamus ut mauris tempus tellus vulputate pharetra. Maecenas laoreet leo sapien, a aliquam orci accumsan eu.",
	"price": '$221.500',
	"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at efficitur mauris. Quisque eros nulla, pulvinar ac efficitur non, tempor at ante. Etiam facilisis molestie magna, gravida maximus massa molestie ut. Nunc ac velit finibus, blandit purus sed, tempor erat. Aliquam posuere augue scelerisque rutrum congue. Donec quis finibus erat, a maximus ligula. Nulla hendrerit magna turpis, ut porta metus ornare nec. In sit amet mattis justo. In id fermentum ante, nec aliquam dolor. Vivamus ut mauris tempus tellus vulputate pharetra. Maecenas laoreet leo sapien, a aliquam orci accumsan eu. Nunc quis nulla rhoncus, convallis lectus id, posuere erat. Integer sit amet metus nec risus eleifend porta nec eget odio."
}];




