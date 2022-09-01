import { TypedEmitter } from 'tiny-typed-emitter';
import { WordsChunkType } from '../textbookTypes';

export type SprintEventsType = {
  sprintCorrectBtnClicked: () => void;
  sprintIncorrectBtnClicked: () => void;
};

export interface SprintControllerInterface {
  sprintView: SprintViewInterface;
  sprintModel: SprintModelInterface;
  getWordsList(): void;
  getRandomPage(): void;
}

export interface SprintModelInterface extends TypedEmitter<SprintEventsType> {
  wordsChunk: WordsChunkType[];
  shakedWordChunk: WordsChunkType[];
  getWordsList(query: string): void;
  shakeWordsArr(words: WordsChunkType[]): void;
}

export interface SprintViewInterface extends TypedEmitter<SprintEventsType> {
  sprintModel: SprintModelInterface;
  drawSprintGame(): void;
  createSprintQuestion(currIndex: number): void;
  addSprintAnswerListeners(): void;
}

export interface SprintViewUtilsInterface {
  buildBeReadyHTML(): void;
  createCloseBtn(): void;
  createSoundsBtns(): void;
  createSoundBtn(): HTMLElement;
  createStopSoundBtn(): HTMLElement;
  generateRandomIndex(currIndex: number): number;
}

export type SprintGameType = {
  level: number;
  startFromTextbook: boolean;
};
