const renderSprintGameTemplate = () => `
<div class="fixed-sprint-wrapper">
      <div class="fixed-window">
        <div class="game-operations-group"></div>
        <section class="spint-game-wrapper">
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

export default renderSprintGameTemplate;
