<!-- PROJECT LOGO -->
<br /> 
<p align="center">
  <a href="https://github.com/frenkel34/atkoshop">
    <img src="https://atkoshop.netlify.app/images/icon.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">AtkoShop</h3>

  <p align="left">
    This is a demonstration of the use of redacted access tokens combined with Okta as an Authorization server. It uses a Javascript application that is build on top of Apache Cordova, enabling the code to be compiled to both web as well as mobile (iOS tested).<br />
    <br />
    The concepts demonstrated are:
    <ul>
    	<li>Single code base for web and mobile (Apache Cordova)</li>
    	<li>Authentication with Okta via Authorization code flow with PKCE</li>
    	<li>Redacted access tokens to prevent PII spill and fraud</li>
    	<li>Seamless end user experience with everlasting refresh tokens</li>
    </ul>
    <br />
    <strong>NOTE: This is a demo, and the code is not tested nor written to be used in production!</strong>
    <br />
    <a href="https://github.com/frenkel34/atkoshop/issues">Report Bug</a><br />
    <a href="https://github.com/frenkel34/atkoshop/issues">Request Feature</a>
  </p>
</p>

## Step by step deployment
This guide will enable you to setup both the web application as well as the iOS application (Apple developer account required).

###### Install the required components
To be able to compile and run these apps, ensure these components are up to date and ready to go:

1. Install Homebrew. Follow the steps on [the How to Install Homebrew on a Mac instruction guide to install Homebrew](https://treehouse.github.io/installation-guides/mac/homebrew)

2. Install Node.js if it is not already present
```
brew install node
```

3. Install Cordova via NPM (installed as part of Node.js)
```
npm install -g cordova
```

4. Install Xcode: [instructions here](https://apps.apple.com/us/app/xcode/id497799835)

###### Setup Cordova
These steps will setup the framework in which we will build the project.

5. Create a blank Cordova project using the command-line tool. Navigate to the directory where you wish to create your project and type:
```
cordova create Atkoshop
```

6. After creating a Cordova project, navigate to the project directory. From the project directory, you need to add a platform for which you want to build your app.

```
cordova platform add browser
cordova platform add ios
```

7. Now the platforms are there, you can copy the files from this repo into the file structure and start playing around. To check if all is well, run the browser app like this.
```
cordova run browser
```

8. The app should be running and open in a new browser.




## License
Distributed under the MIT License. See `LICENSE` for more information.

## Contact
Author: Frank Benus - [LinkedIn](https://www.linkedin.com/in/fbenus/) - atkoshop@okta-demo.nl
Example: [Netlify live demo](https://atkoshop.netlify.app)
Project Link: [https://github.com/frenkel34/atkoshop](https://github.com/frenkel34/atkoshop)
