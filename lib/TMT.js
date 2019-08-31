/**
 * Thematic Map Tutor
 *
 * Licensed under GNU General Public License GPL v3.0
 * see https://choosealicense.com/licenses/gpl-3.0/
 * SPDX-License-Identifier: GPL-3.0-only
 *
 * ©2019 by the author
 * @author Barend Köbben - b.j.kobben@utwente.nl
 *
 * @version 0.6 [30 August 2019]
 *
 * changes/versions: see ChangeList in README.md
 */


var DEBUG; // temp globals for debugging

// global constants & vars:
const VERSION = "0.6";
var TMT, dataJSON;

/**
 * INITIALISATION FUNCTION
 */
function init() {

  var fromOER = getParameterByName('from_oer');
  if (!fromOER) {
    OERmessage = document.getElementById("doOER");
    OERmessage.style.display = "block";
  }
  // load settings json:
  loadJSON('./lib/TMT.json', function (response) {
    console.log("settings json loaded...");
    // Parse JSON string into object
    TMT = JSON.parse(response);
    if (TMT.gui.mapMade) deleteMap();
    initGuiState();
    initDataBoxes();
    initStepArrows();
    initPerceptionBoxes();
    initVisvarBoxes();
    });

}

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function initGuiState() {
  TMT.gui.state[0] = 'xxX'; //reset data
  TMT.gui.state[1] = 'x'; //reset perception
  TMT.gui.state[2] = 'X'; //reset visvars
}

function initDataBoxes() {
  for (var boxes in TMT.gui.dataBoxes) {
    if (TMT.gui.dataBoxes.hasOwnProperty(boxes)) { // to avoid _proto objects etc
      TMT.gui.dataBoxes[boxes].selected = false;
      TMT.gui.dataBoxes[boxes].selectable = false;
    }
  }
  setDataBoxesSVG();
}

function initStepArrows() {
  for (var boxes in TMT.gui.stepArrows) {
    if (TMT.gui.stepArrows.hasOwnProperty(boxes)) { // to avoid _proto objects etc
      TMT.gui.stepArrows[boxes].selected = false;
    }
  }
  setStepArrowsSVG();
}

function initPerceptionBoxes() {
  for (var boxes in TMT.gui.perceptionBoxes) {
    if (TMT.gui.perceptionBoxes.hasOwnProperty(boxes)) { // to avoid _proto objects etc
      TMT.gui.perceptionBoxes[boxes].selected = false;
    }
  }
  setPerceptionBoxesSVG();
}

function initVisvarBoxes() {
  for (var boxes in TMT.gui.visvarBoxes) {
    if (TMT.gui.visvarBoxes.hasOwnProperty(boxes)) { // to avoid _proto objects etc
      TMT.gui.visvarBoxes[boxes].selected = false;
      TMT.gui.visvarBoxes[boxes].selectable = false;
    }
  }
  setVisvarBoxesSVG();
}

function setDataBoxesSVG() {
  for (var boxes in TMT.gui.dataBoxes) {
    if (TMT.gui.dataBoxes.hasOwnProperty(boxes)) { // to avoid _proto objects etc
      if (TMT.gui.dataBoxes[boxes].selectable === false) {
        document.getElementById(TMT.gui.dataBoxes[boxes].svgID).style.display = "none";
      } else {
        document.getElementById(TMT.gui.dataBoxes[boxes].svgID).style.display = "inline";
      }
      if (TMT.gui.dataBoxes[boxes].selected) {
        document.getElementById(TMT.gui.dataBoxes[boxes].svgID).style.opacity = 1;
      } else {
        document.getElementById(TMT.gui.dataBoxes[boxes].svgID).style.opacity = 0.2;
      }
    }
  }
}

function setStepArrowsSVG() {
  for (var boxes in TMT.gui.stepArrows) {
    if (TMT.gui.stepArrows.hasOwnProperty(boxes)) { // to avoid _proto objects etc
      if (TMT.gui.stepArrows[boxes].selected) {
        document.getElementById(TMT.gui.stepArrows[boxes].svgID).style.display = "inline";
      } else {
        document.getElementById(TMT.gui.stepArrows[boxes].svgID).style.display = "none";
      }
    }
  }
}

