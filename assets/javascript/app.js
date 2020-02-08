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
  database.ref().update({
    p1Choice: initialChoice,
    p2Choice: initialChoice,
  })
  watchForSnapshot();
}
reset();

function game() {

  if ((p1Choice === "Rock" && p2Choice === "Scissors") ||
    (p1Choice === "Scissors" && p2Choice === "Paper") ||
    (p1Choice === "Paper" && p2Choice === "Rock")) {
    p1Wins++;
    p2Losses++;
  }
  else if ((p2Choice === "Rock" && p1Choice === "Scissors") ||
    (p2Choice === "Scissors" && p1Choice === "Paper") ||
    (p2Choice === "Paper" && p1Choice === "Rock")) {
    p2Wins++;
    p1Losses++;
  }
  else {
    ties++;
  }
  database.ref().update({
    p1Wins: p1Wins,
    p1Losses: p1Losses,
    p2Wins: p2Wins,
    p2Losses: p2Losses,
    ties: ties
  });
}
// game();
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
    var p2Display = $("<p>").text("Player 2 chose: " + p2Choice);
    $("#player2-choice").html(p2Display);
    var p1Display = $("<p>").text("Player 1 chose: " + p1Choice);
    $("#player1-choice").html(p1Display);
    if (p1Choice !== initialChoice && p2Choice !== initialChoice && scoreLogged === false) {
      console.log('working')
      scoreLogged = true;
      game();
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