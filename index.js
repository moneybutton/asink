/**
 * asink
 * =====
 *
 * This is a tool for repeatedly calling the .thens of promises yielded by a
 * generator. Basically, this makes it possible to write asynchronous,
 * promisified code with normal try/catches that look just like synchronous
 * code. It creates shorter and easier to understand code. Hypothetically,
 * there will be a feature in the next version of javascript, ES7, called
 * "async functions", which do exactly what asink does. When/if that happens
 * and we can access it in node, we can simply remove all calls to asink and
 * our code should behave in the same way.
 *
 * This code was written by Jake Archibald [1], and moved to a module and renamed
 * "asink" by Ryan X. Charles.
 *
 * See:
 * https://github.com/lukehoban/ecmascript-asyncawait
 * https://gist.github.com/jakearchibald/31b89cba627924972ad6
 * http://www.html5rocks.com/en/tutorials/es6/promises/
 * https://github.com/tc39/ecmascript-asyncawait
 * http://tc39.github.io/ecmascript-asyncawait/
 *
 * [1] https://gist.github.com/jakearchibald/31b89cba627924972ad6
 */
'use strict'
function asink (generatorFunc) {
  function continuer (verb, arg) {
    var result
    try {
      result = generator[verb](arg)
    } catch (err) {
      return Promise.reject(err)
    }
    if (result.done) {
      return result.value
    } else {
      return Promise.resolve(result.value).then(onFulfilled, onRejected)
    }
  }
  var generator = generatorFunc()
  var onFulfilled = continuer.bind(continuer, 'next')
  var onRejected = continuer.bind(continuer, 'throw')
  return onFulfilled()
}
module.exports = asink
