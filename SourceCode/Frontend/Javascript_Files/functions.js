// Comprehensive Assessment Form Scripts

var pageType;
var csaFormArr = [];

document.addEventListener('DOMContentLoaded', ()=>
{
    var el = document.getElementById('GotoGOFBtn');
    if(el){
        el.addEventListener('click', submitForm);
    }
});

//Check if all fields are filled
function validateForm() {
    var isValid = false;
    var errorMsg = "";
    if(document.getElementById('patientWeightInput').value == ""){
      errorMsg += "Please enter the weight \n";
      document.getElementById('patientWeightInput').style.borderColor = "red";
    }
    if(document.getElementById('wheelchairTypeInput').value == ""){
      errorMsg += "Please select a Wheelchair type \n";
      document.getElementById('wheelchairTypeInput').style.borderColor = "red";
    }
    if(document.getElementById('chestWidthInput').value == ""){
      errorMsg += "Please enter the chest width \n";
      document.getElementById('chestWidthInput').style.borderColor = "red";
    }
    if(document.getElementById('hipWidthInput').value == ""){
      errorMsg += "Please enter the hip width \n";
      document.getElementById('hipWidthInput').style.borderColor = "red";
    }
    if(document.getElementById('seatToLowerLegHeightLeftInput').value == ""){
      errorMsg += "Please enter the seat to lower leg height Left \n";
      document.getElementById('seatToLowerLegHeightLeftInput').style.borderColor = "red";
    }
    if(document.getElementById('seatToLowerLegHeightRightInput').value == ""){
      errorMsg += "Please enter the seat to lower leg height Right \n";
      document.getElementById('seatToLowerLegHeightRightInput').style.borderColor = "red";
    }
    if(document.getElementById('buttocksNThighDepthLeftInput').value == ""){
      errorMsg += "Please enter the buttocks and Thigh Depth Left \n";
      document.getElementById('buttocksNThighDepthLeftInput').style.borderColor = "red";
    }
    if(document.getElementById('buttocksNThighDepthRightInput').value == ""){
      errorMsg += "Please enter the buttocks and Thigh Depth Right \n";
      document.getElementById('buttocksNThighDepthRightInput').style.borderColor = "red";
    }
    
    if(errorMsg != ""){
        alert(errorMsg);
        //document.getElementById('MessageDialog').value = errorMsg;
//        window.location.href = "../Dashboard/messageDialog.html";
    }
    else{
        isValid = true;
    }
return isValid;
}

