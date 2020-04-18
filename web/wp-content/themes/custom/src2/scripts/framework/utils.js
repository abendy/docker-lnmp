export const cp = (...fns) => (context = window) => {
  fns.forEach((fn) => {
    if (typeof context[fn] === 'function') {
      context[fn].call(context);
    }
  });
};

export const detectViewMode = (BP) => {
  let currentBreakPoint = BP[Object.keys(BP)[0]];

  // for (const bp in BP) { https://stackoverflow.com/a/43807676/605748
  Object.keys(BP).forEach((bp) => {
    if (window.matchMedia(`screen and (min-width: ${BP[bp]}px)`).matches) {
      currentBreakPoint = BP[bp];
      // break;
    }
  });
  return currentBreakPoint;
};
