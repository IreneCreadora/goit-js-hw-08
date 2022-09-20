import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const KEY = 'videoplayer-current-time';

const onTimeUpdate = function (data) {
  localStorage.setItem(KEY, data.seconds);
};

player.on('timeupdate', throttle(onTimeUpdate, 1000));

player
  .setCurrentTime(localStorage.getItem(KEY))
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
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
