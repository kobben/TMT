/**
 * Thematic Map Tutor
 *
 * Licensed under GNU General Public License v3.0
 * see https://choosealicense.com/licenses/gpl-3.0/
 *
 * @author Barend Köbben - b.j.kobben@utwente.nl
 *
 * @version 0.0.2 [24 July 2018]
 *
 * changes/versions: see ChangeList in README.md
 */


var DEBUG; // temp globals for debugging

// global constants & vars:
var VERSION = "0.0.2";
var TMT;



/**
 * INITIALISATION FUNCTION
 */
function init() {

  // load settings json:
  loadJSON('./lib/TMT.json', function(response) {
    // Parse JSON string into object
    TMT = JSON.parse(response);

    initDataBoxes();
    initStepArrows();
    initPerceptionBoxes();
    initVisvarBoxes();

    console.log(TMT.gui.state);
  });

}

function initDataBoxes() {
  for (var boxes in TMT.gui.dataBoxes) {
    TMT.gui.dataBoxes[boxes].selected = false;
    TMT.gui.dataBoxes[boxes].selectable = false;
  }
  TMT.gui.dataBoxes.qualitative.selectable = true;
  TMT.gui.dataBoxes.quantitative.selectable = true;
  setDataBoxesSVG();
}
function initStepArrows() {
  for (var boxes in TMT.gui.stepArrows) {
    TMT.gui.stepArrows[boxes].selected = false;
  }
  setStepArrowsSVG();
}
function initPerceptionBoxes() {
  for (var boxes in TMT.gui.perceptionBoxes) {
    TMT.gui.perceptionBoxes[boxes].selected = false;
  }
  setPerceptionBoxesSVG();
}
function initVisvarBoxes() {
  for (var boxes in TMT.gui.visvarBoxes) {
    TMT.gui.visvarBoxes[boxes].selected = false;
    TMT.gui.visvarBoxes[boxes].selectable = false;
  }
  setVisvarBoxesSVG();
}

function setDataBoxesSVG() {
  for (var boxes in TMT.gui.dataBoxes) {
    if (TMT.gui.dataBoxes[boxes].selectable == false) {
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
function setStepArrowsSVG() {
  for (var boxes in TMT.gui.stepArrows) {
    if (TMT.gui.stepArrows[boxes].selected) {
      document.getElementById(TMT.gui.stepArrows[boxes].svgID).style.display = "inline";
    } else {
      document.getElementById(TMT.gui.stepArrows[boxes].svgID).style.display = "none";
    }
  }
}
function setPerceptionBoxesSVG() {
  for (var boxes in TMT.gui.perceptionBoxes) {
    if (TMT.gui.perceptionBoxes[boxes].selected) {
      document.getElementById(TMT.gui.perceptionBoxes[boxes].svgID).style.display = "inline";
    } else {
      document.getElementById(TMT.gui.perceptionBoxes[boxes].svgID).style.display = "none";
    }
  }
}
function setVisvarBoxesSVG() {
  for (var boxes in TMT.gui.visvarBoxes) {
    if (TMT.gui.visvarBoxes[boxes].selectable == false) {
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

function selectDataBox(theBox) {
  var boxSelected = theBox.id;
  console.log(boxSelected);
  switch(boxSelected) {
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
  switch(TMT.gui.state[0]) {
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
  switch(boxSelected) {
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

  TMT.gui.dataBoxes.qualitative.selected = (TMT.gui.state[0][0] == 'l');
  TMT.gui.dataBoxes.quantitative.selected = (TMT.gui.state[0][0] == 'n');
  TMT.gui.dataBoxes.qualitative_nominal.selected = (TMT.gui.state[0][2] == 'N');
  TMT.gui.dataBoxes.qualitative_nominal.selectable = (TMT.gui.state[0][0] == 'l');
  TMT.gui.dataBoxes.qualitative_ordinal.selected = (TMT.gui.state[0][2] == 'O');
  TMT.gui.dataBoxes.qualitative_ordinal.selectable = (TMT.gui.state[0][0] == 'l');
  TMT.gui.dataBoxes.quantitative_interval.selected = (TMT.gui.state[0][2] == 'I');
  TMT.gui.dataBoxes.quantitative_interval.selectable = (TMT.gui.state[0][0] == 'n');
  TMT.gui.dataBoxes.quantitative_ratio.selected = (TMT.gui.state[0][1] == 'r');
  TMT.gui.dataBoxes.quantitative_ratio.selectable = (TMT.gui.state[0][0] == 'n');
  TMT.gui.dataBoxes.quantitative_ratio_relative.selected = (TMT.gui.state[0][2] == 'R');
  TMT.gui.dataBoxes.quantitative_ratio_relative.selectable = (TMT.gui.state[0][1] == 'r');
  TMT.gui.dataBoxes.quantitative_ratio_absolute.selected = (TMT.gui.state[0][2] == 'A');
  TMT.gui.dataBoxes.quantitative_ratio_absolute.selectable = (TMT.gui.state[0][1] == 'r');
  setDataBoxesSVG();

  TMT.gui.perceptionBoxes.perception_associative.selected = (TMT.gui.state[1] == 'a');
  TMT.gui.perceptionBoxes.perception_ordered.selected = (TMT.gui.state[1] == 'o');
  TMT.gui.perceptionBoxes.perception_quantitative.selected = (TMT.gui.state[1] == 'q');
  setPerceptionBoxesSVG();

  TMT.gui.stepArrows.step_arrow_1.selected = (TMT.gui.state[1] != 'x');
  TMT.gui.stepArrows.step_arrow_2.selected = (TMT.gui.state[2] != 'X');
  setStepArrowsSVG();

  TMT.gui.visvarBoxes.associative_colour.selectable = (TMT.gui.state[1] == 'a');
  TMT.gui.visvarBoxes.associative_form.selectable = (TMT.gui.state[1] == 'a');
  TMT.gui.visvarBoxes.associative_texture.selectable = (TMT.gui.state[1] == 'a');
  TMT.gui.visvarBoxes.associative_orientation.selectable = (TMT.gui.state[1] == 'a');
  TMT.gui.visvarBoxes.ordered_value.selectable = (TMT.gui.state[1] == 'o');
  TMT.gui.visvarBoxes.ordered_size.selectable = (TMT.gui.state[1] == 'o');
  TMT.gui.visvarBoxes.ordered_texture.selectable = (TMT.gui.state[1] == 'o');
  TMT.gui.visvarBoxes.quantitative_size.selectable = (TMT.gui.state[1] == 'q');

  TMT.gui.visvarBoxes.associative_colour.selected = (TMT.gui.state[2] == 'C');
  TMT.gui.visvarBoxes.associative_form.selected = (TMT.gui.state[2] == 'F');
  TMT.gui.visvarBoxes.associative_texture.selected = (TMT.gui.state[2] == 'T');
  TMT.gui.visvarBoxes.associative_orientation.selected = (TMT.gui.state[2] == 'O');
  TMT.gui.visvarBoxes.ordered_value.selected = (TMT.gui.state[2] == 'V');
  TMT.gui.visvarBoxes.ordered_size.selected = (TMT.gui.state[2] == 'S');
  TMT.gui.visvarBoxes.ordered_texture.selected = (TMT.gui.state[2] == 'T');
  TMT.gui.visvarBoxes.quantitative_size.selected = (TMT.gui.state[2] == 'S');
  setVisvarBoxesSVG();

  if (TMT.gui.state[2] != 'X') {
    createMap(TMT.gui.state);
  }

}

function loadJSON(filename, callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', filename, true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState === 4 && xobj.status === 200) {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}
