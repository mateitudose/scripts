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

function loop() {

    var privateKey = new bitcore.PrivateKey();

    var address = privateKey.toAddress();

    console.log("This is the private key: " + privateKey);

    console.log("This is the public address: " + address);

    function check_balance() {
        return new Promise((resolve, reject) => {

            driver.get("https://explorer.bitcoin.com/btc/address/" + address);

            let balance_amount = driver.findElement(webdriver.By.className("amount")).getText();

            if (balance_amount > 0) {
                resolve('This wallet has ' + balance_amount + ' Bitcoins.');
            }
            else {
                reject('0 Bitcoins!');
            }

        });

    }

    check_balance().then((message) => {

        console.log(message);

    }).catch((message) => {

        console.log(message);

    })

    function finish_process() {
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                resolve();
            }, 4000);
        }).catch((error) => {
            console.log('Unexpected error occured: ' + error);
        })
    }

    let restart = finish_process().then(function () {
        setTimeout(function () {
            console.log('Reinitializing process...')
        }, 3000);

    })
}

var number = 0;
var intervalId = setInterval(twentySeconds, 20000);

function twentySeconds() {
    if (number <= 1) { //(number <= x), where x is the number of times the program should execute - 1
        loop();
        number++;
        console.log('Try number: ' + number);
    }
    else {
        clearInterval(intervalId)
        console.log('Closing program!')
        driver.quit(); //close browser and quit program
    }
}
