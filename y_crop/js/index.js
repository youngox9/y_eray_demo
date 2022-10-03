$(function () {
  $("#file-1").bind("change", function (e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      var src = reader.result;
      var cropper = $("#preview").data("cropper");

      if (cropper) {
        cropper.replace(src);
      } else {
        $("#preview").attr("src", src);
        var $image = $("#preview");
        $image.cropper({
          viewMode: 2,
          // aspectRatio: 16 / 9,
          crop: function (event) {
            // console.log($("#preview").data("cropper"));
          },
        });
      }

      // console.log(cropper);
    };
    reader.onerror = function (error) {
      alert("Error: " + error);
    };
  });
  // const image = document.getElementById("image");

  $("#crop-btn").click(function () {
    var cropper = $("#preview").data("cropper");
    if (cropper) {
      var canvas = cropper.getCroppedCanvas({});
      var url = canvas.toDataURL("image/jpeg", 0.8);
      // downlaod
      var link = document.createElement("a");
      link.href = url;
      link.download = "Download.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  });

  function downloadUrl(url) {}
});
