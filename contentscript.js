$(document).ready(function(){	
	console.log('3Degrees')
	// BUILD HOVER CARDS
	if (chrome.extension != undefined) {
		chrome.extension.sendRequest({'action' : 'fetchNames'}, createHoverCards);
	} else {
		createHoverCards("John Biggs\nSarah Lacy\nMichael Arrington")
	}
	
	// TEST FB SEARCH
	if (chrome.extension != undefined) {
		chrome.extension.sendRequest({'action': 'fbSearch', 'name' : 'Elena Mustatea'}, parseFbSearch);
	} else {
		parseFbSearch(window.data);
	}
	
})

function parseFbSearch(data) {

	// GET URLS	
	var urls = data.match(/https:\\\/\\\/www.facebook.com\\\/\S+ /g)
	
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
	list = _.sortBy(list, function(i){ return data.search(i); })
	
	
}

function createHoverCards(data) {
  console.log(data);
  var names = data.split("\n")

	for(var i=0; i < names.length; i++) {
		try {
			parse_dom(names[i]);	
		} catch (err) {
			
		}
		
	}
	
	popupTemplate();
	basic_events()
};

function popupTemplate() {
	// var template = $(html);
	console.log('called template')
	console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
	var template = '<div class="ThreeDegrees popup shadow">\
    <div class="wrapper">\
      <div class="profile">\
				<img src="https://graph.facebook.com/jason.laster/picture"></img> \
      </div>\
      <div class="bottom-actions">\
      </div>\
    </div>\
  </div>'
	template = $(template);
	var names = $('.ThreeDegrees.name');

	console.log("NAMES", names)
	console.log("TEMPLATE", template)

	for(var i=0; i < names.length; i++)	 {
		template.clone().appendTo($(names[i]))
	}
}

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


