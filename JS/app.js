//The URIs of the REST endpoint
IUPS = "https://prod-08.uksouth.logic.azure.com:443/workflows/f74aa5b021dc465c8081efc6e7407325/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=GC-D7BjqXR5MMp-CvFiIpI93Elec60CbAK1gWFjB8j4";
RAI = "https://prod-29.uksouth.logic.azure.com:443/workflows/7975fddd0ae5459a9176fcdd0a047144/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=R00UVVyXZG7phpGQtYMNya1XlLQmgaYm1m866Yg5Ag8";

RAAURI = "https://prod-04.uksouth.logic.azure.com/workflows/fc6fa9c586a240439dbbb1e123ec1515/triggers/manual/paths/invoke/rest/v1/assets?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=LpbCvLNNDf2-hL6w7cxbo7SGMd_Nt9jccMh5u8HlSts";
CIAURI = "https://prod-09.uksouth.logic.azure.com/workflows/2b86a9e079e243b687a70fc7af14e3cd/triggers/manual/paths/invoke/rest/v1/assets?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ozh-bbpgj6IbmUBYy2ey04uWmbhDWOzQ6DKI1aEynPQ";

DIAURI0 = "https://prod-26.uksouth.logic.azure.com/workflows/87bf7cc10be1485ab99d2569ea16d982/triggers/manual/paths/invoke/rest/v1/assets/{id}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=WH5ZXcZOgZG4IAaIzwxGtuMkbHBl15Wz8X_hBMnEoOo";
DIAURI1 = "https://prod-26.uksouth.logic.azure.com/workflows/87bf7cc10be1485ab99d2569ea16d982/triggers/manual/paths/invoke/rest/v1/assets/{id}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=WH5ZXcZOgZG4IAaIzwxGtuMkbHBl15Wz8X_hBMnEoOo";

BLOB_ACCOUNT = "https://blobstorage682.blob.core.windows.net";



//Handlers for button clicks
$(document).ready(function() {

 
  $("#retImages").click(function(){

      //Run the get asset list function
      getImages();

  }); 

   //Handler for the new asset submission button
  $("#subNewForm").click(function(){

    //Execute the submit new asset function
    submitNewAsset();
    
  }); 
});

//A function to submit a new asset to the REST endpoint 
function submitNewAsset(){

  //Create a form data object
  submitData = new FormData();
  //Get form variables and append them to the form data object
  submitData.append('FileName', $('#FileName').val());
  submitData.append('userID', $('#userID').val());
  submitData.append('userName', $('#userName').val());
  submitData.append('File', $("#UpFile")[0].files[0]);

 

 //Post the form data to the endpoint, note the need to set the content type header
  $.ajax({
  url: IUPS,
  data: submitData,
  cache: false,
  enctype: 'multipart/form-data',
  contentType: false,
  processData: false,
  type: 'POST',
  success: function(data){

  }
  });
  
 

}

//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getImages(){

  //Replace the current HTML in that div with a loading message
  $('#ImageList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');
  $.getJSON(RAI, function( data ) {
  //Create an array to hold all the retrieved assets
  var items = [];

  //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
  $.each( data, function( key, val ) {
    items.push( "<hr />");
    items.push("<video src='"+BLOB_ACCOUNT + val["filePath"] +"' width='400' controls>" +
    "</video>"
         );
    items.push( "File : " + val["fileName"] + "<br />");
    items.push( "Uploaded by: " + val["userName"] + " (user id: "+val["userID"]+")<br />");
    items.push( "<hr />");
    });


  //Clear the assetlist div
  $('#ImageList').empty();

  //Append the contents of the items array to the ImageList Div
  $( "<ul/>", {
  "class": "my-new-list",
  html: items.join( "" )
  }).appendTo( "#ImageList" );
  });

 
}

