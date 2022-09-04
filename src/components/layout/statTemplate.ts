import { LocalStorage } from '../../utils/storage';
import { StatOptionalDayType } from '../../types/userTypes';

const newWordsChart = `
<div>
  <canvas class="newWordsChart" ></canvas>
</div>
`;
const learnedWordChart = `
<div>
  <canvas class="learnedWordsChart" ></canvas>
</div>
`;

const anonimStatTemplate = `
<div class="main__container statistics">
    <div class="statistic__article anonim">
        <div class="bubbles-top img-x3">
          <img src="./assets/bubbles.svg" alt="">
        </div>
        <div class="skat img-x15">
          <img src="./assets/skat.svg" alt="">
        </div>
        <div class="statistic__title">
        <h4 class="article__title">Статистика доступна только <span class="accent">авторизованным</span> пользователям</h4>
        <a href="/login" class="btn btn-stat-login"> Войти </a>
        </div>
    </div>
</div>
`;

const renderStatTemplate = (dayData: StatOptionalDayType) => {
  const { userName } = LocalStorage.currUserSettings;
  const { audiochallenge, sprint } = dayData;
  const dayLearnedWords = audiochallenge.learnedWordsPerDay + sprint.learnedWordsPerDay;
  const dayNewWords = audiochallenge.newWordsPerDay + sprint.newWordsPerDay;
  const dayCorrectRate =
    Math.round(
      ((audiochallenge.correctAnswers + sprint.correctAnswers) /
        (audiochallenge.correctAnswers +
          sprint.correctAnswers +
          audiochallenge.incorrectAnswers +
          sprint.incorrectAnswers)) *
        100,
    ) || 0;
  const challengeCorrectRate =
    Math.round(
      (audiochallenge.correctAnswers /
        (audiochallenge.correctAnswers + audiochallenge.incorrectAnswers)) *
        100,
    ) || 0;
  const sprintCorrectRate =
    Math.round((sprint.correctAnswers / (sprint.correctAnswers + sprint.incorrectAnswers)) * 100) ||
    0;

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
        <h3 class="stat-words-data"> <span><b> ${dayLearnedWords} </b></span> слов изучено</h3>
        <h3 class="stat-words-data"> <span><b> ${dayNewWords} </b></span> новых слов</h3>
        <h3 class="stat-words-data"> <span><b> ${dayCorrectRate} % </b></span> правильных ответов</h3>
      </div>
      <div class="statistic__games">
      <div class="stat-game-card audiochallenge">
        <h4 class="stat-game-card__name">Аудиовызов</h4>
        <div class="stat-game-card__data">
          <p class="stat-game-card__learned-words">Новых слов: <span class="stat-game-card__accent ">${audiochallenge.newWordsPerDay}</span></p>
          <p class="stat-game-card__right-answers">Процент правильных ответов:<span class="stat-game-card__accent "> ${challengeCorrectRate}
              %</span></p>
          <p class="stat-game-card__responses-series">Cамая длинная серия правильных ответов: <span
              class="stat-game-card__accent">${audiochallenge.longestSeries}</span></p>
        </div>
      </div>
      <div class="stat-game-card sprint">
        <h4 class="stat-game-card__name">Спринт</h4>
        <div class="stat-game-card__data">
          <p class="stat-game-card__learned-words">Новых слов: <span class="stat-game-card__accent ">${sprint.newWordsPerDay}</span></p>
          <p class="stat-game-card__right-answers">Процент правильных ответов:<span class="stat-game-card__accent"> ${sprintCorrectRate}
              %</span></p>
          <p class="stat-game-card__responses-series">Cамая длинная серия правильных ответов: <span
              class="stat-game-card__accent ">${sprint.longestSeries}</span></p>
        </div>
        </div>
      </div>
    </div>
    <div class="statistic__title"><span class="statistic__sub-title accent"> за всё время</span></div> 
    <div class="statistic__all-time">
      <div class="all-time__card all-time-words">
        <h4 class="all-time__card__name">Количество новых слов</h4>
        <div class="all-time__card__chart">${newWordsChart}</div>
      </div>
      <div class="all-time__card all-time-dynamics">
        <h4 class="all-time__card__name"> Общее количество изученных слов</h4>
        <div class="all-time__card__chart">${learnedWordChart}</div>
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

export { renderStatTemplate, anonimStatTemplate };
