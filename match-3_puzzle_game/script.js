const startBtn = document.getElementById("start-game");
const canvas = document.getElementById("canvas");
const startScreen = document.getElementById("start-screen");
const ctx = canvas.getContext("2d");

//set the size of the canvas and the size of each cell
const cellSize = 50;
canvas.width = numCols * cellSize;
canvas.height = numRows * cellSize;

//Create a class to represent gem objects in grid cells
class Gem {
    constructor(color, row, col){
        this.color = color;//Rep the color of the gem
        this.row = row;//row position of the gem on the game board grid
        this.col = col;//column position of the gem on the game board grid
    }    
}

//size of the game board
const numRows = 5;
const numCols = 5;

//Represent the gameboard in a 2D array. Each element in the array 
//represents a row and each nested array represents the cells in that row
//each cell contais info aabout a gem
const gameBoardGrid = [];

//initialize the grid that will be used as the game board
for (let i = 0; i < numRows; i++){
    grid[i] = [];
    for (let j = 0; j < numCols; j++){
        //Generate a random color for the gem
        const randomColor = generateRandomColor();
        grid[i][j] = new Gem(randomColor, i, j);
    }
}

//function to generate a random color for the game
const generateRandomColor = () => {
    const colors = ["red", "orange", "yellow", "green", "blue"];
    return colors[Math.floor(Math.random() * colors.length)];
};



const startGame = () => {
    canvas.style.display = "block";
    startScreen.style.display = "none";
    
};

startBtn.addEventListener("click", startGame);