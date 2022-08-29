## Forwards Cookies

![GitHub package.json version (branch)](https://img.shields.io/github/package-json/v/itbruno/forward-cookies/develop?label=Version&style=for-the-badge)

This is a project created to work with Cookies for cross-domain in a specific project. Its a approach to sent Cookies via url params that can be useful for other 😊

## Availables methods

| Name                  | Description                                                                              |
| --------------------- | ---------------------------------------------------------------------------------------- |
| `getCookie`           | Get specific cookie content                                                              |
| `setCookie`           | Create new cookie with custom value, and clear if already exists a cookie with same name |
| `deleteCookie`        | Delete specific existing cookie                                                          |
| `generateCookieAsUrl` | Generate an url with Cookie as param. (Supports url that already has params)             |
| `getCookieFromUrl`    | Get formatted cookie from url param                                                      |
| `parseCookieString`   | Decode Cookie stringified to return a json if posible                                    |

## How to use

To get start, import in your project and add the instance to a variables

```js
import { ForwardCookies } from "forward-cookies";

const userCookie = new ForwardCookies();
```

### Set a cookie

Create a new cookie

```js
userCookie.setCookie({
  cookieName: "user",
  value: "Bruno Rodrigues",
  expiration: 30,
  domain: "itbruno.com.br",
  path: "/",
});
```

### Get an specific cookie from cookie name

```js
userCookie.getCookie("user");
```

### Delete an specific cookie from cookie name

```js
userCookie.deleteCookie("user");
```

### Generate an url with cookie as param

```js
userCookie.generateCookieAsUrl({
  cookieName: "user",
  url: "https://www.itbruno.com.br",
});
```

### Get a cookie from url param

Its necessary exists an cookie as param on url. You can do this with `generateCookieAsUrl` method.

```js
userCookie.getCookieFromUrl({
  cookieName: "user",
  parsed: false,
});

// output: Bruno%20Rodrigues
```

If you sent a cookie object for url, do you have the output as json and encoded option, example:

```js
const userCookie = new ForwardCookies();

const newUser = { name: "Bruno", username: "itbruno" };

// Set a cookie with newUser object stringified
userCookie.setCookie({
  cookieName: "newuser",
  value: JSON.stringify(newUser),
});

// Generate an full url with cookie as param
userCookie.generateCookieAsUrl("newuser");

// Get cookie from url param
userCookie.getCookieFromUrl({
  cookieName: "newuser",
  parsed: true,
});
```

#### Output

```js
{
    "json": {
        "name": "Bruno",
        "username": "itbruno"
    },
    "encoded": "{%22name%22:%22Bruno%22,%22username%22:%22itbruno%22}"
}
```
