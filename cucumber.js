module.exports = {
    default: {
      require: ['tests/steps/*.ts'], // Path to step definitions
      format: ['progress', 'json:reports/cucumber-report.json'], // Output report formats
      paths: ['tests/features/*.feature'], // Path to feature files
      requireModule: ['ts-node/register'], // Enable TypeScript support
    },
  };