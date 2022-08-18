import {
    TextBookControllerInterface,
    TextBookModelInterface,
    TextBookViewInterface,
} from '../../types/types';

export class TextBookController implements TextBookControllerInterface {
    textbookModel: TextBookModelInterface;

    textbookView: TextBookViewInterface;

    constructor(textBookModel: TextBookModelInterface, textBookView: TextBookViewInterface) {
        this.textbookModel = textBookModel;
        this.textbookView = textBookView;
        this.textbookView.on('textBookBtnClicked', () => this.getTextBookList())
          .on('pageBtnClicked', (page) => this.getTextBookList(page))
    }

    getTextBookList(
      page = this.textbookModel.state.currPage,
      group = this.textbookModel.state.currGroup
    ): void {
        const query = `words?group=${group}&page=${page}`;
        this.textbookModel.getTextBookList(query);
    }
}
