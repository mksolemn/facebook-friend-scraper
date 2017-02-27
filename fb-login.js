/*********SETTINGS*********************/
var webPage = require('webpage');
var page = webPage.create();
page.settings.userAgent = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36';
page.settings.javascriptEnabled = true;
page.settings.loadImages = false;//Script is much faster with this field set to false
phantom.cookiesEnabled = true;
phantom.javascriptEnabled = true;
/*********SETTINGS END*****************/


var page = require('webpage').create();
page.open('http://facebook.com', function (status) {
    if (status === "success") {
        page.evaluate(function () {
            document.querySelector("input[name='email']").value = "email";
            document.querySelector("input[name='pass']").value = "pass";
            document.querySelector("#login_form").submit();

            console.log("Login submitted!");
        });
    }
});
