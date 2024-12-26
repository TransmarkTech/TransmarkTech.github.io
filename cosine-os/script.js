//图片轮播器
document.addEventListener("DOMContentLoaded", function () {
  var banners = document.querySelectorAll(".banner");
  banners.forEach(function (banner) {
    var pics = banner.querySelector(".pics");
    var images = pics.querySelectorAll("img");
    var prevBtn = banner.querySelector(".prev-btn");
    var nextBtn = banner.querySelector(".next-btn");
    var currentIndex = 0;

    function waitForImagesToLoad(callback) {
      var loaded = 0;
      images.forEach(function (img) {
        if (img.complete) {
          loaded++;
        } else {
          img.onload = function () {
            loaded++;
            if (loaded === images.length) {
              callback();
            }
          };
        }
      });
      if (loaded === images.length) {
        callback();
      }
    }

    function updatePicsPosition() {
      var imageWidth = images[0].offsetWidth;
      pics.style.transform = "translateX(-" + currentIndex * imageWidth + "px)";
    }

    function updateButtonStates() {
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex === images.length - 1;
    }

    waitForImagesToLoad(function () {
      updatePicsPosition();
      updateButtonStates();

      nextBtn.addEventListener("click", function () {
        if (!this.disabled) {
          currentIndex++;
          if (currentIndex >= images.length) {
            currentIndex = 0;
          }
          updatePicsPosition();
          updateButtonStates();
        }
      });

      prevBtn.addEventListener("click", function () {
        if (!this.disabled) {
          currentIndex--;
          if (currentIndex < 0) {
            currentIndex = images.length - 1;
          }
          updatePicsPosition();
          updateButtonStates();
        }
      });
    });
  });
});

//图片查看器
const previewer = document.querySelector(".previewer");

for (let img of document.querySelectorAll(".pics img")) {
  img.addEventListener("click", () => {
    let innerImg = document.createElement("img");
    innerImg.classList.add("image");
    innerImg.src = img.src;

    previewer.append(innerImg);
    previewer.style.zIndex = "5";
    previewer.style.opacity = "1";

    previewer.onclick = function () {
      previewer.style.opacity = "0";
      setTimeout(() => {
        previewer.style.zIndex = "-1";
        innerImg.remove();
      }, 250);
    };

    previewer.onwheel = function (event) {
      event.preventDefault();

      var width = getComputedStyle(innerImg).width.slice(0, -2);
      var height = getComputedStyle(innerImg).height.slice(0, -2);

      if (event.deltaY > 0) {
        innerImg.style.width = parseInt(width) * 0.8 + "px";
        innerImg.style.height = parseInt(height) * 0.8 + "px";
      } else if (event.deltaY < 0) {
        innerImg.style.width = parseInt(width) * 1.2 + "px";
        innerImg.style.height = parseInt(height) * 1.2 + "px";
      }
    };
  });
}

//下载
function downloadFile(src, filename) {
  const a = document.createElement("a");
  a.href = src;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
