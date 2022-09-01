import { TypedEmitter } from 'tiny-typed-emitter';
import renderSprintGameTemplate from '../../../components/games/sprintGame';
import { GamesEventsType } from '../../../types/games/commonGamesTypes';
import { SprintModelInterface, SprintViewInterface } from '../../../types/games/sprintTypes';
import { createElement, getElement } from '../../../utils/tools';
import history from '../../../utils/history';
import { SPRINT_GAME_SETTINGS } from '../../../utils/constants';

export class SprintView extends TypedEmitter<GamesEventsType> implements SprintViewInterface {
  sprintModel: SprintModelInterface;

  constructor(sprintModel: SprintModelInterface) {
    super();
    this.sprintModel = sprintModel;
  }

  drawSprintGame = (): void => {
    const mainWrapper = getElement('body');
    const sprintGame = renderSprintGameTemplate();
    mainWrapper.innerHTML = '';
    mainWrapper.insertAdjacentHTML('afterbegin', sprintGame);
    this.createSoundsBtns();
    this.createCloseBtn();
  };

  createCloseBtn = (): void => {
    const gameOperationsGroup = getElement('game-operations-group');
    const closeBtn = createElement('div', 'game-operations-group__close-btn');
    const cross = createElement('img', 'game-operations-group__cross-img') as HTMLImageElement;
    cross.src = './assets/games/cross.svg';
    closeBtn.append(cross);
    closeBtn.addEventListener('click', () => {
      if (SPRINT_GAME_SETTINGS.startFromTextbook === false) {
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
}
