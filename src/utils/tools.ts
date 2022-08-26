const createElement = (tag: string, className?: string | string[]) => {
  const element = document.createElement(tag);
  if (className) {
    if (Array.isArray(className)) element.classList.add(...className);
    else {
      element.classList.add(className);
    }
  }
  return element;
};

const getElement = (selector: string): Element => {
  return document.getElementsByClassName(selector)[0];
};

const getElementQuery = (selector: string): Element => {
  return document.querySelector(selector) as Element;
};

const showModal = (message: string) => {
  const modal = getElement('modal') as HTMLElement;
  modal.innerHTML = message;
  modal.style.opacity = '1';
  modal.style.display = 'block';
  setTimeout(() => {
    modal.style.opacity = '0';
    modal.style.display = 'none';
  }, 3000);
};

/*
const openNav = () => {
  burgerButton.classList.toggle("is-active");
  nav.classList.toggle("is-active");
}

const closeNav = (event) => {
   const target = event.target;
  const its_menu = target == siteNav;
  const its_btnMenu = target == burgerButton || burgerButton.contains(target);
  const menu_is_active = nav.classList.contains("is-active");
 
if (menu_is_active && !its_btnMenu && !its_menu){ //Close menu onclick all elem except nav_list
  burgerButton.classList.remove("is-active");
  nav.classList.remove("is-active");
 }
}
*/

export { createElement, getElement, getElementQuery, showModal };
