module.exports = {
  default: {
      requireModule: ['ts-node/register'], // Włącza obsługę TypeScript
      require: ['tests/steps/*.ts', 'tests/hooks/*.ts'], // Ścieżka do plików z krokami (steps)
      format: ['progress', 'json:reports/cucumber-report.json'], // Format wyników testów i raport w JSON
      paths: ['tests/features/*.feature'], // Ścieżka do plików feature
     // publishQuiet: true // Wyciszenie zbędnych logów
  }
};
