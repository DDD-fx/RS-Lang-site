import { footerInner, renderMainTemplate, preloader } from '../../components/layout/mainTemplate';
import renderAdvTemplate from '../../components/layout/advTemplate';
import renderTeamTemplate from '../../components/layout/teamTemplate';
import Nav from '../../components/nav';
import { createElement, getElement, preloadImages } from '../../utils/tools';
import history from '../../utils/history';

class View {
  header: HTMLElement;

  main: HTMLElement;

  mainWrapper: HTMLElement;

  footer: HTMLElement;

  nav;

  constructor() {
    preloadImages();
    this.header = createElement('header', 'header');
    this.main = createElement('main', 'main');
    this.mainWrapper = createElement('div', ['wrapper', 'main__wrapper']);
    this.footer = createElement('footer');
    this.nav = new Nav(this.header);
  }

  render = (): void => {
    const modal = createElement('div', 'modal');
    this.nav.render();
    this.main.append(this.mainWrapper, modal);
    this.footer.insertAdjacentHTML('afterbegin', footerInner);
    document.body.append(this.header, this.main, this.footer);
    this.bind();
  };

  renderMainTemplate = (): void => {
    this.mainWrapper.innerHTML = '';
    this.mainWrapper.insertAdjacentHTML('afterbegin', renderMainTemplate());
  };

  renderCustomTemplate = (template: () => string): void => {
    this.mainWrapper.style.opacity = '0';
    setTimeout(() => {
      this.mainWrapper.innerHTML = '';
      this.mainWrapper.insertAdjacentHTML('afterbegin', template());
      this.mainWrapper.style.opacity = '1';
    }, 250);
  };

  renderPreloader = (someClass?: string): void => {
    this.mainWrapper.innerHTML = '';
    this.mainWrapper.insertAdjacentHTML('afterbegin', preloader);
    if (someClass) this.mainWrapper.classList.add(`${someClass}`);
    else this.mainWrapper.classList.remove('textbook');
  };

  bind = () => {
    getElement('main__wrapper').addEventListener('click', (event) => {
      if ((<HTMLElement>event.target).classList.contains('btn-article')) history.push('/textbook');
      if ((<HTMLElement>event.target).classList.contains('main'))
        this.renderCustomTemplate(renderMainTemplate);
      if ((<HTMLElement>event.target).classList.contains('advantages'))
        this.renderCustomTemplate(renderAdvTemplate);
      if ((<HTMLElement>event.target).classList.contains('team'))
        this.renderCustomTemplate(renderTeamTemplate);
    });

    document.addEventListener('click', this.nav.closeNav); //set the event
  };
}

export default View;
