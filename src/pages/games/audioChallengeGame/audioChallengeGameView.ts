import { createElement, getElement } from '../../../utils/tools';
import { TypedEmitter } from 'tiny-typed-emitter';
import renderAudioChallengeGameTemplate from '../../../components/games/audioChallengeGame';
import {
  AudioChallengeModelInterface,
  AudioChallengeViewInterface,
} from '../../../types/games/audioChallengeTypes';
import { AUDIOCHALLENGE_GAME_SETTINGS, baseURL } from '../../../utils/constants';
import { WordsChunkType } from '../../../types/textbookTypes';
import history from '../../../utils/history';
import { GamesEventsType, ResultBtnType, WordBtnType } from '../../../types/games/commonGamesTypes';

export class AudioChallengeView
  extends TypedEmitter<GamesEventsType>
  implements AudioChallengeViewInterface
{
  audioChallengeModel: AudioChallengeModelInterface;

  constructor(audioChallengeModel: AudioChallengeModelInterface) {
    super();
    this.audioChallengeModel = audioChallengeModel;
    this.audioChallengeModel.on('drawGameBtns', () => this.updateWordBtnsWrapper());
  }

  drawAudioChallengeGame = (): void => {
    const mainWrapper = getElement('body');
    const audioChallengeGame = renderAudioChallengeGameTemplate();
    mainWrapper.innerHTML = '';
    mainWrapper.insertAdjacentHTML('afterbegin', audioChallengeGame);
    this.createSoundsBtns();
    this.createCloseBtn();
    this.updateWordBtnsWrapper();
    this.createContinueBtn();
    this.createSkipBtn();
    this.enableWordSounding();
    const gameWindow = getElement('fixed-window');
    if (gameWindow.classList.contains('hidden')) {
      gameWindow.classList.remove('hidden');
    }
  };

  updateWordBtnsWrapper = (): Element => {
    const wordsWrapper = getElement('game-section__words-wrapper');
    wordsWrapper.innerHTML = '';
    const currentGamePageArray = this.shakeWordsForCurrentGamePage();

    for (let i = 0; i < currentGamePageArray.length; i += 1) {
      if (currentGamePageArray[i]) {
        wordsWrapper.append(
          this.createWordsBtns({
            wordTranslate: currentGamePageArray[i].wordTranslate,
            id: currentGamePageArray[i].id,
            group: currentGamePageArray[i].group,
            word: currentGamePageArray[i].word,
          }),
        );
      } else {
        this.stopTheGame();
        this.showGameResults();
      }
    }

    if (currentGamePageArray.length < 5) {
      for (let i = 0; i < AUDIOCHALLENGE_GAME_SETTINGS.shakedWordsArray.length; i += 1) {
        if (AUDIOCHALLENGE_GAME_SETTINGS.shakedWordsArray[i]) {
          wordsWrapper.append(
            this.createWordsBtns({
              wordTranslate: AUDIOCHALLENGE_GAME_SETTINGS.shakedWordsArray[i].wordTranslate,
              id: AUDIOCHALLENGE_GAME_SETTINGS.shakedWordsArray[i].id,
              group: AUDIOCHALLENGE_GAME_SETTINGS.shakedWordsArray[i].group,
              word: AUDIOCHALLENGE_GAME_SETTINGS.shakedWordsArray[i].word,
            }),
          );
        }
      }
    }

    if (
      this.audioChallengeModel.shakedWordChunk[AUDIOCHALLENGE_GAME_SETTINGS.wordOfShakedArrCount]
    ) {
      const soundingWord =
        this.audioChallengeModel.shakedWordChunk[AUDIOCHALLENGE_GAME_SETTINGS.wordOfShakedArrCount]
          .word;
      this.createAnswerWrapper(soundingWord);
      this.createSpeakerWrapper(soundingWord);
      this.emit('wordOfShakedArrCountAdded');
    }
    return wordsWrapper;
  };

  shakeWordsForCurrentGamePage = (): WordsChunkType[] => {
    const wordsArr = [];
    wordsArr.push(
      this.audioChallengeModel.shakedWordChunk[AUDIOCHALLENGE_GAME_SETTINGS.wordOfShakedArrCount],
    );
    if (
      this.audioChallengeModel.shakedWordChunk.length >= AUDIOCHALLENGE_GAME_SETTINGS.wordsPerPage
    ) {
      while (wordsArr.length < AUDIOCHALLENGE_GAME_SETTINGS.wordsPerPage) {
        const word =
          this.audioChallengeModel.shakedWordChunk[
            Math.floor(Math.random() * this.audioChallengeModel.shakedWordChunk.length)
          ];
        if (!wordsArr.includes(word)) {
          wordsArr.push(word);
        }
      }
    } else {
      while (wordsArr.length < this.audioChallengeModel.shakedWordChunk.length) {
        const word =
          this.audioChallengeModel.shakedWordChunk[
            Math.floor(Math.random() * this.audioChallengeModel.shakedWordChunk.length)
          ];
        if (!wordsArr.includes(word)) {
          wordsArr.push(word);
        }
      }
    }
    for (let i = wordsArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [wordsArr[i], wordsArr[j]] = [wordsArr[j], wordsArr[i]];
    }
    return wordsArr;
  };

  createCloseBtn = (): void => {
    const gameOperationsGroup = getElement('game-operations-group');
    const closeBtn = createElement('div', 'game-operations-group__close-btn');
    const cross = createElement('img', [
      'game-operations-group__cross-img',
      'game-operations-group__cross-img_light',
    ]) as HTMLImageElement;
    cross.src = './assets/games/cross.svg';
    closeBtn.append(cross);
    closeBtn.addEventListener('click', () => {
      if (AUDIOCHALLENGE_GAME_SETTINGS.startFromTextbook === false) {
        window.location.reload();
      } else {
        history.push('/textbook');
        window.location.reload();
      }
    });
    gameOperationsGroup.append(closeBtn);
  };

  createSoundsBtns = (): void => {
    const gameOperationsGroup = getElement('game-operations-group');
    const soundBtn = createElement('div', 'game-operations-group__sound-btns-wrapper');
    const greenSoundBtn = this.createSoundBtn();
    const redSoundBtn = this.createStopSoundBtn();
    soundBtn.append(greenSoundBtn, redSoundBtn);
    soundBtn.addEventListener('click', (e) => {
      if (!greenSoundBtn.classList.contains('hidden') && redSoundBtn.classList.contains('hidden')) {
        greenSoundBtn.classList.add('hidden');
        redSoundBtn.classList.remove('hidden');
      } else if (
        greenSoundBtn.classList.contains('hidden') &&
        !redSoundBtn.classList.contains('hidden')
      ) {
        greenSoundBtn.classList.remove('hidden');
        redSoundBtn.classList.add('hidden');
      }
    });
    gameOperationsGroup.append(soundBtn);
  };

  createSoundBtn = (): HTMLElement => {
    const soundBtn = createElement('div', [
      'game-operations-group__btn-wrapper',
      'game-operations-group__btn-wrapper_green',
    ]);
    const greenSoundBtn = createElement(
      'img',
      'game-operations-group__green-sound',
    ) as HTMLImageElement;
    greenSoundBtn.src = './assets/games/sound.svg';
    soundBtn.append(greenSoundBtn);
    return soundBtn;
  };

  createStopSoundBtn = (): HTMLElement => {
    const soundBtn = createElement('div', [
      'game-operations-group__btn-wrapper',
      'game-operations-group__btn-wrapper_red',
      'hidden',
    ]);
    const redSoundBtn = createElement(
      'img',
      'game-operations-group__red-sound',
    ) as HTMLImageElement;
    redSoundBtn.src = './assets/games/no-sound.svg';
    soundBtn.append(redSoundBtn);
    return soundBtn;
  };

  turnOnCorrectAnswerSound = (): void => {
    const audio = new Audio();
    audio.src = './assets/games-sounds/correct-answer.mp3';
    audio.autoplay = true;
  };

  turnOnWrongAnswerSound = (): void => {
    const audio = new Audio();
    audio.src = './assets/games-sounds/wrong-answer.mp3';
    audio.autoplay = true;
  };

  createSpeakerWrapper = (soundingWord: string): void => {
    const speakerWrapper = getElement('game-section__speaker-wrapper');
    speakerWrapper.innerHTML = '';
    const word = this.audioChallengeModel.wordsChunk.find((el) => el.word === soundingWord);
    if (word) {
      const speaker = this.createSpeaker(word, 'game-section__speaker-img');
      speaker.classList.add('game-section__speaker-img_big');
      speakerWrapper.append(speaker);
    }
  };

  createSpeaker = (word: WordsChunkType, className?: string): HTMLElement => {
    const speaker = createElement('img', `${className}`) as HTMLImageElement;
    speaker.src = './assets/games/speaker.svg';
    speaker.addEventListener('click', () => {
      (async () => {
        const audio = new Audio(baseURL + word.audio);
        await audio.play();
      })().catch();
    });
    return speaker;
  };

  enableWordSounding = async (): Promise<void> => {
    const answer = this.getRightAnswer();
    const word = this.audioChallengeModel.wordsChunk.find((el) => el.word === answer);
    if (word) {
      const audio = new Audio(baseURL + word.audio);
      await audio.play().catch();
    }
  };

  createAnswerWrapper = (soundingWord: string): void => {
    const answerWrapper = getElement('game-section__answer-wrapper');
    answerWrapper.innerHTML = '';
    const word = this.audioChallengeModel.wordsChunk.find((el) => el.word === soundingWord);
    const wordAndSpeakerWrapper = createElement('div', 'game-section__word-wrapper');
    const selectedWord = createElement('span', 'game-section__selected-word');
    const speakerWrapper = createElement('div', 'game-section__answer-speaker-wrapper');
    if (word) {
      const speaker = this.createSpeaker(word, 'game-section__speaker-img');
      speaker.classList.add('game-section__speaker-img_small');
      speakerWrapper.append(speaker);
    }
    const imageWrapper = createElement('game-section__answer-image-wrapper');
    const image = createElement('img', 'game-section__answer-img') as HTMLImageElement;
    image.src = baseURL + word?.image;
    image.alt = 'word image';
    imageWrapper.append(image);
    selectedWord.innerText = soundingWord;
    wordAndSpeakerWrapper.append(speakerWrapper, selectedWord);
    answerWrapper.append(imageWrapper, wordAndSpeakerWrapper);
  };

  createWordsBtns = ({ word, id, wordTranslate, group }: WordBtnType): HTMLElement => {
    const wordWrapper = createElement('div', 'game-section__answer-word-wrapper');
    const wordBtn = createElement('button', [
      'game-section__word',
      `game-section__word-group-${group}`,
      `game-section__word-${word}`,
    ]) as HTMLButtonElement;
    wordBtn.addEventListener('click', () => {
      this.showRightAnswer();
      this.hideSkipBtn();
      this.showSign(word);
      this.makeWordsTransparent(word);
      this.crossWrongWord(word);
      this.wordsBtnsDisable();
      this.checkRightAnswer(word, id);
      this.countBarProgress();
    });
    wordBtn.textContent = wordTranslate;
    wordWrapper.append(this.createAnswerSigns(word), wordBtn);
    return wordWrapper;
  };

  createAnswerSigns = (word: string): Element => {
    const signsWrapper = createElement('div', [
      'game-section__answer-signs-wrapper',
      `game-section__answer-signs-wrapper-${word}`,
    ]);
    const defaultSignWrapper = createElement('div', [
      'game-section__default-sign-wrapper',
      `game-section__default-sign-wrapper-${word}`,
    ]);
    const correctSignWrapper = createElement('div', [
      'game-section__correct-sign-wrapper',
      `game-section__correct-sign-wrapper-${word}`,
      'hidden',
    ]);
    const wrongSignWrapper = createElement('div', [
      'game-section__wrong-sign-wrapper',
      `game-section__wrong-sign-wrapper-${word}`,
      'hidden',
    ]);
    const defaultSignImg = createElement(
      'img',
      'game-section__default-sign-img',
    ) as HTMLImageElement;
    defaultSignImg.src = ' ./assets/games/dot.svg';
    defaultSignWrapper.append(defaultSignImg);
    const correctSignImg = createElement(
      'img',
      'game-section__correct-sign-img',
    ) as HTMLImageElement;
    correctSignImg.src = ' ./assets/games/right-sign.svg';
    correctSignWrapper.append(correctSignImg);
    const wrongSignImg = createElement('img', 'game-section__wrong-sign-img') as HTMLImageElement;
    wrongSignImg.src = ' ./assets/games/wrong-sign.svg';
    wrongSignWrapper.append(wrongSignImg);
    signsWrapper.append(defaultSignWrapper, correctSignWrapper, wrongSignWrapper);
    return signsWrapper;
  };

  createContinueBtn = (): void => {
    const continueBtn = getElement('game-section__next-btn-wrapper');
    const nextBtn = createElement('button', ['btn', 'game-section__next-btn', 'game-start-btn']);
    nextBtn.innerText = '⟶';
    const gameWrapper = getElement('fixed-window');
    nextBtn.addEventListener('click', () => {
      this.emit('nextBtnClicked');
      this.hideRightAnswer();
      this.showSkipBtn();
      if (!gameWrapper.classList.contains('hidden')) {
        this.enableWordSounding();
      }
    });
    continueBtn.append(nextBtn);
  };

  createSkipBtn = (): void => {
    const skipBtnWrapper = getElement('game-section__skip-btn-wrapper');
    const skipBtn = createElement('button', ['btn', 'game-section__skip-btn', 'game-start-btn']);
    skipBtn.innerText = 'Не знаю';
    skipBtn.addEventListener('click', () => {
      this.emit('skipAnswerBtnClicked');
      const answer = this.getRightAnswer();
      this.showRightAnswer();
      this.hideSkipBtn();
      this.showSign(answer);
      this.makeWordsTransparent(answer);
      this.wordsBtnsDisable();
      this.countBarProgress();
      if (
        !AUDIOCHALLENGE_GAME_SETTINGS.unlearnedWords.includes(answer) &&
        !AUDIOCHALLENGE_GAME_SETTINGS.learnedWords.includes(answer)
      ) {
        AUDIOCHALLENGE_GAME_SETTINGS.unlearnedWords.push(answer);
      }
    });
    skipBtnWrapper.append(skipBtn);
  };

  getRightAnswer = (): string => {
    const answerElement = getElement('game-section__selected-word');
    if (answerElement) {
      return answerElement.innerHTML;;
    }
    return '';
  };

  showRightAnswer = (): void => {
    const answerWrapper = getElement('game-section__answer-wrapper');
    if (answerWrapper.classList.contains('hidden')) {
      answerWrapper.classList.remove('hidden');
    }
    const speakerWrapper = getElement('game-section__speaker-wrapper');
    if (!speakerWrapper.classList.contains('hidden')) {
      speakerWrapper.classList.add('hidden');
    }
  };

  hideRightAnswer = (): void => {
    const answerWrapper = getElement('game-section__answer-wrapper');
    if (!answerWrapper.classList.contains('hidden')) {
      answerWrapper.classList.add('hidden');
    }
    const speakerWrapper = getElement('game-section__speaker-wrapper');
    if (speakerWrapper.classList.contains('hidden')) {
      speakerWrapper.classList.remove('hidden');
    }
  };

  hideSkipBtn = (): void => {
    const skipBtnWrapper = getElement('game-section__skip-btn-wrapper');
    if (!skipBtnWrapper.classList.contains('hidden')) {
      skipBtnWrapper.classList.add('hidden');
    }
    const nextBtnWrapper = getElement('game-section__next-btn-wrapper');
    if (nextBtnWrapper.classList.contains('hidden')) {
      nextBtnWrapper.classList.remove('hidden');
    }
  };

  showSkipBtn = (): void => {
    const skipBtnWrapper = getElement('game-section__skip-btn-wrapper');
    if (skipBtnWrapper.classList.contains('hidden')) {
      skipBtnWrapper.classList.remove('hidden');
    }
    const nextBtnWrapper = getElement('game-section__next-btn-wrapper');
    if (!nextBtnWrapper.classList.contains('hidden')) {
      nextBtnWrapper.classList.add('hidden');
    }
  };

  showSign = (word: string): void => {
    const answer = this.getRightAnswer();
    const correctAnswerSignWrapper = getElement(`game-section__correct-sign-wrapper-${word}`);
    const wrongAnswerSignWrapper = getElement(`game-section__wrong-sign-wrapper-${word}`);
    const defaultAnswerSignWrapper = getElement(`game-section__default-sign-wrapper-${word}`);
    const defaultSignWrapper = getElement(`game-section__default-sign-wrapper-${answer}`);
    const correctAnswer = getElement(`game-section__correct-sign-wrapper-${answer}`);

    if (word === answer) {
      if (correctAnswerSignWrapper && correctAnswerSignWrapper.classList.contains('hidden')) {
        correctAnswerSignWrapper.classList.remove('hidden');
      }
    } else {
      if (wrongAnswerSignWrapper && wrongAnswerSignWrapper.classList.contains('hidden')) {
        wrongAnswerSignWrapper.classList.remove('hidden');
      }
      if (defaultSignWrapper && !defaultSignWrapper.classList.contains('hidden')) {
        defaultSignWrapper.classList.add('hidden');
      }
    }
    if (correctAnswer && correctAnswer.classList.contains('hidden')) {
      correctAnswer.classList.remove('hidden');
    }
    if (defaultAnswerSignWrapper && !defaultAnswerSignWrapper.classList.contains('hidden')) {
      defaultAnswerSignWrapper.classList.add('hidden');
    }
  };

  makeWordsTransparent = (word: string): void => {
    const words = Array.from(document.getElementsByClassName('game-section__word'));
    words.forEach((w) => {
      if (!w.classList.contains(`game-section__word-${word}`)) {
        w.classList.add('semitransparent');
      }
    });
  };

  crossWrongWord = (word: string): void => {
    const answer = this.getRightAnswer();
    const selectedWord = getElement(`game-section__word-${word}`);

    if (word !== answer) {
      if (!selectedWord.classList.contains('strikethrough')) {
        selectedWord.classList.add('strikethrough');
      }
    }
  };

  wordsBtnsDisable = (): void => {
    const buttons = Array.from(document.getElementsByClassName('game-section__word'));
    buttons.forEach((button) => {
      (button as HTMLButtonElement).disabled = true;
    });
  };

  checkRightAnswer = (word: string, id: string): void => {
    let flag;
    const answer = this.getRightAnswer();
    const greenBtn = getElement('game-operations-group__btn-wrapper_green');
    if (word === answer) {
      this.emit('rightAnswerClicked', id, flag = true);
      if (
        !AUDIOCHALLENGE_GAME_SETTINGS.learnedWords.includes(answer) &&
        !AUDIOCHALLENGE_GAME_SETTINGS.unlearnedWords.includes(answer)
      ) {
        AUDIOCHALLENGE_GAME_SETTINGS.learnedWords.push(answer);
      }
      if (!greenBtn.classList.contains('hidden')) {
        this.turnOnCorrectAnswerSound();
      }
    } else {
      this.emit('wrongAnswerClicked', id, flag = false);
      if (
        !AUDIOCHALLENGE_GAME_SETTINGS.learnedWords.includes(answer) &&
        !AUDIOCHALLENGE_GAME_SETTINGS.unlearnedWords.includes(answer)
      ) {
        AUDIOCHALLENGE_GAME_SETTINGS.unlearnedWords.push(answer);
      }
      if (!greenBtn.classList.contains('hidden')) {
        this.turnOnWrongAnswerSound();
      }
    }
  };

  stopTheGame = (): void => {
    const gameWrapper = getElement('fixed-window');
    if (!gameWrapper.classList.contains('hidden')) {
      gameWrapper.classList.add('hidden');
    }
    this.emit('theGameIsOver');
  };

  showGameResults = (): void => {
    const gameWrapper = getElement('fixed-result-window');
    if (gameWrapper.classList.contains('hidden')) {
      gameWrapper.classList.remove('hidden');
    }
    const wordsWrapper = getElement('result-section');
    (wordsWrapper as HTMLDivElement).style.height = '50vh';
    this.updateUnlearnedResultWordsWrapper();
    this.updateLearnedResultWordsWrapper();
    this.showOperationPanel();
    // console.log(AUDIOCHALLENGE_GAME_SETTINGS.sequenceOfCorrectAnswers);
    // console.log(AUDIOCHALLENGE_GAME_SETTINGS.tempSequenceOfCorrectAnswers);
  };

  closeGameResults = (): void => {
    const gameWrapper = getElement('fixed-result-window');
    const operationPanel = getElement('result-section__operation-panel');
    if (!gameWrapper.classList.contains('hidden')) {
      gameWrapper.classList.add('hidden');
    }
    if (!operationPanel.classList.contains('hidden')) {
      operationPanel.classList.add('hidden');
    }
    const wordsWrapper = getElement('result-section');
    (wordsWrapper as HTMLDivElement).style.height = '0';
  };

  updateUnlearnedResultWordsWrapper = (): Element => {
    const wordsWrapper = getElement('result-section__unlearned-words');
    wordsWrapper.innerHTML = '';
    const wordsWrapperHeader = createElement('h2', 'result-section__header');
    const headerSpan = createElement('span', [
      'result-section__span',
      'result-section__span_errors',
    ]);
    headerSpan.textContent = `${AUDIOCHALLENGE_GAME_SETTINGS.unlearnedWords.length}`;
    wordsWrapperHeader.textContent = 'Ошибок ';
    wordsWrapperHeader.append(headerSpan);
    wordsWrapper.append(wordsWrapperHeader);
    for (let i = 0; i < AUDIOCHALLENGE_GAME_SETTINGS.unlearnedWords.length; i += 1) {
      const word = this.audioChallengeModel.wordsChunk.find(
        (el) => el.word === AUDIOCHALLENGE_GAME_SETTINGS.unlearnedWords[i],
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
    const wordsWrapper = getElement('result-section__learned-words');
    wordsWrapper.innerHTML = '';
    const wordsWrapperHeader = createElement('h2', 'result-section__header');
    const headerSpan = createElement('span', [
      'result-section__span',
      'result-section__span_correct',
    ]);
    headerSpan.textContent = `${AUDIOCHALLENGE_GAME_SETTINGS.learnedWords.length}`;
    wordsWrapperHeader.textContent = 'Знаю ';
    wordsWrapperHeader.append(headerSpan);
    wordsWrapper.append(wordsWrapperHeader);
    for (let i = 0; i < AUDIOCHALLENGE_GAME_SETTINGS.learnedWords.length; i += 1) {
      const word = this.audioChallengeModel.wordsChunk.find(
        (el) => el.word === AUDIOCHALLENGE_GAME_SETTINGS.learnedWords[i],
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
    const soundingWord = this.audioChallengeModel.wordsChunk.find((el) => el.word === word);
    if (soundingWord) {
      const speaker = this.createSpeaker(soundingWord, 'result-section__speaker-img');
      speaker.classList.add('result-section__speaker-img_small');
      wordWrapper.append(speaker);
    }
    wordWrapper.append(wordText);
    return wordWrapper;
  };

  showOperationPanel = (): void => {
    const operationPanel = getElement('result-section__operation-panel');
    const closeBtn = this.createResultsCloseBtn();
    const existedCloseBtn = getElement('result-section__close-btn-wrapper');
    const existedContinueBtn = getElement('result-section__continue-btn');
    if (!existedCloseBtn) operationPanel.append(closeBtn);
  };

  createResultsCloseBtn = (): HTMLElement => {
    const closeBtnWrapper = createElement('div', 'result-section__close-btn-wrapper');
    const closeBtn = createElement('button', ['game-start-btn', 'result-section__close-btn']);
    closeBtn.textContent = 'Завершить игру';
    closeBtn.addEventListener('click', () => {
      if (AUDIOCHALLENGE_GAME_SETTINGS.startFromTextbook === false) {
        window.location.reload();
      } else {
        history.push('/textbook');
        window.location.reload();
      }
    });
    closeBtnWrapper.append(closeBtn);
    return closeBtnWrapper;
  };

  keyPressMethod = (() => {
    document.addEventListener('keydown', (e) => this.checkPressedBtn(e));
  })();

  checkPressedBtn = (e: KeyboardEvent): void => {
    const pressedKey = e.code;
    const gameWindow = getElement('fixed-window');
    if (gameWindow && !gameWindow.classList.contains('hidden')) {
      switch (pressedKey) {
        case 'Digit1':
        case 'Digit2':
        case 'Digit3':
        case 'Digit4':
        case 'Digit5':
        case 'Numpad1':
        case 'Numpad2':
        case 'Numpad3':
        case 'Numpad4':
        case 'Numpad5':
          this.handlePressedNumber(pressedKey);
          break;
        case 'Space':
          this.handlePressedSpace(pressedKey);
          break;
        case 'Enter':
          this.handlePressedEnter(pressedKey);
          break;
      }
    }
  };

  handlePressedNumber = (pressedKey: string): void => {
    const wordsBtns = document.getElementsByClassName('game-section__word');
    const index = +pressedKey.slice(-1) - 1;
    const translatedWord = wordsBtns[index].textContent;
    const word = this.audioChallengeModel.wordsChunk.find(
      (el) => el.wordTranslate === translatedWord,
    );
    const englishWord = word?.word;
    const wordId = word!.id;
    if (
      englishWord &&
      (wordsBtns[index] as HTMLButtonElement).disabled !== true
    ) {
      this.showRightAnswer();
      this.hideSkipBtn();
      this.showSign(englishWord);
      this.makeWordsTransparent(englishWord);
      this.crossWrongWord(englishWord);
      this.wordsBtnsDisable();
      this.checkRightAnswer(englishWord, wordId);
      this.countBarProgress();
    }
  };

  handlePressedSpace = (pressedKey: string): void => {
    const answer = this.getRightAnswer();
    const word = this.audioChallengeModel.wordsChunk.find((el) => el.word === answer);
    if (word)
      (async () => {
        const audio = new Audio(baseURL + word.audio);
        await audio.play();
      })().catch();
  };

  handlePressedEnter = (pressedKey: string): void => {
    const skipBtn = getElement('game-section__skip-btn-wrapper');
    const continueBtn = getElement('game-section__next-btn-wrapper');
    const gameWrapper = getElement('fixed-window');
    const greenBtn = getElement('game-operations-group__btn-wrapper_green');
    if (skipBtn.classList.contains('hidden') && !continueBtn.classList.contains('hidden')) {
      this.emit('nextBtnClicked');
      this.hideRightAnswer();
      this.showSkipBtn();
      if (!gameWrapper.classList.contains('hidden')) {
        this.enableWordSounding();
      }
    } else if (!skipBtn.classList.contains('hidden') && continueBtn.classList.contains('hidden')) {
      this.emit('skipAnswerBtnClicked');
      const answer = this.getRightAnswer();
      this.showRightAnswer();
      this.hideSkipBtn();
      this.showSign(answer);
      this.makeWordsTransparent(answer);
      this.wordsBtnsDisable();
      this.countBarProgress();
      if (
        !AUDIOCHALLENGE_GAME_SETTINGS.unlearnedWords.includes(answer) &&
        !AUDIOCHALLENGE_GAME_SETTINGS.learnedWords.includes(answer)
      ) {
        AUDIOCHALLENGE_GAME_SETTINGS.unlearnedWords.push(answer);
      }
      if (!greenBtn.classList.contains('hidden')) {
        this.turnOnWrongAnswerSound();
      }
    }
  };

  countBarProgress = (): void => {
    const filledValue = Math.round(
      (AUDIOCHALLENGE_GAME_SETTINGS.wordOfShakedArrCount * 100) /
        this.audioChallengeModel.shakedWordChunk.length,
    );
    this.updateProgressBar(filledValue);
  };

  updateProgressBar = (value: number): void => {
    const progressBarFill = getElement('game-progress__fill') as HTMLElement;
    const progressBarText = getElement('game-progress__text') as HTMLElement;
    progressBarFill.style.width = `${value}%`;
    progressBarText.textContent = `${value}%`;
  };
}
