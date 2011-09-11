$(document).ready(function(){	
	console.log("GOO", chrome.extension)
	if (chrome.extension != undefined) {
		chrome.extension.sendRequest({'action' : 'fetchPage'}, onText);
	} else {
		fetchPage(onText)	
	}
})

function onText(data) {
  console.log(data);
  var names = data.split("\n")

	for(var i=0; i < names.length; i++) {
		parse_dom(names[i]);
	}
	
	if (chrome.extension != undefined) {
		chrome.extension.sendRequest({'action' : 'getTemplate'}, popupTemplate);
	} else {
		getTemplate(popupTemplate)
	}
	
	basic_events()
};

function popupTemplate(html) {
	var template = $(html);
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
			$(elements[i]).addClass("ThreeDegrees name")
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
		$('.ThreeDegrees.name').live('hover', function(){		
		var element = $(this).find('.popup').toggle();
		return false;
	});
}
