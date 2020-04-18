export const hamburgerEl = document.querySelector('.mobile_menu_bar_toggle');
export const menuFooter = document.querySelector('#top-header');

const initMenu = () => {
  menuFooter.classList.toggle('open');
};

export default initMenu;
