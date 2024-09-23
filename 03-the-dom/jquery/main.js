

$(document.body).append('<h2>Hello World</h2>');

$( "h1" ).not( ".bar")
$("h1:not(.bar")

$("ul li.current")
$("ul li:first-child")
$("ul li:nth-child(5)")

$('h1').css('color', 'red');

let secondH1 = $('h1').eq(1);
let secondH1DOM = $('h1')[1];

$("<table><tr><td>foo</td></tr></table>")
    .css("background", "yellow")
    .appendTo("body");