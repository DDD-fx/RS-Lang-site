import { TypedEmitter } from "tiny-typed-emitter";
import { createElement, getElement } from "../../utils/tools";

export const audioChallengeModalTemplate = `
<div class="game-entrance">
  <div class="game-entrance__wrapper">
    <h1 class="game-entrance__title game-entrance__title_audiochallenge">Аудиовызов</h1>
    <div class="game-entrance__text-box">
      <p>Тренировка "Аудиовызов" улучшает восприятие речи на слух.</p>
      <ul>Чтобы играть с помощью клавиатуры, используй клавиши:
        <li>1, 2, 3, 4, 5 - чтобы выбрать ответ,</li>
        <li>Space - для воспроизведения звука,</li>
        <li>Enter - для перехода к следующему вопросу.</li>
      </ul>
      <p class="bold">Выберите уровень сложности:
      <hr>
      <select class="select-input">
        <option>1 уровень</option>
        <option>2 уровень</option>
        <option>3 уровень</option>
        <option>4 уровень</option>
        <option>5 уровень</option>
        <option>6 уровень</option>
      </select>
      <button class="game-start-btn">Начать</button>
    </div>
  </div>
  <div class="img-x15">
    <img src="./assets/games/tail.svg" alt="whale tail" />
  </div>
</div>
`;


export const sprintModalTemplate = `
<div class="game-entrance">
  <div class="game-entrance__wrapper">
    <h1 class="game-entrance__title game-entrance__title_sprint">Спринт</h1>
    <div class="game-entrance__text-box">
      <p>Тренировка "Спринт" позволяет повторять слова из вашего словаря.</p>
      <ul>Чтобы выбрать:
        <li>Можно использовать мышь.</li>
        <li>Можно имспользовать клавиши влево и вправо</li>
      </ul>
      <p>Выберите уровень сложности:
      <hr>
      <select class="select-input">
        <option>1 уровень</option>
        <option>2 уровень</option>
        <option>3 уровень</option>
        <option>4 уровень</option>
        <option>5 уровень</option>
        <option>6 уровень</option>
      </select>
      <button class="game-start-btn">Начать</button>
    </div>
  </div>
  <div class="img-x15">
    <img src="./assets/games/delphins.svg" alt="delphins" />
  </div>
</div>
`;

export class GamesEntranceModal extends TypedEmitter{

  game

  constructor (game: string) {
    super();
    this.game = game;
  }

  render = () => {
    const main = getElement('main__wrapper');
    const modalWindow = createElement('div', 'game-modal-window');
    if (this.game === 'audiochallenge') {
      modalWindow.innerHTML = audioChallengeModalTemplate;
    } else if (this.game === 'sprint') {
      modalWindow.innerHTML = sprintModalTemplate;
    }
    main.append(modalWindow);
  };
}