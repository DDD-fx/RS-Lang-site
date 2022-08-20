import {
  GamesEntranceControllerInterface,
  GamesEntranceModelInterface,
  GamesEntranceViewInterface,
} from "../../../types/types";

export default class GamesEntranceController
  implements GamesEntranceControllerInterface {
  gamesEntranceView: GamesEntranceViewInterface;
  gamesEntranceModel: GamesEntranceModelInterface;

  constructor(
    gamesEntranceView: GamesEntranceViewInterface,
    gamesEntranceModel: GamesEntranceModelInterface
  ) {
    this.gamesEntranceView = gamesEntranceView;
    this.gamesEntranceModel = gamesEntranceModel;
    this.gamesEntranceView
      .on('sprintGameStarted', () => this.startSprintGame())
      .on('audioChallengeGameStarted', () => this.startAudioChallengeGame());
  }

  startAudioChallengeGame = () => {
    this.gamesEntranceModel.startAudioChallengeGame();
  };

  startSprintGame(): void {
    this.gamesEntranceModel.startSprintGame();
  }
}