function setPerceptionBoxesSVG() {
  for (var boxes in TMT.gui.perceptionBoxes) {
    if (TMT.gui.perceptionBoxes.hasOwnProperty(boxes)) { // to avoid _proto objects etc
      if (TMT.gui.perceptionBoxes[boxes].selected) {
        document.getElementById(TMT.gui.perceptionBoxes[boxes].svgID).style.display = "inline";
      } else {
        document.getElementById(TMT.gui.perceptionBoxes[boxes].svgID).style.display = "none";
      }
    }
  }
}

function setVisvarBoxesSVG() {
  for (var boxes in TMT.gui.visvarBoxes) {
    if (TMT.gui.visvarBoxes.hasOwnProperty(boxes)) { // to avoid _proto objects etc
      if (TMT.gui.visvarBoxes[boxes].selectable === false) {
        document.getElementById(TMT.gui.visvarBoxes[boxes].svgID).style.display = "none";
      } else {
        document.getElementById(TMT.gui.visvarBoxes[boxes].svgID).style.display = "inline";
      }
      if (TMT.gui.visvarBoxes[boxes].selected) {
        document.getElementById(TMT.gui.visvarBoxes[boxes].svgID).style.opacity = 1;
      } else {
        document.getElementById(TMT.gui.visvarBoxes[boxes].svgID).style.opacity = 0.2;
      }
    }
  }
}

function deleteAllChildNodes(theNode) {
  while (theNode.firstChild) {
    theNode.removeChild(theNode.firstChild);
  }
}

function initAttribChooser() {
 var attribChooserSelect = document.getElementById("attrChooser");
  deleteAllChildNodes(attribChooserSelect);
  var node = document.createElement("option");
  node.value = "undefined";
  node.innerHTML = "choose from list...";
  attribChooserSelect.appendChild(node);
}

function selectMapData(attrib) {
  if (TMT.gui.mapMade) deleteMap();
  initAttribChooser();
  initGuiState();
  initDataBoxes();
  initStepArrows();
  initPerceptionBoxes();
  initVisvarBoxes();

  TMT.datasettings.datatype = attrib;
  switch (TMT.datasettings.datatype) {
    case "undefined":
      break;
    case 'area':
      TMT.datasettings.datafile = TMT.datasettings.area_type_url;
      TMT.datasettings.maptitle = TMT.datasettings.area_type_title;
      break;
    case 'line':
      TMT.datasettings.datafile  = TMT.datasettings.line_type_url;
      TMT.datasettings.maptitle = TMT.datasettings.line_type_title;
      break;
    case 'point':
      TMT.datasettings.datafile  = TMT.datasettings.point_type_url;
      TMT.datasettings.maptitle = TMT.datasettings._type_title;
      break;
  }
  if (TMT.datasettings.datatype === "undefined") {
    document.getElementById("mapTitle").innerHTML = "Thematic Map Tutor";
    document.getElementById("mapTitle").className = "normal";
  } else {
    document.getElementById("mapTitle").innerHTML = TMT.datasettings.maptitle;
    document.getElementById("mapTitle").className = "title";
  }
  TMT.datasettings.datafield = "undefined";
  TMT.datasettings.legendtitle = "undefined";
  document.getElementById("titleChooser").value = "";


  console.log("datafile: " + TMT.datasettings.datafile);

  loadJSON(TMT.datasettings.datafile, function (response) {
    // Parse JSON string into object
    dataJSON = JSON.parse(response);
    //init attribute chooser:
    var dataAttribs = dataJSON.features[0].properties;
    for (var attribName in dataAttribs) {
      addOptionToSelect("attrChooser", attribName);
    }
  });
}

