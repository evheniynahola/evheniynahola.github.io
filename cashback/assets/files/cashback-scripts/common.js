$(function () {
  $(".cashback-howto_tabs-control").on("click", function (e) {
    var currentAttrValue = $(this).attr("href");

    $(currentAttrValue).show().siblings().hide();

    $(this).addClass("active").siblings().removeClass("active");

    e.preventDefault();
  });

  let userAgent = navigator.userAgent;

  switch (true) {
    case userAgent.indexOf("Firefox") > -1:
      $("#cashback-howto-tab3").addClass("active");
      $('a[href="#cashback-howto-tab3"]').addClass("active");
      break;
    case userAgent.indexOf("Chrome") > -1:
      $("#cashback-howto-tab2").addClass("active");
      $('a[href="#cashback-howto-tab2"]').addClass("active");
      break;
    case userAgent.indexOf("Safari") > -1:
      $("#cashback-howto-tab1").addClass("active");
      $('a[href="#cashback-howto-tab1"]').addClass("active");
      break;
    default:
      $("#cashback-howto-tab4").addClass("active");
      $('a[href="#cashback-howto-tab4"]').addClass("active");
      break;
  }

  $(".cashback-howto_tab.active").show();
});
