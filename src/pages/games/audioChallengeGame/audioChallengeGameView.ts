import { createElement, getElement } from '../../../utils/tools';
import { TypedEmitter } from 'tiny-typed-emitter';
import renderAudioChallengeGameTemplate from '../../../components/games/audioChallengeGame';
import {
  AudioChallengeModelInterface,
  AudioChallengeViewInterface,
  GamesEventsType,
  WordBtnType,
} from '../../../types/gamesTypes';
import {
  AUDIOCHALLENGE_GAME_SETTINGS,
  baseURL,
} from '../../../utils/constants';

export class AudioChallengeView extends TypedEmitter<GamesEventsType>
  implements AudioChallengeViewInterface {
  audioChallengeModel: AudioChallengeModelInterface;

  constructor(audioChallengeModel: AudioChallengeModelInterface) {
    super();
    this.audioChallengeModel = audioChallengeModel;
    this.audioChallengeModel
      .on('getWordList', () => this.drawAudioChallengeGame())
      .on('nextBtnClicked', () => this.updateWordBtnsWrapper())
      .on('pageChanged', () => this.updateWordBtnsWrapper());
  }

  drawAudioChallengeGame = () => {
    const mainWrapper = getElement('main__wrapper');
    const audioChallengeGame = renderAudioChallengeGameTemplate();
    mainWrapper.innerHTML = '';
    mainWrapper.insertAdjacentHTML('afterbegin', audioChallengeGame);
    this.createCloseBtn();
    this.updateWordBtnsWrapper();
    this.createContinueBtn();
  };

  updateWordBtnsWrapper = () => {
    const wordsWrapper = getElement('game-section__words-wrapper');
    wordsWrapper.innerHTML = '';
    for (
      let i = AUDIOCHALLENGE_GAME_SETTINGS.wordCount;
      i <
      AUDIOCHALLENGE_GAME_SETTINGS.wordCount +
        AUDIOCHALLENGE_GAME_SETTINGS.wordsPerPage;
      i += 1
    ) {
      if (this.audioChallengeModel.wordsChunk[i]) {
        wordsWrapper.append(
          this.createWordsBtns({
            wordTranslate: this.audioChallengeModel.wordsChunk[i].wordTranslate,
            id: this.audioChallengeModel.wordsChunk[i].id,
            group: this.audioChallengeModel.wordsChunk[i].group,
          })
        );
      } else {
        console.log(this.audioChallengeModel.wordsChunk[i]);
        this.emit('wordsAreOver');
      }
    }
    const soundingWord = this.audioChallengeModel.wordsChunk[
      this.selectRandomSoundingWord()
    ].word;
    this.createAnswerWrapper(soundingWord);
    this.createSpeakerWrapper(soundingWord);
    return wordsWrapper;
  };

  selectRandomSoundingWord = () => {
    const min = AUDIOCHALLENGE_GAME_SETTINGS.wordCount;
    const max =
      AUDIOCHALLENGE_GAME_SETTINGS.wordCount +
      AUDIOCHALLENGE_GAME_SETTINGS.wordsPerPage;
    const randomIndex = Math.floor(Math.random() * (max - min)) + min;
    console.log(randomIndex);
    return randomIndex;
  };

  createCloseBtn = () => {
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
  };

  createSpeakerWrapper = (soundingWord: string) => {
    const speakerWrapper = getElement('game-section__speaker-wrapper');
    speakerWrapper.innerHTML = '';
    const word = this.audioChallengeModel.wordsChunk.find(
      (el) => el.word === soundingWord
    );

    const speaker = createElement(
      'img',
      'game-section__speaker-img'
    ) as HTMLImageElement;
    speaker.src = './assets/games/speaker.svg';
    speaker.addEventListener('click', () => {
      (async () => {
        const audio = new Audio(baseURL + word!.audio);
        await audio.play();
      })().catch();
    });
    speakerWrapper.append(speaker);
  };

  createAnswerWrapper = (soundingWord: string) => {
    const answerWrapper = getElement('game-section__answer-wrapper');
    answerWrapper.innerHTML = '';
    const word = this.audioChallengeModel.wordsChunk.find(
      (el) => el.word === soundingWord
    );
    const wordAndSpeakerWrapper = createElement(
      'div',
      'game-section__word-wrapper'
    );
    const selectedWord = createElement('span', 'game-section__word');
    const speakerWrapper = createElement(
      'div',
      'game-section__answer-speaker-wrapper'
    );
    const speaker = createElement(
      'img',
      'game-section__speaker-img'
    ) as HTMLImageElement;
    speaker.src = './assets/games/speaker.svg';
    speaker.addEventListener('click', () => {
      (async () => {
        const audio = new Audio(baseURL + word!.audio);
        await audio.play();
      })().catch();
    });
    selectedWord.innerText = soundingWord;
    speakerWrapper.append(speaker);
    wordAndSpeakerWrapper.append(speakerWrapper);
    wordAndSpeakerWrapper.append(selectedWord);
    answerWrapper.append(wordAndSpeakerWrapper);
  };

  createWordsBtns = ({
    id,
    wordTranslate,
    group,
  }: WordBtnType): HTMLButtonElement => {
    const wordBtn = createElement('button', [
      'game-section__word',
      `game-section__word-group-${group}`,
      `game-section__word-${id + 1}`,
    ]) as HTMLButtonElement;
    wordBtn.addEventListener('click', () =>
      // this.emit('wordBtnClicked', id);
      this.showRightAnswer(id)
    );
    wordBtn.textContent = wordTranslate;
    return wordBtn;
  };

  createContinueBtn = () => {
    const continueBtn = getElement('game-section__btn-wrapper');
    const nextBtn = createElement('button', [
      'game-section__next-btn',
      'game-start-btn',
    ]);
    nextBtn.innerText = 'Не знаю';
    nextBtn.addEventListener('click', () => this.emit('nextBtnClicked'));
    continueBtn.append(nextBtn);
  };

  showRightAnswer = (id: string) => {
    console.log('hi');
    
  };
}
