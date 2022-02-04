/* eslint-disable */
import Cookies from 'js-cookie';
import { isUndefined, attempt } from 'lodash';

interface Process {
  browser: boolean;
}
declare let process: Process;

export const setCookie = (key: string, value: string) => {
  if (process.browser) {
    Cookies.set(key, value, {
      expires: 1,
      path: '/',
    });
  }
};

export const setCookieJson = (key: string, value: any) => {
  setCookie(key, JSON.stringify(value));
};

export const removeCookie = (key: string) => {
  if (process.browser) {
    Cookies.remove(key, {
      expires: 1,
    });
  }
};

const getCookieFromBrowser = (key: string) => Cookies.get(key);

const getCookieFromServer = (key: string, req: any = {}) => {
  if (!req.headers.cookie) {
    return undefined;
  }
  const rawCookie = req.headers.cookie
    .split(';')
    .find((c: string) => c.trim().startsWith(`${key}=`));
  if (!rawCookie) {
    return undefined;
  }
  return rawCookie.split('=')[1];
};

export const getCookie: any = (key: string, req: any = {}) =>
  process.browser ? getCookieFromBrowser(key) : getCookieFromServer(key, req);

export const getCookieToJson: any = (key: string, req: any = {}) => {
  const data = getCookie(key, req);
  return !isUndefined(data) && attempt(JSON.parse, data)
    ? JSON.parse(data)
    : data;
};
