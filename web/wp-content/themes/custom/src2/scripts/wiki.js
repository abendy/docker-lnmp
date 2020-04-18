const scrollToView = (elem) => {
  const tidClicked = elem.parentNode.dataset.tid;
  const header = document.querySelector(`[data-tid="${tidClicked}"]`);

  header.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
  });
};

const clickHandler = (elem) => {
  const tidClicked = elem.parentNode.dataset.tid;

  // Hide open content blocks
  const opened = Array.from(document.querySelectorAll('[data-tid].open'));
  opened.forEach((el) => {
    if (el.dataset.tid !== tidClicked) {
      el.classList.remove('open');
    }
  });

  // Toggle class on section/taxonomy header
  const container = elem.parentElement;
  container.classList.toggle('open');

  scrollToView(elem);
};

const addListeners = (elem) => {
  // https://stackoverflow.com/a/10896968/605748
  if (elem.addEventListener) elem.addEventListener('click', () => clickHandler(elem));
  else if (elem.attachEvent) elem.attachEvent('onclick', () => clickHandler(elem));
};

document.addEventListener('DOMContentLoaded', () => {
  const $headers = Array.prototype.slice.call(document.querySelectorAll('[data-tid] .header'));

  $headers.forEach((elem) => {
    const { tid } = elem.parentElement.dataset;

    if (tid) {
      addListeners(elem);
    }
  });
});
