import {
    TextBookControllerInterface,
    TextBookModelInterface,
    TextBookViewInterface,
} from '../../types/types';

export class TextBookController implements TextBookControllerInterface {
    textBookModel: TextBookModelInterface;

    textBookView: TextBookViewInterface;

    constructor(textBookModel: TextBookModelInterface, textBookView: TextBookViewInterface) {
        this.textBookModel = textBookModel;
        this.textBookView = textBookView;
        this.textBookView.on('textBookBtnClicked', () => this.getTextBookList())
          .on('pageBtnClicked', (page) => this.changeTextBookPage(page))
          .on('groupBtnClicked', (group) => this.changeTextBookGroup(group))
          .on('wordBtnClicked', (id) => this.getWordData(id))
    }

    getTextBookList(): void {
        const query = `words?group=${this.textBookModel.state.currGroup}&page=${this.textBookModel.state.currPage}`;
        this.textBookModel.getTextBookList(query);
    }

    changeTextBookPage(page: number): void {
        const query = `words?group=${this.textBookModel.state.currGroup}&page=${page}`;
        this.textBookModel.state.currPage = page;
        this.textBookModel.getTextBookList(query);
    }

    changeTextBookGroup(group: number): void {
        this.textBookModel.state.currPage = 0;
        const query = `words?group=${group}&page=${this.textBookModel.state.currPage}`;
        this.textBookModel.state.currGroup = group;
        this.textBookModel.getTextBookList(query);
    }

    getWordData(id: string): void {
        const selectedWord = this.textBookModel.wordsChunk.filter((el) => el.id === id);
        this.textBookModel.getWordData(selectedWord[0]);
    }
}
