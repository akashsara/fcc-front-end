$(document).ready(function() {
	
	getQuote();
	
	function getQuote() {
	var words = ["It is perilous to study too deeply the arts of the Enemy, for good or for ill. But such falls and betrayals, alas, have happened before.", 
	"He that breaks a thing to find out what it is has left the path of wisdom.", 
	"I don't know half of you half as well as I should like; and I like less than half of you half as well as you deserve.",
	"Short cuts make delays, but inns make longer ones.",
	"If more of us valued food and cheer and song above hoarded gold, it would be a merrier world.",
	"My armour is like tenfold shields, my teeth are swords, my claws spears, the shock of my tail is a thunderbolt, my wings a hurricane, and my breath death!",
	"You cannot pass. I am a servant of the Secret Fire, wielder of the flame of Anor. You cannot pass. The dark fire will not avail you, flame of Udun. Go back to the Shadow! You cannot pass.",
	"Sorry! I don't want any adventures, thank you. Not Today. Good morning! But please come to tea - any time you like! Why not tomorrow? Good bye!",
	"That there's some good in this world, Mr. Frodo... and it's worth fighting for.",
	"I would rather share one lifetime with you than face all the Ages of this world alone.",
	"A day may come when the courage of men fails... but it is not THIS day.",
	];

	var speaker = ["Lord Elrond", "Gandalf", "Bilbo Baggins", "Frodo Baggins", "Thorin Oakenshield", "Smaug", "Gandalf", "Bilbo Baggins", "Samwise Gamgee", "Arwen Undomiel", "Aragorn"];

	var randomNo = Math.floor(Math.random() * words.length);
	$('#words').text(words[randomNo]);
	$('#person').text(speaker[randomNo]);
	}

	$("#generate").on("click", function() {
		getQuote();
	});
	
	$("#tweet").on("click", function() {
		var quote = document.getElementById("words").innerHTML;
		var person = document.getElementById("person").innerHTML;
		window.open("http://twitter.com/intent/tweet?text=" + quote + " - " + person);
	});
	
});
