interface SetCookiesProps {
  cookieName?: string;
  value?: string;
  expiration?: number;
  domain?: string;
}

export class ForwardCookies {
  storageCookie: string;
  debug?: boolean;
  cookieName?: string;

  constructor(cookieName?: string, debug?: boolean) {
    this.cookieName = cookieName;
    this.debug = debug;
    this.storageCookie = document.cookie;
  }

  /**
   * Get raw Cookie
   */
  getCookie(cookieName?: string) {
    const value = `; ${document.cookie}`;
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
  deleteCookie(cookieName?: string) {
    const COOKIE_NAME = this.cookieName || cookieName;

    document.cookie = `${COOKIE_NAME}=; expires=Thu, 18 Dec 1990 12:00:00 UTC; path=/`;

    console.warn(`Deleted Cookie: ${COOKIE_NAME}`);
  }

  /**
   * Set Cookie value to a new value
   * @param {string} obj.cookieName - Name of the cookie to create
   * @param {string} obj.value - Stringified value to add on Cookie
   * @param {number} obj.expiration - Expiration coookie days | defaults 30
   * @param {string} obj.domain - Optional if needs a custom domain
   */
  setCookie({
    cookieName = this.cookieName,
    value,
    expiration = 30,
    domain,
  }: SetCookiesProps) {
    // Delete cookie with same name if exists
    this.deleteCookie(cookieName);

    const getDate = new Date();
    getDate.setTime(getDate.getTime() + expiration * 24 * 60 * 60 * 1000);
    let expirationDate = `expires=${getDate.toUTCString()}`;

    const currentHost = domain ? domain : location.hostname.replace("www", "");

    document.cookie = `${cookieName}=${value};${expirationDate};domain=${currentHost};path=/;`;
    console.warn(`Created Cookie: ${cookieName}`);
  }

  /**
   * Add cookie to URL
   * @param {string} obj.url - Origin url that will erceive cookie as param
   * @param {string} obj.cookieName - Name of the cookie to add in url
   * @param {string} obj.delimiter - Delimiter to split at url
   */
  generateCookieAsUrl(
    cookieName?: string,
    url: string = location.href,
    delimiter?: string
  ) {
    let cookieAsParam;

    const COOKIE_NAME = cookieName ?? this.cookieName;

    const COOKIE = delimiter
      ? decodeURIComponent(this.getCookie(COOKIE_NAME)!).split(delimiter)[1]
      : this.getCookie(COOKIE_NAME);

    if (url.includes("?")) {
      cookieAsParam = `&${COOKIE_NAME}=${
        delimiter ? encodeURIComponent(COOKIE!) : COOKIE
      }`;
    } else {
      cookieAsParam = `?${COOKIE_NAME}=${
        delimiter ? encodeURIComponent(COOKIE!) : COOKIE
      }`;
    }

    const fullUrlOutput = url + cookieAsParam;
    if (this.debug) console.log(`[addCookieToUrl]: ${fullUrlOutput}`);

    return fullUrlOutput;
  }

  /**
   * Parse raw cookie string
   * @param {string} cookie - Raw cookie to parse
   * @param {string} delimiter - Delimiter string to split and get last part from array generated
   */
  parseCookieString(cookie: string, delimiter: string) {
    let parsedUrlCookie = null;
    if (delimiter && cookie.includes(delimiter)) {
      parsedUrlCookie = JSON.parse(
        decodeURIComponent(cookie).split(delimiter)[1]
      );
    } else {
      parsedUrlCookie = JSON.parse(decodeURIComponent(cookie));
    }

    return {
      json: parsedUrlCookie,
      encoded: cookie,
    };
  }

  /**
   * Get cookie data from url
   * @param {string} obj.cookieName - Name of the cookie at url as param
   * @param {string} obj.delimiter - Optional is needed split cookie to get data
   * @param {string} obj.url - Optional if is not the current url
   */
  getCookieFromUrl(
    cookieName?: string,
    delimiter?: string,
    url = window.location.href
  ) {
    const COOKIE_NAME = cookieName || this.cookieName;

    const URLCOOKIE = url.split(`${COOKIE_NAME}=`)[1];
    const output = this.parseCookieString(
      URLCOOKIE,
      delimiter ? delimiter : ""
    );

    return output;
  }
}
