import {
  AudioChallengeControllerInterface,
  AudioChallengeModelInterface,
  AudioChallengeViewInterface,
} from '../../../types/games/audioChallengeTypes';
import { AUDIOCHALLENGE_GAME_SETTINGS, MAX_TEXTBOOK_PAGES } from '../../../utils/constants';

export class AudioChallengeController implements AudioChallengeControllerInterface {
  audioChallengeView: AudioChallengeViewInterface;

  audioChallengeModel: AudioChallengeModelInterface;

  constructor(
    AudioChallengeModel: AudioChallengeModelInterface,

    AudioChallengeView: AudioChallengeViewInterface,
  ) {
    this.audioChallengeModel = AudioChallengeModel;
    this.audioChallengeView = AudioChallengeView;
    this.audioChallengeView
      .on('nextBtnClicked', () => this.turnGamePage())
      .on('wordOfShakedArrCountAdded', () => this.changeWord())
      .on('pressedContinueGameBtn', () => this.getWordsList())
      .on('rightAnswerClicked', (id: string, flag: boolean) => this.getWordData(id, flag))
      .on('wrongAnswerClicked', (id: string, flag: boolean) => this.getWordData(id, flag));
  }

  getWordsList = async (): Promise<void> => {
    const page = this.getRandomPage();
    const query = `words?group=${AUDIOCHALLENGE_GAME_SETTINGS.level}&page=${page}`;
    await this.audioChallengeModel.getWordsList(query);
  };

  getRandomPage = (): number => {
    const rand = Math.random() * (MAX_TEXTBOOK_PAGES + 1);
    return Math.floor(rand);
  };

  turnGamePage = (): void => {
    this.audioChallengeModel.turnGamePage();
  };

  changeWord = (): void => {
    this.audioChallengeModel.changeWord();
  };

  getWordData = (id: string, flag: boolean): void => {
    this.audioChallengeModel.getWordData(id, flag);
  };

  getNewWordData = async (diff: number): Promise<void> => {
    const page = this.getRandomPage();
    const query = `words?group=${AUDIOCHALLENGE_GAME_SETTINGS.level}&page=${page}`;
    await this.audioChallengeModel.getNewWordData(query, diff);
  };
}
