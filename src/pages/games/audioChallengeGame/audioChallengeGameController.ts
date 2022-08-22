import { AudioChallengeControllerInterface, AudioChallengeModelInterface, AudioChallengeViewInterface } from '../../../types/gamesTypes';
import { AUDIOCHALLENGE_GAME_SETTINGS } from '../../../utils/constants';


export class AudioChallengeController implements AudioChallengeControllerInterface {

  audioChallengeView: AudioChallengeViewInterface;

  audioChallengeModel: AudioChallengeModelInterface;

  constructor(AudioChallengeModel: AudioChallengeModelInterface, AudioChallengeView: AudioChallengeViewInterface) {
      this.audioChallengeModel = AudioChallengeModel;
      this.audioChallengeView = AudioChallengeView;
      this.audioChallengeView
      .on('closeBtnClicked', () => this.closeAudioChallengeGame())
      .on('nextBtnClicked', () => this.turnGamePage())
      .on('wordsAreOver', () => this.changeSettingsPage())
  }
  
  getWordsList = async () => {
    const query = `words?group=${AUDIOCHALLENGE_GAME_SETTINGS.level}&page=${AUDIOCHALLENGE_GAME_SETTINGS.page}`;
    await this.audioChallengeModel.getWordsList(query);
  }

  getWordData = (id: string) => {
    const selectedWord = this.audioChallengeModel.wordsChunk.filter((el) => el.id === id);
    this.audioChallengeModel.getWordData(selectedWord[0]);
  }

  closeAudioChallengeGame = () => {
    this.audioChallengeModel.closeAudioChallengeGame();
  }

  turnGamePage = () => {
    this.audioChallengeModel.turnGamePage();
  }

  changeSettingsPage = () => {
    this.audioChallengeModel.changeSettingsPage();
  }
}
