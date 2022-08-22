import {
  TextBookEventsType,
  TextBookModelInterface,
  TextBookViewInterface,
  UserTextBookViewInterface,
  WordsBtnsType,
  WordsChunkType,
} from '../../types/textbookTypes';
import { createElement, getElement } from '../../utils/tools';
import renderTextbookTemplate from '../../components/textbook';
import { baseURL, MAX_TEXTBOOK_PAGES } from '../../utils/constants';
import { TypedEmitter } from 'tiny-typed-emitter';
import { LocalStorage } from '../../utils/storage';
import { UserTextBookView } from './userTextbookView';

export class TextBookView
  extends TypedEmitter<TextBookEventsType>
  implements TextBookViewInterface
{
  textBookModel: TextBookModelInterface;

  userTextBookView: UserTextBookViewInterface;

  constructor(textBookModel: TextBookModelInterface) {
    super();
    this.textBookModel = textBookModel;
    this.userTextBookView = new UserTextBookView(textBookModel);
    this.textBookModel
      .on('getTextBookList', () => this.drawTextBook())
      .on('getWordData', (word) => this.createWordCard(word));
  }

  drawTextBook = (): void => {
    const mainWrapper = getElement('main__wrapper');
    const textbook = renderTextbookTemplate();
    mainWrapper.innerHTML = '';
    mainWrapper.insertAdjacentHTML('afterbegin', textbook);

    this.createDifficultyBtns();
    this.checkActiveDifficultyBtn(LocalStorage.currUserSettings.currGroup);
    this.checkGamesBtns();

    const wordsDiv = getElement('js-words-btns');
    this.textBookModel.wordsChunk.forEach((wordData) => {
      wordsDiv.append(
        this.createWordsBtns({
          word: wordData.word,
          wordTranslate: wordData.wordTranslate,
          id: wordData.id,
          group: wordData.group,
        }),
      );
    });

    this.checkActiveWordsBtns(LocalStorage.currUserSettings.currWord);
    const activeWordIdx = this.textBookModel.wordsChunk
      .map((word) => word.id)
      .indexOf(`${LocalStorage.currUserSettings.currWord}`);
    if (activeWordIdx === -1) {
      this.createWordCard(this.textBookModel.wordsChunk[0]);
    } else {
      this.createWordCard(this.textBookModel.wordsChunk[activeWordIdx]);
    }

    this.createPagination();
    this.checkActivePage(LocalStorage.currUserSettings.currPage);

    // USER VIEW
    this.userTextBookView.drawUserTextBookView();
  };

  createDifficultyBtns = (): void => {
    const levelsDiv = getElement('textbook-difficulty-group');
    const levels = [
      'Beginner/Elementary',
      'Pre Intermediate',
      'Intermediate',
      'Upper Intermediate',
      'Advanced',
      'Proficient',
    ];
    for (let i = 0; i < levels.length; i++) {
      const difficultyBtn = createElement('button', [
        'textbook-difficulty-group__btn',
        `group-${i}`,
        'js-textbook-difficulty-group__btn',
      ]);
      difficultyBtn.addEventListener('click', () => this.emit('groupBtnClicked', i));

      const difficultyBtnTitle = createElement('h3') as HTMLHeadingElement;
      difficultyBtnTitle.textContent = levels[i];
      difficultyBtn.append(difficultyBtnTitle);
      levelsDiv.append(difficultyBtn);
    }
  };

  createWordsBtns = ({ id, word, wordTranslate, group }: WordsBtnsType): HTMLDivElement => {
    const wordBtn = createElement('div', ['words-btns__btn', `group-${group}`]) as HTMLDivElement;
    wordBtn.addEventListener('click', () => {
      this.emit('wordBtnClicked', id);
      this.checkActiveWordsBtns(id);
    });

    const wordTitle = createElement('h3', 'word-btn-title') as HTMLHeadingElement;
    wordTitle.textContent = word;
    const wordTranslation = createElement('p', 'word-btn-translate') as HTMLParagraphElement;
    wordTranslation.textContent = wordTranslate;
    wordBtn.append(wordTitle, wordTranslation);
    return wordBtn;
  };

  createWordCard = (word: WordsChunkType): void => {
    const wordCard = getElement('js-word-description');
    wordCard.innerHTML = '';
    const wordImg = createElement('img', 'word-image') as HTMLImageElement;
    wordImg.src = baseURL + word.image;
    wordImg.alt = 'word image';

    const wordTitle = createElement('h3') as HTMLHeadingElement;
    wordTitle.textContent = word.word;

    const wordTranslate = createElement('p') as HTMLParagraphElement;
    wordTranslate.textContent = word.wordTranslate;
    const transcription = createElement('p') as HTMLParagraphElement;
    transcription.innerHTML = `<b>${word.transcription}</b>`;

    const meaningTitle = createElement('h4') as HTMLHeadingElement;
    meaningTitle.textContent = 'Значение';
    const textMeaning = createElement('p') as HTMLParagraphElement;
    textMeaning.innerHTML = word.textMeaning;
    const textMeaningTranslate = createElement('p') as HTMLParagraphElement;
    textMeaningTranslate.innerHTML = word.textMeaningTranslate;

    const exampleTitle = createElement('h4') as HTMLHeadingElement;
    exampleTitle.textContent = 'Пример';
    const textExample = createElement('p') as HTMLParagraphElement;
    textExample.innerHTML = word.textExample;
    const textExampleTranslate = createElement('p') as HTMLParagraphElement;
    textExampleTranslate.innerHTML = word.textExampleTranslate;

    wordCard.append(
      wordImg,
      this.createTitleAudioBlock(wordTitle, this.createAudioBtn(word.audio)),
      wordTranslate,
      transcription,
      this.createTitleAudioBlock(meaningTitle, this.createAudioBtn(word.audioMeaning)),
      textMeaning,
      textMeaningTranslate,
      this.createTitleAudioBlock(exampleTitle, this.createAudioBtn(word.audioExample)),
      textExample,
      textExampleTranslate,
    );
  };

  createAudioBtn = (audio: string): HTMLButtonElement => {
    const audioBtn = createElement('button', ['audio-btn', 'js-audio-btn']) as HTMLButtonElement;
    audioBtn.addEventListener('click', () => {
      (async () => {
        const audioElem = new Audio(baseURL + audio);
        await audioElem.play();
      })().catch((err) => console.error(err));
    });
    return audioBtn;
  };

  createTitleAudioBlock = (title: HTMLHeadingElement, audio: HTMLButtonElement): HTMLDivElement => {
    const block = createElement('div', 'title-audio-block') as HTMLDivElement;
    block.append(title, audio);
    return block;
  };

  createPagination = (): void => {
    for (let i = 1; i <= MAX_TEXTBOOK_PAGES; i++) {
      const pageBtn = createElement('button', ['pagination__page-btn', 'js-pagination__page-btn']);
      pageBtn.textContent = `${i}`;
      pageBtn.addEventListener('click', () => this.emit('pageBtnClicked', i - 1));

      const prevPage = getElement('js-pagination');
      prevPage.append(pageBtn);
    }
  };

  checkGamesBtns = (): void => {
    const currGroup = `group-${LocalStorage.currUserSettings.currGroup}`;
    const gameBtns = document.getElementsByClassName(
      'textbook-games-btn',
    ) as HTMLCollectionOf<HTMLButtonElement>;
    [...gameBtns].forEach((btn) => btn.classList.add(currGroup));
  };

  checkActiveWordsBtns = (wordID: string): void => {
    const activeWordBtns = document.getElementsByClassName('words-btns__btn--active');
    if (activeWordBtns.length > 0) {
      [...activeWordBtns].forEach((btn) => btn.classList.remove('words-btns__btn--active'));
    }

    const wordBtns = document.getElementsByClassName('words-btns__btn');
    if (wordID) {
      const activeWordIdx = this.textBookModel.wordsChunk
        .map((word) => word.id)
        .indexOf(`${wordID}`);
      if (activeWordIdx === -1) {
        wordBtns[0].classList.add('words-btns__btn--active');
      } else {
        wordBtns[activeWordIdx].classList.add('words-btns__btn--active');
      }
    } else {
      const firstWordBtn = getElement('words-btns__btn');
      firstWordBtn.classList.add('words-btns__btn--active');
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
}
