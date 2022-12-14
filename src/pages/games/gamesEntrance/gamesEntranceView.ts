import { TypedEmitter } from 'tiny-typed-emitter';
import { GamesEntranceModelInterface, GamesEntranceViewInterface } from '../../../types/games/commonGamesTypes';
import { createElement, getElement } from '../../../utils/tools';
import { preloader } from '../../../components/layout/mainTemplate';

export class GamesEntranceView extends TypedEmitter implements GamesEntranceViewInterface {
  gamesEntranceModel: GamesEntranceModelInterface;

  constructor(gamesEntranceModel: GamesEntranceModelInterface) {
    super();
    this.gamesEntranceModel = gamesEntranceModel;
  }

  buildSprintHTML = (): HTMLElement => {
    const game = createElement('div', 'game-entrance');
    const gameWrapper = createElement('div', 'game-entrance__wrapper');
    const gameInfoBox = createElement('div', 'game-entrance__text-box');
    gameInfoBox.append(this.createSprintDescription(), this.createSelect(), this.createSprintStartButton());
    gameWrapper.append(this.createSprintTitle(), gameInfoBox);
    game.append(gameWrapper, this.createSprintImage());
    return game;
  };

  buildAudioChallengeHTML = (): HTMLElement => {
    const game = createElement('div', 'game-entrance');
    const gameWrapper = createElement('div', 'game-entrance__wrapper');
    const gameInfoBox = createElement('div', 'game-entrance__text-box');
    gameInfoBox.append(
      this.createAudioChallengeDescription(),
      this.createSelect(),
      this.createAudioChallengeStartButton(),
    );
    gameWrapper.append(this.createAudioChallengeTitle(), gameInfoBox);
    game.append(gameWrapper, this.createAudioChallengeImage());
    return game;
  };

  createSelect = (): HTMLElement => {
    const selectElem = createElement('select', 'select-input');
    for (let i = 0; i < 6; i += 1) {
      const option = createElement('option', `game-option-${i + 1}`);
      option.textContent = (i + 1).toString() + ' уровень';
      option.addEventListener('select', () => this.emit('gameOptionClicked', i));
      selectElem.append(option);
    }
    selectElem.addEventListener('change', () => {
      const level = parseInt((selectElem as HTMLSelectElement).value.slice(0, 1));
      return this.emit('gameOptionClicked', level);
    });
    return selectElem;
  };

  createAudioChallengeTitle = (): HTMLElement => {
    const titleElem = createElement('h2', ['game-entrance__title', 'game-entrance__title_audiochallenge']);
    titleElem.textContent = 'Аудиовызов';
    return titleElem;
  };

  createSprintTitle = (): HTMLElement => {
    const titleElem = createElement('h2', ['game-entrance__title', 'game-entrance__title_sprint']);
    titleElem.textContent = 'Спринт';
    return titleElem;
  };

  createSprintStartButton = (): HTMLElement => {
    const startBtn = createElement('button', ['btn', 'game-start-btn', 'game-start-btn_sprint']);
    startBtn.textContent = 'Начать';
    startBtn.addEventListener('click', () => {
      this.emit('sprintGameStarted');
    });
    return startBtn;
  };

  createAudioChallengeStartButton = (): HTMLElement => {
    const startBtn = createElement('button', ['btn', 'game-start-btn', 'game-start-btn_audio-challenge']);
    startBtn.textContent = 'Начать';
    startBtn.addEventListener('click', () => {
      this.emit('audioChallengeGameStarted');
    });
    return startBtn;
  };

  createSprintDescription = (): HTMLElement => {
    const descriptionDiv = createElement('div');
    const description = `
    <p>Тренировка 'Спринт' позволяет повторять слова из вашего словаря.</p>
    <ul>Чтобы выбрать:
      <li>Можно использовать мышь.</li>
      <li>Можно имспользовать клавиши влево и вправо</li>
    </ul>
    <p>Выберите уровень сложности:`;
    descriptionDiv.innerHTML = description;
    return descriptionDiv;
  };

  createAudioChallengeDescription = (): HTMLElement => {
    const descriptionDiv = createElement('div');
    const description = `
    <p>Тренировка 'Аудиовызов' улучшает восприятие речи на слух.</p>
      <ul>Чтобы играть с помощью клавиатуры, используй клавиши:
        <li><strong>1, 2, 3, 4, 5</strong> - чтобы выбрать ответ,</li>
        <li><strong>Space</strong> - для воспроизведения звука,</li>
        <li><strong>Enter</strong> - для получения подсказки или перехода к следующему вопросу.</li>
      </ul>
      <p class='bold'>Выберите уровень сложности:</p>
    `;
    descriptionDiv.innerHTML = description;
    return descriptionDiv;
  };

  createSprintImage = (): HTMLElement => {
    const image = createElement('div', 'img-x15');
    image.innerHTML = `<img src='./assets/games/delphins.svg' alt='dolphins' />`;
    return image;
  };

  createAudioChallengeImage = (): HTMLElement => {
    const image = createElement('div', 'img-x15');
    image.innerHTML = `<img src='./assets/games/tail.svg' alt='whale tail' />`;
    return image;
  };

  renderPreloader = (someClass?: string): void => {
    const mainWrapper = getElement('main__wrapper');
    mainWrapper.innerHTML = '';
    mainWrapper.insertAdjacentHTML('afterbegin', preloader);
    if (someClass) mainWrapper.classList.add(`${someClass}`);
    else mainWrapper.classList.remove('textbook');
  };
}
