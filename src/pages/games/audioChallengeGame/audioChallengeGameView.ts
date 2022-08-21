import {
  AudioChallengeModelInterface,
  AudioChallengeViewInterface,
  GamesEventsType,
} from "../../../types/types";
import { createElement, getElement } from "../../../utils/tools";
import { TypedEmitter } from "tiny-typed-emitter";
import renderAudioChallengeGameTemplate from "../../../components/games/audioChallengeGame";

export class AudioChallengeView extends TypedEmitter<GamesEventsType>
  implements AudioChallengeViewInterface {
  audioChallengeModel: AudioChallengeModelInterface;

  constructor(audioChallengeModel: AudioChallengeModelInterface) {
    super();
    this.audioChallengeModel = audioChallengeModel;
  }

  drawAudioChallengeGame(): void {
    const mainWrapper = getElement('main__wrapper');
    const audioChallengeGame = renderAudioChallengeGameTemplate();
    mainWrapper.innerHTML = '';
    mainWrapper.insertAdjacentHTML('afterbegin', audioChallengeGame);
    this.createCloseBtn();
    this.createSpeakerWrapper();
    this.createAnswerWrapper();
    this.createWordsWrapper();
    this.createContinueBtn();
  }

  createCloseBtn(): void {
    const gameOperationsGroup = getElement('game-operations-group');
    const closeBtn = createElement('div', 'game-operations-group__close-btn');
    const cross = createElement(
      'img',
      'game-operations-group__cross-img'
    ) as HTMLImageElement;
    cross.src = './assets/games/cross.svg';
    closeBtn.append(cross);
    closeBtn.addEventListener('click', () => this.emit('closeBtnClicked'));
    gameOperationsGroup.append(closeBtn);
  }

  createSpeakerWrapper(): void {
    const speakerWrapper = getElement('game-section__speaker-wrapper');
    const speaker = createElement(
      'img',
      'game-section__speaker-img'
    ) as HTMLImageElement;
    speaker.src = './assets/games/speaker.svg';
    speaker.addEventListener('click', () => this.emit('speakerClicked'));
    speakerWrapper.append(speaker);
  }

  createAnswerWrapper(): void {
    const answerWrapper = getElement('game-section__answer-wrapper');
    const wordAndSpeakerWrapper = createElement(
      'div',
      'game-section__word-wrapper'
    );
    const word = createElement('span', 'game-section__word');
    const speakerWrapper = createElement(
      'div',
      'game-section__answer-speaker-wrapper'
    );
    const speaker = createElement(
      'img',
      'game-section__speaker-img'
    ) as HTMLImageElement;
    speaker.src = './assets/games/speaker.svg';
    word.innerText = 'word';
    speakerWrapper.append(speaker);
    wordAndSpeakerWrapper.append(speakerWrapper);
    wordAndSpeakerWrapper.append(word);
    answerWrapper.append(wordAndSpeakerWrapper);
  }

  createWordsWrapper(): void {
    const wordsWrapper = getElement('game-section__words-wrapper');
    for (let i = 0; i < 5; i += 1) {
      const wordBtn = createElement('button', [
        'game-section__word',
        `game-section__word-${i + 1}`,
      ]);
      wordBtn.addEventListener('click', () =>
        this.emit('wordBtnClicked', i + 1)
      );
      wordBtn.textContent = i.toString();
      wordsWrapper.append(wordBtn);
    }
  }

  createContinueBtn(): void {
    const continueBtn = getElement('game-section__btn-wrapper');
    const nextBtn = createElement('button', ['game-section__next-btn', 'game-start-btn']);
    nextBtn.innerText = 'Не знаю';
    continueBtn.append(nextBtn);
  }
}
