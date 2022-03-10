const createPlayer = (sign) => {
    this.sign = sign;
    const getSign = () => {
        return sign;
    }
    return{getSign};
}
//Keeps track of the gameboard
const gameBoard = (() => {
    let board = ["","","","","","","","",""];
    let xBoard =[];
    let oBoard =[];
    //Sets X or O in the board
    const placeMarker = (index,marker) => {
        board[index] = marker;
    }
    //Gets the marker at a specific index
    const getMarker = (index) => {
        return board[index];
    }
    //Setter for X board
    const placeX = (index) => {
        xBoard.push(parseInt(index));
    }
    //Setter for O board
    const placeO = (index) => {
        oBoard.push(parseInt(index));
    }
    const reset= () => {
        board = ["","","","","","","","",""];
        xBoard = [];
        oBoard = [];
    }
    //Getter for X board
    const returnX = () => xBoard;
    //Getter for O board
    const returnO = () => oBoard;
    //Getter for currentBoard
    const currentBoard = () => board;
    return {placeMarker, getMarker, placeX, placeO, currentBoard, returnX, returnO, reset};
})();
//Changes all of the UI
const controls =(() => {
    const gridElements = document.querySelectorAll('.grid');
    //listens for a click on any one of the possible selections
    gridElements.forEach((grid) => 
        grid.addEventListener('click', (e) => {
            //doesn't update board if there is something in the spot or the game is over
            if(e.target.textContent !== "" || game.isGameOver()) return;
            
            game.play(e.target.id);
            updateGameboard();
        })
    )
    //Listens for the reset button to be clicked and then resets each of the components.
    const resetButton = document.getElementById('restart');
    resetButton.addEventListener('click', () => {
        gameBoard.reset();
        game.reset();
        changeTurnText('X');
        updateGameboard();

    })
    const turnText = document.getElementById('turn');
    //Changes Turn text above the game board
    const changeTurnText = (turn) => {
        turnText.innerText = `Player ${turn}'s turn`
    }
    //Updates the game board
    const updateGameboard = () => {
        for(i=0; i< 9; i++){
            gridElements[i].innerText = gameBoard.getMarker(i);
        }
    }
    
    const setResultText = (result) => {
        if(result==='Draw'){
            turnText.innerText = "It's a draw! Press restart to play again.";
        }
        else{
            turnText.innerText = `Player ${result} has won! Press restart to play again.`;
        }
    }
    return {updateGameboard, setResultText, changeTurnText}
})();

const game =(() => {
    const player1 = createPlayer('X');
    const player2 = createPlayer('O');
    let gameOver = false;
    let round = 1;
    //Places markers on the board and checks if there is a winner
    const play = (index)  => {
        //Places marker on main board
        gameBoard.placeMarker(index,getCurrentSign());
        
        //If it is X's turn push the index of the X marker on the X board
        //Checks if X won the game
        if(getCurrentSign() === 'X'){
            // controls.changeTurnText(game.getCurrentSign());
            // console.log('X Turn');
            gameBoard.placeX(index);
            if(checkIfWinner(gameBoard.returnX())){
                controls.setResultText('X');
            }
            else if(round === 9){
                controls.setResultText('Draw');
            }
            else{
                controls.changeTurnText('O');
            }
            
        }
        //If it is O's turn push the index of the O marker on the O board
        //Checks if O has won the game
        else{
            // controls.changeTurnText(game.getCurrentSign());
            // console.log('O Turn');
            gameBoard.placeO(index);
            if(checkIfWinner(gameBoard.returnO())){
                controls.setResultText('O');
            }
            else if(round === 9){
                controls.setResultText('Draw');
            }
            else{
                controls.changeTurnText('X');
            }
        }
        round ++;

    }

    const getCurrentSign = () => {
        return round % 2 ? player1.getSign() : player2.getSign();
    }
    //checks If X or O has a winning combination
    const checkIfWinner = (board) => {
        //Array of all board positions that would result in a win
        const winConditions = [
            [0,1,2],
            [0,4,8],
            [2,3,6],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,4,8]
        ];
        //Checks the X board or O board vs all the winning combinations
        const checker = (arr, targetArr) => targetArr.every(v => arr.includes(v));
        for(i=0;i<winConditions.length; i++) {
            if(checker(board, winConditions[i])){
                gameOver = true;
                return true;
            }
        }
    }
    //Getter for the game over
    const isGameOver= () => {
        return gameOver
    };
    //resets the game properties 
    const reset = () => {
        round = 1;
        gameOver=false;
    }

    return {play , getCurrentSign, checkIfWinner, isGameOver, reset}
})();