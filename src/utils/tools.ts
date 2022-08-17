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

export { createElement, getElement, getElementQuery };
