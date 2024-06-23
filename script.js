document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.square');
    const message = document.getElementById('message');
    const resetButton = document.getElementById('reset');
    let currentPlayer = 'X';
    // creating the board
    let board = Array(9).fill(null);
    let gameActive = true;

    // setting all winning combos
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // get the index of the clicked square
    function handleClick(event) {
        const index = event.target.getAttribute('data-index');
        console.log('Clicked square index:', index);

        // checking if square is already used
        if (board[index] || !gameActive) {
            console.log('Square already used');
            return;
        }

        board[index] = currentPlayer;
        event.target.textContent = currentPlayer;

        // checking for winner after each move
        if (checkWinner()) {
            console.log(`Player ${currentPlayer} wins!`);
            message.textContent = `Player ${currentPlayer} Wins!`;
            gameActive = false;
            return;
        }

        // checking for tie if all squares are filled
        if (board.every(square => square)) {
            console.log('Game over. It\'s a tie.');
            message.textContent = `It's a Tie!`;
            gameActive = false;
            return;
        }

        // switching playrs after each move
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        console.log(`Current player: ${currentPlayer}`);
        message.textContent = `Player ${currentPlayer}'s Turn`;
    }

    // function that checks for winner
    function checkWinner() {
        return winningCombos.some(combo => {
            const [a, b, c] = combo;
            return board[a] && board[a] === board[b] && board[a] === board[c];
        });
    }

    // funciton for reseting the game
    function resetGame() {
        board = Array(9).fill(null);
        gameActive = true;
        currentPlayer = 'X';
        squares.forEach(square => square.textContent = '');
        message.textContent = `Player ${currentPlayer}'s Turn`;
        console.log('Game reset.');
    }

    // event listener to handle square clicks
    squares.forEach(square => square.addEventListener('click', handleClick));
    resetButton.addEventListener('click', resetGame);

    // initial message to indicate the start of the game
    message.textContent = `Player ${currentPlayer}'s Turn`;
    console.log('Game initialized.');
});
