import {
  AddUserWordReqType,
  TextBookControllerInterface,
  TextBookModelInterface,
  TextBookViewInterface,
  WordStatusEnum,
} from '../../types/textbookTypes';
import { LocalStorage } from '../../utils/storage';

export class TextBookController implements TextBookControllerInterface {
  textBookModel;

  textBookView;

  constructor(textBookModel: TextBookModelInterface, textBookView: TextBookViewInterface) {
    this.textBookModel = textBookModel;
    this.textBookView = textBookView;
    this.textBookView
      .on('pageBtnClicked', (page) => this.changeTextBookPage(page))
      .on('groupBtnClicked', (group) => this.changeTextBookGroup(group))
      .on('wordBtnClicked', (id, onDictPage) => this.getWordData(id, onDictPage))
      .on('dictBtnClicked', () => this.getUserDictWords())
      .on('addDifficultWordBtnClicked', (wordID, difficulty) =>
        this.addUserWord(wordID, difficulty),
      )
      .on('deleteDifficultWordBtnClicked', (wordID, onDictPage) =>
        this.deleteDifficultWord(wordID, onDictPage),
      );
  }

  getTextBookList = (): void => {
    void this.textBookModel.getTextBookList();
  };

  changeTextBookPage = (page: number): void => {
    LocalStorage.currUserSettings.currPage = page;
    LocalStorage.setLSData(LocalStorage.currUserID, LocalStorage.currUserSettings);

    void this.textBookModel.getTextBookList();
  };

  changeTextBookGroup = (group: number) => {
    LocalStorage.currUserSettings.currPage = 0;
    LocalStorage.currUserSettings.currWord = '';
    LocalStorage.currUserSettings.currGroup = group;
    LocalStorage.setLSData(LocalStorage.currUserID, LocalStorage.currUserSettings);

    void this.textBookModel.getTextBookList();
    // LocalStorage.currUserSettings.currWord = this.textBookModel.wordsChunk[0].id;
  };

  getWordData = (id: string, onDictPage: boolean): void => {
    LocalStorage.currUserSettings.currWord = id;
    LocalStorage.setLSData(LocalStorage.currUserID, LocalStorage.currUserSettings);
    this.textBookModel.getWordData(id, onDictPage);
  };

  getUserDictWords = (): void => {
    void this.textBookModel.getUserDictWords();
  };

  addUserWord = (wordID: string, difficulty: WordStatusEnum): void => {
    const addUserWordReq: AddUserWordReqType = {
      difficulty: difficulty,
      optional: { test: 'test' },
    };
    void this.textBookModel.addUserWord(addUserWordReq, wordID);
  };

  deleteDifficultWord = (wordID: string, onDictPage: boolean): void => {
    void this.textBookModel.deleteDifficultWord(wordID, onDictPage);
  };
}
