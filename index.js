/**
 * asink
 * =====
 *
 * asink is the same thing as, or a rename of, spawn. spawn in turn is a tool
 * for repeatedly calling the .thens of promises yielded by a generator.
 * Basically, this makes it possible to write asynchronous, promisified code
 * with normal try/catches that look just like synchronous code. It creates
 * shorter and easier to understand code. Hypothetically, there will be a
 * feature in the next version of javascript, ES7, called "async functions",
 * which do exactly what asink does. When/if that happens and we can access it
 * in node, we can simply remove all calls to asink and our code should behave
 * in the same way.
 *
 * See:
 * http://tc39.github.io/ecmascript-asyncawait/
 * https://github.com/tc39/ecmascript-asyncawait
 * https://gist.github.com/jakearchibald/31b89cba627924972ad6
 * http://www.html5rocks.com/en/tutorials/es6/promises/
 * https://blogs.windows.com/msedgedev/2015/09/30/asynchronous-code-gets-easier-with-es2016-async-function-support-in-chakra-and-microsoft-edge/
 */
'use strict'
function spawn (genF, self) {
  return new Promise(function (resolve, reject) {
    var gen = genF.call(self)
    function step (nextF) {
      var next
      try {
        next = nextF()
      } catch (e) {
        // finished with failure, reject the promise
        reject(e)
        return
      }
      if (next.done) {
        // finished with success, resolve the promise
        resolve(next.value)
        return
      }
      // not finished, chain off the yielded promise and `step` again
      Promise.resolve(next.value).then(function (v) {
        step(function () { return gen.next(v) })
      }, function (e) {
        step(function () { return gen.throw(e) })
      })
    }
    step(function () { return gen.next(undefined) })
  })
}
module.exports = spawn
