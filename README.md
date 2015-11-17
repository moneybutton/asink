asink
=====
Like async/await, but asink/yield. A placeholder until async/await are
standardized and included in node.js and web browsers.

[This code was originally written by Jake
Archibald](https://gist.github.com/jakearchibald/31b89cba627924972ad6). Ryan X.
Charles gave it a funny name and then took all the credit.

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
    yield aPromise2
  })
}
```
Code written with asink looks nicer and is easier to write and understand than
without it. It is especially nice when there is a lot of logic with promises,
or when there are errors that go inside try/catch blocks. It is almost the same
as the async/await pattern of the upcoming version of javascript, ES7, but
works today in node.js and (most) web browsers.

The same code written in the as-yet-unworking-and-unstandardized-es7 is:
```
async function myfunc () {
  await thingThatReturnsAPromise()
  // do something else
  await aPromise1
  // do yet another thing
  await aPromise2
}
```
asink lets you have most of the readability and writability gains in a form
that works today without waiting for ES7.
