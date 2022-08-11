import { getElement } from "../utils/tools";

class Textbook {
  constructor() {
  }

  render = () => {
    const mainWrapper = getElement("main .wrapper");
    const textbook = this.renderTextbook();
    mainWrapper.innerHTML = '';
    mainWrapper.insertAdjacentHTML("afterbegin", textbook);

  };

  renderTextbook = () => {
   return '<h1>Page Textbook</h1>'
  };

}

export default Textbook;