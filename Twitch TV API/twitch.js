$(document).ready(function() {
	//Functions for setting visibility
	$.fn.invisible = function() {
        return this.each(function() {
            $(this).css("visibility", "hidden");
        });
    };
    $.fn.visible = function() {
        return this.each(function() {
            $(this).css("visibility", "visible");
        });
    };
	
	//Global declarations
	var no_displayed, showHidden=1;
	var newRow='<div class="row streamers center-block channel" id="streamers">';
	const endRow='</div>';
	var twitchStreamers = ["LCK1", "imaqtpie", "dyrus", "sirhcez", "fate_twisted_na", "voyboy", "pantsaredragon", "phylol", " IWillDominate", "doublelift", "tsm_bjergsen"];
	var offlineNames = [];
	var offlineUrls = [];
	
	
	//Adds a new clickable div to the page with channel name, status and a picture. Redirects to the channel
	function setData(channelName, url, nowPlaying, channelImage, isOnline, viewers) {
		if(isOnline) {
			no_displayed++;
			//Standard div to insert
			var channelInfo = '<a href="' + url + '" target="_blank" class="channel"><div class="col-md-3 streamBox center-block"><div class="streamImage"><img src="' + channelImage + '" class="img-responsive inStreamImage"></div><div class="streamTitle"><h2 class="text-center">' + channelName + '<span class="glyphicon glyphicon-eye-open iconViewer">' + viewers + '</span></h2></div><div class="streamStatus"><p class="lead">' + nowPlaying + '</p></div></div></a>';;
			
			//Creates a new row
			if(no_displayed % 3 === 1){
				$("#main").append(newRow);
			}
			
			//Adds an empty div for spacing. Also middle div is larger in size.
			else if(no_displayed % 3 === 2){
				channelInfo = '<div class="col-md-1" class="channel"></div>';
				$("#main").append(channelInfo);
				channelInfo = '<a href="' + url + '" target="_blank" class="channel"><div class="col-md-4 streamBox center-block"><div class="streamImage"><img src="' + channelImage + '" class="img-responsive inStreamImage"></div><div class="streamTitle"><h2 class="text-center">' + channelName + '<span class="glyphicon glyphicon-eye-open iconViewer">' + viewers + '</span></h2></div><div class="streamStatus"><p class="lead">' + nowPlaying + '</p></div></div></a>';
			}
			
			//Adds an empty div for spacing 
			else{
				channelInfo = '<div class="col-md-1" class="channel"></div>';
				$("#main").append(channelInfo);
				channelInfo = '<a href="' + url + '" target="_blank" class="channel"><div class="col-md-3 streamBox center-block"><div class="streamImage"><img src="' + channelImage + '" class="img-responsive inStreamImage"></div><div class="streamTitle"><h2 class="text-center">' + channelName + '<span class="glyphicon glyphicon-eye-open iconViewer">' + viewers + '</span></h2></div><div class="streamStatus"><p class="lead">' + nowPlaying + '</p></div></div></a>';;
			}
			
			//Adds a div containing passed info 
			$("#main").append(channelInfo);
			
			//Ends the row every 3 divs
			if(no_displayed % 3 === 0) {
				$("#main").append(endRow);
			}
		}
		else {
			offlineNames.push(channelName);
			offlineUrls.push(url);
		}
	}
	
	//displays offline channels
	function showOffline() {
		//makes a copy of the number of displayed elements
		var itr = 0, no_offline = no_displayed;
		channelImage = "stream_offline.jpg";
		nowPlaying = "Stream Offline";
		newRow='<div class="row streamers center-block offlineChannel" id="streamers">';
		var viewers = 0;
		offlineNames.forEach(function(channelName){
			no_offline++;
			url = offlineUrls[itr];

			//Standard div to insert
			var channelInfo = '<a href="' + url + '" target="_blank" class="offlineChannel"><div class="col-md-3 streamBox center-block"><div class="streamImage"><img src="' + channelImage + '" class="img-responsive inStreamImage"></div><div class="streamTitle"><h2 class="text-center">' + channelName + '<span class="glyphicon glyphicon-eye-open iconViewer">' + viewers + '</span></h2></div><div class="streamStatus"><p class="lead">' + nowPlaying + '</p></div></div></a>';;
			
			//Creates a new row
			if(no_offline % 3 === 1){
				$("#main").append(newRow);
			}
			
			//Adds an empty div for spacing. Also middle div is larger in size.
			else if(no_offline % 3 === 2){
				channelInfo = '<div class="col-md-1 offlineChannel"></div>';
				$("#main").append(channelInfo);
				channelInfo = '<a href="' + url + '" target="_blank" class="offlineChannel"><div class="col-md-4 streamBox center-block"><div class="streamImage"><img src="' + channelImage + '" class="img-responsive inStreamImage"></div><div class="streamTitle"><h2 class="text-center">' + channelName + '<span class="glyphicon glyphicon-eye-open iconViewer">' + viewers + '</span></h2></div><div class="streamStatus"><p class="lead">' + nowPlaying + '</p></div></div></a>';
			}
			
			//Adds an empty div for spacing 
			else{
				channelInfo = '<div class="col-md-1 offlineChannel"></div>';
				$("#main").append(channelInfo);
				channelInfo = '<a href="' + url + '" target="_blank" class="offlineChannel"><div class="col-md-3 streamBox center-block"><div class="streamImage"><img src="' + channelImage + '" class="img-responsive inStreamImage"></div><div class="streamTitle"><h2 class="text-center">' + channelName + '<span class="glyphicon glyphicon-eye-open iconViewer">' + viewers + '</span></h2></div><div class="streamStatus"><p class="lead">' + nowPlaying + '</p></div></div></a>';;
			}
			
			//Adds a div containing passed info 
			$("#main").append(channelInfo);
			
			//Ends the row every 3 divs
			if(no_offline % 3 === 0) {
				$("#main").append(endRow);
			}
			itr++;
		});
	}
	
	function showAll() {
		$('.offlineChannel').remove();
	}
	
	//Gets data from Twitch through API
	function getTwitchData () {
		var url, channelImage, nowPlaying, viewers;
		//No of streams currently displayed
		no_displayed = 0;
		var isOnline;
		//For each streamer in our array access the API and get JSON
		twitchStreamers.forEach(function(channelName) {
			$.getJSON('https://wind-bow.gomix.me/twitch-api/streams/' + channelName + '?callback=?', function(data) {
				url = "https://www.twitch.tv/" + channelName;
				//If the channel is offline or doesn't exist
				if(data.stream === null) {
					isOnline = 0;
				}
				//If the channel exists
				else {
					nowPlaying = data.stream.channel.status;
					channelImage = data.stream.preview.large;
					viewers = data.stream.viewers;
					isOnline = 1;
				}
				//Increase displayed channels and call setData
				setData(channelName, url, nowPlaying, channelImage, isOnline, viewers);
			});
		});
	}
	
	//Search function
	function search() {
		//selects search bar
		$("#search").change(function() {
			//searchKey = contents of search bar
			var searchKey = $(this).val();
			//If keys are pressed remove all non-match elements and show only matching element
			if(searchKey) {
				$(".streamBox").find("h2:not(:contains(" + searchKey + "))").parent().parent().parent().invisible();
				$(".streamBox").find("h2:contains(" + searchKey + ")").parent().parent().parent().visible();
			}
			//else show all elements
			else {
				$(".streamBox").find("h2").parent().parent().parent().visible();
			}
			//for each keypress
		}).keyup(function() {});
	}
		
	//refreshes streams by removing all existing streams calling getTwitchData() again
	$("#refresh").on('click', function() {
		$('.offlineChannel').remove();
		$('.channel').remove();
		getTwitchData();
	});
	
	getTwitchData();
	search();
	
	//Toggles between displaying offline channels and not
	$("#onOff").on('click', function() {
		if(showHidden) {
			showOffline();
			showHidden = 0;
		}
		else {
			showAll();
			showHidden = 1;
		}
		//ternary operator to change text
		$("#onOff").text(($("#onOff").text() == 'Show All') ? 'Show Online' : 'Show All').fadeIn();
	});
	
});
