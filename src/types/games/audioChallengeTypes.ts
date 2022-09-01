import { TypedEmitter } from 'tiny-typed-emitter';
import { WordBtnType } from './commonGamesTypes';
import { WordsChunkType } from '../textbookTypes';
import { GamesEventsType } from '../gamesTypes';

export interface AudioChallengeControllerInterface {
  audioChallengeView: AudioChallengeViewInterface;
  audioChallengeModel: AudioChallengeModelInterface;
  getWordsList(): void;
  turnGamePage(): void;
}

export interface AudioChallengeModelInterface extends TypedEmitter<GamesEventsType> {
  wordsChunk: WordsChunkType[];
  shakedWordChunk: WordsChunkType[];
  getWordsList(query: string): void;
  turnGamePage(): void;
  changeWord(): void;
  getWordData(word: string): void;
}

export interface AudioChallengeViewInterface extends TypedEmitter<GamesEventsType> {
  audioChallengeModel: AudioChallengeModelInterface;
  drawAudioChallengeGame(): void;
  createCloseBtn(): void;
  createWordsBtns({ id, wordTranslate, group }: WordBtnType): HTMLElement;
  createAnswerWrapper(word: string): void;
  updateWordBtnsWrapper(): Element;
  createSpeakerWrapper(word: string): void;
  enableWordSounding(): Promise<void>;
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
};
