let timer = null;
export const debounce = (func, timeout = 300) => {
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}
