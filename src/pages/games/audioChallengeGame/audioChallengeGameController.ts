import {
  AudioChallengeControllerInterface,
  AudioChallengeModelInterface,
  AudioChallengeViewInterface,
} from '../../../types/gamesTypes';
import { AUDIOCHALLENGE_GAME_SETTINGS } from '../../../utils/constants';

export class AudioChallengeController
  implements AudioChallengeControllerInterface {
  audioChallengeView: AudioChallengeViewInterface;

  audioChallengeModel: AudioChallengeModelInterface;

  constructor(
    AudioChallengeModel: AudioChallengeModelInterface,
    AudioChallengeView: AudioChallengeViewInterface
  ) {
    this.audioChallengeModel = AudioChallengeModel;
    this.audioChallengeView = AudioChallengeView;
    this.audioChallengeView
      .on('nextBtnClicked', () => this.turnGamePage())
      .on('wordsAreOver', () => this.changeSettingsPage());
  }

  getWordsList = async () => {
    const query = `words?group=${AUDIOCHALLENGE_GAME_SETTINGS.level}&page=${AUDIOCHALLENGE_GAME_SETTINGS.page}`;
    await this.audioChallengeModel.getWordsList(query);
  };

  turnGamePage = () => {
    this.audioChallengeModel.turnGamePage();
  };

  changeSettingsPage = () => {
    this.audioChallengeModel.changeSettingsPage();
  };
}
