import { StateType, TextBookModelInterface, WordsChunkType } from '../../types/types';
import { baseURL } from '../../utils/constants';
import { TypedEmitter } from 'tiny-typed-emitter';

export class TextBookModel extends TypedEmitter implements TextBookModelInterface {
    state: StateType;

    wordsChunk: WordsChunkType[];

    constructor() {
        super();
        this.state = {id: '', currPage: 0, currGroup: 0};
        this.wordsChunk = [];
    }

    async getTextBookList(query: string): Promise<void> {
        const data = await fetch(baseURL + query);
        this.wordsChunk = await data.json() as WordsChunkType[];

        console.log(this.wordsChunk);
        this.emit('getTextBookList');
    }
}
