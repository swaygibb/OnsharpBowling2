import React, { useEffect, useState } from 'react';
import basePlayerGame from '../data/basePlayerGame';
import BowlingButtons from './BowlingButtons';
import PlayerFrames from './PlayerFrames';
import handleScoreClick from '../utilities/bowlingUtils';

const BowlingGame = ({ players, handleResetGame }) => {
    const [gamePlayers, setGamePlayers] = useState([]);

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
        </div>
    );
};

export default BowlingGame;
