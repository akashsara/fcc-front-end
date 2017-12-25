$(document).ready(function() {
	var playerChoice, aiChoice, coordsX, coordsY, firstMove = true;
	var numCalculations = 0;
	
	//Variables for each box
	var gameBoard = [
	[null, null, null],
	[null, null, null],
	[null, null, null]
	];
	
	//Resets the board back to normal
	function resetBoard() {
		numCalculations = 0
		gameBoard = [
			[null, null, null],
			[null, null, null],
			[null, null, null]
		];
		var boxID;
		//Sets the display to empty
		for(var i = 0; i < 3; i++) {
			for(var j = 0; j < 3; j++) {
				boxID = "#g" + i + j;
				$(boxID).text('');
			}
		}
		firstMove = false;
		//removes the winner display overlay
		$('.winnerDisplay').css("width", "0%");
		disableBoard();
		enableBoard();
		$('.game').hide();
		$('.info').show();
	}
	
	//To display the winner/tie
	function displayWinner() {
		/*
		Checks if there is a winner and displays an overlay showing the winner. On clicking anywhere, it resets the board.
		*/
		var score = checkWin();
		if(score == +10 || score == -10 || (score == 0 && areMovesRemaining() == false)) {
			disableBoard();
			if(score ==  -10) {
				$('#whoWon').text("YOU WIN");
			}
			else if(score == 0 && areMovesRemaining() == false) {
				$('#whoWon').text("TIE");
			}
			else if(score == +10) {
				$('#whoWon').text("YOU LOSE");
			}
			console.log("Calculations: ", numCalculations)
			$('.winnerDisplay').css("width", "100%");
			$('.winnerDisplay').on('click', function(){
				resetBoard();
			})
		}
	}
	

	//Checks if any boxes are available
	function areMovesRemaining() {
		for(var i = 0; i < 3; i++) {
			for(var j = 0; j < 3; j++) {
				if(gameBoard[i][j] == null)
					return true;
			}
		}
		return false;
	}
	
	//Checks if either side won. Returns +10 for AI, -10 for player and 0 if no winner
	function checkWin() {
		//Check rows
		for(var i = 0; i < 3; i++) {
			if((gameBoard[i][0] != null) && (gameBoard[i][0] === gameBoard[i][1]) && (gameBoard[i][1] === gameBoard[i][2])) {
				if(gameBoard[i][0] === playerChoice)
					return -10;
				else
					return +10;
			}
		}
		//Check columns
		for(i = 0; i < 3; i++) {
			if((gameBoard[0][i] != null) && (gameBoard[0][i] === gameBoard[1][i]) && (gameBoard[1][i] === gameBoard[2][i])) {
				if(gameBoard[0][i] === playerChoice)
					return -10;
				else
					return +10;
			}
		}
		//Check diagonals
		//if [1][1] is empty, no diagonal will be filled
		if(gameBoard[1][1] == null)
			return 0;
		
		if(
		((gameBoard[0][0] === gameBoard[1][1]) && (gameBoard[1][1] === gameBoard[2][2]))
		|| 
		((gameBoard[0][2] === gameBoard[1][1]) && (gameBoard[1][1] === gameBoard[2][0]))
		) {
			if(gameBoard[1][1] === playerChoice)
				return -10;
			else
				return +10;
		}
		//Nobody wins
		return 0;
	}

	function minimax(isAITurn, depth = 0) {
		numCalculations++;
		//Check if anyone won and return score if they did
		var score = checkWin();
		if(score == 10) 
			return score - depth;
		if(score == -10)
			return depth + score;
		
		//Check if there are any moves left. If no, return 0 for tie
		if(areMovesRemaining() == false) 
			return 0;
				
		//If AI turn
		if(isAITurn) {
			var best = -1000, temp;
			//Checks every empty square
			for(var i = 0; i < 3; i++) {
				for(var j = 0; j < 3; j++) {
					if(gameBoard[i][j] == null) {
						/*
						Assumes this square is filled and recursively calls minimax to check if we can win from here.
						Then resets back to null. The best possible value is returned and its coordinates are stored.
						*/
						//Make the move
						gameBoard[i][j] = aiChoice;
						//Recursive minimax
						temp = minimax(!isAITurn, depth + 1);
						//Gets best value
						best = (temp > best)?temp:best;
						//Undo the move
						gameBoard[i][j] = null;
					}
				}
			}
			return best;
		}
		//Player turn
		 else {
			var best = 1000, temp;
			//Checks every empty square
			for(var i = 0; i < 3; i++) {
				for(var j = 0; j < 3; j++) {
					if(gameBoard[i][j] == null) {
						/*
						Assumes this square is filled and recursively calls minimax to check if we can win from here.
						Then resets back to null. The worst possible value is returned and its coordinates are stored.
						*/
						//Make the move
						gameBoard[i][j] = playerChoice;
						//Recursive minimax
						temp = minimax(!isAITurn, depth);
						//Gets worst value
						best = (temp < best)?temp:best;
						//Undo the move
						gameBoard[i][j] = null;
					}
				}
			}
			return best;
		}
	}
	
	//Calls minimax for each empty box and gets the best result
	/*
	For example in case of:
	XOO
	X X
	 O
	it fills in 1,1 and checks if it can win from that position. Then it fills in 2,0 and checks. Then 2,2. It compares all the scores and does the best move
	*/
	function findBestmove() {
		var best = -1000;
		coordsX = -1;
		coordsY = -1;
		for(var i = 0; i < 3; i++) {
			for(var j = 0; j < 3; j++) {
				if(gameBoard[i][j] == null) {
					gameBoard[i][j] = aiChoice;
					var moveVal = minimax(false);
					gameBoard[i][j] = null;
					if(moveVal > best) {
						coordsX = i;
						coordsY = j;
						best = moveVal;
					}
				}
			}
		}
	}
	
	//Function for AI turn
	function doAITurn() {
		//Disabled the board so the user can't mess with it
		disableBoard();
		/*
		If board is empty, place it in the top left corner. Wikipedia said it's the most optimal starting move. Saves the calculation for each box.
		Said calculation results in top left corner being filled anyway
		*/
		if(firstMove) {
			firstMove = false;
			gameBoard[0][0] = aiChoice;
			$('#g00').text(aiChoice);
			$('#g00').addClass('disabled');
			enableBoard();
			doUserTurn();
		}
		/*
		Checks if there is a winner, if not it calls findBestmove() and completes its move in the resultant box. Then enables the board and allows the user to play
		*/
		else {
			displayWinner();
			findBestmove();
			var boxID = "#g" + coordsX + coordsY;
			gameBoard[coordsX][coordsY] = aiChoice;
			$(boxID).text(aiChoice);
			$(boxID).addClass('disabled');
			enableBoard();
			doUserTurn();
		}
	}
	
	//Possible only when it's user turn. Board is disabled during AI turn.
	//Disables button and adds X or O to it on clicking a square
	function doUserTurn() {
		firstMove = false;
		displayWinner();
		$('.gameSquare').on('click', function() {
			//Prevents clicking on the button if it's already disabled
			if(!$(this).hasClass('disabled')){
				var coords;
				$(this).addClass('disabled');
				coords = this.id.split('');
				gameBoard[coords[1]][coords[2]] = playerChoice;
				$(this).text(playerChoice);
				doAITurn();
			}
		});
	}
	

	/***********************************************/
	/*             Auxillary Functions             */
	/***********************************************/
	//Changes display based on whose turn it is
	
	function disableBoard() {
		var boxID;
		for(var i = 0; i < 3; i++) {
			for(var j = 0; j < 3; j++) {
				boxID = "#g" + i + j;
				if(!$(boxID).hasClass('disabled'))
					$(boxID).addClass('disabled');
			}
		}
	}
	
	function enableBoard() {
		var boxID;
		for(var i = 0; i < 3; i++) {
			for(var j = 0; j < 3; j++) {
				boxID = "#g" + i + j;
				if(gameBoard[i][j] == null)
					$(boxID).removeClass('disabled');
			}
		}
	}
	
	/***********************************************/
	/*               Pre-Game Stuff                */
	/***********************************************/
	//Doesn't display game till X or O is selected
	$('.game').hide();
	$('.winnerDisplay').css("width", "0%");
	disableBoard();
	enableBoard();
	
	//Sets the turn based on user input, displays gameBoard and calls changeTurn
	$('#chooseX').on('click', function(){
		playerChoice = 'X';
		aiChoice = 'O';
		$('.info').hide();
		$('.game').show();
		doUserTurn();
	});
	
	$('#chooseO').on('click', function(){
		playerChoice = 'O';
		aiChoice = 'X';
		$('.info').hide();
		$('.game').show();
		doAITurn();
	});
});

