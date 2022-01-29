// @ts-nocheck
/* eslint-disable */

/**
 * Get the full path of the url
 *
 * @returns {string}
 */
 export function urlFormatRest(url = '/', data = {}) {
    let flag = true;
    for (const key in data) {
      url = flag
        ? url.concat(`?${key}=${data[key]}`)
        : url.concat(`&${key}=${data[key]}`);
      flag = false;
    }
    
    return url;
  }
  