import { TypedEmitter } from 'tiny-typed-emitter';
import { WordsChunkType } from './textbookTypes';

type Routes = {
  path: string;
  action: () => void;
};

type HistoryLocation = {
  hash: string;
  key: string;
  pathname: string;
  search: string;
  state: null | unknown;
};

export { Routes, HistoryLocation };

export interface GamesEntranceViewInterface extends TypedEmitter<GamesEntranceEventType> {
  gamesEntranceModel: GamesEntranceModelInterface;
  buildSprintHTML(): HTMLElement;
  buildAudioChallengeHTML(): HTMLElement;
  createAudioChallengeTitle(): HTMLElement;
  createSprintTitle(): HTMLElement;
  createSprintStartButton(): HTMLElement;
  createAudioChallengeStartButton(): HTMLElement;
  createSprintDescription(): HTMLElement;
  createAudioChallengeDescription(): HTMLElement;
  createSprintImage(): HTMLElement;
  createAudioChallengeImage(): HTMLElement;
}

export interface GamesEntranceModelInterface extends TypedEmitter<GamesEntranceEventType> {
  addGameLevel(level: number): void;
  startAudioChallengeGame(): void;
  startSprintGame(): void;
}

export type GamesEntranceEventType = {
  audioChallengeGameStarted(): void;
  sprintGameStarted(): void;
  drawChallenge(): void;
  gameOptionClicked: (level: number) => void;
};

export type GamesEventsType = {
  closeBtnClicked: () => void;
  speakerClicked: () => void;
  wordBtnClicked: (word: number) => void;

  sprintGameStarted: () => void;
  audioChallengeGameStarted: () => void;
  gameOptionClicked: (i: number) => void;
};

export interface GamesEntranceControllerInterface {
  gamesEntranceView: GamesEntranceViewInterface;
  gamesEntranceModel: GamesEntranceModelInterface;
}

export interface AudioChallengeControllerInterface {
  audioChallengeView: AudioChallengeViewInterface;
  audioChallengeModel: AudioChallengeModelInterface;
}

export interface AudioChallengeModelInterface extends TypedEmitter<GamesEventsType> {
  wordsChunk: WordsChunkType[];
  getWordsList(query: string): void;
  getWordData(word: WordsChunkType): void;
  closeAudioChallengeGame(): void;
}
export interface AudioChallengeViewInterface extends TypedEmitter<GamesEventsType> {
  audioChallengeModel: AudioChallengeModelInterface;
  drawAudioChallengeGame(): void;
  createCloseBtn(): void;
}

export type LocalStorageType = {
  userId: UserSettingsType;
};

export type UserSettingsType = {
  userEmail: string;
  userName: string;
  avatarURL: string;
  token: string;
  refreshToken: string;
  stats: string; //obj?
  currPage: number;
  currGroup: number;
  currWord: string;
};

export type AudioChallengeGameType = {
  level: number;
  wordsPerPage: number;
};
