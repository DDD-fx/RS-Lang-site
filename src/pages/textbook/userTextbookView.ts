import { TypedEmitter } from 'tiny-typed-emitter';
import {
  TextBookEventsType,
  TextBookModelInterface, TextBookViewInterface,
  UserTextBookViewInterface,
} from '../../types/textbookTypes';
import { createElement, getElement } from '../../utils/tools';
import { BIN_SVG, STAR_SVG } from '../../utils/constants';
import { renderDictTemplate } from '../../components/textbook';

export class UserTextBookView extends TypedEmitter<TextBookEventsType> implements UserTextBookViewInterface {
  textBookModel;

  textBookView;

  constructor(textBookModel: TextBookModelInterface, textBookView: TextBookViewInterface) {
    super();
    this.textBookModel = textBookModel;
    this.textBookView = textBookView;
  }

  drawDict = (): void => {
    const mainWrapper = getElement('main__wrapper');
    mainWrapper.innerHTML = '';
    mainWrapper.insertAdjacentHTML('afterbegin', renderDictTemplate());
    this.textBookView.addReadMeListeners();

    const backToWordsBtn = getElement('textbook-title-btn') as HTMLButtonElement;
    backToWordsBtn.addEventListener('click', () => this.textBookView.drawTextBook());

    console.log('userview');
  };

  drawUserTextBookView = (): void => {
    this.createDifficultWordBtn();
    this.createDeleteWordBtn();
    this.addDictBtnListener();
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

  addDictBtnListener = (): void => {
    const dictBtn = getElement('js-textbook-dictionary') as HTMLButtonElement;
    dictBtn.addEventListener('click', () => this.emit.call(this.textBookView,'dictBtnClicked'));
  };
}
