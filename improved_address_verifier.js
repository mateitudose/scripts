require('geckodriver');

var webdriver = require('selenium-webdriver');

var chrome = require('selenium-webdriver/chrome');

var firefox = require('selenium-webdriver');

var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .setFirefoxOptions( /* … */)
    .setChromeOptions( /* … */)
    .build();

const bitcore = require('bitcore-lib');

var privateKey = new bitcore.PrivateKey();

var address = privateKey.toAddress();

console.log("This is the private key: " + privateKey);

console.log("This is the public address: " + address);

let check_balance = new Promise((resolve, reject) => {

    driver.get("https://explorer.bitcoin.com/btc/address/" + address);

    let balance_amount = driver.findElement(webdriver.By.className("amount")).getText();

    if (balance_amount > 0) {
        resolve('This wallet has ' + balance_amount + ' Bitcoins.');
    }
    else {
        reject('0 Bitcoins!');
    }

})

check_balance.then((message) => {

    console.log(message);

}).catch((message) => {

    console.log(message);

})

setTimeout(function () {
    driver.quit();
}, 8000);
