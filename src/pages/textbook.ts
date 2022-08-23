import { getElement } from '../utils/tools';
import { renderTextbookTemplate } from '../components/textbook';

class Textbook {
  render = () => {
    const mainWrapper = getElement('main__wrapper');
    const textbook = this.renderTextbook();
    mainWrapper.innerHTML = '';
    mainWrapper.insertAdjacentHTML('afterbegin', textbook);
  };

  renderTextbook = () => {
    return renderTextbookTemplate();
  };
}

export default Textbook;
