//config variable and code to initialize the database. pulled from firebase docs
const firebaseConfig = {
  apiKey: "AIzaSyAAiTCPOS2fCQqyqcyVB4NU5q9SQdoIsC8",
  authDomain: "rps-live-71692.firebaseapp.com",
  databaseURL: "https://rps-live-71692.firebaseio.com",
  projectId: "rps-live-71692",
  storageBucket: "rps-live-71692.appspot.com",
  messagingSenderId: "736046736181",
  appId: "1:736046736181:web:2f2dd2bb15f56b311de27c"
};
firebase.initializeApp(firebaseConfig);
//variables needed for our game go here
//-----------------------------------------------------------------------------------------
var database = firebase.database();

var p1Wins = 0;
var p1Losses = 0;
var p1Name;
var p1Choice;

var p2Wins = 0;
var p2Losses = 0;
var p2Name;
var p2Choice;

var ties = 0;
var playerTurn;
var initialChoice = "";
var scoreLogged = false;

function reset() {
  p1Choice = initialChoice;
  p2Choice = initialChoice;
  scoreLogged = false;
  $("#player1-choice").html("<p>Player 1 chose: " + p1Choice + "</p>");
  $("#player2-choice").html("<p>Player 2 chose: " + p2Choice + "</p>");
  $("#results").empty();
  database.ref().update({
    p1Choice: initialChoice,
    p2Choice: initialChoice,
  })
  watchForSnapshot();
}
reset();
function game() {
  var player1Wins = $("<p>").text("Player 1 is the winner!");
  var player2Wins = $("<p>").text("Player 2 is the winner!");
  if ((p1Choice === "Rock" && p2Choice === "Scissors") ||
    (p1Choice === "Scissors" && p2Choice === "Paper") ||
    (p1Choice === "Paper" && p2Choice === "Rock")) {
    p1Wins++;
    p2Losses++;
    $("#results").append(player1Wins);

  }
  else if ((p2Choice === "Rock" && p1Choice === "Scissors") ||
    (p2Choice === "Scissors" && p1Choice === "Paper") ||
    (p2Choice === "Paper" && p1Choice === "Rock")) {
    p2Wins++;
    p1Losses++;
    $("#results").append(player2Wins);
  }
  else {
    ties++;
    $("#results").text("That's a tie!!")
  }
  database.ref().update({
    p1Choice: p1Choice,
    p2Choice: p2Choice,
    p1Wins: p1Wins,
    p1Losses: p1Losses,
    p2Wins: p2Wins,
    p2Losses: p2Losses,
    ties: ties
  });
  $("#player1-choice").html("<p>Player 1 chose: " + p1Choice + "</p>");
  $("#player2-choice").html("<p>Player 2 chose: " + p2Choice + "</p>");
  setTimeout(reset, 5 * 1000);
}
//onclick function to log p1 choices to the db
$(".p1-button").on("click", function () {
  p1Choice = $(this).val();
  database.ref().update({
    p1Choice: p1Choice
  });
});
//onclick function to log p2 choices to the db
$(".p2-button").on("click", function () {
  p2Choice = $(this).val();
  database.ref().update({
    p2Choice: p2Choice
  });
});

function watchForSnapshot() {
  //on value funtion to watch the DB, and update the result on the page dynamically.
  database.ref().on("value", function (snapshot) {
    p1Choice = snapshot.val().p1Choice;
    p2Choice = snapshot.val().p2Choice;
    p1Wins = snapshot.val().p1Wins;
    p2Wins = snapshot.val().p2Wins;
    p1Losses = snapshot.val().p1Losses;
    p2Losses = snapshot.val().p2Losses;
    ties = snapshot.val().ties;
    var tiesDisplay = $("<p>").text("Ties " + ties);
    $(".ties").html(tiesDisplay);
    // var p2Display = $("<p>").text("Player 2 chose: ");
    // $("#player2-choice").html(p2Display);
    // var p1Display = $("<p>").text("Player 1 chose: ");
    // $("#player1-choice").html(p1Display);
    var p1WinDisplay = $("<p>").text("P1 Wins: " + p1Wins);
    $("#player1-wins").html(p1WinDisplay);
    var p2WinDisplay = $("<p>").text("P2 Wins: " + p2Wins);
    $("#player2-wins").html(p2WinDisplay);
    var p1LossDisplay = $("<p>").text("P1 Losses: " + p1Losses);
    $("#player1-losses").html(p1LossDisplay);
    var p2LossDisplay = $("<p>").text("P2 Losses: " + p2Losses);
    $("#player2-losses").html(p2LossDisplay);
    if (p1Choice !== initialChoice && p2Choice !== initialChoice && scoreLogged === false) {
      scoreLogged = true;
      setTimeout(game, 5 * 1000);
    }
  });
}

//function to submit messages to the chatbox
$("#chatSubmit").on("click", function (event) {
  event.preventDefault();
  message = $("#inputChatText").val().trim();
  database.ref('collection/').push({
    message: message
  });
  $("#inputChatText").val(" ");
});

//function to read and display messages to the chatbox
database.ref('collection/').on("child_added", function (childsnapshot) {
  var chatText = childsnapshot.val().message;
  $("#chatTextArea").prepend(chatText + '\r\n');
});

//function to clear the chatlog upon click of button
$("#clearChatlog").on("click", function (event) {
  event.preventDefault();
  database.ref().update({
    collection: null
  });
  $("#chatTextArea").empty();
})

//function to reset the player scores on click
$("#score-reset").on("click", function (event) {
  event.preventDefault();
  database.ref().update({
    p1Wins: 0,
    p2Wins: 0,
    p1Losses: 0,
    p2Losses: 0,
    ties: 0
  })
})
