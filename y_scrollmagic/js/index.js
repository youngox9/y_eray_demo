$(function () {
  var controllers = [];
  $(".scrollmagic-container").each(function (idx, container) {
    var controller = new ScrollMagic.Controller();

    // controllers.push(controller);
    // $(window).bind("resize", onScrollMagic);
    onScrollMagic();
    function onScrollMagic() {
      controller = new ScrollMagic.Controller();
      var sence = $(container).find(".sence")[0];
      var total = parseFloat($(container).attr("total"));

      var a = new ScrollMagic.Scene({
        duration: container.clientHeight,
        triggerElement: sence,
        triggerHook: 0,
      })
        .setPin(sence)
        .addTo(new ScrollMagic.Controller())
        .addIndicators();

      var layers = $(container)
        .find(".layer")
        .toArray()
        .map(function (element, idx) {
          var to = eval("(" + $(element).attr("to") + ")");
          return { element, to };
        });

      var data = {};
      layers.forEach(function (obj) {
        var arr = data[obj.duration] || [];
        arr.push(obj);
        data[obj.start] = arr;
      });

      layers.forEach(function (layer, index) {
        const arr = [];
        const steps = layer.to;
        const element = layer.element;
        let totalPx = steps.reduce(
          (prev, curr) => (prev += curr.duration || 0 + curr.delay || 0),
          0
        );

        steps.forEach(function (o) {
          const delay = parseFloat(o.delay || 0);
          const duration = parseFloat(o.duration || 0);

          const delayPercent = isNaN(delay / totalPx) ? 0 : delay / totalPx;
          const durationPercent = isNaN(duration / totalPx)
            ? 0
            : duration / totalPx;

          var ani = TweenMax.to(
            element,
            durationPercent,
            {
              ...o,
              delay: delayPercent,
            },
            0
          );
          arr.push(ani);
          var tween = new TimelineMax();
          arr.forEach(function (a) {
            tween.add(a);
          });

          const totalDuration = isNaN((container.clientHeight * totalPx) / 100)
            ? 0
            : container.clientHeight * (totalPx / 100);

          var sences = new ScrollMagic.Scene({
            duration: totalDuration,
            triggerElement: container,
            triggerHook: 0,
          })
            //   .setPin($sence[0])
            .setTween(tween)
            .addTo(controller);

          // if (index === layers.length - 1) {
          //   sences.addIndicators();
          // }
        });
      });
    }
  });

  window.controllers = controllers;
});
