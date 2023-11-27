import {
  deleteCookie,
  getCookie,
  getCookies,
  setCookie,
} from 'cookies-next'

// once the feature is ready, uncomment the line below
// export const cookieConsent = getCookie('dl_cookie_consent')

export const enableCookies = () => {
  setCookie('_dl_cookie_consent', 'true', { path: '/' })
  setCookie('_cookies_updated_at', new Date(), { path: '/' })
  // set other cookies
}

export const disableCookies = () => {
  // will account for this in a future pr
  // Object.keys(getCookies()).forEach(cookie => deleteCookie(cookie))
  setCookie('_dl_cookie_consent', 'false', { path: '/' })
  setCookie('_cookies_updated_at', new Date(), { path: '/' })
}