const submitForm = (ev)=>{
    ev.preventDefault();  //to stop the form submitting default
    
    //if(validateForm() == true)
    {
        //Set PageType and according load the next page after processing screen
        pageType = "CSA";

        //saving pageType to localStorage for access later in processing screen
        localStorage.setItem('pageType', JSON.stringify(pageType) );

        var isTilt;
        if (document.getElementById('tiltInput').checked) {
          isTilt = true;
        }else if (document.getElementById('standardInput').checked) {
          isTilt = false;
        }


        var csaFormData = {
            // patientWeight:document.getElementById('patientWeightInput').value,
            // wheelchairType:document.getElementById('wheelchairTypeInput').value = isTilt,
            // //wheelchairPropulsion:document.getElementById('wheelchairPropulsionInput').value,
            // chestWidth:document.getElementById('chestWidthInput').value,
            // hipWidth:document.getElementById('hipWidthInput').value,
            // seatToLowerLegHeightleft:document.getElementById('seatToLowerLegHeightLeftInput').value,
            // seatToLowerLegHeightRight:document.getElementById('seatToLowerLegHeightRightInput').value,
            // buttocksNThighDepthLeft:document.getElementById('buttocksNThighDepthLeftInput').value,
            // buttocksNThighDepthRight:document.getElementById('buttocksNThighDepthRightInput').value


            // patientWeight:document.getElementById('patientWeightInput').value,
            // hwidth:document.getElementById('hipWidthInput').value,
            // cwidth:document.getElementById('chestWidthInput').value,
            // // footpropulsion:document.getElementById('wheelchairPropulsionInput').value,
            // footpropulsion:1,
            // btdepth:document.getElementById('buttocksNThighDepthLeftInput').value,
            // lowerleg:document.getElementById('seatToLowerLegHeightLeftInput').value

            patientWeight: 290,
            hwidth : 17,
            cwidth : 18,
            footpropulsion : 1,
            btdepth : 15,
            lowerleg:10

        }
        csaFormArr.push(csaFormData);
        document.forms[0].reset(); // to clear the form for the next entries
        //document.querySelector('form').reset();

        //saving to localStorage
        localStorage.setItem('CSAFormData', JSON.stringify(csaFormArr) );
    }

    //Sending CSA form Data to parameters API
    var xhr = new XMLHttpRequest();
    var parameterurl = "http://localhost:8090/api/parameters";
    var params = JSON.stringify(csaFormData);
    xhr.open("POST", parameterurl, true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function() { // Call a function when the state changes.
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          // Request finished. Do processing here.
          var parametersAPIResponse = xhr.responseText;
          //localStorage.setItem('parametersAPIResponse', JSON.stringify(parametersAPIResponse) );
          // localStorage.setItem('parametersAPIResponse', parametersAPIResponse);
          // windows.localStorage.setItem('parametersAPIResponse', JSON.stringify(parametersAPIResponse) );


          var parameterOutput = {
              "Weight": JSON.parse(xhr.response).Weight,
              "SeatWidth": JSON.parse(xhr.response).SeatWidth,
              "SeatDepth": JSON.parse(xhr.response).SeatDepth,
              "RecommendedFSFH": JSON.parse(xhr.response).RecommendedFSFH
              };
          localStorage.setItem('parameterOutput',JSON.stringify(parameterOutput) );
 
          //Navigating to Generic Order Form
          window.location.href = "../Dashboard/processingScreen.html";

      }
    }
    xhr.send(params);  
}


//Generic Order Form Scripts
document.addEventListener('DOMContentLoaded', ()=>
{
    var el = document.getElementById('ProcessDataBtn');
    if(el){
      el.addEventListener('click', processDataFunction);
    }
});

//Function called when Generic order form is loaded, it pulls the information from CSA Form and shows on GOF.
function retrieveFormInfo(){

    //Set the values on respective IDs in the Generic Order Form. 
    var arr = JSON.parse( localStorage.getItem('CSAFormData') );
      document.getElementById('patientWeightInput').value = arr[0].patientWeight;
    //document.getElementById('wheelchairTypeInput').value = arr[0].wheelchairType;
    //document.getElementById('wheelchairPropulsionInput').value = arr[0].wheelchairPropulsion;
    document.getElementById('seatWidthInput').value = arr[0].cwidth;
    document.getElementById('backHeightInput').value = arr[0].hwidth;
    document.getElementById('seatToFloorHeightInput').value = arr[0].lowerleg;
//    document.getElementById('seatToFloorHeightInput').value = arr[0].seatToLowerLegHeightRight;
    document.getElementById('seatDepthInput').value = arr[0].btdepth;
//    document.getElementById('seatDepthInput').value = arr[0].buttocksNThighDepthRight;

}

//Function called when Submit button on Generic order form is clicked
const processDataFunction = (ev)=>{

    pageType = "GFO";
    //saving to localStorage
    localStorage.setItem('pageType', JSON.stringify(pageType) );
    
    //Navigate to processing screen
    window.location.href = "../Dashboard/processingScreen.html";
   
}





//sai's Function to connect frontend with backend and read the values for available wheelchair from GOF
// function loadPersons(personinfo){
//   var xmlhttp = new XMLHttpRequest();
//   xmlhttp.open("GET",baseurl,true);
//   xmlhttp.onreadystatechange = function() {
//       var persons = JSON.parse(xmlhttp.responseText);
//       var tbltop = `<table>
//           <tr><th>Model</th></tr>`;
//       //main table content we fill from data from the rest call
//       var main ="";
//       for (i = 0; i < persons.length; i++){
//         main += "<tr><td>"+persons[i].Model+"</td></tr>";
//       }
//       var tblbottom = "</table>";
//       var tbl = tbltop + main + tblbottom;
//       document.getElementById("personinfo").innerHTML = tbl;
//   };
//   xmlhttp.send();
// }
