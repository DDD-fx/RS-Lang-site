import {
  SprintControllerInterface,
  SprintModelInterface,
  SprintViewInterface,
} from '../../../types/games/sprintTypes';
import { MAX_TEXTBOOK_PAGES, SPRINT_GAME_SETTINGS } from '../../../utils/constants';

export class SprintController implements SprintControllerInterface {
  sprintView: SprintViewInterface;

  sprintModel: SprintModelInterface;

  constructor(SprintModel: SprintModelInterface, SprintView: SprintViewInterface) {
    this.sprintModel = SprintModel;
    this.sprintView = SprintView;
    this.sprintView
      .on('sprintCorrectBtnClicked', () => this.checkSprintAnswer())
      .on('sprintIncorrectBtnClicked', () => this.checkSprintAnswer());
  }

  getWordsList = (): void => {
    const page = this.getRandomPage();
    const query = `words?group=${SPRINT_GAME_SETTINGS.level}&page=${page}`;
    this.sprintModel.getWordsList(query);
  };

  getRandomPage = (): number => {
    const rand = Math.random() * (MAX_TEXTBOOK_PAGES + 1);
    return Math.floor(rand);
  };

  checkSprintAnswer = (): void => {};
}
