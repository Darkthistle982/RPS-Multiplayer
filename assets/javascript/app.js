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
//functions & events go here
//-----------------------------------------------------------------------------------------
$(".p1-button").on("click", function () {
  $("#player1-choice").empty();
  p1Choice = $(this).val();
  console.log(p1Choice);
  // var p1Display = $("<p>").text("Player 1 chose: " + p1Choice);
  // $("#player1-choice").append(p1Display);
  database.ref().update({
    p1Picks: p1Choice 
  });
});

$(".p2-button").on("click", function () {
  $("#player2-choice").empty();
  p2Choice = $(this).val();
  console.log(p2Choice);
  // var p2Display = $("<p>").text("Player 2 chose: " + p1Choice);
  // $("#player2-choice").append(p2Display);
  database.ref().update({
    p2Picks: p2Choice
  });
});

