export const $getId = (url) => {
  return parseInt(url.match(/\/(\d.*)\/$/g)[0].replace(/\//g, ""),10);
}