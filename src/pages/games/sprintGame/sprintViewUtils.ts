import {
  SprintModelInterface,
  SprintViewInterface,
  SprintViewUtilsInterface,
} from '../../../types/games/sprintTypes';
import { createElement, getElement } from '../../../utils/tools';
import { renderSprintGameBeReadyTemplate } from '../../../components/games/sprintGame';
import { SPRINT_GAME_SETTINGS } from '../../../utils/constants';
import history from '../../../utils/history';

export class SprintViewUtils implements SprintViewUtilsInterface {
  sprintModel: SprintModelInterface;

  sprintView: SprintViewInterface;

  constructor(sprintModel: SprintModelInterface, sprintView: SprintViewInterface) {
    this.sprintModel = sprintModel;
    this.sprintView = sprintView;
  }

  buildBeReadyHTML = (): void => {
    const mainWrapper = getElement('body');
    const sprintGameBeReadyTemplate = renderSprintGameBeReadyTemplate();
    mainWrapper.innerHTML = '';
    mainWrapper.insertAdjacentHTML('afterbegin', sprintGameBeReadyTemplate);
    this.createSoundsBtns();
    this.createCloseBtn();

    let counter = 3;
    const time = getElement('be-ready__num') as HTMLElement;
    function fun(): void {
      counter -= 1;
      if (time) {
        time.textContent = counter.toString();
      }
    }
    const inter = setInterval(fun, 1000);
    if (counter <= 0) clearInterval(inter);

    setTimeout(() => this.sprintView.drawSprintGame(), 1000); ////// 4000
  };

  createCloseBtn = (): void => {
    const gameOperationsGroup = getElement('game-operations-group');
    const closeBtn = createElement('div', 'game-operations-group__close-btn');
    const cross = createElement('img', [
      'game-operations-group__cross-img',
      'game-operations-group__cross-img_dark',
    ]) as HTMLImageElement;
    cross.src = './assets/games/cross.svg';
    closeBtn.append(cross);
    closeBtn.addEventListener('click', () => {
      if (!SPRINT_GAME_SETTINGS.startFromTextbook) {
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
    soundBtn.addEventListener('click', () => {
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

  generateRandomIndex = (currIndex: number): number => {
    const generatedIndex = Math.floor(this.sprintModel.shakedWordChunk.length * Math.random());
    if (generatedIndex !== currIndex) return generatedIndex;
    else return this.generateRandomIndex(currIndex);
  };
}
