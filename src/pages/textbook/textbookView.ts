import {
  AggregatedWordType,
  TextBookEventsType,
  TextBookModelInterface,
  TextBookViewInterface,
  TextBookViewUtilsInterface,
  UserTextBookViewInterface,
  WordsBtnsType,
  WordsChunkType,
} from '../../types/textbookTypes';
import { createElement, getElement } from '../../utils/tools';
import { renderTextbookTemplate, renderWordDescription } from '../../components/textbook';
import { baseURL, MAX_TEXTBOOK_PAGES } from '../../utils/constants';
import { TypedEmitter } from 'tiny-typed-emitter';
import { LocalStorage } from '../../utils/storage';
import { UserTextBookView } from './userTextbookView';
import { TextBookViewUtils } from './textBookViewUtils';

export class TextBookView
  extends TypedEmitter<TextBookEventsType>
  implements TextBookViewInterface
{
  textBookModel;

  userTextBookView: UserTextBookViewInterface;

  textBookViewUtils: TextBookViewUtilsInterface;

  constructor(textBookModel: TextBookModelInterface) {
    super();
    this.textBookModel = textBookModel;
    this.userTextBookView = new UserTextBookView(textBookModel, this);
    this.textBookViewUtils = new TextBookViewUtils(textBookModel, this);
    this.textBookModel
      .on('getTextBookList', () => this.drawTextBook())
      .on('getWordCardData', (word) => this.createWordCard(word))
      .on('getUserDict', () => this.userTextBookView.drawDict())
      .on('removeDifficultWordElem', (wordID) => this.userTextBookView.removeDictElem(wordID))
      .on('updateMarkedPages', () => this.userTextBookView.updateMarkedPages())
      .on('updateMarkedPages', () => this.userTextBookView.disableGameBtns());
  }

  drawTextBook = (): void => {
    this.textBookViewUtils.createTextBookMain(renderTextbookTemplate());
    this.textBookViewUtils.addReadMeListeners();
    this.createWordsGroupBtns();
    this.textBookViewUtils.checkActiveDifficultyBtn(LocalStorage.currUserSettings.currGroup);

    this.textBookViewUtils.checkGamesBtnsColor();
    this.textBookViewUtils.addGameBtnsListeners();

    this.appendWordsBtns();
    this.textBookViewUtils.checkActiveWordsBtns(LocalStorage.currUserSettings.currWord);

    this.createPagination();
    this.textBookViewUtils.checkActivePage(LocalStorage.currUserSettings.currPage);

    // USER VIEW
    if (LocalStorage.currUserSettings.userId) {
      this.userTextBookView.drawUserTextBookElems();
      this.userTextBookView.markPagesLearned();
      this.userTextBookView.disableGameBtns();
    }
  };

  createWordsGroupBtns = (): void => {
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

  appendWordsBtns = (): void => {
    const wordsDiv = getElement('js-words-btns');
    const collection = this.textBookViewUtils.getCurrCollection();

    collection.forEach((wordData) => {
      wordsDiv.append(
        this.createWordsBtns({
          id: wordData.id,
          word: wordData.word,
          wordTranslate: wordData.wordTranslate,
          group: wordData.group,
        }),
      );
    });
  };

  createWordsBtns = ({ id, word, wordTranslate, group }: WordsBtnsType): HTMLDivElement => {
    const wordBtn = createElement('div', ['words-btns__btn', `group-${group}`]) as HTMLDivElement;
    wordBtn.id = id;
    wordBtn.addEventListener('click', () => {
      if (LocalStorage.currUserSettings.currWord === id) return;
      this.emit('wordBtnClicked', id, this.userTextBookView.onDictPage);
      this.textBookViewUtils.checkActiveWordsBtns(id);
    });

    const wordTitle = createElement('h3', 'word-btn-title') as HTMLHeadingElement;
    wordTitle.textContent = word;
    const wordTranslation = createElement('p', 'word-btn-translate') as HTMLParagraphElement;
    wordTranslation.textContent = wordTranslate;
    wordBtn.append(wordTitle, wordTranslation);
    return wordBtn;
  };

  createWordCard = (word: WordsChunkType | AggregatedWordType): void => {
    const wordCard = getElement('js-word-description');
    wordCard.innerHTML = renderWordDescription();

    const wordImg = getElement('word-description__word-image') as HTMLImageElement;
    wordImg.src = baseURL + word.image;

    const wordTitle = getElement('word-description__word-title') as HTMLHeadingElement;
    wordTitle.textContent = word.word;
    wordTitle.after(this.createAudioBtn(word.audio));

    const wordTranslate = getElement('word-description__word-translate') as HTMLParagraphElement;
    wordTranslate.textContent = word.wordTranslate;
    const transcription = getElement('word-description__word-transcript') as HTMLParagraphElement;
    transcription.innerHTML = `<b>${word.transcription}</b>`;

    const meaningTitle = getElement('word-description__word-meaning-title') as HTMLHeadingElement;
    meaningTitle.after(this.createAudioBtn(word.audioMeaning));
    const textMeaning = getElement('word-description__text-meaning') as HTMLParagraphElement;
    textMeaning.innerHTML = word.textMeaning;
    const textMeaningTranslate = getElement(
      'word-description__text-meaning-translate',
    ) as HTMLParagraphElement;
    textMeaningTranslate.innerHTML = word.textMeaningTranslate;

    const exampleTitle = getElement('word-description__word-example-title') as HTMLHeadingElement;
    exampleTitle.after(this.createAudioBtn(word.audioExample));
    const textExample = getElement('word-description__text-example') as HTMLParagraphElement;
    textExample.innerHTML = word.textExample;
    const textExampleTranslate = getElement(
      'word-description__text-example-translate',
    ) as HTMLParagraphElement;
    textExampleTranslate.innerHTML = word.textExampleTranslate;
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

  createPagination = (): void => {
    for (let i = 1; i <= MAX_TEXTBOOK_PAGES; i++) {
      const pageBtn = createElement('button', ['pagination__page-btn', `page-${i - 1}`]);
      pageBtn.textContent = `${i}`;
      pageBtn.addEventListener('click', () => this.emit('pageBtnClicked', i - 1));

      const prevPage = getElement('js-pagination');
      prevPage.append(pageBtn);
    }
  };
}
