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



export interface EventEmitterInterface {
  events: EventsType;
  on(evt: string, listener: (arg: CallbackArgType) => void): EventEmitterInterface;
  emit(evt: string, arg?: CallbackArgType): void;
}
export type CallbackArgType = WordsChunkType | string | number | null | undefined;
export type EventsType = {
  textBookBtnClicked?: Array<(data?: CallbackArgType) => void>,
  getTextBookList?: Array<(data?: CallbackArgType) => void>,
}

export interface TextBookControllerInterface {
  getTextBookList(): void;
}

export interface TextBookViewInterface extends EventEmitterInterface {
  textBookModel: TextBookModelInterface;
  drawTextBook(wordsChunk: WordsChunkType): void;
  createTextBookBtn(): void;
  createWordsBtns({ word, wordTranslate }: WordsBtnsType): HTMLButtonElement;
}

export interface TextBookModelInterface extends EventEmitterInterface {
  state: StateType;
  wordsChunk: WordsChunkType[];
  getTextBookList(): void;
}

export type StateType = {
  id: string,
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
