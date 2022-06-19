var imageBox, imageWidth, imageQuanity, currentImage;

$(document).ready(function(){

  const $navbar = $('.navbar');
  const $buttonContainer = $('.container-fluid');
  const $openMenu = $('#open-menu');
  
  //Opens and closes the navbar panel
    $('#panel-view-logo').on('click', function(){
      $($navbar).toggleClass('open');
      $($buttonContainer).toggleClass('position-after-animation');
      $($buttonContainer).toggleClass('position-before-animation');
      $($openMenu).toggleClass('open-menu-close');
      $($openMenu).toggleClass('open-menu-open');
      $(this).toggleClass('down')
      $(this).toggleClass('up')
    });
    
    //sets up the photo slider ability dynamically
    imageBox = $('.slider ul');
    imageWidth = $('.slider ul li').first().children('img').width();
    imageQuanity = $('.slider ul').children('li').length;
    currentImage = 0;

    imageBox.css('width', imageWidth * imageQuanity);

    //sets up transition effects on the sides of the images
    $('.photo-nav button').on('click', function(){
      var whichButton = $(this).data('nav');
      if(whichButton === 'next'){
        if(currentImage === imageQuanity-1){
          bounceEffect(whichButton);
        }
        else{
          currentImage++;
          transition(currentImage, imageWidth);
        }
      }
      else if(whichButton === 'prev'){
        if(currentImage === 0){
          bounceEffect(whichButton);
        }
        else {
          currentImage--;
          transition(currentImage, imageWidth);
        }
      }
    });

    function transition(currentImageInput, imageWidthInput){
      var pxValue = -(currentImageInput) * imageWidthInput;
      imageBox.animate({
        'left': pxValue
      });
    }

    function bounceEffect(whichButton){
      if(whichButton === "next"){
        window.setTimeout(function() {
          $(imageBox).toggleClass('right-bounce');
        }, 500);
        $(imageBox).toggleClass('right-bounce');
      }
      else if(whichButton === "prev"){
        window.setTimeout(function() {
          $(imageBox).toggleClass('left-bounce');
        }, 500);
        $(imageBox).toggleClass('left-bounce');
      }
    }
  
});

