var index;
var noOfModels;

var coll = document.getElementsByClassName("collapsible");
var n;

var getChairsURL = "http://localhost:8090/api/getChairs";

//Function to connect frontend with backend and read the values for available wheelchair from GOF
function getWheelchairModels(containerDiv){

  //Read the data from Generic Order Form fields and pass that to the Getchairs API
  var updatedGofData = JSON.parse( localStorage.getItem('updatedGofData') );
  var params = JSON.stringify(updatedGofData);

  var CSAFormData = JSON.parse( localStorage.getItem('CSAFormData') );
 
  //Sending Generic Form Data to GetChairs API
  var xhr = new XMLHttpRequest();
  xhr.open("POST", getChairsURL, true);

  //Send the proper header information along with the request
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onreadystatechange = function() { // Call a function when the state changes.
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        // Request finished. Do processing here.
        var getChairsResponse = JSON.parse(xhr.response);
        for ( var index = 0; index <= getChairsResponse.length;index++ )
        {
          var model = getChairsResponse[0][index].Model;

          const modelButton = document.createElement("button");
          modelButton.setAttribute("class", "collapsible");
          var buttonId = "btnId"+"_"+index;
          modelButton.setAttribute("id", buttonId);
          modelButton.innerHTML = model; 
          document.getElementById("containerDiv").appendChild(modelButton);

          const modelDiv = document.createElement("div");
          modelDiv.setAttribute("class", "content");
          var modelDivId = "modelDivId"+"_"+index;
          modelDiv.setAttribute("id", modelDivId);
          document.getElementById("containerDiv").appendChild(modelDiv);

          var iframe = document.createElement('iframe');
          var iframeId = "iframeId"+"_"+buttonId;
          iframe.setAttribute("id", iframeId);
          iframe.type = "file";
          modelDiv.appendChild(iframe);
          // iframe.src = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTmxEr_lsL1V8zYTk_tqfeWy_ZseT7WOwRq8faftMyBWfOMX734IL--WHJOu9uqOg/pubhtml?widget=true&amp;headers=false";
          var wheelSizeImgPath = "";
          var modelName = model;

          //Display the appropriate Wheel Size table Image based on Model Name
          if(modelName.includes("Move"))
          {
              iframe.setAttribute("class", "MoveClass");
              var _button = document.createElement("button");
              _button.innerHTML = 'Move-Front';
              // wheelSizeImgPath = "../Wheelchair_Size_Tbl_Images/Move_Front.PNG";
              wheelSizeImgPath = "../Wheelchair_Size_Html_Tables/MoveFrontTbl.html";
              document.getElementsByClassName("MoveClass")[0].src = wheelSizeImgPath;
              _button.onclick = function()
              {
                  // wheelSizeImgPath = "../Wheelchair_Size_Tbl_Images/Move_Front.PNG";
                  wheelSizeImgPath = "../Wheelchair_Size_Html_Tables/MoveFrontTbl.html";
                  document.getElementsByClassName("MoveClass")[0].src = wheelSizeImgPath;
              }
              var _button2 = document.createElement("button");
              _button2.innerHTML = 'Move-Rear';
              _button2.onclick = function()
              {
                // wheelSizeImgPath = "../Wheelchair_Size_Tbl_Images/Move_Rear.PNG";
                wheelSizeImgPath = "../Wheelchair_Size_Html_Tables/MoveRearTbl.html";
                document.getElementsByClassName("MoveClass")[0].src = wheelSizeImgPath;
              }

              modelDiv.appendChild(_button);
              modelDiv.appendChild(_button2);
            }
            if(modelName.includes("Orion"))
            {
              iframe.setAttribute("class", "OrionClass");
              // wheelSizeImgPath = "../Wheelchair_Size_Tbl_Images/OnionII.PNG";
              wheelSizeImgPath = "../Wheelchair_Size_Html_Tables/Orion2Tbl.html";
              document.getElementsByClassName("OrionClass")[0].src = wheelSizeImgPath;

            }
            if(modelName.includes("Catalyst"))
            {
              iframe.setAttribute("class", "CatalystClass");
              // wheelSizeImgPath = "../Wheelchair_Size_Tbl_Images/M6Quickie.PNG";
              wheelSizeImgPath = "../Wheelchair_Size_Html_Tables/M6QuickieTbl.html";
              document.getElementsByClassName("CatalystClass")[0].src = wheelSizeImgPath;

            }
            if(modelName.includes("MLW"))
            {
              //SuperTilt is MapleLeaf(MLW)
              iframe.setAttribute("class", "MLWClass");
              // wheelSizeImgPath = "../Wheelchair_Size_Tbl_Images/SuperTilt.PNG";
              wheelSizeImgPath = "../Wheelchair_Size_Html_Tables/SuperTiltTbl.html";
              document.getElementsByClassName("MLWClass")[0].src = wheelSizeImgPath;

            var _button = document.createElement("button");
              _button.innerHTML = 'SuperTilt';
            
              _button.onclick = function()
              {
                // wheelSizeImgPath = "../Wheelchair_Size_Tbl_Images/SuperTilt.PNG";
                wheelSizeImgPath = "../Wheelchair_Size_Html_Tables/SuperTiltTbl.html";
                document.getElementsByClassName("MLWClass")[0].src = wheelSizeImgPath;
              }
              var _button2 = document.createElement("button");
              _button2.innerHTML = 'LowRiderSuperTilt';
              _button2.onclick = function()
              {
                  // wheelSizeImgPath = "../Wheelchair_Size_Tbl_Images/LowRiderSuperTilt.PNG";
                  wheelSizeImgPath = "../Wheelchair_Size_Html_Tables/LowRideSuperTiltTbl.html";
                  document.getElementsByClassName("MLWClass")[0].src = wheelSizeImgPath;
              }

              modelDiv.appendChild(_button);
              modelDiv.appendChild(_button2);
            }

            // document.getElementById(iframeId).src = wheelSizeImgPath;
            iframe.style.width = '100%';
            var scrollHeight = iframe.ownerDocument.body.scrollHeight;
            iframe.style.height = scrollHeight + "px";
          
            var br = document.createElement("br");
            modelDiv.appendChild(br);
          
          //Header NOTE:
          const headerLbl = document.createElement("label");
          headerLbl.setAttribute("class", "content");
          var headerLblId = "headerLbl"+"_"+index;
          headerLbl.setAttribute("id", headerLblId);
          var note = "Please complete the following fields by selecting the features that you require from the above table.In the user guide, we indicate which options you might choose for different patient situations."; 
          headerLbl.innerHTML = note; 
          headerLbl.style.fontFamily = "Source Sans Pro, Calibri, Arial, sans-serif";
          headerLbl.style.fontSize = "12pt";
          headerLbl.style.fontWeight=  "bold";
          //for text wrapping
          headerLbl.style.width=  iframe.width;
          document.getElementById(modelDivId).appendChild(headerLbl);

          //Now creating Specifications table for each wc details
          const detailsTable = document.createElement("table");
          detailsTable.setAttribute("class", "content");
          var detailsTblId = "tbl"+"_"+index;
          detailsTable.setAttribute("id", detailsTblId);
          detailsTable.innerHTML = "Details for Table :" + index; 
          document.getElementById(modelDivId).appendChild(detailsTable);
          
          //Row 1
          const row1 = document.createElement("TR");
          row1.setAttribute("class", "content");
          var row1Id = "row1"+"_"+index;
          row1.setAttribute("id", row1Id);
          document.getElementById(detailsTblId).appendChild(row1);

          const row1data1 = document.createElement("TD");
          row1data1.setAttribute("class", "content");
          var row1data1Id = "row1data1"+"_"+index;
          row1data1.setAttribute("id", row1data1Id);
          row1data1.innerHTML = "Tilt"; 
          document.getElementById(row1Id).appendChild(row1data1);

          const row1data2 = document.createElement("TD");
          row1data2.setAttribute("class", "content");
          var row1data2Id = "row1data1"+"_"+index;
          row1data2.setAttribute("id", row1data2Id);
          row1data2.innerHTML = CSAFormData[0].tilt; 
          document.getElementById(row1Id).appendChild(row1data2);

          //Row 2
          const row2 = document.createElement("TR");
          row2.setAttribute("class", "content");
          var row2Id = "row2"+"_"+index;
          row2.setAttribute("id", row2Id);
          document.getElementById(detailsTblId).appendChild(row2);

          const row2data1 = document.createElement("TD");
          row2data1.setAttribute("class", "content");
          var row2data1Id = "row2data1"+"_"+index;
          row2data1.setAttribute("id", row2data1Id);
          row2data1.innerHTML = "Seat Width"; 
          document.getElementById(row2Id).appendChild(row2data1);

          const row2data2 = document.createElement("TD");
          row2data2.setAttribute("class", "content");
          var row2data2Id = "row2data2"+"_"+index;
          row2data2.setAttribute("id", row2data2Id);
          row2data2.innerHTML = updatedGofData.SeatWidth; 
          document.getElementById(row2Id).appendChild(row2data2);

          //Row 3
          const row3 = document.createElement("TR");
          row3.setAttribute("class", "content");
          var row3Id = "row3"+"_"+index;
          row3.setAttribute("id", row3Id);
          document.getElementById(detailsTblId).appendChild(row3);

          const row3data1 = document.createElement("TD");
          row3data1.setAttribute("class", "content");
          var row3data1Id = "row3data1"+"_"+index;
          row3data1.setAttribute("id", row3data1Id);
          row3data1.innerHTML = "Seat Depth"; 
          document.getElementById(row3Id).appendChild(row3data1);

          const row3data2 = document.createElement("TD");
          row3data2.setAttribute("class", "content");
          var row3data2Id = "row3data2"+"_"+index;
          row3data2.setAttribute("id", row3data2Id);
          row3data2.innerHTML = updatedGofData.SeatDepth; 
          document.getElementById(row3Id).appendChild(row3data2);


          //Row 4
          const row4 = document.createElement("TR");
          row4.setAttribute("class", "content");
          var row4Id = "row4"+"_"+index;
          row4.setAttribute("id", row4Id);
          document.getElementById(detailsTblId).appendChild(row4);

          const row4data1 = document.createElement("TD");
          row4data1.setAttribute("class", "content");
          var row4data1Id = "row4data1"+"_"+index;
          row4data1.setAttribute("id", row4data1Id);
          row4data1.innerHTML = "Recommended FSFH"; 
          document.getElementById(row4Id).appendChild(row4data1);

          const row4data2 = document.createElement("TD");
          row4data2.setAttribute("class", "content");
          var row4data2Id = "row4data2"+"_"+index;
          row4data2.setAttribute("id", row4data2Id);
          row4data2.innerHTML = updatedGofData.RecommendedFSFH; 
          document.getElementById(row4Id).appendChild(row4data2);


          //Row 5
          const row5 = document.createElement("TR");
          row5.setAttribute("class", "content");
          var row5Id = "row5"+"_"+index;
          row5.setAttribute("id", row5Id);
          document.getElementById(detailsTblId).appendChild(row5);

          const row5data1 = document.createElement("TD");
          row5data1.setAttribute("class", "content");
          var row5data1Id = "row5data1"+"_"+index;
          row5data1.setAttribute("id", row5data1Id);
          row5data1.innerHTML = "Client Weight"; 
          document.getElementById(row5Id).appendChild(row5data1);

          const row5data2 = document.createElement("TD");
          row5data2.setAttribute("class", "content");
          var row5data2Id = "row5data2"+"_"+index;
          row5data2.setAttribute("id", row5data2Id);
          row5data2.innerHTML = updatedGofData.Weight; 
          document.getElementById(row5Id).appendChild(row5data2);

          //Row 6
          const row6 = document.createElement("TR");
          row6.setAttribute("class", "content");
          var row6Id = "row6"+"_"+index;
          row6.setAttribute("id", row6Id);
          document.getElementById(detailsTblId).appendChild(row6);

          const row6data1 = document.createElement("TD");
          row6data1.setAttribute("class", "content");
          var row6data1Id = "row6data1"+"_"+index;
          row6data1.setAttribute("id", row6data1Id);
          row6data1.innerHTML = "Caster"; 
          document.getElementById(row6Id).appendChild(row6data1);

          const row6data2 = document.createElement("TD");
          row6data2.setAttribute("class", "content");
          var row6data2Id = "row6data2"+"_"+index;
          row6data2.setAttribute("id", row6data2Id);
          document.getElementById(row6Id).appendChild(row6data2);

          var row6data2Input = document.createElement('input');
          row6data2Input.type = 'text';
          row6data2Input.id = 'row6data2Input' + index; // need unique Ids!
          row6data2.appendChild(row6data2Input);

          //Row 7
          const row7 = document.createElement("TR");
          row7.setAttribute("class", "content");
          var row7Id = "row7"+"_"+index;
          row7.setAttribute("id", row7Id);
          document.getElementById(detailsTblId).appendChild(row7);

          const row7data1 = document.createElement("TD");
          row7data1.setAttribute("class", "content");
          var row7data1Id = "row7data1"+"_"+index;
          row7data1.setAttribute("id", row7data1Id);
          row7data1.innerHTML = "Fork/Position"; 
          document.getElementById(row7Id).appendChild(row7data1);

          const row7data2 = document.createElement("TD");
          row7data2.setAttribute("class", "content");
          var row7data2Id = "row7data2"+"_"+index;
          row7data2.setAttribute("id", row7data2Id);
          document.getElementById(row7Id).appendChild(row7data2);

          var row7data2Input = document.createElement('input');
          row7data2Input.type = 'text';
          row7data2Input.id = 'row7data2Input' + index; // need unique Ids!
          row7data2.appendChild(row7data2Input);

          //Row 8
          const row8 = document.createElement("TR");
          row8.setAttribute("class", "content");
          var row8Id = "row8"+"_"+index;
          row8.setAttribute("id", row8Id);
          document.getElementById(detailsTblId).appendChild(row8);

          const row8data1 = document.createElement("TD");
          row8data1.setAttribute("class", "content");
          var row8data1Id = "row8data1"+"_"+index;
          row8data1.setAttribute("id", row8data1Id);
          row8data1.innerHTML = "Stem Bolt Length"; 
          document.getElementById(row8Id).appendChild(row8data1);

          const row8data2 = document.createElement("TD");
          row8data2.setAttribute("class", "content");
          var row8data2Id = "row8data2"+"_"+index;
          row8data2.setAttribute("id", row8data2Id);
          document.getElementById(row8Id).appendChild(row8data2);

          var row8data2Input = document.createElement('input');
          row8data2Input.type = 'text';
          row8data2Input.id = 'row8data2Input' + index; // need unique Ids!
          row8data2.appendChild(row8data2Input);
          
    }// End of For Loop
    //Function for expand Collapse feature
    for (n = 0; n < coll.length; n++) {
      coll[n].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        // alert("content.style.maxHeight" + content.style.maxHeight);
        if (content.style.maxHeight){
          content.style.maxHeight = null;
          // alert("content.style.maxHeight" + content.style.maxHeight);
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
          // alert("content.scrollHeight" + content.scrollHeight);
          } 
      });
    }
    
}//End of ReadyState condition
}//End of OnReadystateChange
xhr.send(params);

}//End of function
