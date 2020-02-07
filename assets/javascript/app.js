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

var p1Wins;
var p1Losses;
var p1Ties;
var p1Name;
var p1Choice;

var p2Wins;
var p2Losses;
var p2Ties;
var p2Name;
var p2Choice;

var playerTurn;
function reset() {
  database.ref().update({
    p1Choice: "",
    p2Choice: ""
  })
}

function game() {
  reset();

  if ((p1Choice === "Rock" && p2Choice === "Scissors") ||
    (p1Choice === "Scissors" && p2Choice === "Paper") ||
    (p1Choice === "Paper" && p2Choice === "Rock")) {
    p1Wins++;
    p2Losses++;
    database.ref().update({
      p1Wins: p1Wins,
      p2Losses: p2Losses
    })
  }
  else if ((p2Choice === "Rock" && p1Choice === "Scissors") ||
    (p2Choice === "Scissors" && p1Choice === "Paper") ||
    (p2Choice === "Paper" && p1Choice === "Rock")) {
    p2Wins++;
    p1Losses++;
    database.ref().update({
      p1Losses: p1Losses,
      p2Wins: p2Wins
    });
  }
  else if (p2Choice === p1Choice) {
      p1Ties++;
      p1Ties++;
      database.ref().update({
        p1Ties: p1Ties,
        p2Ties: p2Ties
      });
    }



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
   
//on value funtion to watch the DB, and update the result on the page dynamically
  database.ref().on("value", function (snapshot) {
  p1Choice = snapshot.val().p1Choice;
  p2Choice = snapshot.val().p2Choice;
  var p2Display = $("<p>").text("Player 2 chose: " + p2Choice);
  $("#player2-choice").html(p2Display);
  var p1Display = $("<p>").text("Player 1 chose: " + p1Choice);
  $("#player1-choice").html(p1Display);
});







game();
