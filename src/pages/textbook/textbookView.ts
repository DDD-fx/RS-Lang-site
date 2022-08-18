import {
    TextBookEventsType,
    TextBookModelInterface,
    TextBookViewInterface,
    WordsBtnsType,
} from '../../types/types';
import { createElement, getElement } from '../../utils/tools';
import renderTextbookTemplate from '../../components/textbook';
import { MAX_TEXTBOOK_PAGES } from '../../utils/constants';
import { TypedEmitter } from 'tiny-typed-emitter';

export class TextBookView extends TypedEmitter<TextBookEventsType> implements TextBookViewInterface {
    textBookModel: TextBookModelInterface;

    constructor(textBookModel: TextBookModelInterface) {
        super();
        this.textBookModel = textBookModel;
        this.textBookModel.on('getTextBookList', () => this.drawTextBook())
    }

    drawTextBook(): void {
        const mainWrapper = getElement('main__wrapper');
        const textbook = renderTextbookTemplate();
        mainWrapper.innerHTML = '';
        mainWrapper.insertAdjacentHTML('afterbegin', textbook);
        const div = getElement('js-words-btns');
        this.textBookModel.wordsChunk.forEach((wordObj) => {
            div.append(this.createWordsBtns({
                word: wordObj.word,
                wordTranslate: wordObj.wordTranslate,
            }));
        })
        this.createPagination();
    };

    createTextBookBtn(): void {
        const div = getElement('header__wrapper');
        const btn = document.createElement('a');
        btn.href = 'textbook';
        btn.textContent = 'Учебник';
        btn.addEventListener('click', () => this.emit('textBookBtnClicked'));
        div.append(btn);
    }

    createWordsBtns({ word, wordTranslate }: WordsBtnsType): HTMLButtonElement {
        const wordBtn = document.createElement('button');
        const wordTitle = document.createElement('h3');
        wordTitle.textContent = word;
        const wordTranslation = document.createElement('p');
        wordTranslation.textContent = wordTranslate;
        wordBtn.append(wordTitle, wordTranslation);
        return wordBtn;
    }

    createPagination(): void {
        for (let i = 1; i <= MAX_TEXTBOOK_PAGES; i++) {
            const pageBtn = createElement('button', ['page-btn', 'js-page-btn']);
            pageBtn.textContent = String(i);
            pageBtn.addEventListener('click', () => this.emit('pageBtnClicked', i))

            const prevPage = getElement('js-pagination__next-page');
            prevPage.before(pageBtn);
        }
    }
}
