ocument.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const message = document.getElementById('message');
    const resetButton = document.getElementById('reset');
    let currentPlayer = 'X';
    let board = Array(9).fill(null);
    let gameActive = true;

    // added winning combos for the game
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

    function handleClick(event) {
        const index = event.target.getAttribute('data-index');
        console.log('Clicked cell index:', index);

        if (board[index] || !gameActive) {
            console.log('Cell already occupied or game over.');
            return;
        }

        board[index] = currentPlayer;
        event.target.textContent = currentPlayer;

        if (checkWinner()) {
            console.log(`Player ${currentPlayer} wins!`);
            message.textContent = `Player ${currentPlayer} Wins!`;
            gameActive = false;
            return;
        }

        if (board.every(cell => cell)) {
            console.log('Game over. It\'s a tie.');
            message.textContent = `It's a Tie!`;
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        console.log(`Current player: ${currentPlayer}`);
        message.textContent = `Player ${currentPlayer}'s Turn`;
    }

    function checkWinner() {
        return winningCombos.some(combo => {
            const [a, b, c] = combo;
            return board[a] && board[a] === board[b] && board[a] === board[c];
        });
    }