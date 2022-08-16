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
  const element = document.getElementsByClassName(selector)[0];
  return element;
};

const getElementQuery = (selector: string): Element => {
  const element = document.querySelector(selector) as Element;
  return element;
};

export { createElement, getElement, getElementQuery };
