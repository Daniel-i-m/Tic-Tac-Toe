const gameboard = (() => {
  let _board = ["", "", "d", "", "l ", "", "", "", ""];
  const getBoard = () => _board;

  // ********************** function to fill THE _board ARRAY
  function addMark(cellIndex, playerMark) {
    _board[cellIndex] = playerMark;
  }

  function init() {
    // eslint-disable-next-line no-return-assign
    _board = _board.map(cell => cell = "");
    console.log(_board);
  }

  // **************** RETURN VALUES
  return {
    getBoard,
    addMark,
    init,
  };
})();

// ************ factory to create players
function createPlayer(name, mark) {
  return {
    name,
    mark,
  };
}
const _board = gameboard.getBoard();
const gameControl = (() => {
  // let _board = gameboard.getBoard();
  const player1 = createPlayer("Dan", "X");
  const player2 = createPlayer("Comp", "O");

  let activePlayer = player1;

  let gameEnded = false; // will change on winning or draw
  let _textContent = "Play.."; // will give text to change on display

  const switchPlayer = () => {
    activePlayer = activePlayer === player1 ? player2 : player1;
    return activePlayer;
  };

  const _checkForWin = () => {
    // Possible winning combinations in Tic Tac Toe game
    const winnings = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];

    for (const win of winnings) {
      const [cell1, cell2, cell3] = win;

      if (
        _board[cell1] &&
        _board[cell1] === _board[cell2] &&
        _board[cell1] === _board[cell3]
      ) {
        return true;
      }
    }
    return false;
  };

  const _isDraw = () => _board.every((cell) => cell !== "");

  const play = (cellIndex) => {
    if (gameEnded) return;

    if (!_board[cellIndex]) {
      gameboard.addMark(cellIndex, activePlayer.mark);

      if (_checkForWin()) {
        _textContent = `${activePlayer.mark} has won!`;
        gameEnded = true;
      } else if (_isDraw()) {
        _textContent = "It's a Tie!";
        gameEnded = true;
      } else {
        switchPlayer();
        _textContent = `It's ${activePlayer.mark}'s turn!`;
      }
    }
  };
  // const init = () => {
  //   _board = _board.map((cell) => (cell = ""));
  //   console.log(_board);
  // };
  const getText = () => _textContent;

  return {
    activePlayer,
    play,
    getText,
    // init,
  };
})();

// ************* UI/Display CONTROlER
function displayControl() {
  const boardCells = Array.from(document.querySelectorAll(".cell"));
  const textDisplay = document.querySelector("#display-main");
  const displayBoard = document.querySelector(".board");

  const restart = document.getElementById("restart");

  // const board = gameboard.getBoard();

  // ********** Render / Change UI
  function render() {
    for (let i = 0; i < _board.length; i++) {
      boardCells[i].textContent = _board[i];
    }

    textDisplay.textContent = gameControl.getText();
  }
  restart.onclick = () => {
    gameboard.init();
    render();
    textDisplay.textContent = "Let's go!";
  };

  // ************ bind EVENTS
  function handleClick(e) {
    const cellIndex = e.target.id;
    if (!cellIndex) {
      alert("Click right cell");
    }

    gameControl.play(cellIndex);
    render();
  }

  displayBoard.addEventListener("click", handleClick);

  render();
}
displayControl();
