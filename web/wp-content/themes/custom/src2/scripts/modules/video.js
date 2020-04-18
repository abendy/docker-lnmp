// Video

import Plyr from 'plyr';

const playerConfig = {
  enabled: true,
  controls: ['current-time', 'mute', 'play-large', 'progress', 'volume'],
  iconUrl: null,
  autoplay: false,
  clickToPlay: true,
  disableContextMenu: true,
  hideControls: true,
  resetOnEnd: true,
  tooltips: { controls: true },
  displayDuration: true,
  captions: { active: false },
  ratio: '16:9',
  quality: {
    default: 720,
  },
  loop: { active: true },
  youtube: {
    noCookie: false, rel: 0, showinfo: 0, iv_load_policy: 3, modestbranding: 1,
  },
};

const players = Array.from(document.querySelectorAll('.et_pb_module.hyprse_youtube #player')).map(p => new Plyr(p, playerConfig));

export default players;
