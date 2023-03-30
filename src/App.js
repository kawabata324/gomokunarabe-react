import {useState} from "react";

const Square = ({value, squareClick}) => {
    return (
        <button
            className="square"
            onClick={squareClick}
        >
            {value}
        </button>)
}

function Board({xIsNext, squares, onPlay}) {
    const handleClick = (i) => {
        if (squares[i] || calculateWinner(squares)) {
            return;
        }
        const newSquares = squares.slice();
        if (xIsNext) {
            newSquares[i] = 'X';
        } else {
            newSquares[i] = '○';
        }
        onPlay(newSquares)
    }

    const winner = calculateWinner(squares)
    let status;
    if (winner) {
        status = 'Winner: ' + winner
    } else {
        status = 'Next is ' + (xIsNext ? 'x' : '○')
    }
    return (
        <>
            <div className="status">
                {status}
            </div>
            <div className="board-row">
                <Square value={squares[0]} squareClick={() => handleClick(0)}/>
                <Square value={squares[1]} squareClick={() => handleClick(1)}/>
                <Square value={squares[2]} squareClick={() => handleClick(2)}/>
            </div>
            <div className="board-row">
                <Square value={squares[3]} squareClick={() => handleClick(3)}/>
                <Square value={squares[4]} squareClick={() => handleClick(4)}/>
                <Square value={squares[5]} squareClick={() => handleClick(5)}/>
            </div>
            <div className="board-row">
                <Square value={squares[6]} squareClick={() => handleClick(6)}/>
                <Square value={squares[7]} squareClick={() => handleClick(7)}/>
                <Square value={squares[8]} squareClick={() => handleClick(8)}/>
            </div>
        </>
    )
}

function calculateWinner(squares) {
    const lists = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    for (let i = 0; i < lists.length; i++) {
        const [a, b, c] = lists[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0
    const currentSquares = history[currentMove];

    const handlePlay = (nextSquares) => {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    const jumpTo = (move) => {
        setCurrentMove(move);
    }

    const moves = history.map((square, index) => {
        let description;
        if (index > 0) {
            description = 'Go to move #' + index;
        } else {
            description = 'Go to move game start';
        }

        return (
            <li key={index}>
                <button onClick={() => jumpTo(index)}>{description}</button>
            </li>
        )
    })


    return (
        <div className="game">
            <div className="game-board">
                <Board
                    xIsNext={xIsNext}
                    squares={currentSquares}
                    onPlay={handlePlay}
                />
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    );
}
