//faq.js file
//eslint-env browser

var index;
var noOfModels;

var coll = document.getElementsByClassName("collapsible");
var n;


// var baseurl = "http://localhost:8090/api/wheelchair";
var baseurl = "http://localhost:8090/api/getChairs";

// var genericFormData = {};

function setGenericFormData(OutputData){
  // genericFormData = OutputData;
  // alert("setGenericFormData" + genericFormData);

}


//Function to connect frontend with backend and read the values for available wheelchair from GOF
function getWheelchairModels(containerDiv){

  var genericFormData = {
    "Weight": 290,
    "SeatWidth": 19,
    "SeatDepth": 15.5,
    "RecommendedFSFH": 7
    }

  //Sending Generic Form Data to GetChairs API
  // var genericFormData = JSON.parse( localStorage.getItem('CSAOutputData') );
  var params = JSON.stringify(genericFormData);
  console.log("genericFormData--->"+ params); 

  var xhr = new XMLHttpRequest();
  xhr.open("POST", baseurl, true);

  //Send the proper header information along with the request
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onreadystatechange = function() { // Call a function when the state changes.
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        // Request finished. Do processing here.
        var modelDetails = JSON.parse(xhr.responseText);
        // alert(modelDetails);
        // alert(JSON.stringify(xhr.responseText));
        alert(xhr.responseText);
        // for (index = 0; index < modelDetails.length; index++){

        //   // alert(modelDetails[0].Model);
        //   console.log("modelDetails.length" + modelDetails.length);
        //   console.log(modelDetails[index].Model);

        // } 
    }
  }
  xhr.send(params);

  
  // genericFormData = JSON.parse(localStorage.getItem('CSAOutputData'));
  // var params  = localStorage.getItem('CSAOutputData');


  //var params = JSON.stringify(genericFormData);
  //alert("params"+params);


  //var xmlhttp = new XMLHttpRequest();
  //xmlhttp.open("GET",baseurl,true); //Setting 3rd Param as true call this function twice
  //xmlhttp.open("GET",baseurl,true); // 3rd Parameter should be false in order to avaoid duplicate
  // xmlhttp.open("GET", baseurl+"?"+params, true);

  //calls to the method

  // xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  // xmlhttp.onreadystatechange = function() {
  //   if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {

      // var persons = JSON.parse(xmlhttp.responseText);
      // alert(persons);
      
      // var persons = xmlhttp.responseText;
      // alert(JSON.stringify(persons));
      // alert("GFO Data"+persons);

      /*Structure of display as below
      <div id="containerDiv"> 
      <button class="collapsible">ModelName</button>
      <div class="content"></div>
      </div>
      */
      /*for (index = 0; index < persons.length; index++){

            const modelButton = document.createElement("button");
            modelButton.setAttribute("class", "collapsible");
            var buttonId = "btnId"+"_"+index;
            modelButton.setAttribute("id", buttonId);
            modelButton.innerHTML = persons[index].Model; 
            document.getElementById("containerDiv").appendChild(modelButton);

            const modelDiv = document.createElement("div");
            modelDiv.setAttribute("class", "content");
            var modelDivId = "modelDivId"+"_"+index;
            modelDiv.setAttribute("id", modelDivId);
            modelDiv.style.width = '100%';
            //modelDiv.innerHTML = modelDivId + "aaaaaaaaaaaaaaaaa11111111111bbbbbbbbbbbbbbbbbb333333333333333333333cccccccccccccccccccccccccccccccc88888888888888888888888888888888888888jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj77777777777777777xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx0000000000000000qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqllllllllllllllllllllllllllllll"; 
            // document.getElementById(buttonId).appendChild(modelDiv);
            document.getElementById("containerDiv").appendChild(modelDiv);


             var iframe = document.createElement('iframe');
            // iframe.style.display = "none";
            // iframe.setAttribute("class", "content");
            iframe.src = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTmxEr_lsL1V8zYTk_tqfeWy_ZseT7WOwRq8faftMyBWfOMX734IL--WHJOu9uqOg/pubhtml?widget=true&amp;headers=false";
            // iframe.style.height = "600px";//iframe.contentWindow.document.getElementById(modelDivId).scrollHeight + 'px';
            // iframe.style.width = "600px";
            iframe.style.width = '100%';
            var scrollHeight = iframe.ownerDocument.body.scrollHeight;
            iframe.style.height = scrollHeight + "px";
            iframe.style.marginRight = "auto";
            modelDiv.appendChild(iframe);
            // document.body.appendChild(iframe);

            //<iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTmxEr_lsL1V8zYTk_tqfeWy_ZseT7WOwRq8faftMyBWfOMX734IL--WHJOu9uqOg/pubhtml?widget=true&amp;headers=false"></iframe>
            
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
            row1data2.innerHTML = persons[index].Tilt; 
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
            row2data1.setAttribute("id", row1data1Id);
            row2data1.innerHTML = "Seat Width Min"; 
            document.getElementById(row2Id).appendChild(row2data1);

            const row2data2 = document.createElement("TD");
            row2data2.setAttribute("class", "content");
            var row2data2Id = "row2data2"+"_"+index;
            row2data2.setAttribute("id", row2data2Id);
            row2data2.innerHTML = persons[index].Seat_Width_Min; 
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
            row3data1.innerHTML = "Seat Width Max"; 
            document.getElementById(row3Id).appendChild(row3data1);

            const row3data2 = document.createElement("TD");
            row3data2.setAttribute("class", "content");
            var row3data2Id = "row3data2"+"_"+index;
            row3data2.setAttribute("id", row3data2Id);
            row3data2.innerHTML = persons[index].Seat_Width_Max; 
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
            row4data1.innerHTML = "Seat Depth Min"; 
            document.getElementById(row4Id).appendChild(row4data1);

            const row4data2 = document.createElement("TD");
            row4data2.setAttribute("class", "content");
            var row4data2Id = "row4data2"+"_"+index;
            row4data2.setAttribute("id", row4data2Id);
            row4data2.innerHTML = persons[index].Seat_Depth_Min; 
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
            row5data1.innerHTML = "Seat Depth Max"; 
            document.getElementById(row5Id).appendChild(row5data1);

            const row5data2 = document.createElement("TD");
            row5data2.setAttribute("class", "content");
            var row5data2Id = "row5data2"+"_"+index;
            row5data2.setAttribute("id", row5data2Id);
            row5data2.innerHTML = persons[index].Seat_Depth_Max; 
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
            // row6data2.innerHTML = persons[index].Seat_Depth_Max; 
            document.getElementById(row6Id).appendChild(row6data2);

            var row6data2Input = document.createElement('input');
            row6data2Input.type = 'text';
            row6data2Input.id = 'row6data2Input' + index; // need unique Ids!
            row6data2Input.value = persons[index].Seat_Depth_Max; 
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
            // row7data2.innerHTML = persons[index].Seat_Depth_Max; 
            document.getElementById(row7Id).appendChild(row7data2);

            var row7data2Input = document.createElement('input');
            row7data2Input.type = 'text';
            row7data2Input.id = 'row7data2Input' + index; // need unique Ids!
            row7data2Input.value = persons[index].Seat_Depth_Max; 
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
            // row7data2.innerHTML = persons[index].Seat_Depth_Max; 
            document.getElementById(row8Id).appendChild(row8data2);

            var row8data2Input = document.createElement('input');
            row8data2Input.type = 'text';
            row8data2Input.id = 'row8data2Input' + index; // need unique Ids!
            row8data2Input.value = persons[index].Seat_Depth_Max; 
            row8data2.appendChild(row8data2Input);*/


            //MOVE Front Seat to Floor Height (FSFH) Table 
            //4" caster table
            /*const fourInchCasterTbl = document.createElement("table");
            fourInchCasterTbl.setAttribute("class", "content");
            var fourInchCasterTblId = "fourInchCasterTbl"+"_"+index;
            fourInchCasterTbl.setAttribute("id", fourInchCasterTblId);
            // fourInchCasterTbl.innerHTML = "4\" caster"; 
            fourInchCasterTbl.style.border = "1px solid black";
            fourInchCasterTbl.style.borderCollapse = "collapse";
            document.getElementById(detailsTblId).appendChild(fourInchCasterTbl);
            // document.getElementById(fourInchCasterTblId).style.backgroundColor = "black";
            // document.getElementById(fourInchCasterTblId).style.color = "white";

            //Table Header
            const tblHeader = document.createElement("thead");
            tblHeader.setAttribute("class", "content");
            var tblHeaderId = "tblHeader"+"_"+index;
            tblHeader.setAttribute("id", tblHeaderId);
            tblHeader.innerHTML = "4\" caster"; 
            tblHeader.style.border = "1px solid black";
            tblHeader.style.backgroundColor = "black";
            tblHeader.style.color = "white";
            // tblHeader.style.colspan = "3";
            fourInchCasterTbl.appendChild(tblHeader);

            //Stem Bolt Length Row
            const stemBoltRow4 = document.createElement("TR");
            stemBoltRow4.setAttribute("class", "content");
            var stemBoltRow4Id = "row5"+"_"+index;
            stemBoltRow4.setAttribute("id", stemBoltRow4Id);
            stemBoltRow4.style.border = "1px solid black";
            document.getElementById(fourInchCasterTblId).appendChild(stemBoltRow4);

            const stemBoltRow4data1 = document.createElement("TD");
            stemBoltRow4data1.setAttribute("class", "content");
            var stemBoltRow4data1Id = "stemBoltRow4data1Id"+"_"+index;
            stemBoltRow4data1.setAttribute("id", stemBoltRow4data1Id);
            stemBoltRow4data1.innerHTML = "Stem Bolt Length"; 
            document.getElementById(stemBoltRow4Id).appendChild(stemBoltRow4data1);

            //Row 2 (below stem bolt Length row)
            const row2 = document.createElement("TR");
            row2.setAttribute("class", "content");
            var row2Id = "row2"+"_"+index;
            row2.setAttribute("id", row2Id);
            row2.style.border = "1px solid black";
            document.getElementById(fourInchCasterTblId).appendChild(row2);

            const row2data1 = document.createElement("TD");
            row2data1.setAttribute("class", "content");
            var row2data1Id = "row2data1"+"_"+index;
            row2data1.setAttribute("id", row2data1Id);
            row2data1.style.border = "1px solid black";
            row2data1.innerHTML = "STD"; 
            document.getElementById(row2Id).appendChild(row2data1);

            const row2data2 = document.createElement("TD");
            row2data2.setAttribute("class", "content");
            var row2data2Id = "row2data2"+"_"+index;
            row2data2.setAttribute("id", row2data2Id);
            row2data2.style.border = "1px solid black";
            row2data2.innerHTML = "+1\""; 
            document.getElementById(row2Id).appendChild(row2data2);

            const row2data3 = document.createElement("TD");
            row2data3.setAttribute("class", "content");
            var row2data3Id = "row2data3"+"_"+index;
            row2data3.setAttribute("id", row2data3Id);
            row2data3.style.border = "1px solid black";
            row2data3.innerHTML = "+2\""; 
            document.getElementById(row2Id).appendChild(row2data3);

            //Row 3 are checkboxes
            const row3 = document.createElement("TR");
            row3.setAttribute("class", "content");
            var row3Id = "row3"+"_"+index;
            row3.setAttribute("id", row3Id);
            row3.style.border = "1px solid black";
            document.getElementById(fourInchCasterTblId).appendChild(row3);

            const row3data1 = document.createElement("TD");
            row3data1.setAttribute("class", "content");
            var row3data1Id = "row3data1"+"_"+index;
            row3data1.setAttribute("id", row3data1Id);
            row3data1.style.border = "1px solid black";
            row3data1.innerHTML = "12.5" +  '<br/>'; 
            document.getElementById(row3Id).appendChild(row3data1);

            var newCheckBox = document.createElement('input');
            newCheckBox.type = 'checkbox';
            newCheckBox.id = 'ptworkinfo' + index; // need unique Ids!
            newCheckBox.style.width = "20px";
            newCheckBox.style.height = "20px";
            newCheckBox.style.outline = "2px solid black";

            row3data1.appendChild(newCheckBox);

            const row3data2 = document.createElement("TD");
            row3data2.setAttribute("class", "content");
            var row3data2Id = "row3data2"+"_"+index;
            row3data2.setAttribute("id", row3data2Id);
            row3data2.style.border = "1px solid black";
            row3data2.innerHTML = "13.5" +  '<br/>';  
            document.getElementById(row3Id).appendChild(row3data2);

            var newCheckBox2 = document.createElement('input');
            newCheckBox2.type = 'checkbox';
            newCheckBox2.id = 'ptworkinfo2' + index; // need unique Ids!
            newCheckBox2.style.width = "20px";
            newCheckBox2.style.height = "20px";
            newCheckBox2.style.outline = "2px solid black";
            row3data2.appendChild(newCheckBox2);

            const row3data3 = document.createElement("TD");
            row3data3.setAttribute("class", "content");
            var row3data3Id = "row3data3"+"_"+index;
            row3data3.setAttribute("id", row3data3Id);
            row3data3.style.border = "1px solid black";
            row3data3.innerHTML = "14.5" +  '<br/>';  
            document.getElementById(row3Id).appendChild(row3data3);

            var newCheckBox3 = document.createElement('input');
            newCheckBox3.type = 'checkbox';
            newCheckBox3.id = 'ptworkinfo3' + index; // need unique Ids!
            newCheckBox3.style.width = "20px";
            newCheckBox3.style.height = "20px";
            newCheckBox3.style.outline = "2px solid black";
            row3data3.appendChild(newCheckBox3);

             //Row 4 are checkboxes
             const row4 = document.createElement("TR");
             row4.setAttribute("class", "content");
             var row4Id = "row4"+"_"+index;
             row4.setAttribute("id", row4Id);
             row4.style.border = "1px solid black";
             document.getElementById(fourInchCasterTblId).appendChild(row4);
 
             const row4data1 = document.createElement("TD");
             row4data1.setAttribute("class", "content");
             var row4data1Id = "row4data1"+"_"+index;
             row4data1.setAttribute("id", row4data1Id);
             row4data1.style.border = "1px solid black";
             row4data1.innerHTML = "13" +  '<br/>'; 
             document.getElementById(row4Id).appendChild(row4data1);
 
             var row4dataCb1 = document.createElement('input');
             row4dataCb1.type = 'checkbox';
             row4dataCb1.id = 'row4dataCb1' + index; // need unique Ids!
             row4dataCb1.style.width = "20px";
             row4dataCb1.style.height = "20px";
             row4dataCb1.style.outline = "2px solid black";
             row4data1.appendChild(row4dataCb1);
 
             const row4data2 = document.createElement("TD");
             row4data2.setAttribute("class", "content");
             var row4data2Id = "row4data2"+"_"+index;
             row4data2.setAttribute("id", row4data2Id);
             row4data2.style.border = "1px solid black";
             row4data2.innerHTML = "14" +  '<br/>';  
             document.getElementById(row4Id).appendChild(row4data2);
 
             var row4dataCb2 = document.createElement('input');
             row4dataCb2.type = 'checkbox';
             row4dataCb2.id = 'row4dataCb2' + index; // need unique Ids!
             row4dataCb2.style.width = "20px";
             row4dataCb2.style.height = "20px";
             row4dataCb2.style.outline = "2px solid black";
             row4data2.appendChild(row4dataCb2);
 
             const row4data3 = document.createElement("TD");
             row4data3.setAttribute("class", "content");
             var row4data3Id = "row4data3"+"_"+index;
             row4data3.setAttribute("id", row4data3Id);
             row4data3.style.border = "1px solid black";
             row4data3.innerHTML = "15" +  '<br/>';  
             document.getElementById(row4Id).appendChild(row4data3);
 
             var row4dataCb3 = document.createElement('input');
             row4dataCb3.type = 'checkbox';
             row4dataCb3.id = 'row4dataCb3' + index; // need unique Ids!
             row4dataCb3.style.width = "20px";
             row4dataCb3.style.height = "20px";
             row4dataCb3.style.outline = "2px solid black";
             row4data3.appendChild(row4dataCb3);
 
              //Row 5 are blank   
              const row5 = document.createElement("TR");
              row5.setAttribute("class", "content");
              var row5Id = "row5"+"_"+index;
              row5.setAttribute("id", row5Id);
              row5.style.border = "1px solid black";
              document.getElementById(fourInchCasterTblId).appendChild(row5);
  
              const row5data1 = document.createElement("TD");
              row5data1.setAttribute("class", "content");
              var row5data1Id = "row5data1"+"_"+index;
              row5data1.setAttribute("id", row5data1Id);
              row5data1.style.border = "1px solid black";
              row5data1.innerHTML = " " +  '<br/>'; 
              row5.appendChild(row5data1);
  
          
              const row5data2 = document.createElement("TD");
              row5data2.setAttribute("class", "content");
              var row5data2Id = "row5data2"+"_"+index;
              row5data2.setAttribute("id", row5data2Id);
              row5data2.style.border = "1px solid black";
              row5data2.innerHTML = " " +  '<br/>';  
              row5.appendChild(row5data2);
  
              const row5data3 = document.createElement("TD");
              row5data3.setAttribute("class", "content");
              var row5data3Id = "row4data3"+"_"+index;
              row5data3.setAttribute("id", row5data3Id);
              row5data3.style.border = "1px solid black";
              row5data3.innerHTML = " " +  '<br/>';  
              document.getElementById(row5Id).appendChild(row5data3);
  
             /////
             //Row 6 checkboxes
             const row6 = document.createElement("TR");
             row6.setAttribute("class", "content");
             var row6Id = "row6"+"_"+index;
             row6.setAttribute("id", row6Id);
             row6.style.border = "1px solid black";
             document.getElementById(fourInchCasterTblId).appendChild(row6);
 
             const row6data1 = document.createElement("TD");
             row6data1.setAttribute("class", "content");
             var row6data1Id = "row6data1"+"_"+index;
             row6data1.setAttribute("id", row6data1Id);
             row6data1.style.border = "1px solid black";
             row6data1.innerHTML = "13" +  '<br/>'; 
             row6.appendChild(row6data1);
 
             var row6dataCb1 = document.createElement('input');
             row6dataCb1.type = 'checkbox';
             row6dataCb1.id = 'row6dataCb1' + index; // need unique Ids!
             row6dataCb1.style.width = "20px";
             row6dataCb1.style.height = "20px";
             row6dataCb1.style.outline = "2px solid black";
             row6data1.appendChild(row6dataCb1);
 
             const row6data2 = document.createElement("TD");
             row6data2.setAttribute("class", "content");
             var row6data2Id = "row6data2"+"_"+index;
             row6data2.setAttribute("id", row6data2Id);
             row6data2.style.border = "1px solid black";
             row6data2.innerHTML = "14" +  '<br/>';  
             row6.appendChild(row6data2);
 
             var row6dataCb2 = document.createElement('input');
             row6dataCb2.type = 'checkbox';
             row6dataCb2.id = 'row6dataCb2' + index; // need unique Ids!
             row6dataCb2.style.width = "20px";
             row6dataCb2.style.height = "20px";
             row6dataCb2.style.outline = "2px solid black";
             row6data2.appendChild(row6dataCb2);
 
             const row6data3 = document.createElement("TD");
             row6data3.setAttribute("class", "content");
             var row6data3Id = "row6data3"+"_"+index;
             row6data3.setAttribute("id", row6data3Id);
             row6data3.style.border = "1px solid black";
             row6data3.innerHTML = "15" +  '<br/>';  
             row6.appendChild(row6data3);
 
             var row6dataCb3 = document.createElement('input');
             row6dataCb3.type = 'checkbox';
             row6dataCb3.id = 'row6dataCb3' + index; // need unique Ids!
             row6dataCb3.style.width = "20px";
             row6dataCb3.style.height = "20px";
             row6dataCb3.style.outline = "2px solid black";
             row6data3.appendChild(row6dataCb3);
 
             //Row 7 checkboxes
             const row7 = document.createElement("TR");
             row7.setAttribute("class", "content");
             var row7Id = "row7"+"_"+index;
             row7.setAttribute("id", row7Id);
             row7.style.border = "1px solid black";
             document.getElementById(fourInchCasterTblId).appendChild(row7);
 
             const row7data1 = document.createElement("TD");
             row7data1.setAttribute("class", "content");
             var row7data1Id = "row7data1"+"_"+index;
             row7data1.setAttribute("id", row7data1Id);
             row7data1.style.border = "1px solid black";
             row7data1.innerHTML = "13" +  '<br/>'; 
             row7.appendChild(row7data1);
 
             var row7dataCb1 = document.createElement('input');
             row7dataCb1.type = 'checkbox';
             row7dataCb1.id = 'row7dataCb1' + index; // need unique Ids!
             row7dataCb1.style.width = "20px";
             row7dataCb1.style.height = "20px";
             row7dataCb1.style.outline = "2px solid black";
             row7data1.appendChild(row7dataCb1);
 
             const row7data2 = document.createElement("TD");
             row7data2.setAttribute("class", "content");
             var row7data2Id = "row7data2"+"_"+index;
             row7data2.setAttribute("id", row7data2Id);
             row7data2.style.border = "1px solid black";
             row7data2.innerHTML = "14" +  '<br/>';  
             row7.appendChild(row7data2);
 
             var row7dataCb2 = document.createElement('input');
             row7dataCb2.type = 'checkbox';
             row7dataCb2.id = 'row7dataCb2' + index; // need unique Ids!
             row7dataCb2.style.width = "20px";
             row7dataCb2.style.height = "20px";
             row7dataCb2.style.outline = "2px solid black";
             row7data2.appendChild(row7dataCb2);
 
             const row7data3 = document.createElement("TD");
             row7data3.setAttribute("class", "content");
             var row7data3Id = "row7data3"+"_"+index;
             row7data3.setAttribute("id", row7data3Id);
             row7data3.style.border = "1px solid black";
             row7data3.innerHTML = "15" +  '<br/>';  
             row7.appendChild(row7data3);
 
             var row7dataCb3 = document.createElement('input');
             row7dataCb3.type = 'checkbox';
             row7dataCb3.id = 'row7dataCb3' + index; // need unique Ids!
             row7dataCb3.style.width = "20px";
             row7dataCb3.style.height = "20px";
             row7dataCb3.style.outline = "2px solid black";
             row7data3.appendChild(row7dataCb3);
 
             //Row 8 checkboxes
             const row8 = document.createElement("TR");
             row8.setAttribute("class", "content");
             var row8Id = "row8"+"_"+index;
             row8.setAttribute("id", row8Id);
             row8.style.border = "1px solid black";
             document.getElementById(fourInchCasterTblId).appendChild(row8);
 
             const row8data1 = document.createElement("TD");
             row8data1.setAttribute("class", "content");
             var row8data1Id = "row8data1"+"_"+index;
             row8data1.setAttribute("id", row8data1Id);
             row8data1.style.border = "1px solid black";
             row8data1.innerHTML = "13" +  '<br/>'; 
             row8.appendChild(row8data1);
 
             var row8dataCb1 = document.createElement('input');
             row8dataCb1.type = 'checkbox';
             row8dataCb1.id = 'row8dataCb1' + index; // need unique Ids!
             row8dataCb1.style.width = "20px";
             row8dataCb1.style.height = "20px";
             row8dataCb1.style.outline = "2px solid black";
             row8data1.appendChild(row8dataCb1);
 
             const row8data2 = document.createElement("TD");
             row8data2.setAttribute("class", "content");
             var row8data2Id = "row8data2"+"_"+index;
             row8data2.setAttribute("id", row8data2Id);
             row8data2.style.border = "1px solid black";
             row8data2.innerHTML = "14" +  '<br/>';  
             row8.appendChild(row8data2);
 
             var row8dataCb2 = document.createElement('input');
             row8dataCb2.type = 'checkbox';
             row8dataCb2.id = 'row8dataCb2' + index; // need unique Ids!
             row8dataCb2.style.width = "20px";
             row8dataCb2.style.height = "20px";
             row8dataCb2.style.outline = "2px solid black";
             row8data2.appendChild(row8dataCb2);
 
             const row8data3 = document.createElement("TD");
             row8data3.setAttribute("class", "content");
             var row8data3Id = "row8data3"+"_"+index;
             row8data3.setAttribute("id", row8data3Id);
             row8data3.style.border = "1px solid black";
             row8data3.innerHTML = "15" +  '<br/>';  
             row8.appendChild(row8data3);
 
             var row8dataCb3 = document.createElement('input');
             row8dataCb3.type = 'checkbox';
             row8dataCb3.id = 'row8dataCb3' + index; // need unique Ids!
             row8dataCb3.style.width = "20px";
             row8dataCb3.style.height = "20px";
             row8dataCb3.style.outline = "2px solid black";
             row8data3.appendChild(row8dataCb3);
             //Commenting from 4" caster table */
      // }


    //Function for expand Collapse feature
      // for (n = 0; n < coll.length; n++) {
      //   coll[n].addEventListener("click", function() {
      //     this.classList.toggle("active");
      //     var content = this.nextElementSibling;
      //     // alert("content.style.maxHeight" + content.style.maxHeight);

      //     if (content.style.maxHeight){
      //       content.style.maxHeight = null;
      //       // alert("content.style.maxHeight" + content.style.maxHeight);
      //     } else {
      //       content.style.maxHeight = content.scrollHeight + "px";
      //       // alert("content.scrollHeight" + content.scrollHeight);

      //     } 
      //   });
      // }
//   }

// xmlhttp.send(params);

}

// const createClickHandler = (row) => {
//     return () => {
//       const [cell] = row.getElementsByTagName("td");
//       const model = cell.innerHTML;
//       alert("Clicked Model is  " + model);

//     };
//   };
  
