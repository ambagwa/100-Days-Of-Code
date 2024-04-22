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
    constructor (numRows, numCols, cellSize, gameManager){
        this.numRows = numRows;
        this.numCols = numCols;
        this.cellSize = cellSize;
        this.gameBoardGrid = this.createGrid();
        this.score = 0;
        this.gameManager = gameManager;
    }

    //Create a method for creating the grid
    createGrid(){
        //Represent the gameboard in a 2D array. Each element in the array 
        //represents a row and each nested array represents the cells in 
        //that row. Each cell contains a gem's color & pstn
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
        const gem1 = this.gameBoardGrid[row1][col1];
        const gem2 = this.gameBoardGrid[row2][col2];
        if(!gem1 || !gem2){
            console.error("Invalid game positions");
            return false;//If swapping is unsuccessful
        }
        //if it is, swap them
        this.gameBoardGrid[row1][col1] = gem2;
        this.gameBoardGrid[row2][col2] = gem1;

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
            gameManager.processMatch(matchedGems);
        }

        //check for game over after handling matches
        if(this.checkGameOver()){
            results.textContent = `Your score: ${this.score}`;
            const gameOverMsg = document.createElement("p");
            gameOverMsg.textContent = "Game Over!";
            gameOverMsg.style.fontSize = "24px";
            gameOverMsg.style.fontWeight = "bold";
            results.appendChild(gameOverMsg);
        }
    }

    //Method to make the gem above the removed one  to fall into its place
    makeGemsFall(startRow, col){
        for (let i = startRow - 1; i >= 0; i--){
            //If there's a gem above move it down
            const gemAbove = this.gameBoardGrid[i][col];
            if (gemAbove){
                this.gameBoardGrid[i][col] = null;
                this.gameBoardGrid[i + 1][col] = gemAbove;
            }
        }
    }

    //Method to remove a matched gem
    removeGem(row, col){
        //Get the gem object at the specified position
        const gem = this.gameBoardGrid[row][col];
        if(!gem){
            console.error("No gem found at specified position");
            return 0;//Return 0 if no gem is found
        }

        //Remove this gem from the gem board
        this.gameBoardGrid[row][col] = null;

        //Increment the score based on the numbe of removed gems
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
        //check if the row and column indices are within the bounds of grid
        if
            (row < 0 || row >= this.numRows || col < 0 || col >= this.numCols){
                //if the indices are out of bounds, return false as no 
                //match is possible
                return false;
            }
        
        //check if the cell is empty or if there's no gem
        const gem = this.gameBoardGrid[row][col];
        if(gem || !gem.color){
            //return false as no match is possible
            return false;
        }

        const gemColor = gem.color;

        //check for horizontal match
        let horizontalMatch = 1;
        //Iterate to the left rows od the selected gem
        let c = col - 1;
        while (c >= 0 && this.gameBoardGrid[row][c] &&
             this.gameBoardGrid[row][c].color === gemColor){
            horizontalMatch++;
            c--;
        }
        //Iterate to the right rows od the selected gem
        c = col + 1;
        while (c < this.numCols && this.gameBoardGrid[row][c] &&
             this.gameBoardGrid[row][c]
             && this.gameBoardGrid[row][c].color === gemColor){
            horizontalMatch++;
            c++;
        }

        //check for vertical match
        let verticalMatch = 1;
        //Iterate to the gems above the selected one
        let r = row - 1;
        while (r > 0 && this.gameBoardGrid[r][col] && 
                this.gameBoardGrid[r][col].color === gemColor){
            verticalMatch++;
            r--;
        }
        //Iterate to the gems bottom of the selected one
        r = row + 1;
        while (r < this.numRows && this.gameBoardGrid[r][col] &&
             this.gameBoardGrid[r][col] 
            && this.gameBoardGrid[r][col].color === gemColor){
            verticalMatch++;
            r++;
        }

        //return true if a match is found
        return horizontalMatch >= 3 || verticalMatch >= 3;
    }

    //Method for checking if game is over
    checkGameOver(){
        for (let i = 0; i < this.numRows; i++){
            for (let j = 0; j < this.numCols; j++){
                //check if swapping with adjacent gem creates a match
                if((i > 0 && this.swapGems(i, j, i - 1, j)) ||
                    (i < this.numRows - 1 && this.swapGems(i, j, i + 1, j)) ||
                    (j > 0 && this.swapGems(i, j, i, j - 1)) ||
                    (j < this.numCols -1 && this.swapGems(i, j, i, j + 1))
                ) {
                    //If a valid swap is found, game is not over
                    return false;
                }
            }
        }

        //if there are no valid swaps, return true to indicate game is over
        return true;
    }
}

//Create a class that will handle the input from the player, process matched
//gems and manage the game loop as well
class GameManager {
    constructor(){
        this.score = 0;
        this.isGameOver  = false;
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

    updateGameLoop(){
        const self = this;

        //define a recursive function to handle the game loop
        const gameLoop = () => {
            //check if game is over
            if(!self.isGameOver){

                //process matches
                gameBoard.handleMatches();

                //update game board
                drawGameBoard();

                //check for game over conditions
                if (self.checkGameOver()){
                    self.isGameOver = true;
                }

                //if game is not over, request the next frame
                if(!self.isGameOver){
                    requestAnimationFrame(gameLoop);
                }
                else{
                    //if game is over
                    results.textContent = `Your score: ${self.score}`;
                    const gameOverMsg = document.createElement("p");
                    gameOverMsg.textContent = "Game Over!";
                    gameOverMsg.style.fontSize = "24px";
                    gameOverMsg.style.fontWeight = "bold";
                    results.appendChild(gameOverMsg);
                }
            }
        };

        //start game loop
        gameLoop();
    }
}

//variable to store the position of the last clicked gem
let lastClickedGem = null;

const gameManager = new GameManager();

const gameBoard = new Board(5, 5, 100, gameManager);


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
            //calculate the x and y co-ordinates of the cell on the canvas
            const x = j * gameBoard.cellSize + offsetX;
            const y = i * gameBoard.cellSize + offsetY;

            //If the gem is inside the board
            if (gem){
                //check if this gem is the last clicked gem
                const isSelectedGem = lastClickedGem && 
                    lastClickedGem.row === i && lastClickedGem.col === j;

                //Draw a white border around the selected gem
                if (isSelectedGem){
                    ctx.strokeStyle = "white";
                    ctx.lineWidth = 2;
                    ctx.strokeRect(x, y, gameBoard.cellSize, gameBoard.cellSize);
                }

                //fill the gem with its color
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
        if (gemRow >= 0 && gemRow < gameBoard.numRows && 
            gemCol >= 0 && gemCol < gameBoard.numCols){
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

    gameManager.updateGameLoop();
};

startBtn.addEventListener("click", startGame);