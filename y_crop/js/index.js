// 輸出品質
var IMAGE_QUALITY = 0.7;
var timer;
$(function () {
  var cropX = 0;
  var cropY = 0;
  /** file inptu change event */
  $("#file-1").bind("change", function (e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      var src = reader.result;
      var cropper = $("#crop-image").data("cropper");
      if (cropper) {
        cropper.replace(src);
      } else {
        $("#crop-image").attr("src", src);
        var $image = $("#crop-image");
        $image.cropper({
          viewMode: 1,
          // aspectRatio: 16 / 9,
          dragMode: "move",
          crop: function (event) {
            // console.log($("#crop-image").data("cropper"));
            clearTimeout(timer);
            timer = setTimeout(function () {
              var cropper = $("#crop-image").data("cropper");
              var isCustomSize = cropX && cropY;
              var canvas = cropper.getCroppedCanvas(
                isCustomSize ? { width: cropX, height: cropY } : {}
              );
              var url = canvas.toDataURL("image/jpeg", IMAGE_QUALITY);
              $("#preview").attr("src", url);
            }, 100);

            // console.log(url);
          },
        });
      }
    };
    reader.onerror = function (error) {
      alert("Error: " + error);
    };
  });

  /** 確認裁切按鈕 */
  $("#crop-btn").click(function () {
    var cropper = $("#crop-image").data("cropper");
    if (cropper) {
      var isCustomSize = cropX && cropY;

      var canvas = cropper.getCroppedCanvas(
        isCustomSize ? { width: cropX, height: cropY } : {}
      );
      var url = canvas.toDataURL("image/jpeg", IMAGE_QUALITY);
      var link = document.createElement("a");
      link.href = url;
      link.download = "Download.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  });

  /** 向左翻轉 */
  $("#rotate-left").click(function () {
    var cropper = $("#crop-image").data("cropper");
    if (cropper) {
      cropper.rotate(-90);
    }
  });

  /** 向右翻轉 */
  $("#rotate-right").click(function () {
    var cropper = $("#crop-image").data("cropper");
    if (cropper) {
      cropper.rotate(90);
    }
  });

  $(".crop-size-btn").click(function () {
    var x = $(this).attr("x");
    var y = $(this).attr("y");

    var cropper = $("#crop-image").data("cropper");
    if (cropper && x && y) {
      cropX = parseInt(x);
      cropY = parseInt(y);
      cropper.setAspectRatio(cropX / cropY);
    }
  });
  $(".crop-free-btn").click(function () {
    var cropper = $("#crop-image").data("cropper");

    if (cropper) {
      cropX = 0;
      cropY = 0;
      cropper.setAspectRatio(0);
    }
  });
});
