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

export { createElement, getElement, getElementQuery, showModal };
