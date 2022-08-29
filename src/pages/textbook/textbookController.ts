import {
  AddUserWordBodyType,
  TextBookControllerInterface,
  WordsChunkType,
  WordStatusEnum,
} from '../../types/textbookTypes';
import { TextBookModel } from './textbookModel';
import { TextBookView } from './textbookView';
import { LocalStorage } from '../../utils/storage';

export class TextBookController implements TextBookControllerInterface {
  textBookModel;

  textBookView;

  constructor() {
    this.textBookModel = new TextBookModel();
    this.textBookView = new TextBookView(this.textBookModel);
    this.textBookView
      .on('pageBtnClicked', (page) => this.changeTextBookPage(page))
      .on('groupBtnClicked', (group) => this.changeTextBookGroup(group))
      .on('wordBtnClicked', (id, onDictPage) => this.getWordCardData(id, onDictPage))
      .on('dictBtnClicked', () => this.getUserDictWords())
      .on('addDifficultWordBtnClicked', (wordID, wordStatus) =>
        this.addUserWord(wordID, wordStatus),
      )
      .on('deleteDifficultWordBtnClicked', (wordID, onDictPage, wordStatus) =>
        this.deleteUserWord(wordID, onDictPage, wordStatus),
      )
      .on('addLearnedWordBtnClicked', (wordID, wordStatus) => this.addUserWord(wordID, wordStatus))
      .on('deleteLearnedWordBtnClicked', (wordID, onDictPage, wordStatus) =>
        this.deleteUserWord(wordID, onDictPage, wordStatus),
      )
      .on('audioChallengeBtnClicked', () => this.getAudioChallengeCollection());
  }

  init = async (): Promise<void> => {
    if (this.textBookView.userTextBookView.onDictPage) {
      this.textBookView.userTextBookView.drawDict();
    } else {
      await this.textBookModel.getTextBookList();
    }
  };

  changeTextBookPage = (page: number): void => {
    LocalStorage.currUserSettings.currPage = page;
    LocalStorage.currUserSettings.currWord = '';
    LocalStorage.setLSData(LocalStorage.currUserID, LocalStorage.currUserSettings);
    void this.textBookModel.getTextBookList();
  };

  changeTextBookGroup = (group: number): void => {
    LocalStorage.currUserSettings.currPage = 0;
    LocalStorage.currUserSettings.currWord = '';
    LocalStorage.currUserSettings.currGroup = group;
    LocalStorage.setLSData(LocalStorage.currUserID, LocalStorage.currUserSettings);
    void this.textBookModel.getTextBookList();
  };

  getWordCardData = (id: string, onDictPage: boolean): void => {
    LocalStorage.currUserSettings.currWord = id;
    LocalStorage.setLSData(LocalStorage.currUserID, LocalStorage.currUserSettings);
    this.textBookModel.getWordCardData(id, onDictPage);
  };

  getUserDictWords = (): void => {
    void this.textBookModel.getUserDictWords();
  };

  addUserWord = async (wordID: string, wordStatus: WordStatusEnum): Promise<void> => {
    await this.checkCollection(wordID, wordStatus);
    const addUserWordReq: AddUserWordBodyType = {
      difficulty: wordStatus,
      optional: { test: 'test' },
    };
    void (await this.textBookModel.addUserWord(addUserWordReq, wordID));
  };

  deleteUserWord = (wordID: string, onDictPage: boolean, wordStatus: WordStatusEnum): void => {
    void this.textBookModel.deleteUserWord(wordID, onDictPage, wordStatus);
  };

  checkCollection = async (wordID: string, wordStatus: WordStatusEnum): Promise<void> => {
    if (wordStatus === WordStatusEnum.difficult) {
      const learnedWordsString = JSON.stringify(this.textBookModel.learnedWords);
      if (learnedWordsString.includes(wordID)) {
        await this.textBookModel.deleteUserWord(wordID, false, WordStatusEnum.learned);
        this.textBookView.userTextBookView.checkBinBtnActive();
      }
    } else {
      const difficultWordsString = JSON.stringify(this.textBookModel.difficultWords);
      if (difficultWordsString.includes(wordID)) {
        const onDictPage = this.textBookView.userTextBookView.onDictPage;
        await this.textBookModel.deleteUserWord(wordID, onDictPage, WordStatusEnum.difficult);
        this.textBookView.userTextBookView.checkStarBtnActive();
      }
    }
  };

  getAudioChallengeCollection = (): WordsChunkType[] => {
    if (!LocalStorage.currUserID) {
      return this.textBookModel.wordsChunk;
    }
    const learnedSet = new Set(this.textBookModel.learnedWords.map(({ id }) => id));
    const collection = this.textBookModel.wordsChunk.filter((word) => !learnedSet.has(word.id));
    console.log('getAudioChallengeCollection', collection);
    return collection;
  };
}
