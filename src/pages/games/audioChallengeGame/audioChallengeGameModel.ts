import { AudioChallengeModelInterface, StateType, WordsChunkType } from '../../../types/types';
import { baseURL } from '../../../utils/constants';
import { TypedEmitter } from 'tiny-typed-emitter';

export class AudioChallengeModel extends TypedEmitter implements AudioChallengeModelInterface {
    state: StateType;

    wordsChunk: WordsChunkType[];

    constructor() {
        super();
        this.state = {id: '', currPage: 0, currGroup: 0};
        this.wordsChunk = [];
    }
  
    async getWordsList(query: string): Promise<void> {
      const data = await fetch(baseURL + query);
      this.wordsChunk = await data.json() as WordsChunkType[];
      this.emit('getWordList');
  }

    getWordData(word: WordsChunkType): void {
        this.emit('getWordData', word);
    }

    closeAudioChallengeGame(): void {
        console.log("bye");
    }
}
