import { headerInner, footerInner, renderMainTemplate } from '../../components/layout/template';
import { Nav } from '../../components/nav';
import { getElement, createElement } from '../../utils/tools';

class View {
  header: HTMLElement;

  main: HTMLElement;

  mainWrapper: HTMLElement;

  footer: HTMLElement;

  constructor() {
    this.header = createElement('header', 'header');
    this.main = createElement('main');
    this.mainWrapper = createElement('div', 'wrapper');
    this.footer = createElement('footer');
  }

  render = () => {
    this.header.insertAdjacentHTML('afterbegin', headerInner);
    this.main.append(this.mainWrapper);
    this.footer.insertAdjacentHTML('afterbegin', footerInner);
    document.body.append(this.header, this.main, this.footer);
    const nav = new Nav().render();
  };

      renderMain = () => {
       const mainTemplate = renderMainTemplate();
     this.mainWrapper.innerHTML = '';
     this.mainWrapper.insertAdjacentHTML('afterbegin', mainTemplate);
     };
}

export default View;
