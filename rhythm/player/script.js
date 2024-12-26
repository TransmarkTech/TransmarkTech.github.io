const player = document.querySelector(".player");

document.addEventListener("DOMContentLoaded", function () {
  var mini = document.querySelector(".mini");

  mini.addEventListener("click", function () {
    player.classList.toggle("show");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var listBtn = document.getElementById("list");
  var list = document.querySelector(".playlist");

  listBtn.addEventListener("click", function () {
    list.classList.toggle("show");
  });
});

const audio = document.getElementById("player");

var progressBar = document.getElementById("progress-bar");

// 当音频播放时更新进度条
audio.addEventListener("timeupdate", function () {
  progressBar.value = audio.currentTime;
});

// 当音频加载时设置max属性为音频的总时长（以秒为单位）
audio.addEventListener("loadedmetadata", function () {
  progressBar.max = audio.duration;
});

document.addEventListener("DOMContentLoaded", function () {
  var playBtn = document.getElementById("play");
  var originalTitle = document.title; // 存储原始页面标题

  // 播放事件监听器
  audio.addEventListener("play", function () {
    var musicTitle = audio.getAttribute("title"); // 获取音乐标题
    document.title = "▶ 正在播放 - " + musicTitle; // 更改页面标题
  });

  // 暂停事件监听器（也可以监听'pause'和'ended'事件来确保标题被恢复）
  audio.addEventListener("pause", function () {
    document.title = originalTitle; // 恢复原始页面标题
  });

  audio.addEventListener("ended", function () {
    document.title = originalTitle; // 恢复原始页面标题
  });

  // 切换播放/暂停状态
  playBtn.addEventListener("click", function () {
    if (audio.paused) {
      audio.play();

      playBtn.classList.remove("icon-pause");
      playBtn.classList.add("icon-play");

      player.classList.add("show");
    } else {
      audio.pause();

      playBtn.classList.remove("icon-play");
      playBtn.classList.add("icon-pause");
    }
  });
});
