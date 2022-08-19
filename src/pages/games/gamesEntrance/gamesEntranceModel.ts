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
    console.log("audio");
  };

  startSprintGame = () => {
    console.log("sprint");
  };
}
