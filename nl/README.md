## Thematic Map Tutor


©2023Barend Köbben - <a href="mailto:b.j.kobben@utwente.nl">b.j.kobben@utwente.nl</a> 

Thematic Map Tutor is an HTML5 webapplication using  Vega-Lite for cartography. It offers a web-app to learn how to create correct thematic maps using the Cartographic Grammar as taught in various courses in ITC.
Stable version is on <https://kartoweb.itc.nl/TMT/>, latest development version on [GitHub](https://github.com/kobben/TMT))...

Thematic Map Tutor is licensed under GNU General Public License v3.0 (see https://choosealicense.com/licenses/gpl-3.0/)

SPDX-License-Identifier: GPL-3.0-only

Included external libraries:

* Vega-Lite, Vega & Vega-embed: ©2019, University of Washington Interactive Data Lab (full license see https://vega.github.io/vega-lite)
* PatternFills: ©2014 Irene Ros (MIT License, see http://iros.github.io/patternfills/)


#### Changelist:
##### version 1.1 [1 June 2023]
* TMT versie in Nederlandse taal (functionality unchanged)
##### version 1.0 [5 December 2019]
* added LINE visvars: texture, form, rotation -- uses polygons of BUFFERed lines (expects a file named %DATA_URL%_buffer).
* added POINT visvars: colour, form, texture, ~~orientation~~, value and size
  - for orientation used a workaround from #jwoLondon, in expectation of angle encoding slated for VL 4.1.
* refactored templating system to use semantic naming: `%TEMPLATE_ITEM%` instead of simple 'TEMPLATE' search & replace - total rewrite of `fillTemplate(items)` and `createMap(guiState)`
* renamed function `getParameterByName(name)` to more appropriate `getURLParameterByName(name)`  
* some small changes in CSS styling (eg. data browser)
##### version 0.7 [10 September 2019]
* cleaning up versioning and updated OER for 2019 courses
##### version 0.6 [30 August 2019]
* added choice between AREA and LINE data
* implemented quantitative strokeWidth encoding
  => in LINE implemented visvars color, value, size - still missing texture, form, rotation
##### version 0.5 [1 August 2019]
* added an OER (Online Educational Resource) explaining the principles of the Cartographic Grammar. Uses `getURLParameterByName('from_oer')` to test if we need to ask for OER.
##### version 0.4 [25 Oktober 2018]
* added `fillDataViewer(attrib)` to preview values for selected attribs
* using point-in-area symbols for 'form' visvar 
* added hatched fills for orientation visvar
* moved legend to right side
##### version 0.3 [1 September 2018]
* added data/attribute/title chooser to gui and logic 
* implemented vega-lite json templating
* made compatible for Chrome/FireFox/Safari/Edge
* added SVG patterns to use in textured fills
##### version 0.2 [25 July 2018]
* changed to using `gui.state` codestrings
* added `hasOwnProperty()` check in `for boxes in` iterations
##### version 0.1 [24 July 2018]
* initial test version