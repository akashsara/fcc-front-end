$(document).ready(function() {
	var sessionLength = 25, breakLength = 5, bgColour = 0x74363D;
	var maxTime, startTime, currentTime, t, pause = false, pauseTime, isBreak=false;
	var startButton = document.getElementById('startPomodoro');
	$incSes = $('#increaseSession');
	$decSes = $('#decreaseSession');
	$incBrk = $('#increaseBreak');
	$decBrk = $('#decreaseBreak');
	
	/*****************************************************************/
	/*                	  Auxillary Functions                        */
	/*****************************************************************/	
	//Converts single digit numbers into double digits. 0 -> 00
	function toDoubleDigits(number) {
		return number > 9 ? "" + number: "0" + number;
	}
	/*****************************************************************/
	/*                	   Timer Control                             */
	/*****************************************************************/
	//Core timer function
	function timer() {
		var elapsed, mins, sec;
		//Get current time
		currentTime = new Date().getTime();
		if(pause) {
			;//Do nothing
		}
		else {
			//Calculate time elapsed since starting timer in seconds
			elapsed = Math.round((currentTime - startTime)/1000);
			elapsed = maxTime - elapsed;
			//Change background colour slowly
			bgColour--;
			if(bgColour === 0x000000)
				bgColour = 0xffffff;
			$('body').css('background', '#' + bgColour.toString(16));
			//Convert time to minutes & seconds
			mins = Math.floor(elapsed/60);
			secs = elapsed - (mins * 60);
			if(mins < 0) {
				mins = 0;
				secs = 0;
				endTimer();
			}
			//Display
			document.getElementById('minutes').innerHTML = toDoubleDigits(mins);
			document.getElementById('seconds').innerHTML = toDoubleDigits(secs);
		}
	}
	
	//Stops timer, plays alarm and switches to break/work
	function endTimer() {
		clearInterval(t);
		document.getElementById('alarm').play();
		//Plays alarm and starts next job after 6 seconds
		setTimeout(function(){
			if(isBreak) {;
				document.getElementById('title').innerHTML = "Back to Work!";
				isBreak = false;
				startTimer();
			}
			else {
				document.getElementById('title').innerHTML = "Break Time!";
				isBreak = true;
				startBreak();
		}
		}, 6000);
	}
	
	//Resets the timer display to XX:00
	function resetTimer() {
		sessionLength = 25;
		breakLength = 5;
		pause=false;
		clearInterval(t);
		updateSession();
		updateBreak();
	}
	
	/*****************************************************************/
	/*                	   Session Timer                             */
	/*****************************************************************/
	//Starts the timer
	function startTimer() {
		document.getElementById('title').innerHTML = "Do stuff!";
		//Milliseconds since 01/01/1970
		startTime = new Date().getTime();
		//Max time in seconds
		maxTime = sessionLength * 60;
		t = setInterval(timer, 1000);
	}

	/*****************************************************************/
	/*                          Break Timer                          */
	/*****************************************************************/
	//Starts the break timer
	function startBreak() {
		//Milliseconds since 01/01/1970
		startTime = new Date().getTime();
		//Max time in seconds
		maxTime = breakLength * 60;
		t = setInterval(timer, 1000);
	}
	
	/*****************************************************************/
	/*                        Control Buttons                        */
	/*****************************************************************/
	//Starts the timer and disables buttons to change break/session values
	$('#startPomodoro').on('click', function() {
		//Disables buttons to change values. Starts timer and changes start to pause.
		if(startButton.innerHTML === "Start") {
			startTimer();
			$incSes.addClass("disabled");
			$decSes.addClass("disabled");
			$incBrk.addClass("disabled");
			$decBrk.addClass("disabled");
			startButton.innerHTML = "Pause"
		}
		//Pauses the timer and gets the current time
		else if(startButton.innerHTML === "Pause") {
			document.getElementById('title').innerHTML = "Waiting...";
			pause = true;
			pauseTime = currentTime;
			startButton.innerHTML = "Continue"
		}
		//Resumes timer and adjusts for the paused time
		else {
			document.getElementById('title').innerHTML = "Do stuff!";
			maxTime += Math.round((currentTime - pauseTime)/1000);
			pause = false;
			startButton.innerHTML = "Pause"
		}
	});
	
	//Resets to default values
	$('#resetPomodoro').on('click', function() {
		$incSes.removeClass("disabled");
		$decSes.removeClass("disabled");
		$incBrk.removeClass("disabled");
		$decBrk.removeClass("disabled");
		startButton.innerHTML = "Start"
		resetTimer();
	});
	
	/*****************************************************************/
	/*                 Display Related Functions                     */
	/*****************************************************************/
	//Updates sesssion, break and time
	function updateTime() {
		document.getElementById('minutes').innerHTML = toDoubleDigits(sessionLength);
		document.getElementById('seconds').innerHTML = toDoubleDigits(0);
	}
	
	function updateSession() {
		document.getElementById('session').innerHTML = toDoubleDigits(sessionLength);
		updateTime();
	}
	
	function updateBreak() {
		document.getElementById('breakSession').innerHTML = toDoubleDigits(breakLength);
		updateTime();
	}
	
	//To increase/decrease break/session length
	$decSes.on('click', function() {
		if(sessionLength > 1) {
			sessionLength--;
			updateSession();
		}
	});
	
	$incSes.on('click', function() {
		if(sessionLength < 60) {
			sessionLength++;
			updateSession();
		}
	});
	
	$decBrk.on('click', function() {
		if(breakLength > 1) {
			breakLength--;
			updateBreak();
		}
	});
	
	$incBrk.on('click', function() {
		if(breakLength < 60) {
			breakLength++;
			updateBreak();
		}
	});	
});

