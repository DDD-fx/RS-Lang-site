import { TypedEmitter } from 'tiny-typed-emitter';
import { GamesEntranceModelInterface } from '../../../types/types';
import { AUDIOCHALLENGE_GAME_SETTINGS } from '../../../utils/constants';
import { AudioChallengeController } from '../audioChallengeGame/audioChallengeGameController';
import { AudioChallengeModel } from '../audioChallengeGame/audioChallengeGameModel';
import { AudioChallengeView } from '../audioChallengeGame/audioChallengeGameView';

export class GamesEntranceModel extends TypedEmitter implements GamesEntranceModelInterface {
  constructor() {
    super();
  }

  startAudioChallengeGame = () => {
    const audioChallengeModel = new AudioChallengeModel();
    const audioChallengeView = new AudioChallengeView(audioChallengeModel);
    const audioChallengeController = new AudioChallengeController(
      audioChallengeModel,
      audioChallengeView,
    );
    audioChallengeView.drawAudioChallengeGame();
  };

  startSprintGame = () => {
    console.log('sprint');
  };

  addGameLevel = (level: number) => {
    AUDIOCHALLENGE_GAME_SETTINGS.level = level - 1;
  };
}
