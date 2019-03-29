$(document).ready(function() {
	/*
	Have two variables, one to keep track of the game and one for the player. Everytime we generate a move, push it to the gameProgress. Reset the playerProgress and make him input. Every input check if it matches gameProgress. If yes, continue. Else show an error.
	0 - Blue
	1 - Red
	2 - Green
	3 - Yellow
	*/
	var gameProgress = [], playerProgress = [], isPlayerTurn = false, score = -1, currentPlay = 0, replay = 0, hasWon = false, isStrict = false;

	
	/*
	Disables buttons by making it the AI turn
	Increments current score and displays using incrementScore()
	Generates a random number between 0-3 corresponding to a colour and pushes it to gameProgress using generateMove()
	Iterates through every instance of gameProgress and plays the sound/button press effects. 
	Once it goes through all of gameProgress, it resets player progress and makes it the playter's turn
	*/
	function aiTurn() {
		isPlayerTurn = false;
		if(replay == 0) {
			incrementScore();
			generateMove();
		}
		if(hasWon == false) {
			replay = 0;
			var temp;
			i = 0;
			temp = setInterval(function(){
				if(i > gameProgress.length) {
						clearInterval(temp);
						playerProgress = [];
						currentPlay = 0;
						isPlayerTurn = true;
				}
				else {
					if(gameProgress[i] == 0)
						playBlue();
					else if(gameProgress[i] == 1)
						playRed();
					else if(gameProgress[i] == 2) 
						playGreen();
					else if(gameProgress[i] == 3) 
						playYellow();
					i++;
				}
			}, 500);
		}
	}
	
	
	//Checks if player has won the game. If yes, says they won and restarts the game
	function checkWin() {
		if(score == 20) {
			$('#score').text('Win!');
			hasWon = true;
			setTimeout(function() {
				$('#score').text('...');
				restartGame();
			}, 1500);
		}
	}
	
	//Sets game back to default settings 
	function restartGame() {
		gameProgress = [];
		playerProgress = [];
		isPlayerTurn = false;
		score = -1;
		replay = 0;
		hasWon = false;
		displayScore();
		aiTurn();
	}
	
	/*
	If the current move matches the AI's move in the sequence it checks the next move. 
	If the current move does not match the AI's move, it says that it was a wrong move and makes the AI replay
	If the player does all the moves correctly, it makes the AI play the next move
	If strict mode is enabled, it restarts the game instead of making the AI replay
	*/
	function checkPlayerProgress() {
		if(playerProgress[currentPlay] == gameProgress[currentPlay]) {
			currentPlay++;
			if(playerProgress.length == gameProgress.length) {
				$('#score').text('Nice');
				setTimeout(function() {
					displayScore();
					aiTurn();
				}, 500);
			}
		}
		else if(isStrict == true) {
			$('#score').text(':(');
			setTimeout(function() {
				restartGame();
			}, 500);
		}
		else {
			$('#score').text(':(');
			setTimeout(function() {
				replay = 1;
				displayScore();
				aiTurn();
			}, 500);
		}
	}
	
	//Enables buttons on player turn and plays a sound, pushes that button's value to the playerProgress and checks if it is correct
	$('#buttonBlue').on('click', function(){
		if(isPlayerTurn) {
			playBlue();
			playerProgress.push(0);
			checkPlayerProgress();
		}
	});
	
	$('#buttonRed').on('click', function(){
		if(isPlayerTurn) {
			playRed();
			playerProgress.push(1);
			checkPlayerProgress();
		}
	});
	
	$('#buttonGreen').on('click', function(){
		if(isPlayerTurn) {
			playGreen();
			playerProgress.push(2);
			checkPlayerProgress();
		}
	});
	
	$('#buttonYellow').on('click', function(){
		if(isPlayerTurn) {
			playYellow();
			playerProgress.push(3);
			checkPlayerProgress();
		}
	});

	/*****************************************************************/
	/*                	  Auxillary Functions                        */
	/*****************************************************************/	
	//Converts single digit numbers into double digits. 0 -> 00
	function toDoubleDigits(number) {
		return number > 9 ? "" + number: "0" + number;
	}
	
	//Displays the current score. If game hasn't started, then displays --
	function displayScore() {
		if(score == -1)
			$('#score').text('--');
		else
			$('#score').text(toDoubleDigits(score));
	}
	
	//Functions to plays audio and simulate button press
	function playBlue(){
		document.getElementById('soundBlue').play();
		$('#buttonBlue').css('border-color', '#0220ff');
		setTimeout(function(){
			$('#buttonBlue').css('border-color', '#0066ff');
		}, 500)
	};
	function playRed(){
		document.getElementById('soundRed').play();
		$('#buttonRed').css('border-color', '#FF0000');
		setTimeout(function(){
			$('#buttonRed').css('border-color', '#800000');
		}, 500)
	};
	function playGreen(){
		document.getElementById('soundGreen').play();
		$('#buttonGreen').css('border-color', '#38FF3C');
		setTimeout(function(){
			$('#buttonGreen').css('border-color', '#297A3D');
		}, 500)
	};
	function playYellow(){
		document.getElementById('soundYellow').play();
		$('#buttonYellow').css('border-color', '#FFFF00');
		setTimeout(function(){
			$('#buttonYellow').css('border-color', '#8B9532');
		}, 500)
	};
	//Increments the current score and checks if player won
	function incrementScore() {
		score++;
		displayScore();
		checkWin();
	}
	
	//Generates a random move and adds it to the game progress
	function generateMove() {
		var randomNo = Math.floor(Math.random() * 4);
		gameProgress.push(randomNo);
	}

	//(Re)Starts the game on clicking the start button
	$('#startButton').on('click', function(){
		restartGame();
		$(this).text('Restart');
	});
	
	//Enables or disables Strict mode
	$('#strictButton').on('click', function(){
		isStrict = !isStrict;
		if(isStrict) {
			$(this).css('background', 'grey');
			$(this).css('transform', 'translateY(4px)');
		}
		else {
			$(this).css('background', '');
			$(this).css('transform', '');
		}
		$('#startButton').text('Restart');
		restartGame();
	});
	
});


