$(document).ready(function() {
	$(".nav a").on("click", function(){
	   $(".nav").find(".active").removeClass("active");
	   $(this).parent().addClass("active");
	});
	
/* 	$('.thumbnail').mouseover(function() {
	  $('.info').css("visibility","visible");
	});

	$('.thumbnail').mouseout(function() {
	  $('.info').css("visibility","hidden");
	}); */
});