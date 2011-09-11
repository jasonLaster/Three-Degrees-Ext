console.log('hello from body')


$(document).ready(function(){
	parse_dom('Sarah Lacy')
	basic_events()
	build_popup()
	$( "#movieTemplate" ).tmpl( movies ).appendTo( "#movieList" );
})


var clean_fb_search_html = function(){
	var body = $('body')
	body.find('.uiHeader').remove()
	body.find('#blueBar').remove()
	body.find('#leftColContainer').remove()
	body.find('#rightCol').remove()
	body.find('.mbs.pam.clearfix.uiBoxGray.noborder').remove()
	body.find('.auxiliary.UIImageBlock_Ext').remove()
	body.find('#pageFooter').remove()
	body.find('.clearfix.uiMorePager.stat_elem.more_results_link.uiMorePagerCenter').remove()
	body.find('.fbChatSidebar').remove()
	body.find('.fbDockWrapper').remove()
	
	
	var search_results = $('#pagelet_search_results ul.uiList li:lt(5)');
}


var parse_dom = function(name){

	// Find elements with name
	var regexp = new RegExp(name,'g');
	var elements = $("*:contains('" + name +"')").filter(function(){
	  return $(this).children("*:contains('Sarah Lacy')").length == 0
	})

	// loop through elements and replace names with link
	for(var i=0; i<elements.length; i++){
		var html = $(elements[i]);
		var new_html = html.html().replace(regexp, '<a href="#" class="ThreeDegrees name">' + name + '</a>');
		html.html(new_html)
	}
}

var basic_events = function(){
	
	$('.ThreeDegrees.name').live('hover', function(){
		
		var element = $(this);
		element.find('.popup').toggle();
	});

	$('.ThreeDegrees.name').live('click', function(){
		// $('.ThreeDegrees.pane').show("slide", { direction: "right" }, 200);
	})
}

var build_right_panel = function(){
	// CREATE RIGHT PANE
	var pane = $('<div class="ThreeDegrees pane">');
	var body = $('body');
	var content = $('<div class="content">');
	var left_border = $('<div class="left-border">');
	var logo = $('<div class="logo">');

	var profile = $('<div class="profile">');
	var picture_frame = $('<div class="picture-frame">');
	var picture = $('<img src="https://graph.facebook.com/jason.laster/picture">');

	var information = $('<div class="information">');
	var name = $('<span class="name">JasonLaster</span>')


	// picture.appendTo(picture_frame).appendTo(profile);
	// name.appendTo(information).appendTo(profile);


	logo.appendTo(content)
	left_border.appendTo(content)
	profile.appendTo(content)
	content.appendTo(pane)
	pane.appendTo(body)

	
}

var build_popup = function(){	
	var names = $('.ThreeDegrees.name');	
	$('#popupTemplate').tmpl().appendTo(names)
}


var movies = [
    { Name: "The Red Violin", ReleaseYear: "1998" },
    { Name: "Eyes Wide Shut", ReleaseYear: "1999" },
    { Name: "The Inheritance", ReleaseYear: "1976" }
];

// Render the template with the movies data and insert
// the rendered HTML under the "movieList" element






