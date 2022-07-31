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
}
