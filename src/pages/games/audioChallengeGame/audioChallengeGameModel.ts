import { AudioChallengeModelInterface } from '../../../types/types';
import { baseURL } from '../../../utils/constants';
import { TypedEmitter } from 'tiny-typed-emitter';
import { WordsChunkType } from '../../../types/textbookTypes';

export class AudioChallengeModel extends TypedEmitter implements AudioChallengeModelInterface {
  wordsChunk: WordsChunkType[];

  constructor() {
    super();
    this.wordsChunk = [];
  }

  async getWordsList(query: string): Promise<void> {
    const data = await fetch(baseURL + query);
    this.wordsChunk = (await data.json()) as WordsChunkType[];
    console.log(this.wordsChunk);
    this.emit('getWordList');
  }

  getWordData(word: WordsChunkType): void {
    this.emit('getWordData', word);
  }

  closeAudioChallengeGame(): void {
    console.log('bye');
  }
}
