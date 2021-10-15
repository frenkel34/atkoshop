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
		"run_local": true,
		"local_address": "http://localhost:8000",
		"hosted_address": "https://bluemp3.netlify.app",
		"name": "BlueMp3",
		"color": "#ff4486",
		"title": "MP3 speler kopen?",
		"logging": true,
		"yourname": 'Pieter',
		"buy_label": "Nu kopen",
		"pay_label": "Naar kassa",
		"ecommerce": true,
		"images": [
			"https://image.coolblue.nl/max/500x500/products/1366184",
			"https://image.coolblue.nl/max/500x500/products/1411024",
			"https://image.coolblue.nl/max/500x500/products/1386748",
			"https://image.coolblue.nl/max/500x500/products/1390853"
			],
		"headers": {
			"profile": {
				"title": "Your profile",
				"subtitle": "This is what we got on you",
				"button_caption": "Home"
			},
			"unauthenticated": {
				"title": "Please login",
				"subtitle": "Registered users get crazy discounts",
				"button_caption": "Lets do it"
			},
			"authenticated": {
				"title": "Welcome to our lil' webshop",
				"subtitle": "Happy shopping, go nuts!",
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
	"title": "Sony NW-A55L ",
	"subtitle": "Blauw",
	"image": "https://image.coolblue.nl/max/500x500/products/1390853",
	"intro": "Met de Sony NW-A55L heb je altijd je favoriete nummers op zak.",
	"price": '199,99',
	"description": "Met de Sony NW-A55L heb je altijd je favoriete nummers op zak. Dankzij Hi-res audio luister je naar muziek zoals de artiest het bedoeld heeft. Via bluetooth verbind je de mp3 speler draadloos aan een koptelefoon of oordopjes. Wanneer het geheugen van 16 GB niet genoeg is voor jou, breid je deze uit via een micro SD kaart. Je hoeft niet bang te zijn dat je zonder mp3 speler komt te zitten. De batterij gaat namelijk tot 45 uur mee. Je bedient het apparaat eenvoudig met het touchscreen."
}, {
	"title": "Apple iPod Touch",
	"subtitle": "modeljaar 2019 - 32 GB Zilver",
	"image": "https://image.coolblue.nl/max/500x500/products/1386747",
	"intro": "Ontdek de wereld van Augmented Reality games met Apple iPod Touch 2019 32 GB.",
	"price": '214,00',
	"description": "Ontdek de wereld van Augmented Reality games met Apple iPod Touch 2019 32 GB. Dankzij de vernieuwde A10 Fusion chip speel je ieder spel zonder problemen. De beelden worden haarscherp weergegeven op het 4 inch Retina scherm. Met 32 GB opslagcapaciteit heb je ruimte om je muziek te downloaden en op te slaan op je apparaat. Zo luister je ook offline naar jouw favoriete deuntjes. Het geluid van je muziek, games en media beluister je draadloos. Apple iPod Touch is namelijk compatibel met Apple AirPods 2. Je beschikt over het iOS 12 besturingssysteem. Daardoor download je apps uit de App Store en voer je FaceTime gesprekken. Wil je even een foto naar je vrienden sturen? Dat doe je met de 1.2 megapixel selfie camera en de 8 megapixel camera op de achterkant."
}, {
	"title": "Difrnce MP855",
	"subtitle": "4GB Zilver",
	"image": "https://image.coolblue.nl/max/500x500/products/705545",
	"intro": "De Difrnce MP855 is een compacte, lichtgewicht mp3 speler.",
	"price": '29,00',
	"description": "De Difrnce MP855 is een compacte, lichtgewicht mp3 speler. Met de clip aan de achterkant klem je de speler eenvoudig aan je broeksriem of tas. Op het LCD scherm bekijk je informatie over het huidige nummer en navigeer je eenvoudig tussen artiesten en afspeellijsten. Door de centrale positie van de bedieningsknoppen is de mp3 speler blindelings te bedienen. Op het interne geheugen van 4 GB is ruimte voor ongeveer 1000 mp3's. Dit is voldoende voor uren luisterplezier. De MP855 wordt geleverd met bijpassende oordopjes, zo geniet je direct van je favoriete artiest."
}];




