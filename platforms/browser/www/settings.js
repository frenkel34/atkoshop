window.settings = {
	"okta": {
		"oktaurl": "https://auth.atkoinc.nl",
		"clientid": "0oa5i4euoIg19ZWRq416",
		"authorizationserver": "default",
		"basic_scopes": "openid profile",
		"access_low_scope": "access_low",
		"access_full_scope": "access_full"
	},
	"urls": {}, // See settings below
	"app": {
		"name": "Atko Shop",
		"color": "#ff4486",
		"title": "Atko Shop: Till u drop!",
		"logging": true,
		"yourname": 'Frank',
		"buy_label": "Buy Now",
		"pay_label": "Pay up",
		"ecommerce": true,
		"images": [
			"https://www.carmax.com/~/media/images/carmax/com/articles/best-luxury-cars/07-2018-mercedes-benz-c-class-amg-c63-s.jpg",
			"https://www.carmax.com/~/media/images/carmax/com/articles/best-luxury-cars/09-2018-audi-s5-sportback-premium-plus_evox.jpg",
			"https://www.carmax.com/~/media/images/carmax/com/articles/best-luxury-cars/05-2020-bmw-4-series-m4_evox.jpg",
			"https://www.carmax.com/~/media/images/carmax/com/articles/best-luxury-cars/04-2018-porsche-panamera-4s-executive_12595_cc1280_032_0l.jpg"
			]
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
		window.settings.urls.url 			= 'http://localhost:8000';
		window.settings.urls.renewurl 		= 'http://localhost:8000';
		window.settings.urls.callbackurl 	= 'http://localhost:8000';
		window.settings.urls.oktalogout 	= settings.okta.oktaurl + '/login/signout?fromURI='+ settings.urls.url;
	}

if (settings.app.logging) {
	console.log('settings:');
	console.log(settings);
}

// Product settings
productArray = [{
	"title": "X556TX-33",
	"subtitle": "Model year 2024",
	"image": "https://www.carmax.com/~/media/images/carmax/com/articles/best-sports-cars/10-2018-bmw-3-series-m3_evox.jpg",
	"intro": "This latest model is now available for pre-order, is brand new. With 10k HP ...",
	"price": '$ 115.000',
	"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at efficitur mauris. Quisque eros nulla, pulvinar ac efficitur non, tempor at ante. Etiam facilisis molestie magna, gravida maximus massa molestie ut. Nunc ac velit finibus, blandit purus sed, tempor erat. Aliquam posuere augue scelerisque rutrum congue. Donec quis finibus erat, a maximus ligula. Nulla hendrerit magna turpis, ut porta metus ornare nec. In sit amet mattis justo. In id fermentum ante, nec aliquam dolor. Vivamus ut mauris tempus tellus vulputate pharetra. Maecenas laoreet leo sapien, a aliquam orci accumsan eu. Nunc quis nulla rhoncus, convallis lectus id, posuere erat. Integer sit amet metus nec risus eleifend porta nec eget odio."
}, {
	"title": "XST3 GT",
	"subtitle": "Tomorrows future on four wheels",
	"image": "https://www.carmax.com/~/media/images/carmax/com/articles/best-awd-cars/07-2018-dodge-charger-rt_evox_newnew.jpg",
	"intro": "The latest addition to the XST family at Audi and never as fast as this one. Offered with a online only 'no test-drive' discount ...",
	"price": '$ 44.000',
	"description": "Proin elementum eget tellus at imperdiet. Phasellus pellentesque vulputate fringilla. Proin suscipit eleifend ligula sit amet porttitor. Etiam rhoncus purus magna, vitae dictum massa convallis non. Ut venenatis iaculis congue. Quisque blandit consequat lacus. Nulla tellus massa, egestas sed lacus eget, pharetra elementum orci. Cras placerat gravida cursus. Quisque dignissim rhoncus justo, nec ullamcorper magna. Aliquam volutpat lacus a eros eleifend cursus. Curabitur luctus enim turpis, nec venenatis nibh euismod et. Praesent vel enim ac lectus fermentum maximus a vitae eros. Morbi sagittis mi arcu, et fermentum augue viverra id. Donec luctus, sem sit amet mattis feugiat, ligula tellus sollicitudin mauris, quis fringilla risus tortor eget felis. Aliquam et viverra mauris."
}, {
	"title": "Proto type 21",
	"subtitle": "Arnold Schwarzenegger version",
	"image": "https://www.carmax.com/~/media/images/carmax/com/articles/best-sports-cars/08-mazda-mx-5-miata--new.jpg",
	"intro": "The newest model in a line of older models that will blow your mind and knock you off you feet, for real...",
	"price": '$21.500',
	"description": "Duis eleifend rhoncus odio quis ornare. Ut a tincidunt arcu. Cras suscipit at augue eget euismod. Maecenas imperdiet porta lorem sed vestibulum. Phasellus massa leo, laoreet non turpis in, efficitur sagittis mauris. Etiam maximus tincidunt velit, at accumsan arcu lacinia eget. Cras sodales purus feugiat mi ullamcorper aliquam. In dictum dui dui. Vivamus ac efficitur dui. Phasellus porta quis nisl nec auctor."
}];


