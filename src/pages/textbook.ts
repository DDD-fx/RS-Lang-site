import { getElement } from "../utils/tools";
import { renderTextbookTemplate } from "../components/layout/template";

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
   return renderTextbookTemplate();
  };

}

export default Textbook;