function selectMapAttr(attrib) {
  if (TMT.gui.mapMade) deleteMap();
  initGuiState();
  initDataBoxes();
  initStepArrows();
  initPerceptionBoxes();
  initVisvarBoxes();
  if (attrib === "undefined") {
    TMT.datasettings.datafield = "undefined";
    TMT.datasettings.legendtitle = "undefined";
    document.getElementById("titleChooser").value = "";
  } else {
    TMT.datasettings.datafield = attrib;
    fillDataViewer(attrib);
    TMT.datasettings.legendtitle = attrib.replace(/_/g, " "); // change underscores to spaces
    document.getElementById("titleChooser").value = TMT.datasettings.legendtitle;
    TMT.gui.stepArrows.step_arrow_0.selected = true;
    setStepArrowsSVG();
    TMT.gui.dataBoxes.qualitative.selectable = true;
    TMT.gui.dataBoxes.quantitative.selectable = true;
    setDataBoxesSVG();
  }
}

function selectLegendTitle(title) {
  TMT.datasettings.legendtitle = title;
  console.log(TMT.gui.state[2]);
  if (TMT.datasettings.datafield !== "undefined" && TMT.gui.state[2] !== 'X') {
    if (TMT.gui.mapMade) deleteMap();
    createMap(TMT.gui.state);
  }
}

function fillDataViewer(attrib) {
  //first empty out any existing nodes:
  document.getElementById("dataViewer").innerHTML='';
  addOptionToSelect("dataViewer", 'values:');
  var valueList = [];
  // then get values and sort them
  for (var i=0; i < dataJSON.features.length; i++) {
    var dataOccurence = dataJSON.features[i].properties[attrib];
    valueList.push(dataOccurence);
  }
  if (typeof valueList[1] === 'string' || valueList[1] instanceof String) { //check if values are strings, then
    valueList.sort();//sort normal (by alphabet)
  } else {
    valueList.sort((a, b) => a - b); // sort numerically
  }
  // then put in select list
  for (var i=0; i < dataJSON.features.length; i++) {
    addOptionToSelect("dataViewer", valueList[i]);
  }
  //then make dropdown visible:
  document.getElementById("dataViewer").style.display = "inline";
}

function selectDataViewer() {
  // reset the dropdown:
  document.getElementById("dataViewer").selectedIndex = 0;
}

function addOptionToSelect(selectID, value) {
  var node = document.createElement("option");
  node.value = value;
  node.innerHTML = value;
  document.getElementById(selectID).appendChild(node);
}

function selectDataBox(theBox) {
  var boxSelected = theBox.id;
  console.log(boxSelected);
  switch (boxSelected) {
    case 'qualitative':
      TMT.gui.state[0] = 'lxX';
      break;
    case 'quantitative':
      TMT.gui.state[0] = 'nxX';
      break;
    case 'qualitative_nominal':
      TMT.gui.state[0] = 'lnN';
      break;
    case 'qualitative_ordinal':
      TMT.gui.state[0] = 'loO';
      break;
    case 'quantitative_interval':
      TMT.gui.state[0] = 'niI';
      break;
    case 'quantitative_ratio':
      TMT.gui.state[0] = 'nrX';
      break;
    case 'quantitative_ratio_relative':
      TMT.gui.state[0] = 'nrR';
      break;
    case 'quantitative_ratio_absolute':
      TMT.gui.state[0] = 'nrA';
      break;
    default:
  }
  switch (TMT.gui.state[0]) {
    case 'lnN':
      TMT.gui.state[1] = 'a';
      break;
    case 'loO':
      TMT.gui.state[1] = 'o';
      break;
    case 'niI':
      TMT.gui.state[1] = 'o';
      break;
    case 'nrR':
      TMT.gui.state[1] = 'o';
      break;
    case 'nrA':
      TMT.gui.state[1] = 'q';
      break;
    default:
      TMT.gui.state[1] = 'x';
  }
  TMT.gui.state[2] = 'X'; // to reset visvar choice
  console.log(TMT.gui.state);
  updateGUI();
}

