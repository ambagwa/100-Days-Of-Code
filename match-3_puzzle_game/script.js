//get html elements
const startBtn = document.getElementById("start-game");
const canvas = document.getElementById("canvas");
const startScreen = document.getElementById("start-screen");
const results = document.getElementById("results");
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
        this.score = 0;
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
            return false;//if swapping is unsuccessful
        }

        //swap the gems at the specified positions using a temporary variable
        const temporaryGem = this.gameBoardGrid[row1][col1];
        this.gameBoardGrid[row1][col1] = this.gameBoardGrid[row2][col2];
        this.gameBoardGrid[row2][col2] = temporaryGem;

        //check for potential matches for the swappe gems
        const match1 = this.isMatch(row1, row2);
        const match2 = this.isMatch(row2, col2);
        //return true if a match has occured after swapping
        return match1 || match2;
    
    }

    //Method  to handle matches of the swapGems method
    handleMatches(){
        let matchedGems = [];
        for (let i = 0; i < this.numRows; i++){
            for (let j = 0; j < this.numCols; j++){
                if (this.isMatch(i, j)){
                    //add matched gems to the array
                    matchedGems.push({ row: i, col: j });
                }
            }
        }

        //remove matched gems and make other gems fal
        for (const gem of matchedGems){
            this.removeGem(gem.row, gem.col);
            this.makeGemsFall(gem.row, gem.col);
        }

        //call processMatch() of the GameManager if matches are found
        if(matchedGems.length > 0){
            GameManager.processMatch(matchedGems);
        }
    }

    //Method to make the gem above the removed one  to fall into its place
    makeGemsFall(startRow, col){
        for (let i = startRow - 1; i >= 0; i--){
            //If there's a gem above move it down
            if (this.gameBoardGrid[i][col]){
                const gem = this.gameBoardGrid[i][col];
                this.gameBoardGrid[i][col] = null;
                this.gameBoardGrid[i + 1][col] = gem;
            }
        }
    }

    //Method to remove a matched gem
    removeGem(row, col){
        //get the color of the matched gem
        const matchedColor = this.gameBoardGrid[row][col].color;
        //Remove this gem from the gameboard
        this.gameBoardGrid[row][col] = null;

        //Increment the score based on the number of removed gems
        const pointsPerGem = 10;
        return pointsPerGem;
    }

    //Method for updating the score of the player
    updateScore(points){
        this.score += points;

        results.textContent = `Your score: ${this.score}`;
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

//Create a class that will handle the input from the player, process matched
//gems and manage the game loop as well
class GameManager {
    constructor(){
        this.score = 0;
    }

    processMatch(matchedGems){
        let totalPoints = 0;
        const pointsPerGem = 10;
        const comboMultiplier = 1.5;

        //iterate through matched gems
        for (const gem of matchedGems){
            //remove gem from the gameBoard
            gameBoard.gameBoardGrid[gem.row][gem.col] = null;
            //increment points
            totalPoints += pointsPerGem;
        }

        //Apply combo multiplier if there are multiple matches in a sequence
        const combos = Math.floor(matchedGems.length / 3);//3 gems = 1 combo
        totalPoints *= Math.pow(comboMultiplier, combos);

        //update the score
        this.score += totalPoints;
        results.textContent = `Your score: ${this.score}`;
    }
}

//variable to store the position of the last clicked gem
let lastClickedGem = null;

const gameManager = new GameManager();


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

            //If the gem is inside the board
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

    //Attach an event listener to each gem
    canvas.addEventListener("click", event => {
        //Find the co-ordiates of the click relative to the canvas element
        const clickX = event.clientX - canvas.getBoundingClientRect().left;
        const clickY = event.clientY - canvas.getBoundingClientRect().top;

        //calculate the row and the column of the clicked gem based on the
        //click position
        const gemCol = Math.floor((clickX - offsetX) / gameBoard.cellSize);
        const gemRow = Math.floor((clickY - offsetY) - gameBoard.cellSize);

        //Check if the clicked position is within the gameBoard boundaries
        if (gemRow >= 0 && gemRow < gameBoard.numRows 
            && gemCol >= 0 && gemCol < gemCol < gameBoard.numCols){
                if (lastClickedGem === null){
                    //if no gem has been clicked before, store the position 
                    //of this gem
                    lastClickedGem = { row: gemRow, col: gemCol};
                }else {
                    //check for validity of the swap
                    const rowDiff = Math.abs(gemRow - lastClickedGem.row);
                    const colDiff = Math.abs(gemCol - lastClickedGem.col);
                    if((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 &&
                        colDiff === 1)){
                            //call swapGems method on this gem
                            const matchOccurred = 
                                gameBoard.swapGems(lastClickedGem.row, 
                                    lastClickedGem.col, gemRow, gemCol);
                            //redraw the gameBoard after swapping
                            drawGameBoard();
                        }

                        //check if a match occurred after swapping
                        if (matchOccurred){
                            gameBoard.handleMatches();
                            drawGameBoard();
                        }

                        //reset lastClickedGem for the next click
                        lastClickedGem = null;
                }
            }
    });

};

const startGame = () => {
    canvas.style.display = "block";
    startScreen.style.display = "none";
    drawGameBoard();
    results.style.display = "block";
};

startBtn.addEventListener("click", startGame);