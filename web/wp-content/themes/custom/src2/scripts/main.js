import { hamburgerEl, menuFooter } from './modules/menu'; // Menu vars
import App from './framework/framework';

import './custom-polyfill';

import './lazysizes';
import './wiki';

// Legacy scripts
import './scripts';

/* init */

const app = (proto, ext) => Object.assign(Object.create(proto), ext);

const bodyEl = document.querySelector('body');

const ext = {
  bodyEl,
  bodyClasses: bodyEl.classList,
  hamburgerEl,
  menuFooter,
};

if (document.readyState !== 'loading') {
  app(App, ext).init();
} else {
  document.addEventListener('DOMContentLoaded', () => {
    app(App, ext).init();
  });
}
