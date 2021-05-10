import $ from "jquery";
export var clickModule = (function() {
  var containAttr,customItems
  var firstHasSecond = function(e,itemId,subItemId,multiSelect){
    console.log('firstHasSecond')
		customItems= $(e.target).closest("div.custom").find("div.custom__items")
	 customItems.css("display","block")
    containAttr=$(e.target).parents("div.fabricChildrens").find("div[data-childof='"+ itemId +"']");
    var itemSelected = $(e.target).parents(".contentItem").hasClass('item-selected')
		$(e.target).parents("div.fabricChildrens").attr('data-required',true)
    if(Boolean(multiSelect) !== true){
     $(e.target).parents("div.fabricChildrens").find(".fabricChildrens__sub div.items").hide()
     $(e.target).parents("div.fabricChildrens").find(".fabricChildrens__sub div.subitems").hide()
     $(e.target).parents(".fabricChildrens").find(".images .contentItem p").css('visibility','hidden')
     $(e.target).parents(".fabricChildrens").find(".images .contentItem").removeClass('item-selected')
   }
   // var childId =$(e.target).parents("div.fabricChildrens").find('.secondChild div.items[data-childof='+ itemId +']:eq(0) .item:eq(0)').attr('data-id')
   // $(e.target).parents("div.fabricChildrens").find("div[data-secondchildof='"+ itemId +"']div[data-childof='"+ childId +"']").show();
   if(itemSelected){
     $(e.target).parents(".contentItem").find("p").css('visibility','hidden')
     $(e.target).parents(".contentItem").removeClass('item-selected')
     $(containAttr).hide()
   }else{
     $(e.target).parents(".contentItem").find("p").css('visibility','visible')
     $(e.target).parents(".contentItem").addClass('item-selected')
     $(containAttr).show()
   }

// $(e.target).parents(".card.active").find(".card-header .card-header-items").find('.sameParent[data-parent='+$(e.target).parents('.fabricChildrens').attr('data-id')+']').remove()
    console.log('has third')
  }
  var hasSecondOnly = function(e,itemId,subItemId,multiSelect){
    console.log('hasSecondOnly')

    //make other items in custom  appear
     customItems= $(e.target).closest("div.custom").find("div.custom__items")
    customItems.css("display","block")
    containAttr=$(e.target).parents("div.fabricChildrens").find("div[data-childof='"+ itemId +"']");
    var itemSelected = $(e.target).parents(".contentItem").hasClass('item-selected')
		$(e.target).parents("div.fabricChildrens").attr('data-required',true)
    // if($(e.target).closest("div.fabricChildrens").find(".secondChild .image__desc .desc") !== 0){
    //   console.log("has cost")
    // }
    if(Boolean(multiSelect) !== true){
      console.log("not multiselect")
      $(e.target).parents("div.fabricChildrens").find(".fabricChildrens__sub div.items").hide()
      $(e.target).parents("div.fabricChildrens").find(".fabricChildrens__sub div.items .contentItem p").css('visibility','hidden')
      $(e.target).parents("div.fabricChildrens").find(".fabricChildrens__sub div.items .contentItem").removeClass('item-selected')
      //has second with second subs
      if($(e.target).closest("div.fabricChildrens").find(".secondChild__Sub .secondChild__Sub__content .subShape").length !== 0){
        var subAttr=$(e.target).parents("div.fabricChildrens").find("div.secondChild__Sub__content[data-childof='"+ itemId +"']");
        $(e.target).parents("div.fabricChildrens").find("div.secondChild__Sub__content").hide()
        $(e.target).parents("div.fabricChildrens").find("div.secondChild__Sub__content .contentItem").removeClass('item-selected')
        $(e.target).parents("div.fabricChildrens").find("div.secondChild__Sub__content .contentItem p").css('visibility','hidden')
          $(subAttr).show()
      }
      $(e.target).parents(".fabricChildrens__sub").find(".images .contentItem p").css('visibility','hidden')
      $(e.target).parents(".fabricChildrens__sub").find(".images .contentItem").removeClass('item-selected')
    }
    //common in showng p and showing all div
    var childId =$(e.target).parents("div.fabricChildrens").find('.secondChild div.items[data-childof='+ itemId +']:eq(0) .item:eq(0)').attr('data-id')
    if(itemSelected){
        console.log('1ia mmmmm')
      $(e.target).parents("div.fabricChildrens").find("div[data-secondchildof='"+ itemId +"']div[data-childof='"+ childId +"']").hide();
      $(e.target).parents("div.fabricChildrens").find("div[data-childof='"+ itemId +"'] .contentItem p").css('visibility','hidden')
      $(e.target).parents("div.fabricChildrens").find("div[data-childof='"+ itemId +"'] .contentItem").removeClass('item-selected')
      $(e.target).parents(".contentItem").find("p").css('visibility','hidden')
      $(e.target).parents(".contentItem").removeClass('item-selected')
     $(containAttr).hide()
     if($(e.target).parents("div.fabricChildrens").hasClass("accessory")){
       console.log("unselect in accessory");
       var changeRequired = false;
       $(e.target).parents("div.fabricChildrens").attr('data-required',false);
       [...$(e.target).parents("div.accessory").find('.secondChild .items:visible')].forEach((x) => {
          // if all child with class contentItem doesn't has class item-selected, then data-required=true
         if(!$(x).find('.item-selected').html()){
           console.log(x.getAttribute('data-childof'))
          changeRequired = true;
         }
       });
       if(changeRequired){
         $(e.target).parents("div.fabricChildrens").attr('data-required',true)
       }
     }

    }else{
        console.log('2ia mmmmm')
      $(e.target).parents("div.fabricChildrens").find("div[data-secondchildof='"+ itemId +"']div[data-childof='"+ childId +"']").show();
      $(e.target).parents(".contentItem").find("p").css('visibility','visible')
      $(e.target).parents(".contentItem").addClass('item-selected')
     $(containAttr).show()
    }

    console.log('has second')
  }
  var secondHasThird = function(e,itemId,subItemId,multiSelect){
    console.log('secondHasThird')
		customItems= $(e.target).closest("div.custom").find("div.custom__items")
	 customItems.css("display","block")
    containAttr=$(e.target).parents("div.fabricChildrens").find("div[data-childof='"+ subItemId +"']");
    var itemSelected = $(e.target).parents(".contentItem").hasClass('item-selected')
		$(e.target).parents("div.fabricChildrens").attr('data-required',true)
    if(Boolean(multiSelect) !== true){
    $(e.target).parents("div.fabricChildrens").find(".thirdChild div.items div.subitems").hide()
    $(e.target).parents("div.fabricChildrens").find(".thirdChild div.items .contentItem p").css('visibility','hidden')
    $(e.target).parents("div.fabricChildrens").find(".secondChild div.items .contentItem p").css('visibility','hidden')
      $(e.target).parents("div.fabricChildrens").find(".thirdChild div.items .contentItem").removeClass('item-selected')
      $(e.target).parents("div.fabricChildrens").find(".secondChild div.items .contentItem").removeClass('item-selected')
  }
if(itemSelected){
  $(e.target).parents("div.fabricChildrens").find("div[data-childof='"+ subItemId +"'] .contentItem p.tick").css('visibility','hidden')
  $(e.target).parents("div.fabricChildrens").find("div[data-childof='"+ subItemId +"'] .contentItem").removeClass('item-selected')
  $(e.target).parents(".contentItem").find("p.tick").css('visibility','hidden')
  $(e.target).parents(".contentItem").removeClass('item-selected')
  $(containAttr).hide()
}else{
  $(e.target).parents(".contentItem").find("p.tick").css('visibility','visible')
  $(e.target).parents(".contentItem").addClass('item-selected')
  $(containAttr).show()
}
// $(e.target).parents(".card.active").find(".card-header .card-header-items").find('.sameParent[data-parent='+$(e.target).parents('.fabricChildrens').attr('data-id')+']').remove()

    console.log('i am second and have third')
  }

  var lastChild = function(e,itemId,subItemId){
    console.log('lastChild')
		customItems= $(e.target).closest("div.custom").find("div.custom__items")
	 customItems.css("display","block")
    var itemSelected = $(e.target).parents(".contentItem").hasClass('item-selected')
    console.log('di'+$(e.target).parents('.contentItem').attr('data-id'))

    var $clone;
       $clone= $(e.currentTarget).find("img").clone();
      $clone.wrap('<div>')
    // }
    var htmlString = $clone.parent().html()
     if($(e.target).parents(".fabricChildrens__sub .subitems").length !== 0){
       console.log("has subitems"+itemId)
         $(e.target).parents(".fabricChildrens__sub").find(".subitems[data-childof='"+ itemId +"'] .images .contentItem p").css('visibility','hidden')
         $(e.target).parents(".fabricChildrens__sub").find(".subitems[data-childof='"+ itemId +"'] .images .contentItem").removeClass('item-selected')
     }
     else if($(e.target).parents(".fabricChildrens__sub .items").length !== 0){
       console.log("else has items")
       // if(!$(e.target).parents(".contentItem").hasClass('item-selected')){
         $(e.target).parents(".fabricChildrens__sub").find(".items[data-childof='"+ itemId +"'] .images .contentItem p").css('visibility','hidden')
         $(e.target).parents(".fabricChildrens__sub").find(".items[data-childof='"+ itemId +"'] .images .contentItem").removeClass('item-selected')
       // }
       if($(e.target).parents("div.fabricChildrens").find(".secondChild  + .secondChild__Sub .subShape").length !== 0){
         $(e.target).parents("div.fabricChildrens").find(".secondChild__Sub div.subShape .contentItem p").css('visibility','hidden')
         $(e.target).parents("div.fabricChildrens").find(".secondChild__Sub div.subShape .contentItem").removeClass('item-selected')
         $(e.target).parents("div.fabricChildrens").find(".secondChild__Sub div.subShape").hide()
         console.log('aya here')
           containAttr=$(e.target).parents("div.fabricChildrens").find(".secondChild__Sub div.subShape[data-childof='"+ subItemId +"']");
           if(itemSelected){
             $(containAttr).hide()
             console.log("hide");
           }else{
             $(containAttr).show()
             console.log("show");
           }
       }
           console.log("has items")
     }
     else{

       //for subdetails(kabak and  jabzor alkabak) in akmam
       if($(e.target).closest(".subDetail").length !== 0){
       $(e.target).parents(".subDetail").find(".contentItem p").css('visibility','hidden')
       $(e.target).parents(".subDetail").find(".contentItem").removeClass('item-selected')
       }
        else{
          //make other items in custom  appear
           customItems= $(e.target).closest("div.custom").find("div.custom__items")
          customItems.css("display","block")
           $(e.target).parents(".fabricChildrens__sub").find(".images .contentItem p").css('visibility','hidden')
           $(e.target).parents(".fabricChildrens__sub").find(".images .contentItem").removeClass('item-selected')
           $(e.target).parents("div.fabricChildrens").find(".fabricChildrens__sub div.items .contentItem").removeClass('item-selected')

           console.log("has nothing")
           //if sada has no childs(ashkal sada) while kabak has ashkal kabab (which show kabak and jabzor on click on one of them)
           //so we need to remove kabak and jabzor of kabak on click on sada
           if($(e.target).parents("div.fabricChildrens").find(".secondChild  + .secondChild__Sub .subShape").length !== 0){
             $(e.target).parents("div.fabricChildrens").find(".secondChild__Sub div.subShape .contentItem p").css('visibility','hidden')
             $(e.target).parents("div.fabricChildrens").find(".secondChild__Sub div.subShape .contentItem").removeClass('item-selected')
             $(e.target).parents("div.fabricChildrens").find(".secondChild__Sub div.subShape").hide()
             console.log('aya here')
               containAttr=$(e.target).parents("div.fabricChildrens").find(".secondChild__Sub div.subShape[data-childof='"+ subItemId +"']");
               if(itemSelected){
                 $(containAttr).hide()
               }else{
                 console.log("item n");
                 $(e.target).parents(".contentItem").addClass('item-selected')
                 $(containAttr).show()
               }
           }
           }
     }
     if(itemSelected){
       $(e.target).parents(".contentItem").find("p").css('visibility','hidden')
       $(e.target).parents(".contentItem").removeClass('item-selected')
			 $(e.target).parents("div.fabricChildrens").attr('data-required',true)


     }else{

       //in case in others
       if($(e.target).parents('.custom').hasClass("others") || $(e.target).parents(".contentItem").find("img").length === 1 ){
         console.log("add item-selected class to it if it is from others");
         $(e.target).parents(".contentItem").find("p").css('visibility','visible')
         $(e.target).parents(".contentItem").addClass('item-selected')

         //in case bdon in akmam kabak or gabzor l akmam
       }else if($(e.target).parents('.custom').attr("id") ==="akmam"){
           console.log("enter akmam case");
           $(e.target).parents(".contentItem").find("p").css('visibility','visible')
           $(e.target).parents(".contentItem").addClass('item-selected')
           console.log("need edit heere");
           }

  			 if($(e.target).parents("div.fabricChildrens").find(".secondChild__Sub div.subShape[data-childof='"+ subItemId +"']").html()){
  				 // akmam sub
  				 $(e.target).parents("div.fabricChildrens").attr('data-required',true)
  			 }else if($(e.target).parents('.subShape').find('.subDetail').length > $(e.target).parents('.subShape').find('.item-selected').length){
  				 $(e.target).parents("div.fabricChildrens").attr('data-required',true)
  			 }else{
  				 $(e.target).parents("div.fabricChildrens").attr('data-required',false)
  			 }
     }
     console.log('unselect second level');
     //second level of accessories if sleected or unselected check data-required
     if($(e.target).parents("div.fabricChildrens").hasClass("accessory")){
       console.log("here in accessory");
       var changeRequired = false;
       $(e.target).parents("div.fabricChildrens").attr('data-required',false);
       [...$(e.target).parents("div.accessory").find('.secondChild .items:visible')].forEach((x) => {
          // if all child with class contentItem doesn't has class item-selected, then data-required=true
         if(!$(x).find('.item-selected').html()){
           console.log(x.getAttribute('data-childof'))
          changeRequired = true;
         }
       });
       if(changeRequired){
         $(e.target).parents("div.fabricChildrens").attr('data-required',true)
       }
     }

    //if has no second  level remove the second level added before for the last selection
    if($(e.target).parents("div.fabricChildrens").find("div[data-childof='"+ itemId +"']").length === 0){
      $(e.target).parents("div.fabricChildrens").find("div.secondChild div.items").hide()
      $(e.target).parents(".contentItem").find("p").css('visibility','visible')
    }

    console.log('i have no child')
  }


  var handleClick = function(e,itemId,subItemId,multiSelect) {
     e.preventDefault()
     if($(e.target).parents("div.fabricChildrens").find(".thirdChild .items[data-childof='"+ itemId +"'] .subitems").length !== 0 && $(e.target).parents("div.fabricChildrens").find(".secondChild .items[data-childof='"+ subItemId +"']").length){
       // i am first level and has third child or
       firstHasSecond(e,itemId,subItemId,multiSelect)

     }else if($(e.target).parents("div.fabricChildrens").find(".thirdChild .items[data-childof='"+ itemId +"'] .subitems").length !== 0){
       // i am second level and has third
       secondHasThird(e,itemId,subItemId,multiSelect)
     }else if($(e.target).parents("div.fabricChildrens").find(".secondChild .items[data-childof='"+ subItemId +"']").length !== 0){
        // i am first level and has second only
      hasSecondOnly(e,itemId,subItemId,multiSelect)
     }else{
       // i am third or first(btanat) or second(shkl yakat) i have no childs
       //.items[data-childof='"+ itemId +"']    .subitems[data-childof='"+ itemId +"']
       lastChild(e,itemId,subItemId);
     }
     console.log("access"+$(e.target).parents('.contentItem').attr('data-withaccessory'))
     if($(e.target).parents('.contentItem').attr('data-withaccessory') != ""){
		 if($(e.target).parents('.contentItem').attr('data-withaccessory') === "true"){
			 console.log('in there')
			 $(e.target).parents("div.card-body").find('.accessory').attr('data-required',true).show()
		 }
		 if($(e.target).parents('.contentItem').attr('data-withaccessory') === "false"){
		 	console.log('else there')
		 	$(e.target).parents("div.card-body").find('.accessory').attr('data-required',false).hide()
     }
    }
     var imgSrc,imgId;
     var lastchilds=[];
     var retunrArr = [];
     var costVal = 0;
     var betanaId = "";
		 var required = false;
     $(e.target).parents('.card-body').find('.item-selected').map((index,item)=>{
       if($(item).attr('data-cost') !== undefined){
         costVal += parseInt($(item).attr('data-cost'));
       }
       if($(item).parents("div.fabricChildrens").find(".thirdChild [data-childof='"+ $(item).attr('data-id') +"']").length !== 0 && $(item).parents("div.fabricChildrens").find(".secondChild [data-childof='"+ $(item).attr('data-id') +"']").length){
       }else if($(item).parents("div.fabricChildrens").find(".thirdChild [data-childof='"+ $(item).attr('data-id') +"']").length !== 0){
       }else if($(item).parents("div.fabricChildrens").find(".secondChild [data-childof='"+ $(item).attr('data-id') +"']").length !== 0){
       }else{
         imgId= $(item).attr('data-id');
         imgSrc=$(item).find('img').attr('src');
         lastchilds.push({id:imgId,imgSrc:imgSrc,label:$(item).find('label').html()})
       }
       retunrArr.push(parseInt($(item).attr('data-id')))

     });
     if($(e.target).parents('.fabricChildrens').hasClass("betana")){
       betanaId=$(e.target).closest(".contentItem").attr('data-id');
     }
		 required = $(e.target).parents('.fabricChildrens').attr('data-required');
     // change required attribute if all showen .fabricChildren has selection
     // if($(e.target).parents("div.card-body").hasClass("accessory")){
       // console.log("here in accessory");
       var changeRequired = false;
       // $(e.target).parents("div.fabricChildrens").attr('data-required',false);
       [...$(e.target).parents("div.card-body").find('.custom__items:visible .fabricChildrens__sub > div:visible')].forEach((x) => {
         console.log('x in',x)
          // if all child with class contentItem doesn't has class item-selected, then data-required=true
         if(!$(x).find('.item-selected').html()){
           console.log(x.getAttribute('data-childof'))
          changeRequired = true;
         }
       });
       if(changeRequired){
         required = true;
       }
     // }



      if($(e.target).parents("div.card").find("[data-required=true]").length === 0 ){
        $(e.target).parents("div.card").find('.requiredNote').hide()
      }
      if($("#accordion").find(".fabricChildrens[data-required=true]").length === 0 ){
        console.log("all required false");
        $(".sideBar__productImages__productDesc__btn").find("button").addClass("active");
        if($(".warningNote").css('display') == "block"){
          $(".warningNote").css('display','none');
        }
      }else{
          $(".sideBar__productImages__productDesc__btn").find("button").removeClass("active");
      }
       return  {items:retunrArr,type:$(e.target).parents('.custom').attr('id'),cost:costVal,lastChild:lastchilds, required:required,recomBetana:betanaId}
  };

  return {
    handleClick: handleClick,
    firstHasSecond:firstHasSecond,
    secondHasThird:secondHasThird,
    hasSecondOnly:hasSecondOnly,
    lastChild:lastChild
  };

})();
