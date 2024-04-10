//get html elements
const startBtn = document.getElementById("start-game");
const canvas = document.getElementById("canvas");
const startScreen = document.getElementById("start-screen");
const ctx = canvas.getContext("2d");

//set the size of the canvas
canvas.width = innerWidth;
canvas.height = innerHeight; 

//Create a class to represent gem objects in grid cells
class Gem {
    constructor(color, row, col){
        this.color = color;//Rep the color of the gem
        this.row = row;//row position of the gem on the game board grid
        this.col = col;//column position of the gem on the game board grid
    }    
}


class Board {
    constructor (numRows, numCols, cellSize){
        this.numRows = numRows;
        this.numCols = numCols;
        this.cellSize = cellSize;
        this.gameBoardGrid = this.createGrid();
    }

    //Create a method for creating the grid
    createGrid(){
        //Represent the gameboard in a 2D array. Each element in the array 
        //represents a row and each nested array represents the cells in 
        //that row. Each cell contains info aabout a gem, ie color & pstn
        const gameBoardGrid = [];
        //initialize the grid that will be used as the game board
        for (let i = 0; i < this.numRows; i++){
            gameBoardGrid[i] = [];
            for (let j = 0; j < this.numCols; j++){
                //Generate a random color for the gem
                const randomColor = this.generateRandomColor();
                gameBoardGrid[i][j] = new Gem(randomColor, i, j);
            }
        }
        return gameBoardGrid;
    }

    //method to generate a random color for the game
    generateRandomColor(){
    const colors = ["red", "orange", "yellow", "green", "blue"];
    return colors[Math.floor(Math.random() * colors.length)];
};
}

const gameBoard = new Board(5, 5, 100);


//Showcasing the game board on canvas means iterating over each cell in the 
//grid and draw the corresponding gem on the canvas.
const drawGameBoard = () => {
    //clear the caanvas before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Calculate the height and width of the gameBoard area
    const gameBoardHeight = gameBoard.numCols * gameBoard.cellSize;
    const gameBoardWidth = gameBoard.numRows * gameBoard.cellSize;

    for (let i = 0; i < gameBoard.numRows; i++){
        for (let j = 0; j < gameBoard.numCols; j++){
            //get the gem at the current cell
            const gem = gameBoard.gameBoardGrid[i][j];
            //calculate the x co-ordinates of the cell on the canvas
            const x = j * gameBoard.cellSize;
            //calculate the y co-ordinates of the cell on the canvas
            const y = i * gameBoard.cellSize;
            if (gem){
                ctx.fillStyle = gem.color;
                ctx.fillRect(x, y, gameBoard.cellSize, gameBoard.cellSize);
            }
            else{
                //draw an empty cell if there's no gem
                ctx.fillStyle = 'white';
                ctx.fillRect(x, y, gameBoard.cellSize, gameBoard.cellSize);
            }
        }
    }

    //draw grid lines
    ctx.strokeStyle = "black";//color of the grid lines
    ctx.lineWidth = 1;//width of the grid lines

    //Draw horizontal grid lines
    for (let j = 0; j < gameBoard.numRows; j++){
        const y = j * gameBoard.cellSize;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(gameBoardWidth, y);
        ctx.stroke();
    }

    //Draw vertical grid lines
    for (let i = 0; i < gameBoard.numCols; i++){
        const x = i * gameBoard.cellSize;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, gameBoardHeight);
        ctx.stroke();
    }

};

const startGame = () => {
    canvas.style.display = "block";
    startScreen.style.display = "none";
    drawGameBoard();
};

startBtn.addEventListener("click", startGame);