import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import PlayerForm from './components/PlayerForm';
import BowlingGame from './components/BowlingGame';
import GameHistory from './components/GameHistory';

const App = () => {
    const [players, setPlayers] = useState([]);
    const [error, setError] = useState(null);
    const [gameStarted, setGameStarted] = useState(false);
    const [showHistory, setShowHistory] = useState(false);

    useEffect(() => {
        const fetchPlayers = async () => {
            const response = await fetch('/Home/GetPlayers');
            if (response.ok) {
                const data = await response.json();
                setPlayers(data);
                setError(null);
            } else {
                setError('Failed to fetch players');
            }
        };

        fetchPlayers();
    }, []);

    const handleAddPlayer = (newPlayers) => {
        setPlayers(newPlayers);
    };

    const handleRemovePlayer = async (name) => {
        const response = await fetch('/Home/RemovePlayer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name })
        });

        if (response.ok) {
            const data = await response.json();
            setPlayers(data);
            setError(null);
        } else {
            setError('Failed to remove player');
        }
    };

    const handleClearGameHistory = async (name) => {
        const response = await fetch('/Game/ClearGameHistory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            setError(null);
            setShowHistory(false);
        } else {
            setError('Failed to remove player');
        }
    };

    const handleStartGame = () => {
        setGameStarted(true);
    };

    const handleResetGame = () => {
        setGameStarted(false);
    };

    return (
        <div className="container">
            {!showHistory ?
                <>
                    {!gameStarted ?
                        <>
                            <h1 className="mt-4">Player Setup</h1>
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}
                            <PlayerForm onSubmit={handleAddPlayer} />
                            <ul className="list-group mt-4">
                                {players.map((player, index) => (
                                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                        {player}
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleRemovePlayer(player)}
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            {players.length > 0 &&
                                <button type="button" className="btn btn-primary mt-2" onClick={handleStartGame}>
                                    Start Game
                                </button>
                            }
                            <button type="button" className="btn btn-secondary mt-2 ms-2" onClick={() => setShowHistory(true)}>
                                Show Game History
                            </button>
                            <a href="/Home/Tips" className="btn btn-secondary mt-2 ms-2">
                                Show Bowling Tips
                            </a>
                        </>
                        :
                        <BowlingGame players={players} handleResetGame={handleResetGame} setShowHistory={setShowHistory} />
                    }
                </>
                :
                <>
                    <button type="button" className="btn btn-secondary mt-2" onClick={() => setShowHistory(false)}>
                        Close Game History
                    </button>
                    <button type="button" className="btn btn-danger mt-2 ms-2" onClick={handleClearGameHistory}>
                        Clear Game History
                    </button>
                    <a href="/Home/Tips" className="btn btn-secondary mt-2 ms-2">
                        Show Bowling Tips
                    </a>
                    <GameHistory setShowHistory={setShowHistory} />
                </>
            }
        </div>
    );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
