// In-memory token store — survives page navigation but NOT full reload.
// Never stored in localStorage (XSS-safe).
// The refresh token lives in the httpOnly cookie set by the server.
let _accessToken: string | null = null;

export const setAccessToken = (token: string) => { _accessToken = token; };
export const getAccessToken = () => _accessToken;
export const clearAccessToken = () => { _accessToken = null; };