function selectPerceptionBox(theBox) {
  var boxSelected = theBox.id;
  console.log(boxSelected);
  TMT.gui.state[2] = 'X'; // just to reset visvar choice
  console.log(TMT.gui.state);
  updateGUI();
}

function selectVisvarBox(theBox) {
  var boxSelected = theBox.id;
  console.log(boxSelected);
  switch (boxSelected) {
    case 'associative_colour':
      TMT.gui.state[2] = 'C';
      break;
    case 'associative_form':
      TMT.gui.state[2] = 'F';
      break;
    case 'associative_texture':
      TMT.gui.state[2] = 'T';
      break;
    case 'associative_orientation':
      TMT.gui.state[2] = 'O';
      break;
    case 'ordered_value':
      TMT.gui.state[2] = 'V';
      break;
    case 'ordered_size':
      TMT.gui.state[2] = 'S';
      break;
    case 'ordered_texture':
      TMT.gui.state[2] = 'T';
      break;
    case 'quantitative_size':
      TMT.gui.state[2] = 'S';
      break;
    default:
  }
  console.log(TMT.gui.state);
  updateGUI();

}

function updateGUI() {
  //dataBoxes:
  TMT.gui.dataBoxes.qualitative.selected = (TMT.gui.state[0][0] === 'l');
  TMT.gui.dataBoxes.quantitative.selected = (TMT.gui.state[0][0] === 'n');
  TMT.gui.dataBoxes.qualitative_nominal.selected = (TMT.gui.state[0][2] === 'N');
  TMT.gui.dataBoxes.qualitative_nominal.selectable = (TMT.gui.state[0][0] === 'l');
  TMT.gui.dataBoxes.qualitative_ordinal.selected = (TMT.gui.state[0][2] === 'O');
  TMT.gui.dataBoxes.qualitative_ordinal.selectable = (TMT.gui.state[0][0] === 'l');
  TMT.gui.dataBoxes.quantitative_interval.selected = (TMT.gui.state[0][2] === 'I');
  TMT.gui.dataBoxes.quantitative_interval.selectable = (TMT.gui.state[0][0] === 'n');
  TMT.gui.dataBoxes.quantitative_ratio.selected = (TMT.gui.state[0][1] === 'r');
  TMT.gui.dataBoxes.quantitative_ratio.selectable = (TMT.gui.state[0][0] === 'n');
  TMT.gui.dataBoxes.quantitative_ratio_relative.selected = (TMT.gui.state[0][2] === 'R');
  TMT.gui.dataBoxes.quantitative_ratio_relative.selectable = (TMT.gui.state[0][1] === 'r');
  TMT.gui.dataBoxes.quantitative_ratio_absolute.selected = (TMT.gui.state[0][2] === 'A');
  TMT.gui.dataBoxes.quantitative_ratio_absolute.selectable = (TMT.gui.state[0][1] === 'r');
  setDataBoxesSVG();
  //perceptionBoxes:
  TMT.gui.perceptionBoxes.perception_associative.selected = (TMT.gui.state[1] === 'a');
  TMT.gui.perceptionBoxes.perception_ordered.selected = (TMT.gui.state[1] === 'o');
  TMT.gui.perceptionBoxes.perception_quantitative.selected = (TMT.gui.state[1] === 'q');
  setPerceptionBoxesSVG();
  //stepArrows:
  TMT.gui.stepArrows.step_arrow_1.selected = (TMT.gui.state[1] !== 'x');
  TMT.gui.stepArrows.step_arrow_2.selected = (TMT.gui.state[2] !== 'X');
  setStepArrowsSVG();
  //visvarBoxes:
  TMT.gui.visvarBoxes.associative_colour.selectable = (TMT.gui.state[1] === 'a');
  TMT.gui.visvarBoxes.associative_form.selectable = (TMT.gui.state[1] === 'a');
  TMT.gui.visvarBoxes.associative_texture.selectable = (TMT.gui.state[1] === 'a');
  TMT.gui.visvarBoxes.associative_orientation.selectable = (TMT.gui.state[1] === 'a');
  TMT.gui.visvarBoxes.ordered_value.selectable = (TMT.gui.state[1] === 'o');
  TMT.gui.visvarBoxes.ordered_size.selectable = (TMT.gui.state[1] === 'o');
  TMT.gui.visvarBoxes.ordered_texture.selectable = (TMT.gui.state[1] === 'o');
  TMT.gui.visvarBoxes.quantitative_size.selectable = (TMT.gui.state[1] === 'q');
  TMT.gui.visvarBoxes.associative_colour.selected = (TMT.gui.state[2] === 'C');
  TMT.gui.visvarBoxes.associative_form.selected = (TMT.gui.state[2] === 'F');
  TMT.gui.visvarBoxes.associative_texture.selected = (TMT.gui.state[2] === 'T');
  TMT.gui.visvarBoxes.associative_orientation.selected = (TMT.gui.state[2] === 'O');
  TMT.gui.visvarBoxes.ordered_value.selected = (TMT.gui.state[2] === 'V');
  TMT.gui.visvarBoxes.ordered_size.selected = (TMT.gui.state[2] === 'S');
  TMT.gui.visvarBoxes.ordered_texture.selected = (TMT.gui.state[2] === 'T');
  TMT.gui.visvarBoxes.quantitative_size.selected = (TMT.gui.state[2] === 'S');
  setVisvarBoxesSVG();

  if (TMT.gui.state[2] === 'X') {
    if (TMT.gui.mapMade) deleteMap();
  } else {
    createMap(TMT.gui.state);
  }
}

