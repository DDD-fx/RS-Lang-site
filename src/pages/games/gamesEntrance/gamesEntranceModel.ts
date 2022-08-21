import { TypedEmitter } from "tiny-typed-emitter";
import {
  GamesEntranceModelInterface,
} from "../../../types/types";

export class GamesEntranceModel extends TypedEmitter
  implements GamesEntranceModelInterface {
  constructor() {
    super();
  }

  startAudioChallengeGame = () => {
    this.emit("drawChallenge");
  };

  startSprintGame = () => {
    console.log("sprint");
  };
}
