// Trigger focus on Authentication Platform graphic
const scrollIntoView = (elem) => {
  const { id } = elem.dataset;
  document.querySelector(`#${id}`).scrollIntoView({
    behavior: 'smooth',
    block: 'center',
  });
};

const clickHandler = (elem) => {
  scrollIntoView(elem);
};

const addListeners = (elem) => {
  // https://stackoverflow.com/a/10896968/605748
  if (elem.addEventListener) elem.addEventListener('click', () => clickHandler(elem));
  else if (elem.attachEvent) elem.attachEvent('onclick', () => clickHandler(elem));
};

// eslint-disable-next-line import/prefer-default-export
export const circleAnimation = () => {
  const $icons = document.querySelectorAll('.circle-container > *');
  const iconTimer = 150;

  if ($icons.length === 0) return;

  setTimeout(() => {
    (function circleLoop(i) {
      setTimeout(() => {
        const elem = $icons[i - 1];

        // Add hover class
        elem.classList.add('hover');

        // Add event listener to control clicks/taps
        addListeners(elem);

        setTimeout(() => {
          // Remove hover class
          $icons[i - 1].classList.remove('hover');

          // Loop over icons
          // eslint-disable-next-line no-plusplus, no-param-reassign
          if (--i) circleLoop(i);
        }, (iconTimer * 1.5));
      }, iconTimer);
    }($icons.length));
  }, 500);
};
