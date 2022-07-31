export class ForwardCookies {
  storageCookie: string;
  debug: boolean;
  cookieName: string;

  constructor(cookieName: string, debug: boolean) {
    this.cookieName = cookieName;
    this.debug = debug;
    this.storageCookie = document.cookie;
  }

  /**
   * Get raw Cookie
   */
  getCookie(cookieName: string) {
    const value = "; " + document.cookie;
    const parts: string[] = value.split(
      `; ${this.cookieName}=` || `${cookieName}=`
    );

    if (parts.length === 2) {
      const cookieFormatted = parts?.pop()?.split(";").shift();
      if (this.debug) console.log(`[getCookie]: ${cookieFormatted}`);

      return cookieFormatted;
    }

    console.error("Error: Cookie name not found, try another.");
  }

  /**
   * Delete cookie
   * @param {string} cookieName - Name of the cookie to delete
   */
  deleteCookie(cookieName: string) {
    const COOKIE_NAME = this.cookieName || cookieName;

    var currentHost = location.hostname.replace("www", "");
    document.cookie =
      COOKIE_NAME +
      "=; expires=Thu, 18 Dec 1990 12:00:00 UTC; domain=" +
      currentHost +
      "; path=/";

    console.warn("Deleted Cookie: " + COOKIE_NAME + " from: " + currentHost);
  }
}
