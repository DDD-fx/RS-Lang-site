import { footerInner, renderMainTemplate } from '../../components/layout/template';
import { Nav } from '../../components/nav';
import { createElement } from '../../utils/tools';

class View {
  header: HTMLElement;

  main: HTMLElement;

  mainWrapper: HTMLElement;

  footer: HTMLElement;

  constructor() {
    this.header = createElement('header', 'header');
    this.main = createElement('main', 'main');
    this.mainWrapper = createElement('div', ['wrapper', 'main__wrapper']);
    this.footer = createElement('footer');
  }

  render = () => {
    const modal = createElement('div', 'modal');
    const nav = new Nav().render();
    this.header.append(nav);
    this.main.append(this.mainWrapper, modal);
    this.footer.insertAdjacentHTML('afterbegin', footerInner);
    document.body.append(this.header, this.main, this.footer);
  };

  renderMain = () => {
    const mainTemplate = renderMainTemplate();
    this.mainWrapper.innerHTML = '';
    this.mainWrapper.insertAdjacentHTML('afterbegin', mainTemplate);
  };
}

export default View;
