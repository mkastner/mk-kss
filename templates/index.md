# About FMH Finanzberatung Styleguide
## This document contains information about about information should be presented on fmh.de

The coding convention mainly follows the BEM (Block Element Modifier) [convention](http://getbem.com/introduction/ "BEM documentation").

CSS coding for FMH-Finanzberatung deviates in naming blocks, elements and modifiers. It does not use dashes. Instead camel case is used in order to achieve improved readability.

<pre>.fmhExample__homepage</pre>

In addition all FMH blocks are namespaced by the __fmh__ prefix. e.g.

<pre>.fmhTitle</pre>

in order to prevent class name collisions and unintendes overwriting of classes.

Furthemore future development should strive to achieve a clean atomic class structure where as design should be created bottom up. This means that each element must be able to be used in isolation without dependencies on other classes.
