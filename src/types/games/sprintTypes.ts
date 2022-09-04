import { TypedEmitter } from 'tiny-typed-emitter';
import { AggregatedWordType, WordsChunkType } from '../textbookTypes';
import { ApiMethodsEnum, GameEnum } from '../enums';

export type SprintEventsType = {
  sprintCorrectAnswerClicked: (gameCurrWord: WordsChunkType | AggregatedWordType) => void;
  sprintIncorrectAnswerClicked: (gameCurrWord: WordsChunkType | AggregatedWordType) => void;
  drawNextSprintQuestion: () => void;
};

export interface SprintControllerInterface {
  sprintView: SprintViewInterface;
  sprintModel: SprintModelInterface;
  getWordsList(): void;
  getRandomPage(): void;
  checkSprintCorrectAnswer(gameCurrWord: WordsChunkType | AggregatedWordType): void;
  checkSprintIncorrectAnswer(gameCurrWord: WordsChunkType | AggregatedWordType): void;
  checkChainOfCorrectAnswers(answer: boolean): void;
}

export interface SprintModelInterface extends TypedEmitter<SprintEventsType> {
  allPageChunk: WordsChunkType[];
  wordsChunk: WordsChunkType[] | AggregatedWordType[];
  shakedWordChunk: WordsChunkType[] | AggregatedWordType[];
  getWordsList(query: string): Promise<void>;
  getPageChunk(): Promise<void>;
  shakeWordsArr(words: WordsChunkType[]): void;
  updateWordOnSprintAnswer(currWord: AggregatedWordType, method: ApiMethodsEnum): Promise<void>;
  getStatistics(): Promise<void>;
  setStatistics(gameKey: GameEnum): Promise<void>;
}

export interface SprintViewInterface extends TypedEmitter<SprintEventsType> {
  sprintModel: SprintModelInterface;
  sprintViewUtils: SprintViewUtilsInterface;
  gameCurrWord: WordsChunkType | AggregatedWordType;
  isAnswerCorrect: boolean;
  isSprintRunning: boolean;
  currIndex: number;
  drawSprintGame(): void;
  createSprintQuestion(currIndex: number): void;
  addSprintAnswerListeners(): void;
  showResults(): void;
}

export interface SprintViewUtilsInterface {
  sprintModel: SprintModelInterface;
  sprintView: SprintViewInterface;
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
  learnedWords: string[];
  unlearnedWords: string[];
  sequenceOfCorrectAnswers: number;
  tempSequenceOfCorrectAnswers: number;
  learnedPerGame: number;
};
