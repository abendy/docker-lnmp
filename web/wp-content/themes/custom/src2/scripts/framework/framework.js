import _ from 'lodash';
import { iframeResize as iFrameResize } from 'iframe-resizer/js/index';
import { ElementQueries } from 'css-element-queries';
import { cp, detectViewMode } from './utils';
import { breakpoints } from './enum';

// Modules
import initMenu from '../modules/menu';
import initInfiniteScroll from '../modules/infinitescroll';
import { crawlPdfAnchors, crawlAnchors, crawlPngAnchors } from '../modules/analytics.events';
import { uiButtons } from '../modules/ui';
import '../modules/video';
import { circleAnimation } from '../modules/radial-menu';

const App = {
  init() {
    cp(
      'fetch',
      'mounted',
      'events',
      'analytics',
    )(this);

    return this;
  },

  fetch() {
  },

  mounted() {
    // ui stuff
    uiButtons();

    // call resize
    setTimeout(() => {
      if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {
        const evt = document.createEvent('UIEvents');
        evt.initUIEvent('resize', true, false, window, 0);
        window.dispatchEvent(evt);
      } else {
        window.dispatchEvent(new Event('resize'));
      }
    }, 100);

    // *** START Element queries *** //
    // Parses all available CSS and attach ResizeSensor to those elements which have rules attached
    ElementQueries.init();
    // *** END Element queries *** //

    // iframe fixer
    iFrameResize(null, 'iframe:not(#et-fb-app-frame)');

    // Infinite Scroll Pagination
    initInfiniteScroll();

    // Trigger focus on Authentication Platform graphic
    circleAnimation();
  },

  events() {
    // Clicks
    if (this.bodyEl.addEventListener) this.bodyEl.addEventListener('click', this.clickHandler.bind(this), true);
    else if (this.bodyEl.attachEvent) this.bodyEl.attachEvent('onclick', this.clickHandler.bind(this), true); // IE

    // Scroll
    document.addEventListener('scroll', _.throttle(this.scrollHandler.bind(this), 50));
    document.addEventListener('touchstart', _.throttle(this.scrollHandler.bind(this), 50));

    // Keys
    window.addEventListener('keydown', this.keyBoardHandler.bind(this), true);

    // Resize
    window.addEventListener('resize', _.debounce(this.resize.bind(this), 200), false);

    return this;
  },

  clickHandler(event) {
    const {
      // eslint-disable-next-line no-unused-vars
      button, detail: quantity, target, type,
    } = event;

    // Menu
    if (this.hamburgerEl === target) initMenu();
  },

  scrollHandler(event) {
    // Infinite Scroll Pagination
    initInfiniteScroll();
  },

  keyBoardHandler(event) {
    // eslint-disable-next-line no-unused-vars
    const key = event.keyCode;
  },

  resize(e) {
    // eslint-disable-next-line no-unused-vars
    const bp = detectViewMode(breakpoints);
  },

  analytics() {
    // Add event listener to all links to .pdf files
    crawlPdfAnchors();

    // Add event listener to all links with a `data-event-listener` attr
    crawlAnchors();

    // Add event listener to all links to .png files
    crawlPngAnchors();
  },
};

export default App;
