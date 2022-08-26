import { TypedEmitter } from 'tiny-typed-emitter';

export type TextBookEventsType = {
  pageBtnClicked: (page: number) => void;
  groupBtnClicked: (group: number) => void;
  wordBtnClicked: (id: string, onDictPage: boolean) => void;
  dictBtnClicked: () => void;
  addDifficultWordBtnClicked: (wordID: string, difficulty: WordStatusEnum.difficult) => void;
  deleteDifficultWordBtnClicked: (wordID: string, onDictPage: boolean) => void;

  getTextBookList: () => void;
  getWordData: (word: WordsChunkType) => void;
  getUserDict: () => void;
  addDifficultWord: () => void;
  removeDifficultWordElem: (wordID: string) => void;
};

export interface TextBookModelInterface extends TypedEmitter<TextBookEventsType> {
  wordsChunk: WordsChunkType[];
  aggregatedWords: AggregatedWordType[];
  difficultWords: WordsChunkType[];
  learnedWords: WordsChunkType[];
  getTextBookList(): Promise<void>;
  getWordData(id: string, onDictPage: boolean): void;
  getDifficultWordsForCurrGroup(): Promise<void>;
  getUserDictWords(): Promise<void>;
  updateUserDictWords(): Promise<void>;
  getDifficultWords(query: string): Promise<void>;
  addUserWord(addUserWordReq: AddUserWordReqType, wordID: string): Promise<void>;
  deleteDifficultWord(wordID: string, onDictPage: boolean): Promise<void>;
  getAggregatedWords(query: string): Promise<AggregatedWordType[] | void>;
}

export interface TextBookControllerInterface {
  textBookModel: TextBookModelInterface;
  textBookView: TextBookViewInterface;
  getTextBookList(): void;
  changeTextBookPage(page: number): void;
  changeTextBookGroup(group: number): void;
  getWordData(id: string, onDictPage: boolean): void;
  getUserDictWords(): void;
  deleteDifficultWord(wordID: string, onDictPage: boolean): void;
}

export interface TextBookViewInterface extends TypedEmitter<TextBookEventsType> {
  textBookModel: TextBookModelInterface;
  userTextBookView: UserTextBookViewInterface;
  textBookViewUtils: TextBookViewUtilsInterface;
  drawTextBook(): void;
  createDifficultyBtns(): void;
  appendWordsBtns(): void;
  createWordsBtns({ id, word, wordTranslate, group }: WordsBtnsType): HTMLDivElement;
  createWordCard(word: WordsChunkType | AggregatedWordType): void;
  createAudioBtn(audio: string): HTMLButtonElement;
  createTitleAudioBlock(title: HTMLHeadingElement, audio: HTMLButtonElement): HTMLDivElement;
  createPagination(): void;
}

export interface UserTextBookViewInterface extends TypedEmitter<TextBookEventsType> {
  textBookModel: TextBookModelInterface;
  textBookView: TextBookViewInterface;
  onDictPage: boolean;
  drawDict(): void;
  drawUserTextBookElems(): void;
  createStarBtn(): void;
  createBinBtn(): void;
  removeDictElem(wordID: string): void;
  addBackToTextBookListenerBtn(): void;
  addDictBtnListener(): void;
  makeStarBtnActive(): void;
}

export interface TextBookViewUtilsInterface extends TypedEmitter<TextBookEventsType> {
  textBookModel: TextBookModelInterface;
  textBookView: TextBookViewInterface;
  createTextBookMain(template: string): void;
  addReadMeListeners(): void;
  checkGamesBtnsColor(): void;
  getCurrCollection(): WordsChunkType[];
  checkActiveWordsBtns(wordID: string): void;
  checkActiveDifficultyBtn(activeGroupNum: number): void;
  checkActivePage(currPage: number): void;
  disableDictBtn(): void;
}

export type WordsChunkType = {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  textExampleTranslate: string;
  textMeaningTranslate: string;
  wordTranslate: string;
};

export type WordsBtnsType = Pick<WordsChunkType, 'id' | 'word' | 'wordTranslate' | 'group'>;

export type AddUserWordReqType = {
  difficulty: WordStatusEnum;
  optional: { test: 'test' };
};

export type AddUserWordRespType = {
  difficulty: string;
  optional: string;
  id: string; // ещё один ID генерируется на серваке для добавленного слова
  wordId: string;
};

export type AggregatedWordsRespType = {
  paginatedResults: AggregatedWordType[];
  totalCount: [
    {
      count: number;
    },
  ];
};

export type AggregatedWordType = Omit<WordsChunkType, 'id'> & {
  _id: string;
  userWord: UserWordType;
};

export type UserWordType = {
  difficulty: WordStatusEnum;
  optional: Record<string, never>;
};

export enum WordStatusEnum {
  learned = '0',
  difficult = '1',
}
