import { TypedEmitter } from 'tiny-typed-emitter';

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



export type TextBookEventsType = {
  textBookBtnClicked: () => void,
  pageBtnClicked: (i: number) => void,

  getTextBookList: () => void,
}

export interface TextBookControllerInterface {
  textbookModel: TextBookModelInterface;
  textbookView: TextBookViewInterface;
  getTextBookList(page: number, group: number): void;
}

export interface TextBookViewInterface extends TypedEmitter<TextBookEventsType> {
  textBookModel: TextBookModelInterface;
  drawTextBook(wordsChunk: WordsChunkType): void;
  createTextBookBtn(): void;
  createWordsBtns({ word, wordTranslate }: WordsBtnsType): HTMLButtonElement;
  createPagination(): void;
}

export interface TextBookModelInterface extends TypedEmitter<TextBookEventsType> {
  state: StateType;
  wordsChunk: WordsChunkType[];
  getTextBookList(query: string): void;
}

export type StateType = {
  id: string,
  currPage: number,
  currGroup: number,
};

export type WordsChunkType = {
  "id": string,
  "group": number,
  "page": number,
  "word": string,
  "image": string,
  "audio": string,
  "audioMeaning": string,
  "audioExample": string,
  "textMeaning": string,
  "textExample": string,
  "transcription": string,
  "textExampleTranslate": string,
  "textMeaningTranslate": string,
  "wordTranslate": string,
}

export type WordsBtnsType = Pick<WordsChunkType, 'word' | 'wordTranslate'>

/*export interface EventEmitterInterface {
  events: EventsType;
  on(evt: string, listener: (arg: CallbackArgType) => void): EventEmitterInterface;
  emit(evt: string, arg?: CallbackArgType): void;
}
export type CallbackArgType = WordsChunkType | string | number | undefined;
export type EventsType = {
  textBookBtnClicked?: Array<(data?: CallbackArgType) => void>,
  pageBtnClicked?: Array<(data?: CallbackArgType) => void>,

  getTextBookList?: Array<(data?: CallbackArgType) => void>,
}*/
