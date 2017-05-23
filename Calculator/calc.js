$(document).ready(function() {
	var equation = ['0'], result;
	document.getElementById('equationDisplay').innerHTML = equation.join('');
	//Removes 0 from the equation after displaying it
	equation.pop();
	
	//Clears equation display
	function clearDisplay() {
		while(equation.pop());
		equation.push('0');
		document.getElementById('equationDisplay').innerHTML = equation.join('');
		//Removes 0 from the equation after displaying it
		equation.pop();
	}
	
	//Clears current equation and result
	$('#buttonClear').on('click', function() {
		clearDisplay();
		result = 0;
		document.getElementById("answerDisplay").innerHTML = result;
	});
	
	//Evaluates expression
	$('#buttonEqual').on('click', function() {
		var toReplace, temp;
		//Replaces all instances of ÷, x with / and * respectively
		toReplace = equation.indexOf('÷');
		while(toReplace != -1){
			equation[toReplace] = '/';
			toReplace = equation.indexOf('÷');
		}
		toReplace = equation.indexOf('x');
		while(toReplace != -1) {
			equation[toReplace] = '*';
			toReplace = equation.indexOf('x');
		}
		//Squares the number before the ² symbol and replaces the symbol with a blank space
		toReplace = equation.indexOf('²');
		while(toReplace != -1) {
			temp = equation[toReplace - 1];
			equation[toReplace - 1] = temp * temp;
			equation[toReplace] = ' ';
			toReplace = equation.indexOf('²');
		}
		//equation is set to the result variable
		result = equation.join("");
		//result is evaluated and inserted to the result; Equation is cleared and set as the result.
		clearDisplay();
		console.log(eval(result));
		equation[0] = eval(result);
		document.getElementById("answerDisplay").innerHTML = eval(result);
		document.getElementById("equationDisplay").innerHTML = equation.join("");
	});
	
	//Displays 0-9, +, -, /, *, %, square and .
	$('#buttonZero').on('click', function() {
		equation.push('0');
		document.getElementById('equationDisplay').innerHTML = equation.join('');
	});
	
	$('#buttonOne').on('click', function() {
		equation.push('1');
		document.getElementById('equationDisplay').innerHTML = equation.join('');
	});
	
	$('#buttonTwo').on('click', function() {
		equation.push('2');
		document.getElementById('equationDisplay').innerHTML = equation.join('');
	});
	
	$('#buttonThree').on('click', function() {
		equation.push('3');
		document.getElementById('equationDisplay').innerHTML = equation.join('');
	});
	
	$('#buttonFour').on('click', function() {
		equation.push('4');
		document.getElementById('equationDisplay').innerHTML = equation.join('');
	});
	
	$('#buttonFive').on('click', function() {
		equation.push('5');
		document.getElementById('equationDisplay').innerHTML = equation.join('');
	});
	
	$('#buttonSix').on('click', function() {
		equation.push('6');
		document.getElementById('equationDisplay').innerHTML = equation.join('');
	});
	
	$('#buttonSeven').on('click', function() {
		equation.push('7');
		document.getElementById('equationDisplay').innerHTML = equation.join('');
	});
	
	$('#buttonEight').on('click', function() {
		equation.push('8');
		document.getElementById('equationDisplay').innerHTML = equation.join('');
	});
	
	$('#buttonNine').on('click', function() {
		equation.push('9');
		document.getElementById('equationDisplay').innerHTML = equation.join('');
	});
	
	$('#buttonPlus').on('click', function() {
		equation.push('+');
		document.getElementById('equationDisplay').innerHTML = equation.join('');
	});
	
	$('#buttonMinus').on('click', function() {
		equation.push('-');
		document.getElementById('equationDisplay').innerHTML = equation.join('');
	});
	
	$('#buttonDivide').on('click', function() {
		equation.push('÷');
		document.getElementById('equationDisplay').innerHTML = equation.join('');
	});
	
	$('#buttonMultiply').on('click', function() {
		equation.push('x');
		document.getElementById('equationDisplay').innerHTML = equation.join('');
	});
	
	$('#buttonRemainder').on('click', function() {
		equation.push('%');
		document.getElementById('equationDisplay').innerHTML = equation.join('');
	});
	
	$('#buttonSquare').on('click', function() {
		equation.push('²');
		document.getElementById('equationDisplay').innerHTML = equation.join('');
	});
	
	$('#buttonDot').on('click', function() {
		equation.push('.');
		document.getElementById('equationDisplay').innerHTML = equation.join('');
	});
});
