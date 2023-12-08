import Player from '@vimeo/player';
import Throttle from 'lodash.throttle';
// 3. Ініціалізуй плеєр у файлі скрипта як це описано в секції pre-existing player, але враховуй, що у тебе плеєр доданий як npm пакет, а не через CDN.
const iframe = document.querySelector('iframe');
const player = new Player(iframe);
player.on('play', function () {
  console.log('played the video!');
});

// 4. Вивчи документацію методу on() і почни відстежувати подію timeupdate - оновлення часу відтворення.
const onPlay = function (data) {
  data.seconds;
  // 5. Зберігай час відтворення у локальне сховище. Нехай ключем для сховища буде рядок "videoplayer-current-time".
  localStorage.setItem('videoplayer-current-time', data.seconds);
};
// 7. Додай до проекту бібліотеку lodash.throttle і зроби так, щоб час відтворення оновлювався у сховищі не частіше, ніж раз на секунду.

player.on('timeupdate', Throttle(onPlay, 1000));

// 6. Під час перезавантаження сторінки скористайся методом setCurrentTime() з метою відновлення відтворення зі збереженої позиції.
let getCurrentTime = localStorage.getItem('videoplayer-current-time');
console.log(typeof getCurrentTime);
let currentTime = JSON.parse(getCurrentTime);

player
  .setCurrentTime(currentTime)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
    console.log('Seek:', seconds);
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
