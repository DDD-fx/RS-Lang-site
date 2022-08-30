import { TypedEmitter } from "tiny-typed-emitter";
import { GamesEventsType, WordBtnType } from "./commonGamesTypes";
import { WordsChunkType } from "../textbookTypes";

export interface AudioChallengeControllerInterface {
  audioChallengeView: AudioChallengeViewInterface;
  audioChallengeModel: AudioChallengeModelInterface;
  getWordsList(): void;
  turnGamePage(): void;
  changeSettingsPage(): void;
}

export interface AudioChallengeModelInterface extends TypedEmitter<GamesEventsType> {
  wordsChunk: WordsChunkType[];
  shakedWordChunk: WordsChunkType[];
  getWordsList(query: string): void;
  turnGamePage(): void;
  changeSettingsPage(): void;
  changeWord(): void;
}

export interface AudioChallengeViewInterface extends TypedEmitter<GamesEventsType> {
  audioChallengeModel: AudioChallengeModelInterface;
  drawAudioChallengeGame(): void;
  createCloseBtn(): void;
  createWordsBtns({ id, wordTranslate, group }: WordBtnType): HTMLElement;
  createAnswerWrapper(word: string): void;
  updateWordBtnsWrapper(): Element;
  selectRandomSoundingWord(): number;
  createSpeakerWrapper(word: string): void;
  enableWordSounding(): Promise<void>;
  createAnswerWrapper(word: string): void;
  createAnswerSigns(word: string): Element;
  createContinueBtn(): void;
  createSkipBtn(): void;
  getRightAnswer(): string;
  showRightAnswer(): void;
  hideRightAnswer(): void;
  hideSkipBtn(): void;
  showSkipBtn(): void;
  showSign(word: string): void;
  makeWordsTransparent(word: string): void;
  crossWrongWord(word: string): void;
  wordsBtnsDisable(): void;
}

export type AudioChallengeGameType = {
  level: number;
  wordsPerPage: number;
  gamePage: number;
  textbookPage: number;
  wordCount: number;
  soundingWordId: string;
  learnedWords: string[];
  unlearnedWords: string[];
  startFromTextbook: boolean;
  wordOfShakedArrCount: number;
  shakedWordsArray: WordsChunkType[];
  stopSounding: boolean;
};