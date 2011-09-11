
// Find Sarah Lacy
sarah = $("*:contains('Sarah Lacy')").filter(function(){
  return $(this).children("*:contains('Sarah Lacy')").length == 0
})

html = sarah.first().html()
html1 = html.replace('Sarah Lacy', '<a href="#" class="SixDegrees name">Sarah Lacy</a>')
sarah.first().html(html1)


// BASIC EVENTS
$('.SixDegrees.name').live('hover', function(){
	var element = $(this);
	element.find('.popup').toggle();
	$('.SixDegrees.pane').toggle()
});

$('.SixDegrees.name').live('click', function(){
	// $('.SixDegrees.pane').show("slide", { direction: "right" }, 200);
})


// CREATE RIGHT PANE
var pane = $('<div class="SixDegrees pane">');
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




// CREATE POPUP
var popup = $('<div class="SixDegrees popup">');
var names = $('.SixDegrees.name');
var picture_frame = $('<div class="picture-frame">');
var picture = $('<img src="https://graph.facebook.com/jason.laster/picture">');




picture.appendTo(picture_frame).appendTo(profile);
profile.appendTo(popup)

popup.appendTo(names);
popup.hide()








