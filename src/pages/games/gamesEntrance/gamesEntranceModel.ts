import { TypedEmitter } from 'tiny-typed-emitter';
import { GamesEntranceModelInterface } from '../../../types/games/commonGamesTypes';
import { AUDIOCHALLENGE_GAME_SETTINGS, SPRINT_GAME_SETTINGS } from '../../../utils/constants';

export class GamesEntranceModel extends TypedEmitter implements GamesEntranceModelInterface {
  constructor() {
    super();
  }

  addGameLevel = (level: number) => {
    AUDIOCHALLENGE_GAME_SETTINGS.level = level - 1;
    SPRINT_GAME_SETTINGS.level = level - 1;
  };
}
