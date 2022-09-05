const renderAudioChallengeGameTemplate = (): string => `
<div class="fixed-window-wrapper">
      <div class="fixed-window">
        <div class='game-progress'>
          <div class='game-progress__fill'></div>
          <span class='game-progress__text'>0%</span>
        </div>
        <div class="game-operations-group"></div>
        <section class="game-section">
          <div class="game-section__speaker-wrapper"></div>
          <div class="game-section__answer-wrapper hidden"></div>
          <div class="game-section__words-wrapper"></div>
          <div class="game-section__skip-btn-wrapper"></div>
          <div class="game-section__next-btn-wrapper hidden"></div>
        </section>
      </div>
      <div class="fixed-result-window hidden">
        <section class="result-section">
          <div class="result-section__words">
            <div class="result-section__learned-words"></div>
            <div class="result-section__unlearned-words"></div>
          </div>
          <div class="result-section__operation-panel"></div>
        </section>
      </div> 
    </div>
`;

export default renderAudioChallengeGameTemplate;
