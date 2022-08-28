import { LocalStorage } from '../../utils/storage';

const renderstatTemplate = () => {
  const { userName } = LocalStorage.currUserSettings;
  return `
<div class="main__container advantages">
<div class="article main__article">
<div class="bubbles-top img-x3">
<img src="./assets/bubbles.svg" alt="">
</div>
<div class="skat img-x15">
    <img src="./assets/skat.svg" alt="">
  </div>
  <h2 class="article__title">Статистика </h2>
  <p>Привет, ${userName} ! </p>
  <div class="bubbles img-x5">
  <img src="./assets/bubbles.svg" alt="">
</div>
<div class="whale img-x20">

    <img src="./assets/whale.svg" alt="">
  </div>
`;
};

export default renderstatTemplate;
