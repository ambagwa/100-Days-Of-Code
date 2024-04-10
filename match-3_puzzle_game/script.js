

const startBtn = document.getElementById("start-game");
const canvas = document.getElementById("canvas");
const startScreen = document.getElementById("start-screen");
const ctx = canvas.getContext("2d");

//size of the game board
const numRows = 5;
const numCols = 5;
//the size of each cell
const cellSize = 100;


//set the size of the canvas
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

//function to generate a random color for the game
const generateRandomColor = () => {
    const colors = ["red", "orange", "yellow", "green", "blue"];
    return colors[Math.floor(Math.random() * colors.length)];
};


//Represent the gameboard in a 2D array. Each element in the array 
//represents a row and each nested array represents the cells in that row
//each cell contais info aabout a gem
const gameBoardGrid = [];

//initialize the grid that will be used as the game board
for (let i = 0; i < numRows; i++){
    gameBoardGrid[i] = [];
    for (let j = 0; j < numCols; j++){
        //Generate a random color for the gem
        const randomColor = generateRandomColor();
        gameBoardGrid[i][j] = new Gem(randomColor, i, j);
    }
}


//Showcasing the game board on canvas means iterating over each cell in the 
//grid and draw the corresponding gem on the canvas.
const drawGameBoard = () => {
    //clear the caanvas before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    

    for (let i = 0; i < numRows; i++){
        for (let j = 0; j < numCols; j++){
            //get the gem at the current cell
            const gem = gameBoardGrid[i][j];
            //calculate the x co-ordinates of the cell on the canvas
            const x = j * cellSize;
            //calculate the y co-ordinates of the cell on the canvas
            const y = i * cellSize;
            if (gem){
                ctx.fillStyle = gem.color;
                ctx.fillRect(x, y, cellSize, cellSize);
            }
            else{
                //draw an empty cell if there's no gem
                ctx.fillStyle = 'white';
                ctx.fillRect(x, y, cellSize, cellSize);
            }
        }
    }

    //draw grid lines
    ctx.strokeStyle = "black";//color of the grid lines
    ctx.lineWidth = 1;//width of the grid lines

    //Draw horizontal grid lines
    for (let j = 0; j < numRows; j++){
        const y = j * cellSize;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }

    //Draw vertical grid lines
    for (let i = 0; i < numCols; i++){
        const x = i * cellSize;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

};

const startGame = () => {
    canvas.style.display = "block";
    startScreen.style.display = "none";
    drawGameBoard();
};

startBtn.addEventListener("click", startGame);