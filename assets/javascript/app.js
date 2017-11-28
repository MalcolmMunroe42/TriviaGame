
var questions = [{
	question: "What college football team started the 'Turnover Chain'?",
	answerList: ["Miami Hurricanes", "Michigan Wolverines", "Florida State Seminoles"],
	answer: 0
},{
	question: "What NFL team does Tom Brady play for?",
	answerList: ["Pittsburgh Steelers", "Buffalo Bills", "New England Patriots"],
	answer: 2
},{
	question: "How many points is a touchdown?",
	answerList: ["3", "6", "7", "2"],
	answer: 1
},{
	question: "How many points is a safety?",
	answerList: ["2", "3", "6", "1"],
	answer: 0
},{
	question: "Which college football team has blue turf for their home field?",
	answerList: ["Michigan Wolverines", "Boise State Broncos", "Kansas Jayhawks"],
	answer: 1
}

];

var currentQuestion; 
var correctAnswer; 
var incorrectAnswer; 
var unanswered; 
var seconds; 
var time; 
var answered; 
var userChoice;
var messages = {
	correct: "Score, that's right!",
	incorrect: "No, that's wrong",
	endTime: "Times up!",
	finished: "Results..."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	answered = true;
	
	//constructs new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+questions.length);
	$('.question').html('<h2>' + questions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(questions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();

	//answer click pauses time and segways to answer page
	$('.thisChoice').on('click',function(){
		userChoice = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 13;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//timer
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //clear question page
	$('.question').empty();

	var rightAnswerText = questions[currentQuestion].answerList[questions[currentQuestion].answer];
	var rightAnswerIndex = questions[currentQuestion].answer;
	//checks answer
	if((userChoice == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userChoice != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (questions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}