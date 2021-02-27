const Benchmark = require('benchmark');
const assemblyScriptIsPrime = require('./').isPrime;
function isPrime(x) {
  for (let i = 2; i < x; i++) {
    if (x % i === 0) {
      return false;
    }
  }

  return true;
}

/**
 * This may not a good metric, due to its only measure the micro benchmark
 * https://stackoverflow.com/questions/2842695/what-is-microbenchmarking/2842707#2842707
 */
const suite = new Benchmark.Suite();
const startNumber = 2;
const stopNumber = 50000;

suite
  .add('AssemblyScript isPrime', function () {
    for (let i = startNumber; i < stopNumber; i++) {
      assemblyScriptIsPrime(i);
    }
  })
  .add('JavaScript isPrime', function () {
    for (let i = startNumber; i < stopNumber; i++) {
      isPrime(i);
    }
  })
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .on('complete', function () {
    const fastest = this.filter('fastest');
    const slowest = this.filter('slowest');
    const difference =
      ((fastest.map('hz') - slowest.map('hz')) / slowest.map('hz')) * 100;
    console.log(`${fastest.map('name')} is ~${difference.toFixed(1)}% faster.`);
  })
  .run();
