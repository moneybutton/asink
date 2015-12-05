asink
=====
Like async/await, but asink/yield. A placeholder until async/await are
standardized and included in node.js and web browsers. "asink" is exactly the
same thing as
["spawn"](http://tc39.github.io/ecmascript-asyncawait/#desugaring), but with a
slightly better name.

How To Use
----------
Without asink, you might write an asynchronous function like this:
```
function myfunc () {
  return thingThatReturnsAPromise().then(() => {
    // do something else
    return aPromise1
  }).then(() => {
    // do yet another thing
    return aPromise2
  })
}
```

But with asink, you can write this code like this:
```
function myfunc () {
  return asink(function * () {
    yield thingThatReturnsAPromise()
    // do something else
    yield aPromise1
    // do yet another thing
    return aPromise2
  })
}
```
Code written with asink looks nicer and is easier to write and understand than
without it. It is especially nice when there is a lot of logic with promises,
or when there are errors that go inside try/catch blocks. It is almost the same
as the async/await pattern of the upcoming version of javascript, ES7, but
works today in node.js and (most modern) web browsers.

The same code written in the as-yet-unworking-and-unstandardized-es7 is:
```
async function myfunc () {
  await thingThatReturnsAPromise()
  // do something else
  await aPromise1
  // do yet another thing
  return aPromise2
}
```
asink lets you have most of the readability and writability gains in a form
that works today without waiting for ES7. It is also maximally
forwards-compatible in the sense that when async/await is actually available, a
straightforward conversion of each asink function to the async/await pattern is
possible by making each function async, removing the "return asink" line and
corresponding closing brace and parenthesis, and making each yield an await.
