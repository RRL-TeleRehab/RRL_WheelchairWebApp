// Comprehensive Assessment Form Scripts

var pageType; // Based on this processing screen navigation is handled
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

    }
    else{
        isValid = true;
    }
return isValid;
}

const submitForm = (ev)=>{
    ev.preventDefault();  //to stop the form submitting default
    // localStorage.clear();
    //if(validateForm() == true)
    {
        //Set PageType and according load the next page after processing screen
        pageType = "CSA";

        //saving pageType to localStorage for access later in processing screen
        localStorage.setItem('pageType', JSON.stringify(pageType) );

        var isTilt;
        if (document.getElementById('tiltInput').checked) {
          isTilt = "Yes";
        }else if (document.getElementById('standardInput').checked) {
          isTilt = "No";
        }

        var isFootPropulsion;
        if ((document.getElementById('FootLeftInput').checked) || 
        (document.getElementById('FootRightInput').checked)) {
          isFootPropulsion = 1;
        }else {
          isFootPropulsion = 0;
        }

        var csaFormData = {

            patientWeight:document.getElementById('CSA_patientWeightInput').value,
            hwidth:document.getElementById('hipWidthInput').value,
            cwidth:document.getElementById('chestWidthInput').value,
            footpropulsion:isFootPropulsion,
            btdepth:document.getElementById('buttocksNThighDepthLeftInput').value,
            lowerleg:document.getElementById('seatToLowerLegHeightLeftInput').value,
            tilt:isTilt

            // patientWeight: 290,
            // hwidth : 18.5,
            // cwidth : 18,
            // footpropulsion : 1,
            // btdepth : 17,
            // lowerleg:10

        }
        csaFormArr.push(csaFormData);
        document.forms[0].reset(); // to clear the form for the next entries

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
          // Request finished. Do processing here
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
//Function for Save Button
document.addEventListener('DOMContentLoaded', ()=>
{
    var el = document.getElementById('SaveGOFsDataBtn');
    if(el){
      el.addEventListener('click', processDataFunction);
    }
});

//Called when Save button on GOF is clicked
const saveGOFDataFunction = (ev)=>{

  pageType = "GOF";
  //saving to localStorage
  localStorage.setItem('pageType', JSON.stringify(pageType) );
  
  //Storing the updated GOF Data which will be required in next page
  var updatedGofData = {
    "Weight": document.getElementById('GOF_patientWeightInput').value,
    "SeatWidth": document.getElementById('seatWidthInput').value,
    "SeatDepth": document.getElementById('seatDepthInput').value,
    "RecommendedFSFH": document.getElementById('RFSFHInput').value
    };
  localStorage.setItem('updatedGofData',JSON.stringify(updatedGofData) );

}

//Event when submit is click on GOF
document.addEventListener('DOMContentLoaded', ()=>
{
    var el = document.getElementById('ProcessDataBtn');
    if(el){
      el.addEventListener('click', processDataFunction);
    }
});

//Function called when Submit button on Generic order form is clicked
const processDataFunction = (ev)=>{

  pageType = "GOF";
  //saving to localStorage
  localStorage.setItem('pageType', JSON.stringify(pageType) );
  
  //Navigate to processing screen to goto the Available Models page
  window.location.href = "../Dashboard/processingScreen.html";
 
}
//Function called when Generic order form is loaded, it pulls the information from CSA Form and shows on GOF.
function retrieveFormInfo(){
//Setting the values on the form after receving from localstorage which was saved from first API call
    var arr = JSON.parse( localStorage.getItem('parameterOutput') );
    // alert("Parameter API Response" + "\nWeight " + arr.Weight + "\nWidth "+ arr.SeatWidth + "\nDepth " + arr.SeatDepth + "\nFSFH " + arr.RecommendedFSFH);
    document.getElementById('GOF_patientWeightInput').value = arr.Weight;
    document.getElementById('seatWidthInput').value =  arr.SeatWidth;
    document.getElementById('seatDepthInput').value = arr.SeatDepth;
    document.getElementById('RFSFHInput').value = arr.RecommendedFSFH;


    //Storing the updated GOF Data which will be required in next page
    var updatedGofData = {
      "Weight": document.getElementById('GOF_patientWeightInput').value,
      "SeatWidth": document.getElementById('seatWidthInput').value,
      "SeatDepth": document.getElementById('seatDepthInput').value,
      "RecommendedFSFH": document.getElementById('RFSFHInput').value
      };
  localStorage.setItem('updatedGofData',JSON.stringify(updatedGofData) );


}

