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
var p1Ties = 0;
var p1Name;
var p1Choice;

var p2Wins = 0;
var p2Losses = 0;
var p2Ties = 0;
var p2Name;
var p2Choice;

var scoreLogged = false;
//this funciton is to reset the game state after determining a winner
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
//this function runs the game logic to determine winner, loser and ties and increments the stats
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
    p1Ties++;
    p2Ties++;
    $("#results").text("That's a tie!!")
  }
  database.ref().update({
    p1Choice: p1Choice,
    p2Choice: p2Choice,
    p1Wins: p1Wins,
    p1Losses: p1Losses,
    p2Wins: p2Wins,
    p2Losses: p2Losses,
    p1Ties: p1Ties,
    p2Ties: p2Ties
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

//on value funtion to watch the DB, and update the result on the page dynamically.
function watchForSnapshot() {
  database.ref().on("value", function (snapshot) {
    p1Choice = snapshot.val().p1Choice;
    p2Choice = snapshot.val().p2Choice;
    p1Wins = snapshot.val().p1Wins;
    p2Wins = snapshot.val().p2Wins;
    p1Losses = snapshot.val().p1Losses;
    p2Losses = snapshot.val().p2Losses;
    p1Ties = snapshot.val().p1Ties;
    p2Ties = snapshot.val().p2Ties;
    p1Display = snapshot.val().p1Name;
    p2Display = snapshot.val().p2Name;
    $("#player1-name").text("Player1: " + p1Display);
    $("#player2-name").text("Player2: " + p2Display);
    var tiesDisplayP1 = $("<p>").text("P1 Ties " + p1Ties);
    $("#p1ties").html(tiesDisplayP1);
    var tiesDisplayP2 = $("<p>").text("P2 Ties " + p2Ties);
    $("#p2ties").html(tiesDisplayP2);
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

//function to login new player from the popup modal
$("#logInUser").on("click", function (event) {
  event.preventDefault();
  var playerName = $("#userName").val().trim();
  var pNameRef = firebase.database().ref();
  pNameRef.once("value")
    .then(function (snapshot) {
      var p1username = snapshot.val().p1Name;
      var p2username = snapshot.val().p2Name;
      if (p1username === "") {
        database.ref().update({
          p1Name: playerName
        })
        p1Name = playerName;
      }
      else if (p1username !== "" && p2username === "") {
        database.ref().update({
          p2Name: playerName
        })
        p2Name = playerName;
      }
      else {
        alert("Sorry but all the player seats are taken. Please wait for one of the other users to log out.")
      }
    });
});

//functions to create a logout option once a player is logged in
$("#p1Logout").on("click", function () {
  database.ref().update({
    p1Name: "",
    p1Wins: 0,
    p1Losses: 0,
    p1Ties: 0
  })
  p1Name = undefined;
});

$("#p2Logout").on("click", function () {
  database.ref().update({
    p2Name: "",
    p2Wins: 0,
    p2Losses: 0,
    p2Ties: 0
  })
  p2Name = undefined;
});

