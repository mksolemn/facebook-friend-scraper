Facebook friendlist scraper. Collect friend data using phantomjs and casperjs.
Data is collected and stored in an object array. You can preview screenshots to see how program functions.

How to use ?

1. Add your username and password to script. You will need to login to use the scraper;

casper.then(function () {

	console.log("---------------------------------");
	console.log("STEP #2 - Login using username and password");

	this.evaluate(function () {
		document.getElementById("email").value = "****";
		document.getElementById("pass").value = "****";
		document.getElementById("loginbutton").children[0].click();
	});
	this.wait(pageWaitTime, function () {
		this.capture('1AfterLogin.png');
	});
});

2. run: casperjs casper-test.js
