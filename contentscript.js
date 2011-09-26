$(document).ready(function(){	
	console.log('3Degrees')
	// BUILD HOVER CARDS
	if (chrome.extension != undefined) {
		chrome.extension.sendRequest({'action' : 'fetchNames'}, createHoverCards);
	} else {
		createHoverCards("John Biggs\nSarah Lacy\nMichael Arrington")
	}
		
})

// GO THROUGH THE PIPELINE TO CREATE A HOVERCARD
// 1. GET NAMES
// 2. ADD AHREFS TO DOM
// 3. ADD POPUP TO DOM
// 4. ADD HOVER EVENTS
function createHoverCards(data) {
	if(data == undefined) return null;
	
  var names = data.split("\n")

	for(var i=0; i < names.length; i++) {
		try {
			parse_dom(names[i]);
			getFbSearchResults(names[i]);
		}
		catch (err) {}
	}
	
	popupTemplate();
	basic_events()
};

// HELPER FNCS FOR CREATEHOVERCARDS
function popupTemplate() {
	// var template = $(html);
	// console.log('called template')
	// console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
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

	// console.log("NAMES", names)
	// console.log("TEMPLATE", template)

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


	// console.log(elements)

	// loop through elements and replace names with link
	for(var i=0; i<elements.length; i++){
	
		if($(elements[i]).attr('href') != undefined){
			// console.log("add classes to as", $(elements[i]).attr('href'))
			try {
				
				var el = $(elements[i])
				el.addClass("ThreeDegrees name");
			}
			catch(err) {
				// console.log(err)
			}
			continue;
		}
		
		if ($(elements[i]).attr("name") != undefined) {
			// console.log('skip script tags')
			continue;
		}
		
		
		var html = $(elements[i]);
		// console.log("change divs & ps", html)
		var new_html = html.html().replace(regexp, '<a href="#" class="ThreeDegrees name">' + name + '</a>');
		html.html(new_html)
	}
}

var basic_events = function(){
		// console.log('called events');
		try {
			$('.ThreeDegrees.name').live('hover', function(){		
				var element = $(this).find('.popup').toggle();
				return false;
			});			
		} catch(err) {
			
		}
}



// TEST fbSearch (1)
function getFbSearchResults(name) {
	console.log("YAY " + name)
	if (chrome.extension != undefined) {
		chrome.extension.sendRequest({'action': 'fbSearch', 'name' : name}, processFbSearchResults);
	} else {
		processFbSearchResults({'name':'jennifer lopez', 'data' : window.data});
	}
}

// TEST fbSearch (2)
function processFbSearchResults(response) {
	var name = response.name
	var data = response.data
	console.log('call parseFbSearch with ' + name)
	chrome.extension.sendRequest({'action':'parseFbIds', 'data': data}, fbUserIds)
}

// TEST fbSearch (3)
function fbUserIds(ids) {
	console.log('parse ids returned: ' + ids);
}