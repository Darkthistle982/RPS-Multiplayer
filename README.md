# RPS-Multiplayer
A multiplayer Rock-Paper-Scissors

## Table of Contents
* Application rules/Operation
* Tech used
* Details of the Application
* Link to the Project

## Application Rules/Operation
The goal of this project was to create a working Rock/Paper/Scissors game that could be played on multiple devices/browsers over the internet. It needs to be able to allow players to log in and out, as well as to track the wins and losses and ties. There is also a chat feature so the players can interact with one another in real time. This is all facilitated via a firebase realtime database.

## Tech used
* HTML
* CSS
* Javascript
* Bootstrap
* Google Fonts
* Font Awesome
* Jquery
* Google Firebase DB

## Details of the Application
This application sits in a ready state. The selection buttons are hidden for either player until they login. When the click the Login to Start button, it opens the modal to enter their info, then allows them to either quit out of the window, or enter their info. Once entered, the javascript runs a function to seat them as Player 1 or 2 depending on if either seat is already full. If both are full, it lets the user know they need to wait for someone to logout before they can play. Either user can send messages in the chat box. Once both players have made a selection, it runs the game logic, then displays the results, increments each players score, and then resets the game state and awaits both players input. 

### Link to the Live project: https://darkthistle982.github.io/RPS-Multiplayer/
