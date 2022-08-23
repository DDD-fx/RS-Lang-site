import { TypedEmitter } from 'tiny-typed-emitter';
import { GamesEntranceModelInterface } from '../../../types/gamesTypes';
import { AUDIOCHALLENGE_GAME_SETTINGS } from '../../../utils/constants';

export class GamesEntranceModel extends TypedEmitter
  implements GamesEntranceModelInterface {
  constructor() {
    super();
  }

  startSprintGame = () => {
    console.log('sprint');
  };

  addGameLevel = (level: number) => {
    AUDIOCHALLENGE_GAME_SETTINGS.level = level - 1;
  }
}
