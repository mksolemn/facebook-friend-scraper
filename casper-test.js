var casper = require('casper').create({
	pageSettings: {
		loadImages: true,//The script is much faster when this field is set to false
		loadPlugins: true,
		logLevel: 'debug',
		userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36'
	}
});
var pageWaitTime = 2000;
var scrollWaitTime = 1841 / 20;// amount of friends / 20
var profileArray = [];

//First step is to open Facebook
casper.start().thenOpen("https://facebook.com", function () {

	console.log("\n---------------------");
	console.log("STEP #1 - Facebook website opened");

});

//Now we have to populate username and password, and submit the form
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

casper.then(function () {

	this.page.injectJs('jquery-3.1.1.min.js');

	console.log("---------------------------------");
	console.log("STEP #3 - Navigate to profile page");

	this.evaluate(function () {
		$('img[id^="profile_pic_header"]').click();
	});
	this.wait(pageWaitTime, function () {
		this.capture('2AfterProfileNavigation.png');
	});
});

casper.then(function () {

	console.log("---------------------------------");
	console.log("STEP #4 - Navigate to friend list");

	this.evaluate(function () {
		// navigate to friend list
		document.querySelector('[data-tab-key="friends"]').click();
	});

	this.wait(pageWaitTime, function () {
		this.capture('3AfterFriendsNavigation.png');
	});
});

casper.then(function () {

	console.log("---------------------------------");
	console.log("STEP #5 - Scroll through friend list");

	var getUsers = this.evaluate(function () {
		var waitCalc = parseFloat((document.querySelector('[data-tab-key="friends"] > span').textContent).replace(',', '')) / 20;
		var dataObjectArray = [];
		function runDem() {
			return setTimeout(function () {
				window.scrollBy(0, 1000);
				runDem();
			}, 1000);
			addToArray();
		}
		runDem();
		var profileElement = document.querySelectorAll('.uiProfileBlockContent');
		for (var i = 1; i <= profileElement.length; i += 1) {
			dataObjectArray.push({ 'name': profileElement[i] });
		}

		return dataObjectArray;
	});

	// move values to global array
	profileArray = getUsers;

	this.wait(1500, function () {
		console.log('Collected data');
		this.capture('AfterScroll.png');
	});

});


// pass data  to json object file
casper.then(function () {

	this.page.injectJs('jquery-3.1.1.min.js');

	console.log("---------------------------------");
	console.log("STEP #6 - post Json data");
	console.log(profileArray);

	var postData = this.evaluate(function () {

		return console.log($('#fb-timeline-cover-name'));

	});


});


casper.then(function () {
	console.log("\n---------------------");
	console.log("Finished");

});

// output browser console
casper.on('remote.message', function (message) {
	this.echo(message);
});

casper.run();
