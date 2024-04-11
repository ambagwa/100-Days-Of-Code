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

    //Method to swap two gems on the board
    swapGems(row1, col1, row2, col2){
        //row and column indices of the two rows to be swapped
        if(
            row1 < 0 || row1 >= this.numRows || col1 < 0 || col1 >= this.numCols ||
            row2 < 0 || row2 >= this.numRows || col2 < 0 || col2 >= this.numCols
        ){
            console.error("Invalid game positions");
            return;
        }

        //swap the gems at the specified positions using a temporary variable
        const temporaryGem = this.gameBoardGrid[row1][col1];
        this.gameBoardGrid[row1][col1] = this.gameBoardGrid[row2][col2];
        this.gameBoardGrid[row2][col2] = temporaryGem;

        //check for potential matches for the swapped gems
        if (this.isMatch(row1, col1) || this.isMatch(row2, col2)){
            this.handleMatches();
        }
    }

    //Method  to handle matches of the swapGems method
    handleMatches(){
        //Store the total number of points earned
        let totalPoints = 0;

        //iterate over the gameBoardGrid
        for(let i = 0; i < this.numRows; i++){
            for (let j = 0; j < this.numRows; j++){
                //check if there is a match at the current position
                if (this.isMatch(i, j)){
                    //increment the total points earned
                    totalPoints += this.removeGem(i, j);
                }
            }
        }

        this.updateScore(totalPoints);
    }

    //Method for checking if there' a match horizontally or vertically of 
    //three or more gems
    isMatch(row, col){
        const gemColor = this.gameBoardGrid[row][col].color;

        //check for horizontal match
        let horizontalMatch = 1;
        //Iterate to the left rows od the selected gem
        let c = col - 1;
        while (c >= 0, this.gameBoardGrid[row][c].color === gemColor){
            horizontalMatch++;
            c--;
        }
        //Iterate to the right rows od the selected gem
        c = col + 1;
        while (c < this.numCols && this.gameBoardGrid[row][c].color === gemColor){
            horizontalMatch++;
            c++;
        }

        //check for vertical match
        let verticalMatch = 1;
        //Iterate to the gems above the selected one
        let r = row - 1;
        while (row > 0 && this.gameBoardGrid[r][col].color === gemColor){
            verticalMatch++;
            r--;
        }
        //Iterate to the gems bottom of the selected one
        r = row + 1;
        while (r < this.numRows && this.gameBoardGrid[r][col].color === gemColor){
            verticalMatch++;
            r++;
        }

        //return true if a match is found
        return horizontalMatch >= 3 || verticalMatch >= 3;
    }
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

    //Calculate the offset needed to center the game board within the canvas
    const offsetX = (canvas.width - gameBoardWidth) / 2;
    const offsetY = (canvas.height - gameBoardHeight) / 2;

    for (let i = 0; i < gameBoard.numRows; i++){
        for (let j = 0; j < gameBoard.numCols; j++){
            //get the gem at the current cell
            const gem = gameBoard.gameBoardGrid[i][j];
            //calculate the x co-ordinates of the cell on the canvas
            const x = j * gameBoard.cellSize + offsetX;
            //calculate the y co-ordinates of the cell on the canvas
            const y = i * gameBoard.cellSize + offsetY;
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
        const y = j * gameBoard.cellSize + offsetY;
        ctx.beginPath();
        ctx.moveTo(offsetX, y);
        ctx.lineTo(offsetX + gameBoardWidth, y);
        ctx.stroke();
    }

    //Draw vertical grid lines
    for (let i = 0; i < gameBoard.numCols; i++){
        const x = i * gameBoard.cellSize + offsetX;
        ctx.beginPath();
        ctx.moveTo(x, offsetY);
        ctx.lineTo(x, offsetY + gameBoardHeight);
        ctx.stroke();
    }

};

const startGame = () => {
    canvas.style.display = "block";
    startScreen.style.display = "none";
    drawGameBoard();
};

startBtn.addEventListener("click", startGame);