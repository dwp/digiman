const webpackConfigDigiman = require('./webpack.test.js');

module.exports = function(config) {
  config.set({
    basePath: './',
    plugins: [
      'karma-webpack',
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-json-fixtures-preprocessor',
      'karma-spec-reporter'
    ],
    files: [
      'node_modules/isomorphic-fetch/',
      'node_modules/govuk-frontend/',
      'test/definitions/*.json',
      { pattern: 'app/**/*.ts', watched: true, served: true, included: false, nocache: false },
      { pattern: 'test/**/*.spec.js', watched: true, served: true, included: true },
    ],
    autoWatch: true,
    singleRun: false,
    failOnEmptyTestSuite:false,
    logLevel: config.LOG_ERROR, //config.LOG_DISABLE, config.LOG_ERROR, config.LOG_INFO, config.LOG_DEBUG
    frameworks: ['jasmine'],
    browsers: ['ChromeHeadless'/*,'PhantomJS','Firefox','Edge','ChromeCanary','Opera','IE','Safari'*/],
    listenAddress: '0.0.0.0',
    hostname: 'localhost',
    port: 9876,
    retryLimit: 0,
    browserDisconnectTimeout: 5000,
    browserNoActivityTimeout: 15000,
    captureTimeout: 60000,
    client: {
      //capture all console output and pipe it to the terminal, true is default
      captureConsole: true,
      //if true, Karma clears the context window upon the completion of running the tests, true is default
      clearContext:false,
      //run the tests on the same window as the client, without using iframe or a new window, false is default
      runInParent: false,
      //true: runs the tests inside an iFrame; false: runs the tests in a new window, true is default
      useIframe:true,
      jasmine:{
        //tells jasmine to run specs in semi random order, false is default
        random: false
      }
    },
    jsonFixturesPreprocessor: {
        variableName: 'mocks',
        camelizeFilenames: true
    },
    preprocessors: {
      //use webpack to support require() in test-suits .js files
      //use babel-loader from webpack to compile es2015 features in .js files
      //add webpack as preprocessor
      './test/**/*.spec.js': ['webpack'],
      './test/definitions/*.json': ['json_fixtures']
    },
    webpackMiddleware: {
      stats: {
        assets: false,
        children: false,
        chunks: false,
        colors: true,
        entrypoints: false,
        hash: false,
        modules: false,
        publicPath: false,
        reasons: false,
        source: false,
        timings: false,
        version: false
      },
      logLevel: 'warn'
    },
    webpack: webpackConfigDigiman,
    reporters: ['spec'],
    specReporter: {
        maxLogLines: 10,            // limit number of lines logged per test
        suppressErrorSummary: true, // do not print error summary
        suppressFailed: false,      // do not print information about failed tests
        suppressPassed: false,      // do not print information about passed tests
        suppressSkipped: true,      // do not print information about skipped tests
        showSpecTiming: false,      // print the time elapsed for each spec
        failFast: false              // test would finish with error when a first fail occurs.
    }
  });
};
