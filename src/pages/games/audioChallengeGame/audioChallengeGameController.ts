import { AudioChallengeControllerInterface, AudioChallengeModelInterface, AudioChallengeViewInterface } from "../../../types/types";


export class AudioChallengeController implements AudioChallengeControllerInterface {

  audioChallengeView: AudioChallengeViewInterface;
  audioChallengeModel: AudioChallengeModelInterface;

  constructor(AudioChallengeModel: AudioChallengeModelInterface, AudioChallengeView: AudioChallengeViewInterface) {
      this.audioChallengeModel = AudioChallengeModel;
      this.audioChallengeView = AudioChallengeView;
      this.audioChallengeView.on('closeBtnClicked', () => this.closeAudioChallengeGame())
  }

  getWordsList(): void {
      const query = `words?group=${this.audioChallengeModel.state.currGroup}&page=${this.audioChallengeModel.state.currPage}`;
      this.audioChallengeModel.getWordsList(query);
  }

  getWordData(id: string): void {
      const selectedWord = this.audioChallengeModel.wordsChunk.filter((el) => el.id === id);
      this.audioChallengeModel.getWordData(selectedWord[0]);
  }

  closeAudioChallengeGame(): void {
    this.audioChallengeModel.closeAudioChallengeGame();
  }
}