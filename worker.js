importScripts('underscore.js');
onmessage = function (evt) {
	var data = evt.data.data;
	var ids = parseFbSearch(data)
	self.postMessage({'action': 'processFbIds', 'data': ids}); 
};

function parseFbSearch(data) {

	// CLEAN DATA
	var clean_data = /.+big_pipe.+pagelet_search_resul.+/.exec(data)[0]

	// GET URLS	
	var urls = clean_data.match(/https:\\\/\\\/www.facebook.com\\\/\S+ /g)

	// CLEAN URLS
	urls = _(urls).map(function(url){ return url.replace(/.+com\\\//,'').replace(/\\\"/,'').trim();});

	// GET UIDS	
	var uids = 
		_(urls).chain()
		.select(function(url){return url.match(/profile/) != null})
		.map(function(url){ return /\d+/.exec(url)[0]})
		.uniq()
		.value()
	
	// GET USER_NAMES
	var user_names = _(urls).reject(function(url){return url.match(/(php|\/)/)})
	var user_names = _.uniq(user_names)

	// LIST
	var list = []
	list.push(uids)
	list.push(user_names)
	list = _.flatten(list)
	list = _.sortBy(list, function(i){ return clean_data.search(i);})
	return list
}

