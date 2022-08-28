const renderAdvTemplate = () => `
<div class="main__container advantages">
<div class="article main__article">
<div class="bubbles-top img-x3">
<img src="./assets/bubbles.svg" alt="">
</div>
<div class="skat img-x15">
    <img src="./assets/skat.svg" alt="">
  </div>
  <h2 class="article__title">О приложении </h2>
<div class="advantages__content">

                            <div class="advantages__item">
                                <img src="assets/textbook-img.jpg" alt="textbook-img">
                                <h4 class="advantages-title">Электронный учебник</h4>
                                <p class="advantages-text">База из более 3500 слов. Шесть уровней сложности. Удобная навигация. Запоминание прогресса.</p>
                            </div>
                            <div class="advantages__item">
                                <h4 class="advantages-title second">Обучающие игры</h4>
                                <p class="advantages-text second">Игра "Аудиовызов" - поможет лучше воспринимать английский язык на слух. 
                                Игра "Спринт" - развивает реакцию и интуитивное понимание языка.</p>
                                <img class="second" src="assets/games-img.jpg" alt="textbook-img">
                            </div>
                            <div class="advantages__item">
                            <img src="assets/textbook-img.jpg" alt="textbook-img">
                            <h4 class="advantages-title">Статистика</h4>
                            <p class="advantages-text">Мы собираем информацию о вашем прогрессе по дням и за весь период обучения!</p>
                        </div>
                        </div>
  <div class="article__bottom-nav bottom-nav">
  <span class="bottom-nav__back"> <img class="main" src="./assets/icon-left.svg" alt=""></span>
  <button class="btn btn-bottom-nav team"> Разработчики <img class="team" src="./assets/icon-right.svg" alt=""></button></div>
  </div>
  <div class="bubbles img-x5">
  <img src="./assets/bubbles.svg" alt="">
</div>
<div class="whale img-x20">

    <img src="./assets/whale.svg" alt="">
  </div>
`;

export default renderAdvTemplate;
