const clickHandler = (cat, act, label, val) => {
  // https://developers.google.com/analytics/devguides/collection/analyticsjs/events#implementation
  // eslint-disable-next-line no-undef
  ga('send', 'event', cat, act, label, val);
};

const addListeners = (elem, cat, act, label, val) => {
  // https://stackoverflow.com/a/10896968/605748
  if (elem.addEventListener) elem.addEventListener('click', () => clickHandler(cat, act, label, val));
  else if (elem.attachEvent) elem.attachEvent('onclick', () => clickHandler(cat, act, label, val));
};

// Add event listener to all links to .pdf files
export const crawlPdfAnchors = () => {
  const $pdfAnchors = Array.prototype.slice.call(document.querySelectorAll('a[href*=".pdf"]'));

  $pdfAnchors.forEach((pdf) => {
    const filename = pdf.pathname.match(/[^/]+$/m)[0];

    addListeners(pdf, 'PDF', 'read', filename, null);
  });
};

// Add event listener to all links with a `data-event-listener` attr
export const crawlAnchors = () => {
  const $anchors = Array.prototype.slice.call(document.querySelectorAll('a[data-event-listener]'));

  $anchors.forEach((elem) => {
    const { eventListener } = elem.dataset;

    if (eventListener === 'on') {
      const eventValue = elem.textContent;
      addListeners(elem, 'Menu', 'click', eventValue, null);
    }
  });
};

// Add event listener to all links to .png files
export const crawlPngAnchors = () => {
  const $pngAnchors = Array.prototype.slice.call(document.querySelectorAll('a[href*=".png"]'));

  $pngAnchors.forEach((png) => {
    const filename = png.pathname.match(/[^/]+$/m)[0];

    addListeners(png, 'PNG', 'read', filename, null);
  });
};
