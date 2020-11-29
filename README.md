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
source: [Session vs Token Based Authentication](https://medium.com/@sherryhsu/session-vs-token-based-authentication-11a6c5ac45e4).
