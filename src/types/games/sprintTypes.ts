import { TypedEmitter } from 'tiny-typed-emitter';
import { GamesEventsType } from './commonGamesTypes';
import { WordsChunkType } from '../textbookTypes';

export interface SprintControllerInterface {
  sprintView: SprintViewInterface;
  sprintModel: SprintModelInterface;
  getWordsList(): void;
}

export interface SprintModelInterface extends TypedEmitter<GamesEventsType> {
  wordsChunk: WordsChunkType[];
  shakedWordChunk: WordsChunkType[];
  getWordsList(query: string): void;
  shakeWordsArr(words: WordsChunkType[]): void;
}

export interface SprintViewInterface extends TypedEmitter<GamesEventsType> {
  sprintModel: SprintModelInterface;
  drawSprintGame(): void;
}

export type SprintGameType = {
  level: number;
  startFromTextbook: boolean;
};
