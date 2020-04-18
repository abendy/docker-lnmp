// eslint-disable-next-line no-undef
const $ = jQuery;

const options = {
  nextSelector: '.pagination .next',
  navSelector: '.pagination',
  itemSelector: '.card-container',
  contentSelector: '.cards',
};

let loading = false;
let finished = false;
let desturl = $(options.nextSelector).attr('href'); // init next url

const mainAjax = () => {
  const lastElem = $(options.itemSelector).last();

  // set loader and loading
  $(options.navSelector).css('display', 'none').after('<progress class="pagination-loader" max="100"></progress>');
  loading = true;

  // decode url to prevent error
  desturl = decodeURIComponent(desturl);
  desturl = desturl.replace(/^(?:\/\/|[^/]+)*\//, '/');

  // ajax call
  $.ajax({
    url: desturl,
    dataType: 'html',
    cache: false,
    success(data) {
      const obj = $(data);

      const elems = obj.find(options.itemSelector);
      const next = obj.find(options.nextSelector);

      if (next.length) {
        desturl = next.attr('href');
      } else {
        finished = true;
      }

      lastElem.after(elems);

      $('.pagination-loader').remove();

      setTimeout(() => {
        loading = false;
      }, 1000);
    },
  });
};

const initInfiniteScroll = () => {
  const w = $(window);
  const elem = $(options.itemSelector).last();

  if (
    typeof elem !== 'undefined'
    && !loading
    && !finished
    && desturl
    && (w.scrollTop() + w.height()) >= (elem.offset().top - (2 * elem.height()))
  ) {
    mainAjax();
  }
};

export default initInfiniteScroll;
