import { TypedEmitter } from 'tiny-typed-emitter';
import {
  TextBookEventsType,
  TextBookModelInterface,
  TextBookViewInterface,
  UserTextBookViewInterface,
  WordStatusEnum,
} from '../../types/textbookTypes';
import { createElement, getElement } from '../../utils/tools';
import { BIN_SVG, MAX_TEXTBOOK_PAGES, STAR_SVG } from '../../utils/constants';
import { renderDictTemplate } from '../../components/textbook';
import { LocalStorage } from '../../utils/storage';
import history from '../../utils/history';

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
    if (!this.onDictPage) this.checkBinBtnActive();
    this.addGameBtnsListeners();
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
            WordStatusEnum.difficult,
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

      wordBtnBin.addEventListener('click', (e) => {
        e.stopPropagation();
        const binDiv = e.currentTarget as HTMLDivElement;
        const bin = binDiv.firstElementChild as SVGElement;
        const wordID = (<HTMLDivElement>bin.closest('.words-btns__btn')).id;
        if (wordID && !bin.classList.contains('bin-svg--active')) {
          this.emit.call(
            this.textBookView,
            'addLearnedWordBtnClicked',
            wordID,
            WordStatusEnum.learned,
          );
          bin.classList.add('bin-svg--active');
        } else {
          this.emit.call(
            this.textBookView,
            'deleteLearnedWordBtnClicked',
            wordID,
            this.onDictPage,
            WordStatusEnum.learned,
          );
          bin.classList.remove('bin-svg--active');
        }
      });

      btn.append(wordBtnBin);
    });
  };

  removeDictElem = (wordID: string): void => {
    const elemToRemove = document.getElementById(wordID) as HTMLDivElement;
    elemToRemove.remove();
  };

  addDictBtnListener = (): void => {
    const dictBtn = getElement('js-textbook-dictionary') as HTMLButtonElement;
    dictBtn.disabled = false;
    dictBtn.addEventListener('click', () => {
      this.onDictPage = true;
      this.emit.call(this.textBookView, 'dictBtnClicked');
    });
  };

  addBackToTextBookListenerBtn = (): void => {
    const backToWordsBtn = getElement('textbook-title-btn') as HTMLButtonElement;
    backToWordsBtn.addEventListener('click', () => {
      this.onDictPage = false;
      LocalStorage.currUserSettings.currWord = '';
      this.textBookView.drawTextBook();
    });
  };

  makeStarBtnActive = (): void => {
    const star = document.getElementsByClassName('star-svg') as HTMLCollectionOf<SVGElement>;
    [...star].forEach((el) => el.classList.add('star-svg--active'));
  };

  checkStarBtnActive = (): void => {
    if (this.textBookModel.difficultWords.length > 0 && !this.onDictPage) {
      this.textBookModel.wordsChunk.forEach((word) => {
        const difficultWordsString = JSON.stringify(this.textBookModel.difficultWords);
        const star = this.textBookView.textBookViewUtils.getStarBtn(word.id);
        if (difficultWordsString.includes(word.id)) {
          star.classList.add('star-svg--active');
        } else {
          star.classList.remove('star-svg--active');
        }
      });
    } else if (this.textBookModel.difficultWords.length === 0 && !this.onDictPage) {
      const stars = document.getElementsByClassName('star-svg') as HTMLCollectionOf<SVGElement>;
      [...stars].forEach((star) => star.classList.remove('star-svg--active'));
    }
  };

  checkBinBtnActive = (): void => {
    if (this.textBookModel.learnedWords.length > 0) {
      this.textBookModel.wordsChunk.forEach((word) => {
        const learnedWordsString = JSON.stringify(this.textBookModel.learnedWords);
        const bin = this.textBookView.textBookViewUtils.getBinBtn(word.id);
        if (learnedWordsString.includes(word.id)) {
          bin.classList.add('bin-svg--active');
        } else {
          bin.classList.remove('bin-svg--active');
        }
      });
    } else {
      const bins = document.getElementsByClassName('bin-svg') as HTMLCollectionOf<SVGElement>;
      [...bins].forEach((bin) => bin.classList.remove('bin-svg--active'));
    }
  };

  markPagesLearned = (): void => {
    for (let i = 0; i < MAX_TEXTBOOK_PAGES; i++) {
      const learnedWords = this.textBookModel.learnedWords.filter((word) => word.page === i);
      if (learnedWords.length === 20) this.markPageLearned(i);
    }
  };

  markPageLearned = (pageNum: number): void => {
    const page = getElement(`page-${pageNum}`);
    page.classList.add('learned-page');
  };

  addGameBtnsListeners = (): void => {
    const audioChallengeBtn = getElement('textbook-games-btn-challenge') as HTMLButtonElement;
    audioChallengeBtn.addEventListener('click', () => {
      history.push('/audiochallenge-pages');
      this.emit.call(this.textBookView, 'audioChallengeBtnClicked');
    });
  };
}
