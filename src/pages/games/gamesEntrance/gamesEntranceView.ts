import { TypedEmitter } from "tiny-typed-emitter";
import { GamesEntranceEventType, GamesEntranceModelInterface, GamesEntranceViewInterface } from "../../../types/types";
import { createElement } from "../../../utils/tools";
import { AudioChallengeModel } from "../audioChallengeGame/audioChallengeGameModel";
import { AudioChallengeView } from "../audioChallengeGame/audioChallengeGameView";

export class GamesEntranceView extends TypedEmitter<GamesEntranceEventType> implements GamesEntranceViewInterface {

  gamesEntranceModel: GamesEntranceModelInterface;

  constructor (gamesEntranceModel: GamesEntranceModelInterface) {
    super();
    this.gamesEntranceModel = gamesEntranceModel;
  }

  buildSprintHTML = () => {
    const game = createElement('div', 'game-entrance');
    const gameWrapper = createElement('div', 'game-entrance__wrapper');
    const gameInfoBox = createElement('div', 'game-entrance__text-box');
    gameInfoBox.append(this.createSprintDescription(), this.createSelect(), this.createSprintStartButton())
    gameWrapper.append(this.createSprintTitle(), gameInfoBox);
    game.append(gameWrapper, this.createSprintImage())
    return game;
  }

  buildAudioChallengeHTML = () => {
    const game = createElement('div', 'game-entrance');
    const gameWrapper = createElement('div', 'game-entrance__wrapper');
    const gameInfoBox = createElement('div', 'game-entrance__text-box');
    gameInfoBox.append(this.createAudioChallengeDescription(), this.createSelect(), this.createAudioChallengeStartButton())
    gameWrapper.append(this.createAudioChallengeTitle(), gameInfoBox);
    game.append(gameWrapper, this.createAudioChallengeImage())
    return game;
  }

  createSelect = () => {
    const selectElem = createElement('select', 'select-input');
    const options = `
    <option>1 уровень</option>
    <option>2 уровень</option>
    <option>3 уровень</option>
    <option>4 уровень</option>
    <option>5 уровень</option>
    <option>6 уровень</option>
    `;
    selectElem.innerHTML = options;
    return selectElem;
  }

  createAudioChallengeTitle = () => {
    const titleElem = createElement('h1', ['game-entrance__title', 'game-entrance__title_audiochallenge']);
    titleElem.textContent = 'Аудиовызов';
    return titleElem;
  }

  createSprintTitle = () => {
    const titleElem = createElement('h1', ['game-entrance__title', 'game-entrance__title_sprint']);
    titleElem.textContent = 'Спринт';
    return titleElem;
  }

  createSprintStartButton = () => {
    const startBtn = createElement('button', ['game-start-btn', 'game-start-btn_sprint']);
    startBtn.textContent = 'Начать';
    startBtn.addEventListener('click', () => {
      this.emit('sprintGameStarted');
    });
    return startBtn;
  }

  createAudioChallengeStartButton = () => {
    const startBtn = createElement('button', ['game-start-btn', 'game-start-btn_audio-challenge']);
    startBtn.textContent = 'Начать';
    const audioChallengeModel = new AudioChallengeModel();
    const audioChallengeView = new AudioChallengeView(audioChallengeModel);
    startBtn.addEventListener('click', () => {
      audioChallengeView.drawAudioChallengeGame();
      this.emit('audioChallengeGameStarted');
    });
    return startBtn;
  }

  createSprintDescription = () => {
    const descriptionDiv = createElement('div');
    const description = `
    <p>Тренировка "Спринт" позволяет повторять слова из вашего словаря.</p>
    <ul>Чтобы выбрать:
      <li>Можно использовать мышь.</li>
      <li>Можно имспользовать клавиши влево и вправо</li>
    </ul>
    <p>Выберите уровень сложности:`;
    descriptionDiv.innerHTML = description;
    return descriptionDiv;
  }

  createAudioChallengeDescription = () => {
    const descriptionDiv = createElement('div');
    const description = `
    <p>Тренировка "Аудиовызов" улучшает восприятие речи на слух.</p>
      <ul>Чтобы играть с помощью клавиатуры, используй клавиши:
        <li>1, 2, 3, 4, 5 - чтобы выбрать ответ,</li>
        <li>Space - для воспроизведения звука,</li>
        <li>Enter - для перехода к следующему вопросу.</li>
      </ul>
      <p class="bold">Выберите уровень сложности:
    `;
    descriptionDiv.innerHTML = description;
    return descriptionDiv;
  }

  createSprintImage = () => {
    const image = createElement('div', 'img-x15');
    image.innerHTML = `<img src="./assets/games/delphins.svg" alt="delphins" />`;
    return image;
  };

  createAudioChallengeImage = () => {
    const image = createElement('div', 'img-x15');
    image.innerHTML = `<img src="./assets/games/tail.svg" alt="whale tail" />`;
    return image;
  };
}