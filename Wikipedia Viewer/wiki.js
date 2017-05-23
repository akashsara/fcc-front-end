$(document).ready(function() {
	var hideShow = 1;	
		
	//Hides random button and moves search box to top of the screen
	function hideStuff() {
		if(hideShow) {
			document.getElementById("randomPage").style.display = 'none';
			document.getElementById("body").style.paddingTop = '5%';
			hideShow = 0;
		}
	}
	
	//Shows random button and moves search box to screen center
	function showStuff() {
		if(hideShow == 0) {
			document.getElementById("randomPage").style.display = 'block';
			document.getElementById("body").style.paddingTop = '20%';
			hideShow = 1;
		}
	}
		
	//Inserts each entry to page
	function insertToDoc(title, extract, wikiLink) {
		var entry = '<a href="' + wikiLink + '"><div class="entry"><h3>' + title + '</h3><p class="lead">' + extract + '</p></div></a><br>';
		$("#results").append(entry);
	}
	
	function findResults() {
		//Generate link to access wikipedia
		var searchQuery = document.getElementById("search").value;
		console.log("Length of input = ", searchQuery.length);
		//If searchQuery is empty
		if(searchQuery.length === 0 || !searchQuery) {
			showStuff();
			return 0;
		}
		var url = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search=" + searchQuery;
		console.log(url);
		//Search wikipedia with the given query and return title and extracts
		$.getJSON(url, function (data) {
			//to show upto the first 10 results
			var itr, title, extract, wikiLink;
			var maxNoResults = data[1].length;
			console.log("Number of results =  ", maxNoResults);
			if(maxNoResults > 10)
				maxNoResults = 10;
			//To make a break between search box and results
			$("#results").append("<br>");
			//For each result, we insert to document
			for(itr = 0; itr < maxNoResults; itr++) {
				title = data[1][itr];
				extract = data[2][itr];
				wikiLink = data[3][itr];
				console.log(title, extract, wikiLink);
				insertToDoc(title, extract, wikiLink);
			}
		})
	}
	
	//Clears all previous entries
	function clearResults() {
		$("#results").html("");
	}
	
	//On clicking search
	$("#searchIcon").on('click', function() {
		hideStuff();
		clearResults();
		findResults();
	});
	
	//On pressing enter
	$("#search").keypress(function(key) {
		if(key.which == 13) {
			hideStuff();
			clearResults();
			findResults();
		}
	});
});