(function(global){

  var o = {}

  var insertProperty = function (string, propName, propValue) {
    var propToReplace = "{{" + propName + "}}";
    string = string
      .replace(new RegExp(propToReplace, "g"), propValue);
      return string;
  }

  o.insertHtml = function (selector, html) {
    var targetElem = document.querySelector(selector);
    targetElem.innerHTML = html;
  };

  //TODO fix, gif not displayed. possibly a CSS issue.
  var showLoading = function (selector) {
    var html = "<div>";
    html += "<img src='6os.gif'></div>";
    o.insertHtml(selector, html);
  };

  //constructs the html required to display a list of pictures based on the chosen category
  //of if category === "all" will create a list of all pictures in the site
  o.buildPictureDisplayListViewHtml = function(response, category, pictureDisplayHTML) {

    var finalHtml = "";

    if(category === "all"){
      for (var i = 0; i < response.length; i++) {
        var html = pictureDisplayHTML;
        var category = "" + response[i].category;
        var fileName = response[i].fileName;
        var id = response[i].id;
        html =
        insertProperty(html, "category", category);
        html =
        insertProperty(html, "picture", fileName);
        html =
        insertProperty(html, "id", id);
        html= html.slice(0, 8) + " onClick='$o.onThumbnailClick(event);' " + html.slice(8);
        finalHtml += html;
      }
    }

    else{
      for (var i = 0; i < response.length; i++) {
        if(response[i].category === category){
          var html = pictureDisplayHTML;
          var category = "" + response[i].category;
          var fileName = response[i].fileName;
          var id = response[i].id;
          html =
          insertProperty(html, "category", category);
          html =
          insertProperty(html, "picture", fileName);
          html =
          insertProperty(html, "id", id);
          html= html.slice(0, 8) + " onClick='$o.onThumbnailClick(event);' " + html.slice(8);
          finalHtml += html;
        }
      }
    }
    // need to update imageQuanity and imageWidth based on the json response size
    $(function(){
      imageQuanity = $('.slider ul').children('li').length;
      imageBox.css('width', imageWidth * imageQuanity);
    });
    return finalHtml;
  }

  o.loadSideColumn = function(category){
    var sideColumnHTML = "sideColumn.html";
    var newHTML = "";
    
    $ajaxUtils.sendGetRequest(
      sideColumnHTML, function(sideColumnHTML){
        $ajaxUtils.sendGetRequest(
          "sideColumnData.json", function(response){
            newHTML = o.buildSideColumn(response, category, sideColumnHTML)
            o.insertHtml("#side-column", newHTML);
          }, true);
      }, false);
  }

  o.buildSideColumn = function(response, category, sideColumnHTML){
    var finalHtml = "";
    
    for (var i = 0; i < response.length; i++) {
      if(response[i].category === category){
        var html = sideColumnHTML;
        var categoryCaption = "" + response[i].categoryCaption;
        html =
        insertProperty(html, "categoryCaption", categoryCaption);
        finalHtml += html;
      }
    }
    return finalHtml;
  }

  //set onClick for #title-name to load contact page and all photos in slider
  o.loadContactAndAllPhotos = function(){
    loadContactPage();
    o.clearPictures("#side-column");
    loadAllPhotosInSlider();
  }
  
  //on page load: set up contact page
  function loadContactPage(){
    $ajaxUtils.sendGetRequest(
      "contact.html", function(response){
        document.querySelector("#main-content")
        .innerHTML = response;
      }, false);

    $(function(){
      $(".open-menu-open").css("height", "");
    });
  }
  loadContactPage();


  //loads all the photos in the site onto the slider
  function loadAllPhotosInSlider() {
    var pictureDisplayHTML = "pictureDisplay.html"
    var newHTML = "";

    if(document.querySelector("#front-page").hasChildNodes()){
      o.clearPictures("#front-page");
    }

    $ajaxUtils.sendGetRequest(
      pictureDisplayHTML, function(pictureDisplayHTML){
        $ajaxUtils.sendGetRequest(
          "pictureData.json", function(response){
            newHTML = o.buildPictureDisplayListViewHtml(response, "all", pictureDisplayHTML)
            o.insertHtml("#front-page", newHTML) 
          }, true);
      }, false);  
  }

  //main page picture loading function
  o.mainPagePictureLoader = function(category){
    var pictureDisplayHTML = "pictureDisplay.html"
    var newHTML = "";

    if(document.querySelector("#front-page").hasChildNodes()){
      o.clearPictures("#front-page");
    }

    $ajaxUtils.sendGetRequest(
      pictureDisplayHTML, function(pictureDisplayHTML){
        $ajaxUtils.sendGetRequest(
          "pictureData.json", function(response){
            newHTML = o.buildPictureDisplayListViewHtml(response, category, pictureDisplayHTML)
            o.insertHtml("#front-page", newHTML) 
          }, true);
      }, false);  
  }

  //loading function for each tab(category)
  o.categoryLoadingFunction = function(category){
    var pictureDisplayHTML = "pictureDisplay.html";
    var newHTML = "";

    //reused from above (index.js)
    $(function(){

      function transition(currentImageInput, imageWidthInput){
        var pxValue = -(currentImageInput) * imageWidthInput;
        imageBox.animate({
          'left': pxValue
        });

        currentImage = currentImageInput;
      }

      transition(0, imageWidth);
    });

    if(document.querySelector("#main-content").hasChildNodes()){
      o.clearPictures("#main-content");
    }
    if(document.querySelector("#front-page").hasChildNodes()){
      o.clearPictures("#front-page");
    }

    o.mainPagePictureLoader(category);
    o.loadSideColumn(category);

    $ajaxUtils.sendGetRequest(
      pictureDisplayHTML, function(pictureDisplayHTML){
        $ajaxUtils.sendGetRequest(
          "pictureData.json", function(response){
            newHTML = o.buildPictureDisplayListViewHtml(response, category, pictureDisplayHTML);
            o.insertHtml("#main-content", newHTML);
          }, true);
      }, false);
  }

  //clear function to remove loaded photos to improve performance 
  o.clearPictures = function(selector){
    document.querySelector(selector).innerHTML = ""
  }

  //TODO when picture thumbnail is clicked in nav menu display that picture
  //on the #front-page and maintain picture order of its siblings on
  //#front-page as well. 
  o.onThumbnailClick = function(event){
    var id = event.target.getAttribute("data-id");

    //reused from above (index.js)
    $(function(){

      function transition(currentImageInput, imageWidthInput){
        var pxValue = -(currentImageInput) * imageWidthInput;
        imageBox.animate({
          'left': pxValue
        });

        currentImage = currentImageInput;
      }

      transition(id, imageWidth);

      const $navbar = $('.navbar');
      const $buttonContainer = $('.container-fluid');
      const $openMenu = $('#open-menu');

      $($navbar).toggleClass('open');
      $($buttonContainer).toggleClass('position-after-animation');
      $($buttonContainer).toggleClass('position-before-animation');
      $($openMenu).toggleClass('open-menu-close');
      $($openMenu).toggleClass('open-menu-open');
      $(this).toggleClass('down')
      $(this).toggleClass('up')
    });
  }

  global.$o = o;

})(window);

//reloads when the window is rezied so that the images are displayed correctly.
window.onresize = function(){
  location.reload();
};

//slide show when user is idle(not clicking anything)
  //check to see if user has been idle for the last 2 seconds
    //if so automatically press next if possible on main image if nav bar isnt up
    //if not, wait and rerun the function in 2 seconds
var clickHappened = false;
var navbarOpen = isNavbarOpen();

function progressMainPicture(){
  if(!clickHappened && !isNavbarOpen()){
    //progress the main image
    $(function(){

      function transition(currentImageInput, imageWidthInput){
        var pxValue = -(currentImageInput) * imageWidthInput;
        imageBox.animate({
          'left': pxValue
        });

        currentImage = currentImageInput;
      }

      if(currentImage >= imageQuanity - 1){
        currentImage = 0;
        transition(currentImage, imageWidth);
      }
      else{
        currentImage++;
        transition(currentImage, imageWidth);
      }
    });
  }
}

setInterval(()=>{
  //console.log([!clickHappened && !isNavbarOpen()] + " currentImage: " + currentImage)
  progressMainPicture();
}, 5000)

//checks to see if the navbar is open
function isNavbarOpen(){
  if(document.querySelector(".navbar").classList.contains("open")){
    return true;
  }
  else{
    return false;
  }
}

//creates a 3 second interval timer looking for a click event
var clickChecker = setInterval(()=>{clickHappened = false;}, 3000);

window.addEventListener("click", () => {
  clickHappened = true;
  clearInterval(clickChecker);
  clickChecker = setInterval(()=>{clickHappened = false;}, 3000);
});



