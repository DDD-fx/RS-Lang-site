const createElement = (tag: string, className?: string) => {
  const element = document.createElement(tag);
  if (className) element.classList.add(className);
  return element;
};

const getElement = (selector: string): Element => {
  const element = document.querySelector(selector) as Element;
  return element;
};

export { createElement, getElement };
