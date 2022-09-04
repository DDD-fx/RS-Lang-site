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
import { baseURL, SPRINT_GAME_SETTINGS } from '../../../utils/constants';
import { ResultBtnType } from '../../../types/games/commonGamesTypes';
import history from '../../../utils/history';
import { GameEnum } from '../../../types/enums';

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
    }, 60000); //60000
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

    this.isAnswerCorrect = answers[translateToShowIdx] === currWord.wordTranslate;

    question.append(englishWordElem, wordTranslateElem);
  };

  addSprintAnswerListeners = (): void => {
    const correctAnswerBtn = getElement('sprint-answer__correct') as HTMLButtonElement;
    correctAnswerBtn.addEventListener('click', () => this.addCorrectBtnEvents());
    window.addEventListener('keyup', (e) => {
      e.preventDefault();
      if (e.code === 'ArrowRight') this.addCorrectBtnEvents();
    });

    const inCorrectAnswerBtn = getElement('sprint-answer__incorrect') as HTMLButtonElement;
    inCorrectAnswerBtn.addEventListener('click', () => this.addIncorrectBtnEvents());
    window.addEventListener('keyup', (e) => {
      e.preventDefault();
      if (e.code === 'ArrowLeft') this.addIncorrectBtnEvents();
    });
  };

  addCorrectBtnEvents = (): void => {
    const greenBtn = getElement('game-operations-group__btn-wrapper_green');
    if (this.isAnswerCorrect) {
      this.flashBG(true);
      if (!greenBtn.classList.contains('hidden')) this.turnOnCorrectAnswerSound();
      if (LocalStorage.currUserSettings.userId) {
        this.emit('sprintCorrectAnswerClicked', this.gameCurrWord);
      } else this.drawNextSprintQuestion();
    } else {
      this.flashBG(false);
      if (!greenBtn.classList.contains('hidden')) this.turnOnWrongAnswerSound();
      if (LocalStorage.currUserSettings.userId) {
        this.emit('sprintIncorrectAnswerClicked', this.gameCurrWord);
      } else this.drawNextSprintQuestion();
    }
  };

  addIncorrectBtnEvents = (): void => {
    const greenBtn = getElement('game-operations-group__btn-wrapper_green');
    if (this.isAnswerCorrect) {
      this.flashBG(false);
      if (!greenBtn.classList.contains('hidden')) this.turnOnWrongAnswerSound();
      if (LocalStorage.currUserSettings.userId) {
        this.emit('sprintIncorrectAnswerClicked', this.gameCurrWord);
      } else this.drawNextSprintQuestion();
    } else {
      this.flashBG(true);
      if (!greenBtn.classList.contains('hidden')) this.turnOnCorrectAnswerSound();
      if (LocalStorage.currUserSettings.userId) {
        this.emit('sprintCorrectAnswerClicked', this.gameCurrWord);
      } else {
        this.drawNextSprintQuestion();
      }
    }
  };

  drawNextSprintQuestion = (): void => {
    if (this.isSprintRunning && this.currIndex < this.sprintModel.shakedWordChunk.length) {
      this.createSprintQuestion(this.currIndex);
      this.currIndex += 1;
    } else this.showResults();
  };

  showResults = (): void => {
    const body = getElement('body') as HTMLDivElement;
    const modalWindow = createElement('div', 'fixed-sprint-window-wrapper');
    const sprintWrapper = createElement('div', 'fixed-result-window');
    const resultSection = createElement('section', 'result-section');
    const resultWordsSection = createElement('div', 'result-section__words');
    const resultLearnedWords = this.updateLearnedResultWordsWrapper();
    (resultSection as HTMLDivElement).style.height = '50vh';
    const resultUnlearnedWords = this.updateUnlearnedResultWordsWrapper();
    resultWordsSection.append(resultLearnedWords, resultUnlearnedWords);
    const operationPanel = this.createOperationPanel();
    resultSection.append(resultWordsSection, operationPanel);
    sprintWrapper.append(resultSection);
    modalWindow.append(sprintWrapper);
    body.append(modalWindow);
    void this.sprintModel.setStatistics(GameEnum.sprint);
  };

  flashBG = (answer: boolean): void => {
    const sprintWrapper = getElement('sprint-game-wrapper') as HTMLDivElement;
    if (answer) {
      sprintWrapper.classList.add('sprint-game-wrapper--correct');
      setTimeout(() => sprintWrapper.classList.remove('sprint-game-wrapper--correct'), 300);
    } else {
      sprintWrapper.classList.add('sprint-game-wrapper--incorrect');
      setTimeout(() => sprintWrapper.classList.remove('sprint-game-wrapper--incorrect'), 300);
    }
  };

  updateUnlearnedResultWordsWrapper = (): Element => {
    const wordsWrapper = createElement('div', 'result-section__unlearned-words');
    const wordsWrapperHeader = createElement('h2', 'result-section__header');
    const headerSpan = createElement('span', [
      'result-section__span',
      'result-section__span_errors',
    ]);
    headerSpan.textContent = `${SPRINT_GAME_SETTINGS.unlearnedWords.length}`;
    wordsWrapperHeader.textContent = 'Ошибок ';
    wordsWrapperHeader.append(headerSpan);
    wordsWrapper.append(wordsWrapperHeader);
    for (let i = 0; i < SPRINT_GAME_SETTINGS.unlearnedWords.length; i += 1) {
      const word = this.sprintModel.shakedWordChunk.find(
        (el) => el.word === SPRINT_GAME_SETTINGS.unlearnedWords[i],
      );
      if (word) {
        wordsWrapper.append(
          this.createResultWordsBtns({
            wordTranslate: word.wordTranslate,
            word: word.word,
          }),
        );
      }
    }
    return wordsWrapper;
  };

  updateLearnedResultWordsWrapper = (): Element => {
    const wordsWrapper = createElement('div', 'result-section__learned-words');
    const wordsWrapperHeader = createElement('h2', 'result-section__header');
    const headerSpan = createElement('span', [
      'result-section__span',
      'result-section__span_correct',
    ]);
    headerSpan.textContent = `${SPRINT_GAME_SETTINGS.learnedWords.length}`;
    wordsWrapperHeader.textContent = 'Знаю ';
    wordsWrapperHeader.append(headerSpan);
    wordsWrapper.append(wordsWrapperHeader);
    for (let i = 0; i < SPRINT_GAME_SETTINGS.learnedWords.length; i += 1) {
      const word = this.sprintModel.shakedWordChunk.find(
        (el) => el.word === SPRINT_GAME_SETTINGS.learnedWords[i],
      );
      if (word) {
        wordsWrapper.append(
          this.createResultWordsBtns({
            wordTranslate: word.wordTranslate,
            word: word.word,
          }),
        );
      }
    }
    return wordsWrapper;
  };

  createResultWordsBtns = ({ word, wordTranslate }: ResultBtnType): HTMLElement => {
    const wordWrapper = createElement('div', 'result-section__word-wrapper');
    const wordText = createElement('span', [
      'result-section__word',
      `result-section__word-${word}`,
    ]);
    wordText.textContent = `${word} - ${wordTranslate}`;
    const soundingWord = this.sprintModel.shakedWordChunk.find((el) => el.word === word);
    if (soundingWord) {
      const speaker = this.createSpeaker(soundingWord, 'result-section__speaker-img');
      speaker.classList.add('result-section__speaker-img_small');
      wordWrapper.append(speaker);
    }
    wordWrapper.append(wordText);
    return wordWrapper;
  };

  createOperationPanel = (): HTMLElement => {
    const operationPanel = createElement('div', 'result-section__operation-panel');
    const closeBtn = this.createResultsCloseBtn();
    operationPanel.append(closeBtn);
    return operationPanel;
  };

  createResultsCloseBtn = (): HTMLElement => {
    const closeBtnWrapper = createElement('div', 'result-section__close-btn-wrapper');
    const closeBtn = createElement('button', ['game-start-btn', 'result-section__close-btn']);
    closeBtn.textContent = 'Завершить игру';
    closeBtn.addEventListener('click', () => {
      if (!SPRINT_GAME_SETTINGS.startFromTextbook) {
        window.location.reload();
      } else {
        history.push('/textbook');
        window.location.reload();
      }
    });
    closeBtnWrapper.append(closeBtn);
    return closeBtnWrapper;
  };

  createSpeaker = (word: WordsChunkType, className: string): HTMLElement => {
    const speaker = createElement('img', `${className}`) as HTMLImageElement;
    speaker.src = './assets/games/speaker.svg';
    speaker.addEventListener('click', () => {
      void (async () => {
        const audio = new Audio(baseURL + word.audio);
        await audio.play();
      })().catch();
    });
    return speaker;
  };

  turnOnCorrectAnswerSound = (): void => {
    const audio = new Audio();
    audio.src = './assets/games-sounds/sprint-correct.mp3';
    audio.autoplay = true;
  };

  turnOnWrongAnswerSound = (): void => {
    const audio = new Audio();
    audio.src = './assets/games-sounds/sprint-wrong.mp3';
    audio.autoplay = true;
  };
}
