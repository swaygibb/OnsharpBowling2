import React, { useEffect, useState } from 'react';
import basePlayerGame from '../data/basePlayerGame';
import BowlingButtons from './BowlingButtons';
import PlayerFrames from './PlayerFrames';
import handleScoreClick from '../utilities/bowlingUtils';

const BowlingGame = ({ players, handleResetGame, setShowHistory }) => {
    const [gamePlayers, setGamePlayers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (Array.isArray(players)) {
            const tempPlayers = players.map(player => ({
                name: player,
                game: JSON.parse(JSON.stringify(basePlayerGame))
            }));
            let firstPlayer = tempPlayers[0];

            // Initialize first player and first frame
            firstPlayer.game.player_active = true;
            firstPlayer.game.frame1.active1 = true;

            setGamePlayers(tempPlayers);
        }
    }, [players]);

    const handleResetBowlingGame = () => {
        const tempPlayers = players.map(player => ({
            name: player,
            game: JSON.parse(JSON.stringify(basePlayerGame))
        }));
        let firstPlayer = tempPlayers[0];
        firstPlayer.game.player_active = true;
        firstPlayer.game.frame1.active1 = true;

        setGamePlayers(tempPlayers);
        handleResetGame();
    };

    const handleFinishGame = async () => {
        await finishGame();
    }

    const finishGame = async () => {
        const response = await fetch('/Game/FinishGame', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(gamePlayers)
        });

        if (response.ok) {
            setError(null);
            handleResetBowlingGame();
            setShowHistory(true);
        } else {
            setError('Failed to add game');
        }
    };

    const getActivePlayer = () => {
        let activePlayer = null;
        gamePlayers.forEach((player) => {
            if (player.game.player_active == true) {
                activePlayer = player;
            }
        })
        return activePlayer ? activePlayer.name : "Player Not Found";
    }

    const handleButtonClick = (score) => {
        handleScoreClick(gamePlayers, setGamePlayers, score);
    };

    return (
        <div className="container">
            <h1 className="mt-4">Bowling Game <small>Currently Bowling: {getActivePlayer()}</small></h1>
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            <p>Submit Throw:</p>
            <BowlingButtons handleScoreClick={handleButtonClick} />
            <div className="row border rounded">
                {gamePlayers.map((player, index) => (
                    <div key={player.name} className={`col-md-12 p-0`}>
                        <div className={`card rounded-0 border-0 ${index === gamePlayers.length - 1 ? 'rounded-bottom' : index === 0 ? 'rounded-top' : ''}`}>
                            <div className="card-body">
                                <div className="row text-black">
                                    <PlayerFrames player={player} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button type="button" className="btn btn-secondary mt-2" onClick={handleResetBowlingGame}>
                Reset Game
            </button>
            <button type="button" className="btn btn-danger mt-2 ms-2" onClick={handleFinishGame}>
                Finish Game
            </button>
        </div>
    );
};

export default BowlingGame;
