module.exports = {
    default: [
      '--require-module ts-node/register',  // Włącza obsługę TypeScript w Cucumber
      '--require tests/steps/**/*.ts',      // Ścieżka do plików z krokami (steps)
      '--format progress',                  // Format wyników testów w terminalu (paski postępu)
      '--publish-quiet',                    // Wyciszenie zbędnych logów
    ].join(' ')
  };
  