import { TypedEmitter } from 'tiny-typed-emitter';

export type TextBookEventsType = {
  pageBtnClicked: (page: number) => void;
  groupBtnClicked: (group: number) => void;
  wordBtnClicked: (id: string, onDictPage: boolean) => void;
  dictBtnClicked: () => void;
  addDifficultWordBtnClicked: (
    wordID: string,
    wordStatus: WordStatusEnum.difficult,
  ) => Promise<void>;
  deleteDifficultWordBtnClicked: (wordID: string, wordStatus: WordStatusEnum.difficult) => void;
  addLearnedWordBtnClicked: (wordID: string, wordStatus: WordStatusEnum.learned) => Promise<void>;
  deleteLearnedWordBtnClicked: (wordID: string, wordStatus: WordStatusEnum.learned) => void;
  audioChallengeBtnClicked: () => void;

  getTextBookList: () => void;
  getWordCardData: (word: WordsChunkType) => void;
  getUserDict: () => void;
  addDifficultWord: () => void;
  removeDifficultWordElem: (wordID: string) => void;
  updateMarkedPages: () => void;
};

export interface TextBookModelInterface extends TypedEmitter<TextBookEventsType> {
  wordsChunk: WordsChunkType[];
  difficultWords: WordsChunkType[];
  learnedWords: WordsChunkType[];
  newWords: WordsChunkType[];
  getTextBookList(): Promise<void>;
  getWordCardData(id: string, onDictPage: boolean): void;
  getAggregatedWordsForCurrGroup(query: string, wordStatus: WordStatusEnum): Promise<void>;
  getUserDictWords(): Promise<void>;
  updateUserWordsCollection(wordStatus: WordStatusEnum): Promise<void>;
  getAggregatedWords(query: string, wordStatus: WordStatusEnum): Promise<void>;
  addUserWord(addUserWordReqBody: AddUserWordBodyType, wordID: string): Promise<void>;
  updateUserWord(
    wordID: string,
    onDictPage: boolean,
    wordStatus: WordStatusEnum,
    isWordNew: boolean,
    makeNew: boolean,
  ): Promise<void>;
  getAggregatedUserWordOptions(
    wordID: string,
    wordStatus: WordStatusEnum,
    isWordNew: boolean,
  ): AddUserWordBodyType | undefined;
  getAggregatedUserWordOptionsForNew(
    wordID: string,
    wordStatus: WordStatusEnum,
  ): AddUserWordBodyType | undefined;
  mapUserWordsID(difficultWords: RawAggregatedWordType[]): WordsChunkType[];
}

export interface TextBookControllerInterface {
  textBookModel: TextBookModelInterface;
  textBookView: TextBookViewInterface;
  init(): Promise<void>;
  changeTextBookPage(page: number): void;
  changeTextBookGroup(group: number): void;
  getWordCardData(id: string, onDictPage: boolean): void;
  getUserDictWords(): void;
  addUserWord(wordID: string, wordStatus: WordStatusEnum): Promise<void>;
  makeWordNew(wordID: string, wordStatus: WordStatusEnum): Promise<void>;
  isWordNew(wordID: string): boolean;
  isWordDifficult(wordID: string): boolean;
  isWordLearned(wordID: string): boolean;
  getAudioChallengeCollection(): WordsChunkType[];
}

export interface TextBookViewInterface extends TypedEmitter<TextBookEventsType> {
  textBookModel: TextBookModelInterface;
  userTextBookView: UserTextBookViewInterface;
  textBookViewUtils: TextBookViewUtilsInterface;
  drawTextBook(): void;
  createWordsGroupBtns(): void;
  appendWordsBtns(): void;
  createWordsBtns({ id, word, wordTranslate, group }: WordsBtnsType): HTMLDivElement;
  createWordCard(word: WordsChunkType | AggregatedWordType): void;
  createAudioBtn(audio: string): HTMLButtonElement;
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
  checkStarBtnActive(): void;
  checkBinBtnActive(): void;
  markPagesLearned(): void;
  markPageLearned(i: number, toBeMarked: boolean): void;
  updateMarkedPages(): void;
  disableGameBtns(): void;
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
  getStarBtn(wordID: string): SVGElement;
  getBinBtn(wordID: string): SVGElement;
  addGameBtnsListeners(): void;
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

export type AddUserWordRespType = {
  difficulty: string;
  optional: string;
  id: string; // ещё один ID генерируется на серваке для добавленного слова
  wordId: string;
};

export type AggregatedWordsRespType = {
  paginatedResults: RawAggregatedWordType[];
  totalCount: [
    {
      count: number;
    },
  ];
};

export type RawAggregatedWordType = Omit<WordsChunkType, 'id'> & {
  _id: string;
  userWord: AddUserWordBodyType;
};

export type AggregatedWordType = WordsChunkType & {
  userWord: AddUserWordBodyType;
};

export type AddUserWordBodyType = {
  difficulty: WordStatusEnum;
  optional: { test: string };
};

export enum WordStatusEnum {
  learned = '0',
  difficult = '1',
  new = '2',
}
