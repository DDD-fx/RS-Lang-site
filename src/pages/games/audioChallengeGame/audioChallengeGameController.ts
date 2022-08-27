import {
  AudioChallengeControllerInterface,
  AudioChallengeModelInterface,
  AudioChallengeViewInterface,
} from '../../../types/gamesTypes';
import { AUDIOCHALLENGE_GAME_SETTINGS } from '../../../utils/constants';

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
      .on('wordsAreOver', () => this.changeSettingsPage());
  }

  getWordsList = async (): Promise<void> => {
    let queryArray = [];
    for (let i = 0; i < 4; i++) {
      const query = `words?group=${AUDIOCHALLENGE_GAME_SETTINGS.level}&page=${
        AUDIOCHALLENGE_GAME_SETTINGS.textbookPage + i
      }`;
      queryArray.push(query);
    }
    await this.audioChallengeModel.getWordsList(queryArray);
  };

  turnGamePage = (): void => {
    this.audioChallengeModel.turnGamePage();
  };

  changeSettingsPage = (): void => {
    this.audioChallengeModel.changeSettingsPage();
    this.getWordsList();
  };
}
