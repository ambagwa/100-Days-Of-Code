const startBtn = document.getElementById("start-game");
const canvas = document.getElementById("canvas");
const startScreen = document.getElementById("start-screen");
const ctx = canvas.getContext("2d");

//set the width and the height of the canvas to match the browser's width
//and height
canvas.width = innerWidth;
canvas.height = innerHeight;


const startGame = () => {
    canvas.style.display = "block";
    startScreen.style.display = "none";
    
};

startBtn.addEventListener("click", startGame);