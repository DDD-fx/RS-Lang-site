import {
  AudioChallengeModelInterface,
  AudioChallengeViewInterface,
  GamesEventType,
} from '../../../types/types';
import { createElement, getElement } from '../../../utils/tools';
import { baseURL } from '../../../utils/constants';
import { TypedEmitter } from 'tiny-typed-emitter';
import renderAudioChallengeGameTemplate from '../../../components/games/audioChallengeGame';

export class AudioChallengeView extends TypedEmitter<GamesEventType> implements AudioChallengeViewInterface {
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
  };

  createCloseBtn(): void {
    const gameOperationsGroup = getElement('game-operations-group');
    const closeBtn = createElement('div', 'game-operations-group__close-btn');
    const cross = createElement('img', 'game-operations-group__cross-img') as HTMLImageElement;
    cross.src = "./assets/games/cross.svg";
    closeBtn.append(cross);
    closeBtn.addEventListener('click', () => this.emit('closeBtnClicked'));
    gameOperationsGroup.append(closeBtn);
  };
}