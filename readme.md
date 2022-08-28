## Forwards Cookies

This is a project created to work with Cookies for cross-domain in a specific project. Its a approach to pass Cookies via url params that also be useful for another projects 😊

## Availables methods

| Name                  | Description                                                                              |
| --------------------- | ---------------------------------------------------------------------------------------- |
| `getCookie`           | Get specific cookie content                                                              |
| `setCookie`           | Create new cookie with custom value, and clear if already exists a cookie with same name |
| `deleteCookie`        | Delete specific existing cookie                                                          |
| `generateCookieAsUrl` | Generate an url with Cookie as param. (Supports url that already has params)             |
| `getCookieFromUrl`    | Get formatted cookie from url param                                                      |
| `parseCookieString`   | Decode Cookie stringified to return a json if posible                                    |

### To-do

- [ ] Add detailed methods specifications
- [ ] Add testing lib and create tests (_maybe Jest_)
- [ ] Publish as package to use as module