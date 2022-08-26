import { getElement } from '../../utils/tools';
import { Games } from '../../components/games/games';
import history from '../../history';

export class GamesSection {
  render = () => {
    const mainWrapper = getElement('main__wrapper');
    const gamesWrapper = new Games().render();
    mainWrapper.innerHTML = '';
    mainWrapper.append(gamesWrapper);
  };
  mount = () => {
    const main = getElement('main__wrapper');
    const challengeBtn = document.getElementsByClassName('games-link__audiochallenge')[0];
    const sprintBtn = document.getElementsByClassName('games-link__sprint')[0];
    challengeBtn.addEventListener('click', () => {
      main.innerHTML = '';
      history.push('/audiochallenge');
    });
    sprintBtn.addEventListener('click', () => {
      main.innerHTML = '';
      history.push('/audiochallenge');
    });
  };
}
