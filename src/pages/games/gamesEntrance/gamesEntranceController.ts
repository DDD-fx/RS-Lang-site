import { GamesEntranceControllerInterface, GamesEntranceModelInterface, GamesEntranceViewInterface } from "../../../types/gamesTypes";


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
      .on('audioChallengeGameStarted', () => this.startAudioChallengeGame())
      .on('gameOptionClicked', (i) => this.addGameLevel(i))
  }

  startAudioChallengeGame = () =>{
    this.gamesEntranceModel.startAudioChallengeGame();
  };

  startSprintGame = () => {
    this.gamesEntranceModel.startSprintGame();
  }

  addGameLevel = (level: number) => {
    this.gamesEntranceModel.addGameLevel(level);
  }
}
