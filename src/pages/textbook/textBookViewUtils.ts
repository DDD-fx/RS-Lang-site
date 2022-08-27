import { TypedEmitter } from 'tiny-typed-emitter';
import {
  TextBookEventsType,
  TextBookModelInterface,
  TextBookViewInterface,
  TextBookViewUtilsInterface,
  WordsChunkType,
} from '../../types/textbookTypes';
import { LocalStorage } from '../../utils/storage';
import { getElement } from '../../utils/tools';

export class TextBookViewUtils
  extends TypedEmitter<TextBookEventsType>
  implements TextBookViewUtilsInterface
{
  textBookModel;

  textBookView;

  constructor(textBookModel: TextBookModelInterface, textBookView: TextBookViewInterface) {
    super();
    this.textBookModel = textBookModel;
    this.textBookView = textBookView;
  }

  createTextBookMain = (template: string): void => {
    const mainWrapper = getElement('main__wrapper');
    mainWrapper.innerHTML = '';
    mainWrapper.insertAdjacentHTML('afterbegin', template);
  };

  addReadMeListeners = (): void => {
    const readMeBtn = getElement('textbook-instructions-btn') as HTMLButtonElement;
    const readMeBlock = getElement('textbook-readme-block') as HTMLDivElement;
    readMeBtn.addEventListener('click', () => {
      readMeBlock.classList.toggle('hide');
      readMeBlock.classList.toggle('overlay');
    });

    const closeReadmeBtn = getElement('close-readme-btn') as HTMLButtonElement;
    closeReadmeBtn.addEventListener('click', () => {
      readMeBlock.classList.toggle('hide');
      readMeBlock.classList.toggle('overlay');
    });
  };

  checkGamesBtnsColor = (): void => {
    const currGroup = `group-${LocalStorage.currUserSettings.currGroup}`;
    const gameBtns = document.getElementsByClassName(
      'textbook-games-btn',
    ) as HTMLCollectionOf<HTMLButtonElement>;
    [...gameBtns].forEach((btn) => btn.classList.add(currGroup));
  };

  getCurrCollection = (): WordsChunkType[] => {
    return this.textBookView.userTextBookView.onDictPage
      ? this.textBookModel.difficultWords
      : this.textBookModel.wordsChunk;
  };

  checkActiveWordsBtns = (wordID = ''): void => {
    const activeWordBtns = document.getElementsByClassName('words-btns__btn--active');
    if (activeWordBtns.length > 0) {
      [...activeWordBtns].forEach((btn) => btn.classList.remove('words-btns__btn--active'));
    }

    const collection = this.getCurrCollection();
    const wordBtns = document.getElementsByClassName('words-btns__btn');
    if (wordID) {
      const activeWordIdx = collection.map((word) => word.id).indexOf(`${wordID}`);
      wordBtns[activeWordIdx].classList.add('words-btns__btn--active');
      this.textBookView.createWordCard(collection[activeWordIdx]);
    } else {
      wordBtns[0].classList.add('words-btns__btn--active');
      this.textBookView.createWordCard(collection[0]);
    }
  };

  checkActiveDifficultyBtn = (activeGroupNum: number): void => {
    const activeDifficultyBtns = document.getElementsByClassName(
      'textbook-difficulty-group__btn--active',
    );
    if (activeDifficultyBtns.length > 0) {
      [...activeDifficultyBtns].forEach((btn) =>
        btn.classList.remove('textbook-difficulty-group__btn--active'),
      );
    }
    const difficultyBtns = document.getElementsByClassName('textbook-difficulty-group__btn');
    difficultyBtns[activeGroupNum].classList.add('textbook-difficulty-group__btn--active');
  };

  checkActivePage = (currPage: number): void => {
    const activePagesBtns = document.getElementsByClassName('pagination__page-btn--active');
    if (activePagesBtns.length > 0) {
      [...activePagesBtns].forEach((btn) => btn.classList.remove('pagination__page-btn--active'));
    }
    const pagesBtns = document.getElementsByClassName('pagination__page-btn');
    pagesBtns[currPage].classList.add('pagination__page-btn--active');
  };

  disableDictBtn = (): void => {
    const dictBtn = getElement('js-textbook-dictionary') as HTMLButtonElement;
    dictBtn.disabled = true;
  };

  getStarBtn = (wordID: string): SVGElement => {
    const wordBtn = document.getElementById(wordID) as HTMLDivElement;
    const starDiv = wordBtn.childNodes[2] as HTMLDivElement;
    return starDiv.firstElementChild as SVGElement;
  };

  getBinBtn = (wordID: string): SVGElement => {
    const wordBtn = document.getElementById(wordID) as HTMLDivElement;
    const binDiv = wordBtn.childNodes[3] as HTMLDivElement;
    return binDiv.firstElementChild as SVGElement;
  };
}
