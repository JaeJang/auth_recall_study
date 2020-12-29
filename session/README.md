# Session Based Authentication

### 1. Authentication Flow

    1. A user tries to login.

    2. Validate email and password.

    3. Save the user id and created time in the session.

    4. The session is stored in the redis server in the server side and the session id is saved in Cookies as a value of 'sid'.

    5. The server verifies the user logged in on the next requests in this manner

        a. Get the seesion id from the request stored in the cookie
        b. Compare the session id and the session informaiton in the redis server
        c. Get user id and createdAt from the session
        d. Check if user id exsits and if the session is expired

### 2. What are used

- Web server framework: [Express](https://expressjs.com/en/4x/api.html)
- Language: [TypeScript](https://www.typescriptlang.org/docs/handbook/intro.html)
- Session storage: Redis
- Database : Postgresql
- ORM: [TypeORM](https://github.com/typeorm/typeorm)
- Request body validation: [joi](https://joi.dev/api/)
- Password hashing library: [bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme)  


### 3. What to do next

- More research of the password hashing algorithms.  
(https://www.youtube.com/watch?v=T6sa7ze7PN0&list=PLcCp4mjO-z9_HmJ5rSonmiEGfP-kyRMlI&index=6&ab_channel=CodeRealm)