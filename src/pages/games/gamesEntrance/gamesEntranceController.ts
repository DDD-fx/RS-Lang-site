import {
  GamesEntranceControllerInterface,
  GamesEntranceModelInterface,
  GamesEntranceViewInterface,
} from '../../../types/gamesTypes';
import { AUDIOCHALLENGE_GAME_SETTINGS } from '../../../utils/constants';
import { AudioChallengeController } from '../audioChallengeGame/audioChallengeGameController';
import { AudioChallengeModel } from '../audioChallengeGame/audioChallengeGameModel';
import { AudioChallengeView } from '../audioChallengeGame/audioChallengeGameView';
import { GamesEntranceView } from './gamesEntranceView';
import { GamesEntranceModel } from './gamesEntranceModel';

export default class GamesEntranceController implements GamesEntranceControllerInterface {
  gamesEntranceView: GamesEntranceViewInterface;

  gamesEntranceModel: GamesEntranceModelInterface;

  constructor() {
    this.gamesEntranceModel = new GamesEntranceModel();
    this.gamesEntranceView = new GamesEntranceView(this.gamesEntranceModel);
    this.gamesEntranceView
      .on('sprintGameStarted', () => this.startSprintGame())
      .on('audioChallengeGameStarted', () => this.startAudioChallengeGame())
      .on('gameOptionClicked', (i) => this.addGameLevel(i));
  }

  startAudioChallengeGame = async () => {
    AUDIOCHALLENGE_GAME_SETTINGS.startFromTextbook = false;
    const audioChallengeModel = new AudioChallengeModel();
    const audioChallengeView = new AudioChallengeView(audioChallengeModel);
    const audioChallengeController = new AudioChallengeController(
      audioChallengeModel,
      audioChallengeView,
    );
    await audioChallengeController.getWordsList();
    audioChallengeView.drawAudioChallengeGame();
  };

  startSprintGame = () => {
    this.gamesEntranceModel.startSprintGame();
  };

  addGameLevel = (level: number) => {
    this.gamesEntranceModel.addGameLevel(level);
  };
}
