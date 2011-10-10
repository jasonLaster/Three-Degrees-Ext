## Overview
3D Ext is a simple chrome extension for displaying personal hovercards on websites. The code is very much a work in progress. It currently 

From a high-level the program starts in the content-script with an onload event that tells the background page to ping ninja for names and passes the 'createhovercard' function as a callback.

The background page receives the message and pings ninja with the url, gets the names back from ninja, and calls createhovercard. 

Createhovercard loops through the names that ninja returns and for each name parses the dom (wraps links around each name) and starts a facebook search for relevant information. 

### FbSearchResults overview
The fbsearchresults pipeline is three steps. 
1. ping search.php 
2. parse the html response for uids and usernames
3. draw a hovercard and insert it on the page

These three steps occur for all of the people in parallel asynchronously. The first step tells the background page to ping search.php. The second step tells the background page to get worker.js parse the content in the background. The third step asks the background page build the popup template and return the html, which is then inserted into the page. 

![schematic](https://docs.google.com/drawings/pub?id=1y36r8vZIQGqYLYPgg_zfSv8LBgRC538l6uUfV9ILous&w=1225&h=1145)

