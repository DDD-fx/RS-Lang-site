import {
  AddUserWordReqType,
  TextBookControllerInterface,
  WordStatusEnum,
} from '../../types/textbookTypes';
import { TextBookModel } from './textbookModel';
import { TextBookView } from './textbookView';
import { LocalStorage } from '../../utils/storage';
import { MAX_TEXTBOOK_PAGES } from '../../utils/constants';

export class TextBookController implements TextBookControllerInterface {
  textBookModel;

  textBookView;

  constructor() {
    this.textBookModel = new TextBookModel();
    this.textBookView = new TextBookView(this.textBookModel);
    this.textBookView
      .on('pageBtnClicked', (page) => this.changeTextBookPage(page))
      .on('groupBtnClicked', (group) => this.changeTextBookGroup(group))
      .on('wordBtnClicked', (id, onDictPage) => this.getWordData(id, onDictPage))
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
      );
  }

  init = async (): Promise<void> => {
    if (this.textBookView.userTextBookView.onDictPage) {
      this.textBookView.userTextBookView.drawDict();
    } else {
      await this.textBookModel.getTextBookList();
      this.markPagesLearned();
    }
  };

  changeTextBookPage = async (page: number): Promise<void> => {
    LocalStorage.currUserSettings.currPage = page;
    LocalStorage.currUserSettings.currWord = '';
    LocalStorage.setLSData(LocalStorage.currUserID, LocalStorage.currUserSettings);
    await this.textBookModel.getTextBookList();
    this.markPagesLearned();
  };

  changeTextBookGroup = async (group: number): Promise<void> => {
    LocalStorage.currUserSettings.currPage = 0;
    LocalStorage.currUserSettings.currWord = '';
    LocalStorage.currUserSettings.currGroup = group;
    LocalStorage.setLSData(LocalStorage.currUserID, LocalStorage.currUserSettings);
    await this.textBookModel.getTextBookList();
    this.markPagesLearned();
  };

  getWordData = (id: string, onDictPage: boolean): void => {
    LocalStorage.currUserSettings.currWord = id;
    LocalStorage.setLSData(LocalStorage.currUserID, LocalStorage.currUserSettings);
    this.textBookModel.getWordData(id, onDictPage);
  };

  getUserDictWords = (): void => {
    void this.textBookModel.getUserDictWords();
  };

  addUserWord = async (wordID: string, wordStatus: WordStatusEnum): Promise<void> => {
    await this.checkCollection(wordID, wordStatus);
    const addUserWordReq: AddUserWordReqType = {
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

  markPagesLearned = (): void => {
    for (let i = 0; i < MAX_TEXTBOOK_PAGES; i++) {
      const learnedWords = this.textBookModel.learnedWords.filter((word) => word.page === i);
      if (learnedWords.length === 20) this.textBookView.userTextBookView.markPageLearned(i);
    }
  };
}
