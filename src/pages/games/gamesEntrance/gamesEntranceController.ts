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
import { LocalStorage } from '../../../utils/storage';

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

  startAudioChallengeGame = async (): Promise<void> => {
    this.gamesEntranceView.renderPreloader();
    AUDIOCHALLENGE_GAME_SETTINGS.startFromTextbook = false;
    const audioChallengeModel = new AudioChallengeModel();
    const audioChallengeView = new AudioChallengeView(audioChallengeModel);
    const audioChallengeController = new AudioChallengeController(
      audioChallengeModel,
      audioChallengeView,
    );
    await audioChallengeModel.getStatistics();
    await audioChallengeController.getWordsList();
    audioChallengeView.drawAudioChallengeGame();
  };

  startAudioChallengeFromTextBook = async (
    wordsCollection: WordsChunkType[] | AggregatedWordType[],
  ): Promise<void> => {
    this.gamesEntranceView.renderPreloader();
    AUDIOCHALLENGE_GAME_SETTINGS.startFromTextbook = true;
    const audioChallengeModel = new AudioChallengeModel();
    const audioChallengeView = new AudioChallengeView(audioChallengeModel);
    const audioChallengeController = new AudioChallengeController(
      audioChallengeModel,
      audioChallengeView,
    );
    audioChallengeModel.getWordsListFromTextbook(wordsCollection);
    if (wordsCollection.length < AUDIOCHALLENGE_GAME_SETTINGS.wordsPerPage) {
      await audioChallengeController.getNewWordData(
        AUDIOCHALLENGE_GAME_SETTINGS.wordsPerPage - wordsCollection.length,
      );
    }
    await audioChallengeModel.getStatistics();
    audioChallengeView.drawAudioChallengeGame();
  };

  startSprintGame = async (): Promise<void> => {
    this.gamesEntranceView.renderPreloader();
    SPRINT_GAME_SETTINGS.startFromTextbook = false;
    const sprintModel = new SprintModel();
    const sprintView = new SprintView(sprintModel);
    const sprintController = new SprintController(sprintModel, sprintView);
    if (LocalStorage.currUserSettings.userId) await sprintModel.getUserWordsForSprint();
    else await sprintModel.getDefaultWordsForSprint();
    await sprintModel.getStatistics();
    sprintView.sprintViewUtils.buildBeReadyHTML();
  };

  startSprintGameFromTextBook = async (
    wordsCollection: WordsChunkType[] | AggregatedWordType[],
  ): Promise<void> => {
    this.gamesEntranceView.renderPreloader();
    SPRINT_GAME_SETTINGS.startFromTextbook = true;
    const sprintModel = new SprintModel();
    const sprintView = new SprintView(sprintModel);
    const sprintController = new SprintController(sprintModel, sprintView);
    sprintModel.getWordsListFromTextbook(wordsCollection);
    await sprintModel.getPageChunk();
    await sprintModel.getStatistics();
    sprintView.sprintViewUtils.buildBeReadyHTML();
  };

  addGameLevel = (level: number): void => {
    this.gamesEntranceModel.addGameLevel(level);
  };
}
