import { LocalStorage } from '../../utils/storage';

const renderstatTemplate = () => {
  const { userName } = LocalStorage.currUserSettings;
  return `
  <div class="main__container statistics">
  <div class="statistic__article">
    <div class="bubbles-top img-x3">
      <img src="./assets/bubbles.svg" alt="">
    </div>
    <div class="skat img-x15">
      <img src="./assets/skat.svg" alt="">
    </div>
    <p>Привет, ${userName} ! </p>
    <div class="statistic__title"><h2 class="article__title">Статистика </h2><span class="statistic__sub-title accent">за сегодня</span></div>
    <div class="statistic__today">
      <div class="statistic__words">
        <h3 class="stat-words-data"> <span><b> 5 </b></span> слов изучено</h3>
        <h3 class="stat-words-data"> <span><b> 36 </b></span> новых слов</h3>
        <h3 class="stat-words-data"> <span><b> 89% </b></span> правильных ответов</h3>
      </div>
      <div class="statistic__games">
      <div class="stat-game-card">
        <h4 class="stat-game-card__name">Аудиовызов</h4>
        <div class="stat-game-card__data">
          <p class="stat-game-card__learned-words">Новых слов: <span class="stat-game-card__accent ">73</span></p>
          <p class="stat-game-card__right-answers">Процент правильных ответов:<span class="stat-game-card__accent "> 70
              %</span></p>
          <p class="stat-game-card__responses-series">Cамая длинная серия правильных ответов: <span
              class="stat-game-card__accent">8</span></p>
        </div>
      </div>
      <div class="stat-game-card">
        <h4 class="stat-game-card__name">Спринт</h4>
        <div class="stat-game-card__data">
          <p class="stat-game-card__learned-words">Новых слов: <span class="stat-game-card__accent ">73</span></p>
          <p class="stat-game-card__right-answers">Процент правильных ответов:<span class="stat-game-card__accent"> 70
              %</span></p>
          <p class="stat-game-card__responses-series">Cамая длинная серия правильных ответов: <span
              class="stat-game-card__accent ">8</span></p>
        </div>
        </div>
      </div>
    </div>
    <div class="statistic__all-time">
      <div class="statistic__title"><span class="statistic__sub-title accent"> за всё время</span></div> 
      <div class="all-time__card all-time-words">
        <h4 class="all-time__card__name">Количество новых слов</h4>
        <div class="all-time__card__chart"> </div>
      </div>
      <div class="all-time__card all-time-dynamics">
        <h4 class="all-time__card__name"> Общая динамика</h4>
        <div class="all-time__card__chart"> </div>
      </div>
    </div>
    <div class="bubbles img-x5">
      <img src="./assets/bubbles.svg" alt="">
    </div>
    <div class="whale img-x20">
      <img src="./assets/whale.svg" alt="">
    </div>
  </div>
</div>
`;
};

export default renderstatTemplate;
