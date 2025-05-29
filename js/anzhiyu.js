var anzhiyu = {
  // 音乐节目切换背景
  changeMusicBg: function (isChangeBg = true) {
    if (window.location.pathname != "/music/") {
      return;
    }
    const anMusicBg = document.getElementById("an_music_bg");
    if (!anMusicBg) {
      console.warn("#an_music_bg 未找到");
      return;
    }
    if (isChangeBg) {
      // player listswitch 会进入此处
      const musiccover = document.querySelector("#anMusic-page .aplayer-pic");
      console.log("changeMusicBg: isChangeBg=true", { anMusicBg, musiccover, bg: musiccover?.style.backgroundImage });
      if (musiccover && musiccover.style.backgroundImage) {
        anMusicBg.style.backgroundImage = musiccover.style.backgroundImage;
      } else {
        anMusicBg.style.backgroundImage = "linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)";
        console.warn("未获取到音乐封面，已设置默认背景");
      }
    } else {
      // 第一次进入，绑定事件，改背景
      let timerCount = 0;
      let timer = setInterval(() => {
        const musiccover = document.querySelector("#anMusic-page .aplayer-pic");
        console.log("changeMusicBg: waiting for aplayer-pic", { anMusicBg, musiccover, bg: musiccover?.style.backgroundImage });
        if (musiccover) {
          clearInterval(timer);
          if (musiccover.style.backgroundImage) {
            anMusicBg.style.backgroundImage = musiccover.style.backgroundImage;
          } else {
            anMusicBg.style.backgroundImage = "linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)";
            console.warn("未获取到音乐封面，已设置默认背景");
          }
          // 绑定事件
          anzhiyu.addEventListenerChangeMusicBg();

          // 暂停nav的音乐
          if (
            document.querySelector("#nav-music meting-js")?.aplayer &&
            !document.querySelector("#nav-music meting-js").aplayer.audio.paused
          ) {
            anzhiyu.musicToggle();
          }
        }
        timerCount++;
        if (timerCount > 50) { // 最多等5秒
          clearInterval(timer);
          anMusicBg.style.backgroundImage = "linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)";
          console.warn("aplayer-pic 加载超时，已设置默认背景");
        }
      }, 100);
    }
  },
  addEventListenerChangeMusicBg: function () {
    const anMusicPage = document.getElementById("anMusic-page");
    if (!anMusicPage) {
      console.warn("#anMusic-page 未找到");
      return;
    }
    const aplayerIconMenu = anMusicPage.querySelector(".aplayer-info .aplayer-time .aplayer-icon-menu");
    const metingJs = anMusicPage.querySelector("meting-js");
    if (metingJs?.aplayer) {
      metingJs.aplayer.on("loadeddata", function () {
        anzhiyu.changeMusicBg();
        console.info("player loadeddata");
      });
    } else {
      console.warn("meting-js 或 aplayer 未找到");
    }
    if (aplayerIconMenu) {
      aplayerIconMenu.addEventListener("click", function () {
        document.getElementById("menu-mask").style.display = "block";
        document.getElementById("menu-mask").style.animation = "0.5s ease 0s 1 normal none running to_show";
      });
    }
    const menuMask = document.getElementById("menu-mask");
    if (menuMask) {
      menuMask.addEventListener("click", function () {
        if (window.location.pathname != "/music/") return;
        anMusicPage.querySelector(".aplayer-list").classList.remove("aplayer-list-hide");
      });
    }
  },
};

// 调用
anzhiyu.changeMusicBg(false);