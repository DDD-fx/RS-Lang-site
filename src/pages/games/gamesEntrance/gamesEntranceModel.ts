import { TypedEmitter } from 'tiny-typed-emitter';
import { GamesEntranceModelInterface } from '../../../types/gamesTypes';
import { AUDIOCHALLENGE_GAME_SETTINGS } from '../../../utils/constants';
import { AudioChallengeController } from '../audioChallengeGame/audioChallengeGameController';
import { AudioChallengeModel } from '../audioChallengeGame/audioChallengeGameModel';
import { AudioChallengeView } from '../audioChallengeGame/audioChallengeGameView';

export class GamesEntranceModel extends TypedEmitter
  implements GamesEntranceModelInterface {
  constructor() {
    super();
  }

  startAudioChallengeGame = async () => {
    const audioChallengeModel = new AudioChallengeModel();
    const audioChallengeView = new AudioChallengeView(audioChallengeModel);
    const audioChallengeController = new AudioChallengeController(audioChallengeModel, audioChallengeView);
    await audioChallengeController.getWordsList();
    setTimeout(audioChallengeView.drawAudioChallengeGame, 500)
  };

  startSprintGame = () => {
    console.log('sprint');
  };

  addGameLevel = (level: number) => {
    AUDIOCHALLENGE_GAME_SETTINGS.level = level - 1;
  }
}
