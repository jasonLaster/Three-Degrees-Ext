$(document).ready(function(){	
	console.log('3Degrees');
	getFbNames();
})

// DRIVER
function createHoverCards(data) {
  console.log(data);
  var names = data.split("\n")

	for(var i=0; i < names.length; i++) {
		try {
			parse_dom(names[i]);	
		} catch (err) {
			console.log("PARSE DOM ERROR: ", err);
		}
	}
	
	popupTemplate();
	basic_events();
};

function testfnc(){
	console.log('hello world')
}

function getFbNames(){
	async.waterfall([
	    function(callback){
				console.log(callback)		
				if (chrome.extension != undefined) {
					chrome.extension.sendRequest({'action' : 'fetchNames'}, callback);
				} else {
					callback(null, "John Biggs\nSarah Lacy\nMichael Arrington")
				}
	    }
	],
	function(err, names){
      console.log("NAMES", names)
  });
}

// FB NAME SEARCH
function getFbSearchResults(name) {
	if (chrome.extension != undefined) {
		return chrome.extension.sendRequest({'action': 'fbSearch', 'name' : name}, parseFbSearch);
	} else {
		return parseFbSearch(window.data);
	}
}

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
	list = _.sortBy(list, function(i){ return clean_data.search(i); })
	return list;
}



// HOVERCARD DRIVER
function popupTemplate() {
	var names = $('.ThreeDegrees.name');
	async.forEach(names, drawHoverCard, function(err){
		console.log('DONE')
		console.log(err)
	});
}


// BUILD HOVERCARD
function drawHoverCard(name, callback) {

	async.waterfall([
			
			// find element on page get fb search results
      function(callback){
					var person = $(name);
					var fb_search_results = getFbSearchResults(person);
          callback(null, person, fb_search_results);
      },

			// go to fb and get the data for the hovercard
      function(person, fb_search_results, callback){
				var fb_data = {};
				fb_data['fb_id'] = fb_search_results[0];
				if (chrome.extension != undefined) {
					$.ajax({
					  dataType: 'jsonp',
					  url: 'https://graph.facebook.com/' + fb_data['fb_id'],
					  success: function (data) {
							fb_data['fb_profile'] = data
							callback(null, fb_data, person, fb_search_results);
					  },
					});					
				}
      }
		],
		
	// assemble the hovercard
  function(error, fb_data, person, fb_search_results) {
		console.log(fb_data, person, fb_search_results)
		data = {}
		data['fb_id'] = fb_data['fb_id']
		data['fb_first_name'] = fb_data['fb_profile']['first_name']
		data['fb_last_name'] = fb_data['fb_profile']['last_name']
		
		$('#popupTemplate').tmpl(data).appendTo(person)
  });

	callback(null);
	
}



// DOM
var parse_dom = function(name){

	// Find elements with name
	var regexp = new RegExp(name,'g');
	var elements = $("*:contains('" + name +"')")
	elements = elements.filter(function(){
		return $(this).children("*:contains(" + name + ")").length == 0;
	});


	console.log(elements)

	// loop through elements and replace names with link
	for(var i=0; i<elements.length; i++){
	
		if($(elements[i]).attr('href') != undefined){
			console.log("add classes to as", $(elements[i]).attr('href'))
			try {
				
				var el = $(elements[i])
				el.addClass("ThreeDegrees name");
			}
			catch(err) {
				console.log(err)
			}
			continue;
		}
		
		if ($(elements[i]).attr("name") != undefined) {
			console.log('skip script tags')
			continue;
		}
		
		
		var html = $(elements[i]);
		console.log("change divs & ps", html)
		var new_html = html.html().replace(regexp, '<a href="#" class="ThreeDegrees name">' + name + '</a>');
		html.html(new_html)
	}
}

var basic_events = function(){
		console.log('called events');
		try {
			$('.ThreeDegrees.name').live('hover', function(){		
				var element = $(this).find('.popup').toggle();
				return false;
			});			
		} catch(err) {
			
		}
}


