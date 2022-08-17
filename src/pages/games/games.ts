import { getElement } from '../../utils/tools';
import { Games } from '../../components/games/games';

export class GamesSection {

  render = () => {
    const mainWrapper = getElement('main__wrapper');
    const gamesWrapper = new Games().render();;
    mainWrapper.innerHTML = '';
    mainWrapper.append(gamesWrapper);
  };
}