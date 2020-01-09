
const wdio = require("webdriverio");

const should = require('chai').should();
const expect = require('chai').expect;
const assert = require('chai').assert;

const opts = {
  host: 'localhost',
  port: 4723,
  capabilities: {
    platformName: "Android",
    platformVersion: "10",
    deviceName: "pixel",
    udid:"711KPED0603148",
    //app: "/path/to/the/downloaded/ApiDemos.apk",//
    appPackage: "com.insomniacookies.insomnia",
    appActivity: "com.insomniacookies.insomnia.MainActivity",
    automationName: "UiAutomator2",
    noReset: true,
  }
};


async function main () {
  try{
    let driver = await wdio.remote(opts);
    setTimeout(async () => {
      let el1 = await driver.$("android.widget.Button");
      await el1.click();
      let el2 = await driver.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View[2]/android.view.View/android.view.View/android.view.View[8]');
      await el2.click();
      let el3 = await driver.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View/android.view.View[1]/android.view.View[4]/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[1]'); 
      await el3.click();

      let el4 = await driver.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View/android.view.View[1]/android.view.View[4]/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[3]/android.widget.EditText');
      let el5 = await driver.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View/android.view.View[1]/android.view.View[4]/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[4]/android.widget.EditText');
      let el6 = await driver.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View/android.view.View[1]/android.view.View[4]/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[5]/android.widget.EditText');
      let el7 = await driver.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View/android.view.View[1]/android.view.View[4]/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[6]');
      let el8 = await driver.$('/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.ListView/android.widget.CheckedTextView[3]');
      let el9 = await driver.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View/android.view.View[1]/android.view.View[4]/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[7]/android.widget.EditText');
      let order = await driver.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View/android.view.View[1]/android.view.View[4]/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.widget.EditText');
      
      await order.setValue('1000');
      await el4.setValue('Ramesh');
      await el5.setValue('ramesh.rathod01@gmail.com');
      await el6.setValue('8888888888');
      await el7.click();
      await el8.click();
      await el9.setValue('Nothing in mind');
      const value = await order.getText();
      assert.equal(value, '1000');

      console.log('Driver Status ==>', await driver.status())

    }, 1000); 
  }catch(e){
    console.log(e);
  }

  // let el1 = driver.element("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View/android.view.View[1]/android.view.View[2]/android.view.View/android.widget.Button");
  // elementTwo.click();
  // let el2 = driver.$$("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View[2]/android.view.View/android.view.View/android.view.View[8]");
  // el2.click();
  // let el3 = driver.$$("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View/android.view.View[1]/android.view.View[4]/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[1]");
  // el3.click();
  // let el4 = driver.$$("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View/android.view.View[1]/android.view.View[4]/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.widget.EditText");
  // el4.setValue("1002");





  
}

main();
