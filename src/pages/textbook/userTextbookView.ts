import { TypedEmitter } from 'tiny-typed-emitter';
import {
  TextBookEventsType,
  TextBookModelInterface,
  TextBookViewInterface,
  UserTextBookViewInterface,
  WordStatusEnum,
} from '../../types/textbookTypes';
import { createElement, getElement } from '../../utils/tools';
import { BIN_SVG, STAR_SVG } from '../../utils/constants';
import { renderDictTemplate } from '../../components/textbook';
import { LocalStorage } from '../../utils/storage';

export class UserTextBookView
  extends TypedEmitter<TextBookEventsType>
  implements UserTextBookViewInterface
{
  textBookModel;

  textBookView;

  onDictPage;

  constructor(textBookModel: TextBookModelInterface, textBookView: TextBookViewInterface) {
    super();
    this.textBookModel = textBookModel;
    this.textBookView = textBookView;
    this.onDictPage = false;
  }

  drawDict = (): void => {
    this.textBookView.textBookViewUtils.createTextBookMain(renderDictTemplate());
    this.textBookView.textBookViewUtils.addReadMeListeners();
    this.addBackToTextBookListenerBtn();

    if (this.textBookModel.difficultWords.length > 0) {
      this.textBookView.appendWordsBtns();
      this.drawUserTextBookElems();
      this.textBookView.textBookViewUtils.disableDictBtn();
      this.textBookView.textBookViewUtils.checkActiveWordsBtns(
        (LocalStorage.currUserSettings.currWord = ''),
      );
      this.makeStarBtnActive();
    } else {
      const wordsTitle = getElement('words-title');
      wordsTitle.innerHTML += ' вы не добавляли сложные слова';
    }
  };

  drawUserTextBookElems = (): void => {
    this.createStarBtn();
    this.createBinBtn();
    this.addDictBtnListener();
    this.checkStarBtnActive();
  };

  createStarBtn = (): void => {
    const wordBtn = document.getElementsByClassName(
      'words-btns__btn',
    ) as HTMLCollectionOf<HTMLDivElement>;
    [...wordBtn].forEach((btn) => {
      const wordBtnStar = createElement('div', 'word-btn__star');
      wordBtnStar.innerHTML = STAR_SVG;

      wordBtnStar.addEventListener('click', (e) => {
        e.stopPropagation();
        const starDiv = e.currentTarget as HTMLDivElement;
        const star = starDiv.firstElementChild as SVGElement;
        const wordID = (<HTMLDivElement>star.closest('.words-btns__btn')).id;
        if (wordID && !star.classList.contains('star-svg--active')) {
          this.emit.call(
            this.textBookView,
            'addDifficultWordBtnClicked',
            wordID,
            WordStatusEnum.difficult,
          );
          star.classList.add('star-svg--active');
        } else {
          this.emit.call(
            this.textBookView,
            'deleteDifficultWordBtnClicked',
            wordID,
            this.onDictPage,
          );
          star.classList.remove('star-svg--active');
        }
      });
      btn.append(wordBtnStar);
    });
  };

  createBinBtn = (): void => {
    const wordBtn = document.getElementsByClassName('words-btns__btn');
    [...wordBtn].forEach((btn) => {
      const wordBtnBin = createElement('div', 'word-btn__bin');
      wordBtnBin.innerHTML = BIN_SVG;
      btn.append(wordBtnBin);
    });
  };

  removeDictElem = (wordID: string): void => {
    const elemToRemove = document.getElementById(wordID) as HTMLDivElement;
    elemToRemove.remove();
  };

  addBackToTextBookListenerBtn = (): void => {
    const backToWordsBtn = getElement('textbook-title-btn') as HTMLButtonElement;
    backToWordsBtn.addEventListener('click', () => {
      this.onDictPage = false;
      LocalStorage.currUserSettings.currWord = '';
      this.textBookView.drawTextBook();
    });
  };

  addDictBtnListener = (): void => {
    const dictBtn = getElement('js-textbook-dictionary') as HTMLButtonElement;
    dictBtn.disabled = false;
    dictBtn.addEventListener('click', () => {
      this.onDictPage = true;
      this.emit.call(this.textBookView, 'dictBtnClicked');
    });
  };

  makeStarBtnActive = (): void => {
    const star = document.getElementsByClassName('star-svg') as HTMLCollectionOf<SVGElement>;
    [...star].forEach((el) => el.classList.add('star-svg--active'));
  };

  checkStarBtnActive = (): void => {
    if (this.textBookModel.difficultWords.length > 0) {
      this.textBookModel.wordsChunk.forEach((word) => {
        const difficultWordsString = JSON.stringify(this.textBookModel.difficultWords);
        if (difficultWordsString.includes(word.id)) {
          const wordBtn = document.getElementById(word.id) as HTMLDivElement;
          const starDiv = wordBtn.childNodes[2] as HTMLDivElement;
          const star = starDiv.firstElementChild as SVGElement;
          star.classList.add('star-svg--active');
        }
      });
    }
  };
}
