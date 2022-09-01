import {
  GamesEntranceControllerInterface,
  GamesEntranceModelInterface,
  GamesEntranceViewInterface,
} from '../../../types/games/commonGamesTypes';
import { AUDIOCHALLENGE_GAME_SETTINGS, SPRINT_GAME_SETTINGS } from '../../../utils/constants';
import { AudioChallengeController } from '../audioChallengeGame/audioChallengeGameController';
import { AudioChallengeModel } from '../audioChallengeGame/audioChallengeGameModel';
import { AudioChallengeView } from '../audioChallengeGame/audioChallengeGameView';
import { GamesEntranceView } from './gamesEntranceView';
import { GamesEntranceModel } from './gamesEntranceModel';
import { AggregatedWordType, WordsChunkType } from '../../../types/textbookTypes';
import { SprintModel } from '../sprintGame/sprintGameModel';
import { SprintView } from '../sprintGame/sprintGameView';
import { SprintController } from '../sprintGame/sprintGameController';

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

  startAudioChallengeFromTextBook = (
    wordsCollection: WordsChunkType[] | AggregatedWordType[],
  ): void => {
    AUDIOCHALLENGE_GAME_SETTINGS.startFromTextbook = true;
    const audioChallengeModel = new AudioChallengeModel();
    const audioChallengeView = new AudioChallengeView(audioChallengeModel);
    const audioChallengeController = new AudioChallengeController(
      audioChallengeModel,
      audioChallengeView,
    );
    audioChallengeModel.getWordsListFromTextbook(wordsCollection);
    audioChallengeView.drawAudioChallengeGame();
  };

  startSprintGame = async () => {
    SPRINT_GAME_SETTINGS.startFromTextbook = false;
    const sprintModel = new SprintModel();
    const sprintView = new SprintView(sprintModel);
    const sprintController = new SprintController(sprintModel, sprintView);
    await sprintController.getWordsList();
    sprintView.buildBeReadyHTML();
  };

  startSprintGameFromTextBook = (
    wordsCollection: WordsChunkType[] | AggregatedWordType[],
  ): void => {
    AUDIOCHALLENGE_GAME_SETTINGS.startFromTextbook = true;
    // const sprintModel = new SprintModel();
    // const sprintView = new SprintView(sprintModel);
    // const sprintController = new SprintController(
    //   sprintModel,
    //   sprintView,
    // );
    // sprintModel.getWordsListFromTextbook(wordsCollection);
    // sprintView.drawAudioChallengeGame();
  };

  addGameLevel = (level: number) => {
    this.gamesEntranceModel.addGameLevel(level);
  };
}
