// (function(global){

//   var o = {}

//   var insertProperty = function (string, propName, propValue) {
//     var propToReplace = "{{" + propName + "}}";
//     string = string
//       .replace(new RegExp(propToReplace, "g"), propValue);
//       return string;
//   }

//   var insertHtml = function (selector, html) {
//     var targetElem = document.querySelector(selector);
//     targetElem.innerHTML = html;
//   };

//   //TODO fix, gif not displayed. possibly a CSS issue.
//   var showLoading = function (selector) {
//     var html = "<div>";
//     html += "<img src='6os.gif'></div>";
//     insertHtml(selector, html);
//   };

//   function buildPictureDisplayListViewHtml(response, category, pictureDisplayHTML) {

//     var finalHtml = "";

//     for (var i = 0; i < response.length; i++) {
//       if(response[i].category === category){
//         var html = pictureDisplayHTML;
//         var category = "" + response[i].category;
//         var fileName = response[i].fileName;
//         var id = response[i].id;
//         html =
//         insertProperty(html, "category", category);
//         html =
//         insertProperty(html, "picture", fileName);
//         html =
//         insertProperty(html, "id", id);
//         html= html.slice(0, 8) + " onClick='$o.onThumbnailClick(event);' " + html.slice(8);
//         finalHtml += html;
//       }
//     }
//     return finalHtml;
//   }

//   // o.testing = function (){
//   //   //showLoading("#main-content"); //not working
//   //   var testingHTML = "pictureDisplay.html";

//   //   $ajaxUtils.sendGetRequest(
//   //     testingHTML, function(testingHTML){
//   //       $ajaxUtils.sendGetRequest(
//   //         "pictureData.json", function(response){
//   //           insertHtml("#main-content", buildPictureDisplayListViewHtml(response, "Travel", testingHTML)) 
//   //         }, true);
//   //     }, false);  
//   // }

//   //main page picture loading function
//   o.mainPagePictureLoader = function(category){
//     var pictureDisplayHTML = "pictureDisplay.html"
//     var newHTML = "";

//     if(document.querySelector("#front-page").hasChildNodes()){
//       o.clearPictures("#front-page");
//     }

//     $ajaxUtils.sendGetRequest(
//       pictureDisplayHTML, function(pictureDisplayHTML){
//         $ajaxUtils.sendGetRequest(
//           "pictureData.json", function(response){
//             newHTML = buildPictureDisplayListViewHtml(response, category, pictureDisplayHTML)
//             insertHtml("#front-page", newHTML) 
//           }, true);
//       }, false);  
//   }

//   //loading function for each tab(category)
//   o.categoryLoadingFunction = function(category){
//     var pictureDisplayHTML = "pictureDisplay.html";
//     var newHTML = "";

//     if(document.querySelector("#main-content").hasChildNodes()){
//       o.clearPictures("#main-content");
//     }
//     if(document.querySelector("#front-page").hasChildNodes()){
//       o.clearPictures("#front-page");
//     }

//     o.mainPagePictureLoader(category);

//     $ajaxUtils.sendGetRequest(
//       pictureDisplayHTML, function(pictureDisplayHTML){
//         $ajaxUtils.sendGetRequest(
//           "pictureData.json", function(response){
//             newHTML = buildPictureDisplayListViewHtml(response, category, pictureDisplayHTML);
//             insertHtml("#main-content", newHTML);
//           }, true);
//       }, false);
//   }

//   //clear function to remove loaded photos to improve performance 
//   o.clearPictures = function(selector){
//     document.querySelector(selector).innerHTML = ""
//   }

//   //TODO when picture thumbnail is clicked in nav menu display that picture
//   //on the #front-page and maintain picture order of its siblings on
//   //#front-page as well. 
//   o.onThumbnailClick = function(event){
//     var id = event.target.getAttribute("data-id");
//     var allLi = document.querySelectorAll("#front-page li");
//     var oneLi = document.querySelector("#front-page li")
//     //console.log(allLi[1]);
//     //console.log('id' in allLi[1].dataset);
    
//     console.log("event.target.getAttribute: " + id);
//     console.log("oneLi.getAttribute: " + oneLi.getAttribute("data-id"));

//     // var element = Array.prototype.filter.call(
//     //   document.querySelectorAll("#front-page li"),
//     //   (li) => li.getAttribute('data-id') == id
//     // );
//     //for (var i = 0; i<allLi.length; i++){
//       // if(allLi[i].getAttribute("data-id") === id){
//       //   console.log("found it")
//       // }
//       // else {
//       //   console.log(allLi[i].dataset.id)
//       // }
//       $(function(){
//         //console.log($(allLi[i]));
//       });
//     //}
//   }

//   global.$o = o;

// })(window);

// //reloads when the window is rezied so that the images are displayed correctly.
// window.onresize = function(){
//   location.reload();
// };


