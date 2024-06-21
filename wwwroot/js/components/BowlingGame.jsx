import React, { useEffect, useState } from 'react';
import basePlayerGame from '../data/basePlayerGame';

const BowlingGame = ({ players, handleResetGame }) => {
    const [gamePlayers, setGamePlayers] = useState([]);

    useEffect(() => {
        if (Array.isArray(players)) {
            const tempPlayers = players.map(player => ({
                name: player,
                game: { ...basePlayerGame }
            }));
            let firstPlayer = tempPlayers[0];
            firstPlayer.game.player_active = true;
            firstPlayer.game.frame1.active1 = true;

            setGamePlayers(tempPlayers);
        }
    }, [players]);

    const handleResetBowlingGame = () => {
        handleResetGame();
    };

    const generateFrames = (player) => {
        const frames = [];

        frames.push(
            <div key={player.name} className="col text-center border d-flex align-items-center">
                <div className="player-name">
                    <p className={`card-title text-black mb-0 ${player.game.player_active ? 'highlight-text' : ''}`}>{player.name}</p>
                </div>
            </div>
        );

        for (let i = 1; i <= 10; i++) {
            let frameActive1 = player.game[`frame${i}`].active1;
            let frameActive2 = player.game[`frame${i}`].active2;

            frames.push(
                <div key={i} className={`col p-0 text-center border-top border-bottom ${i !== 10 ? 'border-end' : ''}`}>
                    <div className="score-parent">
                        <div className={`score-one ${player.game.player_active && frameActive1 ? 'fw-bold' : ''}`}>0</div>
                        <div className={`score-two border-start border-bottom ${player.game.player_active && frameActive2 ? 'fw-bold' : ''}`}>0</div>
                        <div className="score-total pb-2">0</div>
                    </div>
                </div>
            );
        }

        frames.push(
            <div key="total" className="col text-center border d-flex align-items-center">
                <div className="player-total w-100">
                    <h5 className="card-title text-black mb-0 text-center">0</h5>
                </div>
            </div>
        )

        return frames;
    };

    const getActivePlayer = () => {
        let activePlayer = null;
        gamePlayers.forEach((player) => {
            if (player.game.player_active) {
                activePlayer = player;
            }
        })
        return activePlayer ? activePlayer.name : "Player Not Found";
    }

    return (
        <div className="container">
            <h1 className="mt-4">Bowling Game <br /><small>Currently Bowling: {getActivePlayer()}</small></h1>
            <div className="row border rounded">
                {gamePlayers.map((player, index) => (
                    <div key={player.name} className={`col-md-12 p-0`}>
                        <div className={`card rounded-0 border-0 ${index === gamePlayers.length - 1 ? 'rounded-bottom' : index === 0 ? 'rounded-top' : ''}`}>
                            <div className="card-body">
                                <div className="row text-black">
                                    {generateFrames(player)}
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
