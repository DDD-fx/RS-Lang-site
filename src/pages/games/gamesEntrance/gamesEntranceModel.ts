import { TypedEmitter } from "tiny-typed-emitter";
import {
  GamesEntranceModelInterface,
} from "../../../types/types";
import { AudioChallengeModel } from "../audioChallengeGame/audioChallengeGameModel";
import { AudioChallengeView } from "../audioChallengeGame/audioChallengeGameView";

export class GamesEntranceModel extends TypedEmitter
  implements GamesEntranceModelInterface {
  constructor() {
    super();
  }

  startAudioChallengeGame = () => {
    const audioChallengeModel = new AudioChallengeModel();
    const audioChallengeView = new AudioChallengeView(audioChallengeModel);
    audioChallengeView.drawAudioChallengeGame();
  };

  startSprintGame = () => {
    console.log("sprint");
  };
}
