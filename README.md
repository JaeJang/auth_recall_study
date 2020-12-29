HTTP is a stateless protocol. However there are situations that we want our states to be stored. To overcome the stateless of HTTP requests, we could normally use either a session or token.
<br>

There are examples below.
<br>
<br>
***
## 1. Session Based Authentication

In the session based authentication, the server will create a session for the user after the user logs in. The session id is then stored on a cookie on the user’s browser. While the user stays logged in, the cookie would be sent along with every subsequent request. The server can then compare the session id stored on the cookie against the session information stored in the memory to verify user’s identity and sends response with the corresponding state


![Session Based Authentication Flow](/images/session-auth.png)


<br>
<br>
<br>
<br>
<br>
source: https://medium.com/@sherryhsu/session-vs-token-based-authentication-11a6c5ac45e4


---
## Extra

#### Express Error handling (https://expressjs.com/en/guide/error-handling.html)

- In synchronous code  
  
  If synchronous code throws an error, then Express will catch and process it.

```javascript
app.get('/', function (req, res) {
  throw new Error('BROKEN') // Express will catch this on its own.
});
```
```
Response
{ "message" : "BROKEN" }
```

- For errors returned from asynchronous functions invoked by route handlers and middleware, you must pass them to the next() function, where Express will catch and process them

```javascript
app.get('/', function (req, res, next) {
  fs.readFile('/file-does-not-exist', function (err, data) {
    if (err) {
      next(err) // Pass errors to Express.
    } else {
      res.send(data)
    }
  })
})
```

- You must catch errors that occur in asynchronous code invoked by route handlers or middleware and pass them to Express for processing.

```javascript
app.get('/', function (req, res, next) {
  setTimeout(function () {
    try {
      throw new Error('BROKEN')
    } catch (err) {
      next(err)
    }
  }, 100)
})
```

- Use promises to avoid the overhead of the try..catch block or when using functions that return promises.

```javascript
app.get('/', function (req, res, next) {
  Promise.resolve().then(function () {
    throw new Error('BROKEN')
  }).catch(next) // Errors will be passed to Express.
})
```