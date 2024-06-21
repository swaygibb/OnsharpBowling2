import React, { useState } from 'react';

const PlayerForm = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/Home/AddPlayer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name })
        });

        if (response.ok) {
            const data = await response.json();
            onSubmit(data);
            setName('');
            setError(null);
        } else {
            setError('Failed to add player');
        }
    };

    return (
        <div>
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="form-group">
                    <label htmlFor="playerName">Player Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="playerName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-secondary mt-2">Add Player</button>
            </form>
        </div>
    );
};

export default PlayerForm;
