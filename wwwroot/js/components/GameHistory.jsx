import React, { useState, useEffect } from 'react';

const GameHistory = () => {
    const [error, setError] = useState(null);
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchPlayers = async () => {
            const response = await fetch('/Game/GetGames');
            if (response.ok) {
                const data = await response.json();
                const sortedGames = data.sort((a, b) => b.game.grand_total - a.game.grand_total);

                setGames(sortedGames);
                setError(null);
            } else {
                setError('Failed to fetch games');
            }
        };

        fetchPlayers();
    }, []);

    const getScoreStatus = (score) => {
        if (score >= 50 && score <= 129) {
            return "Beginner: A beginner bowler might score between 50-129 points in their first game.";
        } else if (score >= 130 && score <= 150) {
            return "Average: An average bowler might score between 130-150 points.";
        } else if (score > 150 && score <= 200) {
            return "Pretty good: A bowler who can score up to 200 points is considered pretty good.";
        } else if (score > 200) {
            return "Professional: A professional bowler might average over 200 points.";
        } else {
            return "Needs improvement: Keep practicing to improve your bowling score.";
        }
    };

    return (
        <div>
            <h1 className="mt-4">Game History</h1>
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            <table className="table table-white-bg mt-4 rounded">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Score</th>
                        <th scope="col">Message</th>
                    </tr>
                </thead>
                <tbody>
                    {games.length ? (
                        <>
                            {games.map((player, index) => (
                                <tr key={index}>
                                    <td>{player.name}</td>
                                    <td>{player.game.grand_total}</td>
                                    <td>{getScoreStatus(player.game.grand_total)}</td>
                                </tr>
                            ))}
                        </>
                    ) : (
                        <tr key="no-history">
                            <td colSpan="3" className="text-center">No history has been saved</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default GameHistory;