function deleteMap() {
  var mapDivNode = document.getElementById("mapDiv");
  while (mapDivNode.firstChild) {
    mapDivNode.removeChild(mapDivNode.firstChild);
  }
  TMT.gui.mapMade = false;
  console.log('Map deleted...');
}

var VL;

function createMap(guiState) {
  if (TMT.gui.mapMade) deleteMap();
  if (TMT.gui.state[2] !== 'X') {

    var templateCode;
    if (TMT.datasettings.datatype === "area") {
      templateCode = "a" + guiState[0][2] + guiState[1] + guiState[2];
    } else if (TMT.datasettings.datatype === "line") {
      templateCode = "l" + guiState[0][2] + guiState[1] + guiState[2];
    } else if (TMT.datasettings.datatype === "point") {
      templateCode = "p" + guiState[0][2] + guiState[1] + guiState[2];
    }

    console.log('templatecode: ' + templateCode);
    var vlTemplate = './vl/' + templateCode + '.json';

    loadJSON(vlTemplate, function (response) {

      // Parse JSON string into object
      VL = JSON.parse(response);
      //console.log(VL);
      var templateItems;

      //for now fixed stuff to fill TEMPLATEs in VL json:
      var dataURL = TMT.datasettings.datafile;
      var dataProperty = "features";
      var attributeChosen = "properties." + TMT.datasettings.datafield;
      var legendTitle = TMT.datasettings.legendtitle;

      switch (guiState[2]) {
        case 'C':  //visvar = colour
          if (templateCode[0] === "a") { //areas
            templateItems = [
              {"field": "VL.data.url", "value": dataURL},
              {"field": "VL.data.format.property", "value": dataProperty},
              {"field": "VL.layer[0].encoding.color.legend.title", "value": legendTitle},
              {"field": "VL.layer[0].encoding.color.field", "value": attributeChosen}
            ];
          } else if (templateCode[0] === "l") { //lines
            templateItems = [
              {"field": "VL.data.url", "value": dataURL},
              {"field": "VL.data.format.property", "value": dataProperty},
              {"field": "VL.layer[0].encoding.stroke.legend.title", "value": legendTitle},
              {"field": "VL.layer[0].encoding.stroke.field", "value": attributeChosen}
            ];
          } else if (templateCode[0] === "p") { //points
            alert('ERROR: visual variabel COLOUR for spatial type POINTS not implemented (yet).');
          } else {
            alert('ERROR: unknown spatial type in templateCode [' + templateCode[0] + '].');
          }
          break;
        case 'V':  //visvar = value
          if (templateCode[0] === "a") { //areas
            templateItems = [
              {"field": "VL.data.url", "value": dataURL},
              {"field": "VL.data.format.property", "value": dataProperty},
              {"field": "VL.layer[0].encoding.color.legend.title", "value": legendTitle},
              {"field": "VL.layer[0].encoding.color.field", "value": attributeChosen}
            ];
          } else if (templateCode[0] === "l") { //lines
            templateItems = [
              {"field": "VL.data.url", "value": dataURL},
              {"field": "VL.data.format.property", "value": dataProperty},
              {"field": "VL.layer[0].encoding.stroke.legend.title", "value": legendTitle},
              {"field": "VL.layer[0].encoding.stroke.field", "value": attributeChosen}
            ];
          } else if (templateCode[0] === "p") { //points
            alert('ERROR: visual variabel VALUE for spatial type POINTS not implemented (yet).');
          } else {
            alert('ERROR: unknown spatial type in templateCode [' + templateCode[0] + '].');
          }
          break;
        case 'S':  //visvar = size
          if (templateCode[0] === "a") { //areas
            templateItems = [
              {"field": "VL.data.url", "value": dataURL},
              {"field": "VL.data.format.property", "value": dataProperty},
              {"field": "VL.layer[1].encoding.size.legend.title", "value": legendTitle},
              {"field": "VL.layer[1].encoding.size.field", "value": attributeChosen}
            ];
          } else if (templateCode[0] === "l") { //lines
            templateItems = [
              {"field": "VL.data.url", "value": dataURL},
              {"field": "VL.data.format.property", "value": dataProperty},
              {"field": "VL.layer[0].encoding.strokeWidth.legend.title", "value": legendTitle},
              {"field": "VL.layer[0].encoding.strokeWidth.field", "value": attributeChosen}
            ];
          } else if (templateCode[0] === "p") { //points
            alert('ERROR: visual variabel SIZE for spatial type POINTS not implemented (yet).');
          } else {
            alert('ERROR: unknown spatial type in templateCode [' + templateCode[0] + '].');
          }
          break;
        case 'T':  //visvar = texture
          if (templateCode[0] === "a") { //areas
            templateItems = [
              {"field": "VL.data.url", "value": dataURL},
              {"field": "VL.data.format.property", "value": dataProperty},
              {"field": "VL.layer[0].encoding.color.legend.title", "value": legendTitle},
              {"field": "VL.layer[0].encoding.color.field", "value": attributeChosen}
            ];
          } else if (templateCode[0] === "l") { //lines
            alert('ERROR: visual variabel TEXTURE for spatial type LINES not implemented (yet).');
          } else if (templateCode[0] === "p") { //points
            alert('ERROR: visual variabel TEXTURE for spatial type POINTS not implemented (yet).');
          } else {
            alert('ERROR: unknown spatial type in templateCode [' + templateCode[0] + '].');
          }
          break;
        case 'F':  //visvar = Form
          if (templateCode[0] === "a") { //areas
            templateItems = [
              {"field": "VL.data.url", "value": dataURL},
              {"field": "VL.data.format.property", "value": dataProperty},
              {"field": "VL.layer[1].encoding.shape.legend.title", "value": legendTitle},
              {"field": "VL.layer[1].encoding.shape.field", "value": attributeChosen}
            ];
          } else if (templateCode[0] === "l") { //lines
            templateItems = [
              {"field": "VL.data.url", "value": dataURL},
              {"field": "VL.data.format.property", "value": dataProperty},
              {"field": "VL.layer[0].encoding.shape.legend.title", "value": legendTitle},
              {"field": "VL.layer[0].encoding.shape.field", "value": attributeChosen}
            ];
          } else if (templateCode[0] === "p") { //points
            alert('ERROR: spatial type POINTS not implemented (yet).');
          } else {
            alert('ERROR: unknown spatial type in templateCode [' + templateCode[0] + '].');
          }
          break;
        case 'O':  //visvar = Orientation
          if (templateCode[0] === "a") { //areas
            templateItems = [
              {"field": "VL.data.url", "value": dataURL},
              {"field": "VL.data.format.property", "value": dataProperty},
              {"field": "VL.layer[0].encoding.color.legend.title", "value": legendTitle},
              {"field": "VL.layer[0].encoding.color.field", "value": attributeChosen}
            ];
          } else if (templateCode[0] === "l") { //lines
            alert('ERROR:  visual variabel ORIENTATION for spatial type LINES not implemented (yet).');
          } else if (templateCode[0] === "p") { //points
            alert('ERROR: visual variabel ORIENTATION for spatial type POINTS not implemented (yet).');
          } else {
            alert('ERROR: unknown spatial type in templateCode [' + templateCode[0] + '].');
          }
          break;
        default:
          if (TMT.gui.mapMade) deleteMap();
          alert('ERROR: Visual variable [' + guiState[2] + '] not implemented (yet).');
      }

      if (fillTemplate(templateItems)) {
        vegaEmbed("#mapDiv", VL, {"actions": false, "renderer": "svg"}).then(function (result) {
          TMT.gui.mapMade = true;
          console.log('Map created...');
        }).catch(console.error);
      } else {
        if (TMT.gui.mapMade) deleteMap();
        console.log('Error filling Template items.');
      }
    });
  }
}

