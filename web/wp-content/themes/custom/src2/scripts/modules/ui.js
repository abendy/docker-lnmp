// UI

// eslint-disable-next-line import/prefer-default-export
export const uiButtons = () => {
  // Standardize button attributes/style
  // we are wrapping input elements to enable the use of ::after (pseudo-element)
  // the end effect is to copy the hover effect in place for <a> tags
  // we can't use ::after on <input> directly: https://stackoverflow.com/a/4660434/605748
  // also see: global.scss `.et_pb_button > input`
  setTimeout(() => {
    const $buttons = Array.prototype.slice.call(document.querySelectorAll('.hs-button'));
    // console.log('$buttons', $buttons);

    $buttons.forEach((elem) => {
      // create wrapper container
      const wrapper = document.createElement('span');
      wrapper.classList.add(...['et_pb_button', 'et_pb_bg_layout_dark']);

      // insert wrapper before elem in the DOM tree
      elem.parentNode.insertBefore(wrapper, elem);

      // move el into wrapper
      wrapper.appendChild(elem);
    });
  }, 200);
};
