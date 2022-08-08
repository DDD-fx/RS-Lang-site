import { headerInner, footerInner, renderMainTemplate } from "./template";
import { getElement, createElement } from "./tools";

class View {
  header: HTMLElement;

  main: HTMLElement;

  footer: HTMLElement;

  constructor() {
    this.header = createElement("header", "header");
    this.main = createElement("main");
    this.footer = createElement("footer");
  }

  render = () => {
    this.header.insertAdjacentHTML("afterbegin", headerInner);
    const mainTemplate = renderMainTemplate();
    this.main.insertAdjacentHTML("afterbegin", mainTemplate);
    this.footer.insertAdjacentHTML("afterbegin", footerInner);
    document.body.append(this.header, this.main, this.footer);
  };
}

export default View;
