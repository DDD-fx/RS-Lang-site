import { TypedEmitter } from 'tiny-typed-emitter';
import renderSprintGameTemplate from '../../../components/games/sprintGame';
import {
  SprintEventsType,
  SprintModelInterface,
  SprintViewInterface,
  SprintViewUtilsInterface,
} from '../../../types/games/sprintTypes';
import { createElement, getElement } from '../../../utils/tools';
import { drawSprintTimer } from './sprintTimer';
import { SprintViewUtils } from './sprintViewUtils';
import { AggregatedWordType, WordsChunkType } from '../../../types/textbookTypes';
import { LocalStorage } from '../../../utils/storage';

export class SprintView extends TypedEmitter<SprintEventsType> implements SprintViewInterface {
  sprintModel: SprintModelInterface;

  sprintViewUtils: SprintViewUtilsInterface;

  gameCurrWord: WordsChunkType | AggregatedWordType;

  isAnswerCorrect: boolean;

  isSprintRunning: boolean;

  currIndex: number;

  constructor(sprintModel: SprintModelInterface) {
    super();
    this.sprintModel = sprintModel;
    this.sprintViewUtils = new SprintViewUtils(sprintModel, this);
    this.gameCurrWord = <WordsChunkType | AggregatedWordType>{};
    this.isAnswerCorrect = false;
    this.isSprintRunning = true;
    this.currIndex = 0;
    this.sprintModel.on('drawNextSprintQuestion', () => this.drawNextSprintQuestion());
  }

  drawSprintGame = (): void => {
    const mainWrapper = getElement('body');
    const sprintGame = renderSprintGameTemplate();
    mainWrapper.innerHTML = '';
    mainWrapper.insertAdjacentHTML('afterbegin', sprintGame);
    this.sprintViewUtils.createSoundsBtns();
    this.sprintViewUtils.createCloseBtn();
    drawSprintTimer();
    this.addSprintAnswerListeners();

    setTimeout(() => {
      this.isSprintRunning = false;
      this.showResults();
    }, 60000);
    this.drawNextSprintQuestion();
  };

  createSprintQuestion = (currIndex: number): void => {
    const question = getElement('sprint-question') as HTMLDivElement;
    question.innerHTML = '';
    const currWord = this.sprintModel.shakedWordChunk[currIndex];
    this.gameCurrWord = currWord;

    const englishWordElem = createElement('div', 'sprint-english-word');
    englishWordElem.textContent = currWord.word;
    const wordTranslateElem = createElement('div', 'sprint-word-translate');

    const generatedIndex = this.sprintViewUtils.generateRandomIndex(currIndex);
    const randomTranslate = this.sprintModel.allPageChunk[generatedIndex].wordTranslate;

    const answers = [this.sprintModel.shakedWordChunk[currIndex].wordTranslate, randomTranslate];
    const translateToShowIdx = Math.floor(answers.length * Math.random());
    wordTranslateElem.textContent = answers[translateToShowIdx];

    if (answers[translateToShowIdx] === currWord.wordTranslate) this.isAnswerCorrect = true;

    question.append(englishWordElem, wordTranslateElem);
  };

  addSprintAnswerListeners = (): void => {
    const correctAnswerBtn = getElement('sprint-answer__correct') as HTMLButtonElement;
    correctAnswerBtn.addEventListener('click', () => {
      if (LocalStorage.currUserSettings.userId) {
        if (this.isAnswerCorrect) this.emit('sprintCorrectAnswerClicked', this.gameCurrWord);
        else this.emit('sprintIncorrectAnswerClicked', this.gameCurrWord);
      } else this.drawNextSprintQuestion();
    });
    const inCorrectAnswerBtn = getElement('sprint-answer__incorrect') as HTMLButtonElement;
    inCorrectAnswerBtn.addEventListener('click', () => {
      if (LocalStorage.currUserSettings.userId) {
        if (this.isAnswerCorrect) this.emit('sprintIncorrectAnswerClicked', this.gameCurrWord);
        else this.emit('sprintCorrectAnswerClicked', this.gameCurrWord);
      } else this.drawNextSprintQuestion();
    });
  };

  drawNextSprintQuestion = (): void => {
    if (this.isSprintRunning && this.currIndex < this.sprintModel.shakedWordChunk.length) {
      this.createSprintQuestion(this.currIndex);
      this.currIndex += 1;
    } else this.showResults();
  };

  showResults = (): void => {
    const sprintWrapper = getElement('sprint-game-wrapper') as HTMLDivElement;
    sprintWrapper.innerHTML = 'alksdjalsdjkla';
  };
}
