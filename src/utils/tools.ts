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

const showModal = (message: string): void => {
  const modal = getElement('modal') as HTMLElement;
  modal.innerHTML = message;
  modal.style.opacity = '1';
  modal.style.display = 'block';
  setTimeout(() => {
    modal.style.opacity = '0';
    modal.style.display = 'none';
  }, 3000);
};

const getShortDate = (): string => {
  return new Date().toLocaleDateString().replace(/\./g, '-');
};

const getKeyFromDate = (): number => {
  return new Date(getShortDate()).getTime();
};

const getDateFromKey = (): string => {
  return new Date(1661731200000).toLocaleDateString();
};

const imgLinkArr = [
  'assets/landing-background.jpg',
  'assets/outlaw-avatar.jpg',
  'assets/orla-avatar.jpg',
  'assets/ddd-fx-avatar.jpg',
  'assets/textbook-img.jpg',
  'assets/games-img.jpg',
  'assets/stat-img.jpg',
  'assets/bubbles.svg',
  'assets/whale.svg',
  'assets/skat.svg',
  'assets/github-logo.png',
  'assets/games/headphones.svg',
  'assets/games/fish.svg',
];

const preloadImages = () => {
  for (const link of imgLinkArr) {
    const img = new Image();
    img.src = link;
  }
};

export {
  createElement,
  getElement,
  getElementQuery,
  showModal,
  getKeyFromDate,
  getShortDate,
  getDateFromKey,
  preloadImages,
};
