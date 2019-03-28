## Thematic Map Tutor


©2018 Barend Köbben - <a href="mailto:b.j.kobben@utwente.nl">b.j.kobben@utwente.nl</a> 

Thematic Map Tutor is an HTML5 webapplication using  Vega-Lite for cartography. It offers a web-app to learn how to create correct thematic maps using the Cartographic Grammar as taught in various courses in ITC.
Check out stable test version on <https://kartoweb.itc.nl/TMT/>
(not necessarily the latest version, that is always on [GitHub](https://github.com/kobben/TMT))...

Thematic Map Tutor is licensed under GNU General Public License v3.0 (see https://choosealicense.com/licenses/gpl-3.0/)

SPDX-License-Identifier: GPL-3.0-only

Included external libraries:

* Vega-Lite, Vega & Vega-embed: ©2015, University of Washington Interactive Data Lab (full license see https://vega.github.io/vega-lite)
* PatternFills: ©2014 Irene Ros (MIT License, see http://iros.github.io/patternfills/)


#### Changelist:

##### version 0.5 [28 March 2019]
* added an OER (Online Educational Resource) explaining the principles of the Cartographic Grammar.
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