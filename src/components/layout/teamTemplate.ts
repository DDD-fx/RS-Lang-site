const renderTeamTemplate = () => `
<div class="main__container advantages">
<div class="article main__article">
<div class="bubbles-top img-x3">
<img src="./assets/bubbles.svg" alt="">
</div>
<div class="skat img-x15">
    <img src="./assets/skat.svg" alt="">
  </div>
  <h2 class="article__title">Разработчики </h2>
<div class="advantages__content">
                            <div class="advantages__item">
                                <img class="avatar" src="assets/ddd-fx-avatar.jpg" alt="ddd-fx-avatar">
                                <h4 class="team__title"><a href="https://github.com/ddd-fx" class="github-logo"><img src="assets/github-logo.png" alt="github-logo"></a>Дмитрий</h4>
                                <ul class="team__list" >
                                <li class="team__list-item">Электронный учебник</li>
                                <li class="team__list-item">Список слов</li>
                                <li class="team__list-item">Игра Спринт</li>
                              </ul>
                            </div>
                            <div class="advantages__item">
                            <img class="avatar" src="assets/orla-avatar.jpg" alt="orla-avatar">
                            <h4 class="team__title"><a href="https://github.com/orla90" class="github-logo"><img src="assets/github-logo.png" alt="github-logo"></a>Ольга</h4>
                            <ul class="team__list" >
                            <li class="team__list-item">Игра Аудиовызов</li>
                            <li class="team__list-item">Игра Спринт</li>
                            <li class="team__list-item">Страница игр</li>
                          </ul>
                        </div>
                            <div class="advantages__item">
                            <img class="avatar outlaw" src="assets/outlaw-avatar.jpg" alt="outlaw-avatar">
                            <h4 class="team__title"><a href="https://github.com/OutLaw0" class="github-logo"><img src="assets/github-logo.png" alt="github-logo"></a>Валентин</h4>
                            <ul class="team__list" >
                            <li class="team__list-item">Главная страница</li>
                            <li class="team__list-item">Авторизация </li>
                            <li class="team__list-item">Статистика</li>
                          </ul>
                        </div>
                    </div>
  <div class="article__bottom-nav bottom-nav">
  <span class="bottom-nav__back"> <img class="advantages" src="./assets/icon-left.svg" alt=""></span>
  <button class="btn btn-bottom-nav main"> Главная <img class="main" src="./assets/icon-right.svg" alt=""></button></div>
  </div>
  <div class="bubbles img-x5">
  <img src="./assets/bubbles.svg" alt="">
</div>
<div class="whale img-x20">
    <img src="./assets/whale.svg" alt="">
  </div>
`;

export default renderTeamTemplate;
