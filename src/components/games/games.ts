import { createElement, getElement } from '../../utils/tools';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();
import { TypedEmitter } from 'tiny-typed-emitter';
import { GamesEntranceView } from '../../pages/games/gamesEntrance/gamesEntranceView';
import { GamesEntranceModel } from '../../pages/games/gamesEntrance/gamesEntranceModel';

const gamesTemplateInner = `
<h1 class="games-title">Игры</h1>
<div class="img-x5 position-left">
  <img src="./assets/bubbles.svg" alt="bubbles"/>
</div>
<article class="games-wrapper">
  <a href="/audiochallenge" class="games-link">
    <figure class="games-figure">
      <p>
        <img
          src="../../assets/games/headphones.svg"
          alt="headphones"
          class="games-figure__image"
        />
      </p>
      <figcaption class="games-figcaption">Аудиовызов</figcaption>
    </figure>
  </a>
  <a href="/sprint" class="games-link">
    <figure class="games-figure">
      <p>
        <img
          src="../../assets/games/fish.svg"
          alt="fish"
          class="games-figure__image games-figure__image_fish"
        />
      </p>
      <figcaption class="games-figcaption">Спринт</figcaption>
    </figure>
  </a>
</article>
<div class="img-x5 position-right">
  <img src="./assets/bubbles.svg" alt="bubbles" />
</div>
`;

class Games extends TypedEmitter{
  games;

  constructor() {
    super();
    this.games = createElement('section', 'games-section');
    this.games.innerHTML = gamesTemplateInner;
    this.bind();
  }

  render = () => {
    return this.games;
  };

  bind = () => {
    this.games.addEventListener('click', (event) => {
      event.preventDefault();
      const anchor = (<HTMLElement>event.target).closest('a') as HTMLAnchorElement;
      if (anchor) {
        const url = anchor.pathname;
        history.push(url);
        if (url === '/audiochallenge') {
          this.gameEntranceModalRender('audiochallenge');
        } else if (url === '/sprint') {
          this.gameEntranceModalRender('sprint');
        }
      }
    });
  };

  gameEntranceModalRender = (game: string) => {
    const main = getElement('main__wrapper');
    main.innerHTML = '';
    if (game === 'audiochallenge') {
      main.append(new GamesEntranceView(new GamesEntranceModel()).buildAudioChallengeHTML());
    } else if (game === 'sprint') {
      main.append(new GamesEntranceView(new GamesEntranceModel()).buildSprintHTML());
    }
    
    
  }

}


export { Games, history };