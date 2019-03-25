module.exports = {
  collectCoverageFrom: [
    // 'app/**/*.{js,jsx}',
    // 'app/containers/CalculatorPage/*.{js,jsx}',
    // 'app/containers/CalculatorPage/testcase.biz.{js,jsx}',
    // 'app/containers/CalculatorPage/calculator.biz.{js,jsx}',
    // 'app/containers/CalculatorPage/reducer.{js,jsx}',
    // 'app/containers/CalculatorPage/actions.{js,jsx}',
    // 'app/containers/CalculatorPage/selectors.{js,jsx}',
    'app/containers/CalculatorPage/Calculator.{js,jsx}',
    '!app/**/*.test.{js,jsx}',
    '!app/*/RbGenerated*/*.{js,jsx}',
    '!app/app.js',
    '!app/global-styles.js',
    '!app/*/*/Loadable.{js,jsx}',
  ],
  coverageThreshold: {
    global: {
      statements: 98,
      branches: 91,
      functions: 98,
      lines: 98,
    },
  },
  moduleDirectories: ['node_modules', 'app'],
  moduleNameMapper: {
    '.*\\.(css|less|styl|scss|sass)$': '<rootDir>/internals/mocks/cssModule.js',
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/internals/mocks/image.js',
  },
  setupTestFrameworkScriptFile: '<rootDir>/internals/testing/test-bundler.js',
  setupFiles: ['raf/polyfill', '<rootDir>/internals/testing/enzyme-setup.js'],
  // testRegex: 'tests/.*\\.test\\.js$',
  // testRegex: 'app/containers/CalculatorPage/tests/.*\\.test\\.js$',
  // testRegex:
  //   'app/containers/CalculatorPage/tests/calculator\\.biz\\.test\\.js$',
  // testRegex: 'app/containers/CalculatorPage/tests/actions\\.test\\.js$',
  // testRegex: 'app/containers/CalculatorPage/tests/reducer\\.test\\.js$',
  // testRegex: 'app/containers/CalculatorPage/tests/selector\\.test\\.js$',
  testRegex: 'app/containers/CalculatorPage/tests/dom\\.test\\.js$',
  snapshotSerializers: ['enzyme-to-json/serializer'],
};
