import { TypedEmitter } from 'tiny-typed-emitter';
import {
  TextBookEventsType,
  TextBookModelInterface,
  UserTextBookViewInterface,
} from '../../types/textbookTypes';
import { createElement } from '../../utils/tools';
import { BIN_SVG, STAR_SVG } from '../../utils/constants';

export class UserTextBookView
  extends TypedEmitter<TextBookEventsType>
  implements UserTextBookViewInterface
{
  textBookModel: TextBookModelInterface;

  constructor(textBookModel: TextBookModelInterface) {
    super();
    this.textBookModel = textBookModel;
  }

  drawUserTextBookView = (): void => {
    this.createDifficultWordBtn();
    this.createDeleteWordBtn();
  };

  createDifficultWordBtn = (): void => {
    const wordBtn = document.getElementsByClassName('words-btns__btn');
    [...wordBtn].forEach((btn) => {
      const wordBtnStar = createElement('div', 'word-btn__star');
      wordBtnStar.innerHTML = STAR_SVG;
      btn.append(wordBtnStar);
    });
  };

  createDeleteWordBtn = (): void => {
    const wordBtn = document.getElementsByClassName('words-btns__btn');
    [...wordBtn].forEach((btn) => {
      const wordBtnBin = createElement('div', 'word-btn__bin');
      wordBtnBin.innerHTML = BIN_SVG;
      btn.append(wordBtnBin);
    });
  };
}
