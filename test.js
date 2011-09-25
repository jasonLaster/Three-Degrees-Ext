$(document).ready(function(){
	get_names_on_page()
});


// STEP 1: GET THE NAMES ON THE PAGE 
// CALL NINJA AND GET THE NAMES ON THE PAGE
function get_names_on_page() {
	if (chrome.extension != undefined) {
		chrome.extension.sendRequest({'action' : 'fetchNames'}, get_fb_search_results);
	} else {
		callback("John Biggs\nSarah Lacy\nMichael Arrington")
	}
}


function get_fb_search_results(names) {
	console.log(names)
}
