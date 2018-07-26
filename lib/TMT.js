/**
 * Thematic Map Tutor
 *
 * Licensed under GNU General Public License v3.0
 * see https://choosealicense.com/licenses/gpl-3.0/
 *
 * @author Barend Köbben - b.j.kobben@utwente.nl
 *
 * @version 0.1 [27 July 2018]
 *
 * changes/versions: see ChangeList in README.md
 */


var DEBUG; // temp globals for debugging

// global constants & vars:
var VERSION = "0.1";
var TMT;

/**
 * INITIALISATION FUNCTION
 */
function init() {

  // load settings json:
  loadJSON('./lib/TMT.json', function (response) {
    // Parse JSON string into object
    TMT = JSON.parse(response);

    var dataFile = TMT.datasettings.datafile;
    loadJSON(dataFile, function (response) {
      // Parse JSON string into object
      var dataJSON = JSON.parse(response);

      //init data chooser:
      var dataAttribs = dataJSON.features[0].properties;
      for (var attribName in dataAttribs) {
        var node = document.createElement("option");
        node.value = attribName;
        node.innerHTML = attribName;
        document.getElementById("attrChooser").appendChild(node);
      }

      // init grammar gui:
      initDataBoxes();
      initStepArrows();
      initPerceptionBoxes();
      initVisvarBoxes();

      console.log(TMT.gui.state);
    });
  });
}

function setMapAttr(attrib) {
  deleteMap();
  initDataBoxes();
  initStepArrows();
  initPerceptionBoxes();
  initVisvarBoxes();
  if (attrib === "undefined") {
    TMT.datasettings.datafield = "undefined";
    TMT.datasettings.datafield = "undefined";
    document.getElementById("titleChooser").value = "";
  } else {
    TMT.datasettings.datafield = attrib;
    TMT.datasettings.datatitle = attrib.replace(/_/g, " ");
    document.getElementById("titleChooser").value = TMT.datasettings.datatitle;
    TMT.gui.dataBoxes.qualitative.selectable = true;
    TMT.gui.dataBoxes.quantitative.selectable = true;
    setDataBoxesSVG();
  }
}

function setMapTitle(title) {
  TMT.datasettings.datatitle = title;
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
      ;
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
      ;
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
    deleteMap();
  } else {
    createMap(TMT.gui.state);
  }
}

function deleteMap() {
  var mapDivNode = document.getElementById("mapDiv");
  while (mapDivNode.firstChild) {
    mapDivNode.removeChild(mapDivNode.firstChild);
  }
}

var VL;

function createMap(guiState) {

  var templateCode = guiState[0][2] + guiState[1] + guiState[2];
  console.log('templatecode: ' + templateCode);
  var vlTemplate = './vl/' + templateCode + '.json';

  loadJSON(vlTemplate, function (response) {

    // Parse JSON string into object
    VL = JSON.parse(response);
    var templateItems;

    //for now fixed stuff to fill TEMPLATEs in VL json:
    var dataURL = TMT.datasettings.datafile;
    var dataProperty = "features";
    var attributeChosen = "properties." + TMT.datasettings.datafield;
    var legendTitle = TMT.datasettings.datatitle;

    switch (guiState[2]) {
      case 'C':  //visvar = colour
        templateItems = [
          {"field": "VL.data.url", "value": dataURL},
          {"field": "VL.data.format.property", "value": dataProperty},
          {"field": "VL.layer[0].encoding.color.legend.title", "value": legendTitle},
          {"field": "VL.layer[0].encoding.color.field", "value": attributeChosen}
        ];
        break;
      case 'V':  //visvar = value
        templateItems = [
          {"field": "VL.data.url", "value": dataURL},
          {"field": "VL.data.format.property", "value": dataProperty},
          {"field": "VL.layer[0].encoding.color.legend.title", "value": legendTitle},
          {"field": "VL.layer[0].encoding.color.field", "value": attributeChosen}
        ];
        break;
      case 'S':  //visvar = size
        templateItems = [
          {"field": "VL.data.url", "value": dataURL},
          {"field": "VL.data.format.property", "value": dataProperty},
          {"field": "VL.layer[1].encoding.size.legend.title", "value": legendTitle},
          {"field": "VL.layer[1].encoding.size.field", "value": attributeChosen}
        ];
        break;
      default:
        deleteMap();
        alert('ERROR: Visual variable [' + guiState[2] + '] not implemented (yet).');
    }

    if (fillTemplate(templateItems)) {
      vegaEmbed("#mapDiv", VL, {"actions": false, "renderer": "svg"}).then(function (result) {
        console.log('Map created');
      }).catch(console.error);
    } else {
      deleteMap();
      console.log('Error filling Template items.');
    }
  });
}

function fillTemplate(items) {
  for (var i = 0; i < items.length; i++) {
    var VLfield = items[i].field;
    var VLFA = VLfield.replace("[", ".");
    VLFA = VLFA.replace("]", "");
    VLFA = VLFA.split(".");
    var VLvalue = items[i].value;
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
          deleteMap();
          console.log("ERROR: illegal depth of template item [<2 or >8]");
          alert("ERROR: illegal depth of template item [<2 or >8]");
          return false;
      }
      console.log(VLfield + ' => ' + VLvalue);
    } else {
      deleteMap();
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
      deleteMap();
      alert('ERROR: Not implemented yet.\n[File ' + filename + ' not found]');
    }
  };
  xobj.send(null);
}
