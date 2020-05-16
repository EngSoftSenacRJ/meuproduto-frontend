// @ts-nocheck

// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

/**
 * @type { import("protractor").Config }
 */
exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './src/login-admin.e2e-spec.ts',
    './src/pesquisa.e2e-spec.ts',
    './src/loja.e2e-spec.ts',
    './src/produto.e2e-spec.ts',
  ],
  
  capabilities: {
    browserName: 'chrome'
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json')
    });

    var fs = require('fs-extra');
    fs.emptyDir('screenshots/', function (err) {
             console.log(err);
         });
    jasmine.getEnv().addReporter({
             specDone: function(result) {
                 if (result.status == 'failed') {
                     browser.getCapabilities().then(function (caps) {
                         var browserName = caps.get('browserName');
    browser.takeScreenshot().then(function (png) {
                             var stream = fs.createWriteStream('screenshots/' + browserName + '-' + result.fullName+ '.png');
                             stream.write(new Buffer.from(png, 'base64'));
                             stream.end();
                         });
                     });
                 }
             }
         });



    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
    
    var jasmineReporters = require('jasmine-reporters');
    jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
      consolidateAll: true,
      filePrefix: 'guitest-xmloutput',
      savePath: '.'
}));

  },
  onComplete: function() {
    var browserName, browserVersion;
    var capsPromise = browser.getCapabilities();

  capsPromise.then(function (caps) {
       browserName = caps.get('browserName');
       browserVersion = caps.get('version');
      var platform = caps.get('platform');
  var HTMLReport = require('protractor-html-reporter-2');
  var testConfig = {
           reportTitle: 'Protractor Test Execution Report',
           outputPath: './',
           outputFilename: 'ProtractorTestReport',
           screenshotPath: './screenshots',
           testBrowser: browserName,
           browserVersion: browserVersion,
           modifiedSuiteName: false,
           screenshotsOnlyOnFailure: true,
           testPlatform: platform
       };
       new HTMLReport().from('guitest-xmloutput.xml', testConfig);
   });

}

};