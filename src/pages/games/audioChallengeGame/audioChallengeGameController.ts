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

  getWordsList = async (page: number, level: number): Promise<void> => {
    let queryArray = [];
    if (AUDIOCHALLENGE_GAME_SETTINGS.startFromTextbook === false) {
      for (let i = 0; i < 4; i++) {
        const query = `words?group=${level}&page=${
          page + i
        }`;
        queryArray.push(query);
      }
    } else if (AUDIOCHALLENGE_GAME_SETTINGS.startFromTextbook === true) {
      if (page >= 4) {
        for (let i = page; i > page - 4; i--) {
          const query = `words?group=${level}&page=${
            page + i
          }`;
          queryArray.push(query);
        }
      } else {
        for (let i = page; i >= 0; i--) {
          const query = `words?group=${level}&page=${
            page + i
          }`;
          queryArray.push(query);
        }
      }
    }
    await this.audioChallengeModel.getWordsList(queryArray);
  };

  turnGamePage = (): void => {
    this.audioChallengeModel.turnGamePage();
  };

  changeSettingsPage = (): void => {
    if (AUDIOCHALLENGE_GAME_SETTINGS.startFromTextbook === false) {
      this.audioChallengeModel.changeSettingsPage();
      this.getWordsList(AUDIOCHALLENGE_GAME_SETTINGS.textbookPage, AUDIOCHALLENGE_GAME_SETTINGS.level);
    }
  };
}
