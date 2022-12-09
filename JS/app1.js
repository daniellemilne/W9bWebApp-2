//The URIs of the REST endpoint
RAAURI = "https://prod-04.uksouth.logic.azure.com/workflows/fc6fa9c586a240439dbbb1e123ec1515/triggers/manual/paths/invoke/rest/v1/assets?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=LpbCvLNNDf2-hL6w7cxbo7SGMd_Nt9jccMh5u8HlSts";
CIAURI = "https://prod-09.uksouth.logic.azure.com/workflows/2b86a9e079e243b687a70fc7af14e3cd/triggers/manual/paths/invoke/rest/v1/assets?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ozh-bbpgj6IbmUBYy2ey04uWmbhDWOzQ6DKI1aEynPQ";

DIAURI0 = "https://prod-26.uksouth.logic.azure.com/workflows/87bf7cc10be1485ab99d2569ea16d982/triggers/manual/paths/invoke/rest/v1/assets/{id}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=WH5ZXcZOgZG4IAaIzwxGtuMkbHBl15Wz8X_hBMnEoOo";
DIAURI1 = "https://prod-26.uksouth.logic.azure.com/workflows/87bf7cc10be1485ab99d2569ea16d982/triggers/manual/paths/invoke/rest/v1/assets/{id}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=WH5ZXcZOgZG4IAaIzwxGtuMkbHBl15Wz8X_hBMnEoOo";


//Handlers for button clicks
$(document).ready(function() {

 
  $("#retAssets").click(function(){

      //Run the get asset list function
      getAssetList();

  }); 

   //Handler for the new asset submission button
  $("#subNewForm").click(function(){

    //Execute the submit new asset function
    submitNewAsset();
    
  }); 
});

//A function to submit a new asset to the REST endpoint 
function submitNewAsset(){
  
  //Construct JSON Object for new item
var subObj = {
  Title: $('#Title').val(),
  Publisher: $('#Publisher').val(),
  Producer: $('#Producer').val(),
  Genre: $('#Genre').val(),
  AgeRating: $('#AgeRating').val(),
  }

  //Convert to a JSON String
subObj = JSON.stringify(subObj);

  //Post the JSON string to the endpoint, note the need to set the content type header
$.post({
  url: CIAURI,
  data: subObj,
  contentType: 'application/json; charset=utf-8'
  }).done(function (response) {
  getAssetList();
  });

}

//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getAssetList(){

  //Replace the current HTML in that div with a loading message
  $('#AssetList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');

  //Get the JSON from the RAA API 
  $.getJSON(RAAURI, function( data ) {

    //Create an array to hold all the retrieved assets
    var items = [];
      
    //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
    $.each( data, function( key, val ) {
      
      items.push( "Title: " + val["Title"] + "<br/>");
      items.push( "Publisher: " + val["Publisher"] +  "<br/>");
      items.push( "Producer: " + val["Producer"] + "<br/>");
      items.push( "Genre: " + val["Genre"] + "<br/>");
      items.push( "AgeRating: " + val["AgeRating"] + "<br/>");
      items.push('<button type="button" id="subNewForm" class="btn btndanger" onclick="deleteAsset('+val["AssetID"] +')">Delete</button> <br/><br/>');
      });


      //Clear the assetlist div 
      $('#AssetList').empty();

      //Append the contents of the items array to the AssetList Div
      $( "<ul/>", {
        "class": "my-new-list",
        html: items.join( "" )
        }).appendTo( "#AssetList" );
    });
}

//A function to delete an asset with a specific ID.
//The id paramater is provided to the function as defined in the relevant onclick handler
function deleteAsset(id){
  $.ajax({
    type: "DELETE",

    //Note the need to concatenate the

    url: DIAURI0 + id,
    }).done(function( msg ) {
    //On success, update the assetlist.

    getAssetList();
    });

}
