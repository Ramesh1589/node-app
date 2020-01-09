
const wdio = require("webdriverio");

const should = require('chai').should();
const expect = require('chai').expect;
const assert = require('chai').assert;

const opts = {
  host: 'localhost',
  port: 4723,
  capabilities: {
    platformName: "Android",
    platformVersion: "5.1.1",
    deviceName: "Pixel",
    udid:"3204cb2c4d75c03b",
    //app: "/path/to/the/downloaded/ApiDemos.apk",//
    appPackage: "com.insomniacookies.insomnia",
    appActivity: "com.insomniacookies.insomnia.MainActivity",
    automationName: "UiAutomator2",
    noReset: true,
  }
};

// before(async() =>  {
//   let client = await wdio.remote(opts);
//});

describe('APPIUM DEMO Testing', function() {
  it("Demo Test", async function(done) {
    this.timeout(15000);
    let client = await wdio.remote(opts);
    let fields = client.$("android.widget.EditText");

    // const field =  client.$("android.widget.EditText");
    console.log("Fields --->", fields)
    done()
  });
});  