import React from 'react';

const PlayerFrames = ({ player }) => {
    const generateFrames = () => {
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
            let frameActive3 = player.game[`frame${i}`].active3;

            frames.push(
                <div key={i} className={`col p-0 text-center border-top border-bottom ${i !== 10 ? 'border-end' : ''}`}>
                    <div className="score-parent">
                        <div className={`score-one ${player.game.player_active && frameActive1 ? 'fw-bold' : ''}`}>{player.game[`frame${i}`].score1}</div>
                        {i == 10 ? 
                            <>
                                <div className={`score-two-short border-start border-bottom ${player.game.player_active && frameActive2 ? 'fw-bold' : ''}`}>
                                    {player.game[`frame${i}`].score2}
                                </div>
                                <div className={`score-three-short border-start border-bottom ${player.game.player_active && frameActive3 ? 'fw-bold' : ''}`}>
                                    {player.game[`frame${i}`].score3}
                                </div>
                            </>
                            :
                            <div className={`score-two border-start border-bottom ${player.game.player_active && frameActive2 ? 'fw-bold' : ''}`}>
                                {player.game[`frame${i}`].score2}
                            </div>
                        }
                        <div className="score-total pb-2">{ player.game[`frame${i}`].total }</div>
                    </div>
                </div>
            );
        }

        frames.push(
            <div key="total" className="col text-center border d-flex align-items-center">
                <div className="player-total w-100">
                    <h5 className="card-title text-black mb-0 text-center">{player.game.grand_total}</h5>
                </div>
            </div>
        );

        return frames;
    };

    return (
        <div className="row text-black">
            {generateFrames()}
        </div>
    );
};

export default PlayerFrames;
