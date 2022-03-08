const createPlayer = (sign) => {
    this.sign = sign;
    const getSign = () => {
        return sign;
    }
    return{getSign};
}

const gameBoard = (() => {
    const board = ["","","","","","","","",""];
    const xBoard =[];
    const oBoard =[];
    const placeMarker = (index,marker) => {
        board[index] = marker;
    }
    const getMarker = (index) => {
        return board[index];
    }
    const placeX = (index) => {
        xBoard.push(parseInt(index));
    }
    const placeO = (index) => {
        oBoard.push(parseInt(index));
    }
    const returnX = () => xBoard;
    const returnO = () => oBoard;
    const currentBoard = () => board;
    return {placeMarker, getMarker, placeX, placeO, currentBoard, returnX, returnO};
})();

const controls =(() => {
    const gridElements = document.querySelectorAll('.grid');
    gridElements.forEach((grid) => 
        grid.addEventListener('click', (e) => {
            if(e.target.textContent !== "") return;
            
            if(game.isGameOver()){
                alert('Game Is Over');
            }
            else{
                game.play(e.target.id);
                updateGameboard();
            }
        })
    )
    const updateGameboard = () => {
        for(i=0; i< 9; i++){
            gridElements[i].innerText = gameBoard.getMarker(i);
        }
    }
    return {updateGameboard}
})();

const game =(() => {
    const player1 = createPlayer('X');
    const player2 = createPlayer('O');
    let gameOver = false;
    let round = 1;

    const play = (index)  => {
        gameBoard.placeMarker(index,getCurrentSign());
        if(getCurrentSign() === 'X'){
            gameBoard.placeX(index);
            checkIfWinner(gameBoard.returnX());
        }
        else{
            gameBoard.placeO(index);
            checkIfWinner(gameBoard.returnO());
        }
        round ++;
    }

    const getCurrentSign = () => {
        return round % 2 ? player1.getSign() : player2.getSign();
    }

    const checkIfWinner = (board) => {
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
        const checker = (arr, targetArr) => targetArr.every(v => arr.includes(v));
        for(i=0;i<winConditions.length; i++) {
            if(checker(board, winConditions[i])){
                gameOver = true;
            }
        }
        
        
    }
    const isGameOver= () => gameOver;

    return {play , getCurrentSign, checkIfWinner, isGameOver}
})();