function fillTemplate(items) {
  for (var i = 0; i < items.length; i++) {
    var VLfield = items[i].field;
    //console.log(VLfield);
    var VLFA = VLfield.replace("[", ".");
    //console.log('VLFA = ' + VLFA );
    VLFA = VLFA.replace("]", "");
    VLFA = VLFA.split(".");
    //console.log('VLFA = ' + VLFA + '(length: ' + VLFA.length + ')');
    var VLvalue = items[i].value;
    //console.log('eval(VLfield) : ' + eval(VLfield));
    if (eval(VLfield) === 'TEMPLATE') {
      switch (VLFA.length) {
        case 2:
          VL[VLFA[1]] = VLvalue;
          break;
        case 3:
          VL[VLFA[1]][VLFA[2]] = VLvalue;
          break;
        case 4:
          VL[VLFA[1]][VLFA[2]][VLFA[3]] = VLvalue;
          break;
        case 5:
          VL[VLFA[1]][VLFA[2]][VLFA[3]][VLFA[4]] = VLvalue;
          break;
        case 6:
          VL[VLFA[1]][VLFA[2]][VLFA[3]][VLFA[4]][VLFA[5]] = VLvalue;
          break;
        case 7:
          VL[VLFA[1]][VLFA[2]][VLFA[3]][VLFA[4]][VLFA[5]][VLFA[6]] = VLvalue;
          break;
        case 8:
          VL[VLFA[1]][VLFA[2]][VLFA[3]][VLFA[4]][VLFA[5]][VLFA[6]][VLFA[7]] = VLvalue;
          break;
        default:
          if (TMT.gui.mapMade) deleteMap();
          console.log("ERROR: illegal depth of template item [<2 or >8]");
          alert("ERROR: illegal depth of template item [<2 or >8]");
          return false;
      }
      console.log(VLfield + ' => ' + VLvalue);
    } else {
      if (TMT.gui.mapMade) deleteMap();
      console.log('ERROR: Can not override non-template item [' + VLfield + ']');
      alert('ERROR: Can not override non-template item [' + VLfield + ']');
      return false;
    }
  }
  return true;
}

function loadJSON(filename, callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', filename, true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState === 4 && xobj.status === 200) {
      callback(xobj.responseText);
    } else if (xobj.readyState === 4 && xobj.status === 404) {
      if (TMT.gui.mapMade) deleteMap();
      alert('ERROR in loadJSON module.\nFile "' + filename + '" not found');
    }
  };
  xobj.send(null);
}
