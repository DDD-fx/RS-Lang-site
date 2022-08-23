import { TypedEmitter } from 'tiny-typed-emitter';
import {
  TextBookEventsType,
  TextBookModelInterface, TextBookViewInterface,
  UserTextBookViewInterface,
} from '../../types/textbookTypes';
import { createElement, getElement } from '../../utils/tools';
import { BIN_SVG, STAR_SVG } from '../../utils/constants';
import { renderDictTemplate } from '../../components/textbook';
import { LocalStorage } from '../../utils/storage';

export class UserTextBookView extends TypedEmitter<TextBookEventsType> implements UserTextBookViewInterface {
  textBookModel;

  textBookView;

  constructor(textBookModel: TextBookModelInterface, textBookView: TextBookViewInterface) {
    super();
    this.textBookModel = textBookModel;
    this.textBookView = textBookView;
  }

  drawDict = (/*userDictWords: WordsChunkType[]*/): void => {
    this.textBookView.textBookViewUtils.createTextBookMain(renderDictTemplate())
    this.textBookView.textBookViewUtils.addReadMeListeners();
    this.addBackToTextBookListener();

    this.appendUserWordsBtns();

    this.textBookView.textBookViewUtils.checkActiveWordsBtns(LocalStorage.currUserSettings.currWord);
    this.textBookView.textBookViewUtils.checkActiveWordCard();

    this.textBookView.createPagination();
    this.textBookView.textBookViewUtils.checkActivePage(LocalStorage.currUserSettings.currPage);


    console.log('userview');
  };

  drawUserTextBookView = (): void => {
    this.createDifficultWordBtn();
    this.createDeleteWordBtn();
    this.addDictBtnListener();
  };

  appendUserWordsBtns = (): void => {
    const wordsDiv = getElement('js-user-words');
    this.textBookModel.wordsChunk.forEach((wordData) => {
      wordsDiv.append(this.textBookView.createWordsBtns({
        id: wordData.id,
        word: wordData.word,
        wordTranslate: wordData.wordTranslate,
        group: wordData.group,
      }));
    });
  }

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

  addBackToTextBookListener = (): void => {
    const backToWordsBtn = getElement('textbook-title-btn') as HTMLButtonElement;
    backToWordsBtn.addEventListener('click', () => this.textBookView.drawTextBook());
  }

  addDictBtnListener = (): void => {
    const dictBtn = getElement('js-textbook-dictionary') as HTMLButtonElement;
    dictBtn.addEventListener('click', () => this.emit.call(this.textBookView,'dictBtnClicked'));
  };
}
