//config variable and code to initialize the database. pulled from firebase docs
var config = {
    apiKey: "AIzaSyAAiTCPOS2fCQqyqcyVB4NU5q9SQdoIsC8",
    authDomain: "rps-live-71692.firebaseapp.com",
    databaseURL: "https://rps-live-71692.firebaseio.com",
    projectId: "rps-live-71692",
    storageBucket: "rps-live-71692.appspot.com",
    messagingSenderId: "736046736181",
};
firebase.initializeApp(config);
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
var whoAmI = "none";
//functions & events go here
//-----------------------------------------------------------------------------------------



//Main Process goes here
//-----------------------------------------------------------------------------------------





