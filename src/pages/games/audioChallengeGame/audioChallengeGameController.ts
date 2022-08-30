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
      .on('rightAnswerClicked', (word) => this.getWordData(word))
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

  getWordData = (word: string): void => {
    this.audioChallengeModel.getWordData(word);
  };
}
