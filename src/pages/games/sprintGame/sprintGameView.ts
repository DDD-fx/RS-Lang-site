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

export class SprintView extends TypedEmitter<SprintEventsType> implements SprintViewInterface {
  sprintModel: SprintModelInterface;

  sprintViewUtils: SprintViewUtilsInterface;

  constructor(sprintModel: SprintModelInterface) {
    super();
    this.sprintModel = sprintModel;
    this.sprintViewUtils = new SprintViewUtils(sprintModel, this);
  }

  drawSprintGame = (): void => {
    const mainWrapper = getElement('body');
    const sprintGame = renderSprintGameTemplate();
    mainWrapper.innerHTML = '';
    mainWrapper.insertAdjacentHTML('afterbegin', sprintGame);
    this.sprintViewUtils.createSoundsBtns();
    this.sprintViewUtils.createCloseBtn();
    drawSprintTimer();

    let isSprintRunning = true;
    setTimeout(() => (isSprintRunning = false), 60000);

    let currIndex = 0;
    if (isSprintRunning) {
      this.createSprintQuestion(currIndex);
      currIndex += 1;
    } else mainWrapper.innerHTML = 'alksdjalsdjkla';
  };

  createSprintQuestion = (currIndex: number): void => {
    const question = getElement('sprint-question') as HTMLDivElement;
    question.innerHTML = '';
    const currWord = this.sprintModel.shakedWordChunk[currIndex];

    const englishWordElem = createElement('div', 'sprint-english-word');
    englishWordElem.textContent = currWord.word;
    const wordTranslateElem = createElement('div', 'sprint-word-translate');

    const generatedIndex = this.sprintViewUtils.generateRandomIndex(currIndex);
    const randomTranslate = this.sprintModel.shakedWordChunk[generatedIndex].wordTranslate;

    const answers = [this.sprintModel.shakedWordChunk[currIndex].wordTranslate, randomTranslate];
    const translateToShowIdx = Math.floor(answers.length * Math.random());
    wordTranslateElem.textContent = answers[translateToShowIdx];

    question.append(englishWordElem, wordTranslateElem);
  };

  addSprintAnswerListeners = (): void => {
    const correctAnswerBtn = getElement('sprint-answer__correct') as HTMLButtonElement;
    correctAnswerBtn.addEventListener('click', () => this.emit('sprintCorrectBtnClicked'));
    const inCorrectAnswerBtn = getElement('sprint-answer__incorrect') as HTMLButtonElement;
    inCorrectAnswerBtn.addEventListener('click', () => this.emit('sprintIncorrectBtnClicked'));
  };
}
