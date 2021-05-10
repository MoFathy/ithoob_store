import $ from "jquery";
import { connect } from "react-redux";
export var myModule = (function () {
  //function to reinitiate slickers of the expanded collapser
  // var showCollapse = function(currentCardId) {
  //   $(currentCardId).on('shown.bs.collapse', function (){
  //       reinitSlickers()
  // 			console.log('curr'+currentCardId)
  //   })
  // };

  function sliderArrowTxt(event) {
    let item = event.target ? event.target : event;
    if (
      $(item)
        .find(".slick-arrow")
        .html()
    ) {
      let totalSlides = $(item).find(".slick-slide").length;
      let showenSlides =
        $(item)
          .find(".slick-slide.slick-current")
          .prevAll(".slick-slide").length +
        $(item)
          .find(".slick-slide.slick-current")
          .nextAll(".slick-active").length +
        1;
      $(item)
        .find(".sliderArrowTxt")
        .remove();
      // $(item).append(
      //   '<div class="sliderArrowTxt">' +
      //   showenSlides +
      //   "/" +
      //   totalSlides +
      //   "</div>"
      // );
    }
  }

  function sliderSecondArrowTxt(event) {
    let item = event.target ? event.target : event;
    if (
      $(item)
        .find(".slick-arrow")
        .html()
    ) {
      let totalSlides = $(item).find(".slick-slide .slideItem").length;
      let showenSlides = 0;
      [
        ...$(item)
          .find(".slick-slide.slick-active.slick-current")
          .prevAll(".slick-slide")
      ].forEach(x => {
        showenSlides += $(x).find(".slideItem").length;
      });
      showenSlides += $(item)
        .find(".slick-slide.slick-active.slick-current")
        .find(".slideItem").length;
      [
        ...$(item)
          .find(".slick-slide.slick-active.slick-current")
          .nextAll(".slick-slide.slick-active")
      ].forEach(x => {
        showenSlides += $(x).find(".slideItem").length;
      });
      // $(item).find(".slick-slide.slick-active .slideItem").length +
      // $(item)
      //   .find(".slick-slide.slick-current")
      //   .prevAll(".slick-slide").length +
      // $(item)
      //   .find(".slick-slide.slick-current")
      //   .nextAll(".slick-active").length + 1;
      $(item)
        .find(".sliderArrowTxt")
        .remove();
      // $(item).append(
      //   '<div class="sliderArrowTxt">' +
      //   parseInt(showenSlides) +
      //   "/" +
      //   parseInt(totalSlides) +
      //   "</div>"
      // );
    }
  }

  var reinitSlickers = function () {
    $(
      ".firstSlickSlider .slick-arrow,.secondSlickSlider .slick-arrow"
    ).remove();
    [...document.querySelectorAll(".firstSlickSlider")].forEach(item => {
      item.removeEventListener("afterChange", sliderArrowTxt);
    });
    [...document.querySelectorAll(".secondSlickSlider")].forEach(item => {
      item.removeEventListener("afterChange", sliderSecondArrowTxt);
    });
    $(".firstSlickSlider").slick("reinit");
    $(".secondSlickSlider").slick("reinit");
    [...document.querySelectorAll(".firstSlickSlider")].forEach(item => {
      $(item).on("afterChange", sliderArrowTxt);
    });
    [...document.querySelectorAll(".secondSlickSlider")].forEach(item => {
      $(item).on("afterChange", sliderSecondArrowTxt);
    });
  };
  //trigger "active" class on expanding certain collapser and calling showCollapse if collapser expanded
  // var collapserClick = function(event) {
  //   event.preventDefault();
  //   var currentCardId = $(event.currentTarget).attr('data-target');
  //   if($(event.target).parents("div.card").hasClass("active")){
  //     $(event.target).parents("div.card").removeClass("active")
  //   }
  //   else{
  //     showCollapse(currentCardId)
  //     $(event.target).parents("div#accordion").find("div.card.active").removeClass("active")
  //     $(event.target).parents("div.card").addClass("active");
  //   }
  // };
  //bind function with onclick event
  var bindFunctions = function () {
    // $('body').on('click', '.collapserBtn', collapserClick )
    $(".collapse").on("shown.bs.collapse", function (e) {
      $(e.target)
        .parents("div.card")
        .addClass("active");
      reinitSlickers();
      var thumbNumber = $(e.target)
        .parents("div.card")
        .find(".collapserBtn")
        .attr("data-img");
      // This prevents common null issue when we couldn't find the DOM element, the `.click` won't work and returns an error: `
      if(document.querySelector('a[data-img="' + thumbNumber + '"]')) {
        document.querySelector('a[data-img="' + thumbNumber + '"]').click();
      }
      // $('.productImages__thumbs').find('a:eq('+parseInt(thumbNumber)+')').triggerHandler('click')
      // console.log('curr'+currentCardId)
      if (
        $(e.target)
          .parents("div.card")
          .find("div.custom__items .contentItem")
          .hasClass("item-selected")
      ) {
        // has item seelected
        [
          ...$(e.target)
            .parents("div.card")
            .find("div.custom__items")
        ].forEach(item => {
          $(item).css("display", "block");
          reinitSlickers();
        });
      }
    });
    $(".collapse").on("hidden.bs.collapse", function (e) {
      $(e.target)
        .parents("div.card")
        .removeClass("active");
      // if any child item with data-required true, then show required note
      $(e.target)
        .parents("div.card")
        .find("[data-required=true]").length > 0
        ? $(e.target)
          .parents("div.card")
          .find(".requiredNote")
          .css({ display: "flex", alignItems: "center" })
        : $(e.target)
          .parents("div.card")
          .find(".requiredNote")
          .hide();
    });
    // $('car.active').find()
  };

  var initiateSlickers = function () {
    $(".secondSlickSlider")
      .not(".slick-initialized")
      .slick({
        infinite: false,
        speed: 300,
        slidesToShow: 2,
        slidesToScroll: 2,
        rows: 2,
        arrows: true,
        prevArrow:
          '<div class="secondSliderright"><span class="icon-carouselarrowcopy"></span></div>',
        nextArrow:
          '<div class="secondSliderleft"><span class="icon-carouselArrow"></span></div>',
        rtl: document.querySelectorAll(".page__en")[0] ? false : true,
        variableWidth: true,
        responsive: [
          {
            breakpoint: 769,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              variableWidth: true
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              variableWidth: true
            }
          }
        ]
      });
    [...document.querySelectorAll(".firstSlickSlider")].forEach(item => {
      let showItems = 4;
      if (
        $(item)
          .parents(".fabricChildrens.betana")
          .find(".image")
          .html() ||
        $(item)
          .parents(".fabricChildrens.fabricArray .secondChild")
          .find(".image")
          .html() ||
        $(item)
          .parents(".fabricChildrens.accessory .secondChild")
          .find(".image")
          .html() ||
        $(item)
          .parents(".fabricChildrens.accessory .secondChild")
          .find(".contentItem")
          .html()
      ) {
        showItems = 2;
      }
      $(item)
        .not(".slick-initialized")
        .slick({
          infinite: false,
          speed: 300,
          slidesToShow: showItems,
          slidesToScroll: showItems,
          arrows: true,
          rtl: document.querySelectorAll(".page__en")[0] ? false : true,
          variableWidth: true,
          prevArrow:
            '<div class="firstSlickSliderright"><span class="icon-carouselarrowcopy"></span></div>',
          nextArrow:
            '<div class="firstSlickSliderleft"><span class="icon-carouselArrow"></span></div>',
          responsive: [
            {
              breakpoint: 769,
              settings: {
                slidesToShow: 6,
                slidesToScroll: 6,
                variableWidth: true
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                variableWidth: true
              }
            }
          ]
        });
    });

    [...document.querySelectorAll(".firstSlickSlider")].forEach(item => {
      sliderArrowTxt(item);
    });
    [...document.querySelectorAll(".secondSlickSlider")].forEach(item => {
      sliderSecondArrowTxt(item);
    });
  };

  var init = function () {
    bindFunctions();
  };

  return {
    init: init,
    // showCollapse: showCollapse,
    reinitSlickers: reinitSlickers,
    initiateSlickers: initiateSlickers
  };
})();
