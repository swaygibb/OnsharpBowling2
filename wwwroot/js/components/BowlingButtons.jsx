import React from 'react';

const BowlingButtons = ({ handleScoreClick }) => {
    return (
        <div className="d-flex flex-row mb-3">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'X'].map(score => (
                <button
                    key={score}
                    type="button"
                    className="btn btn-primary mx-1"
                    onClick={() => handleScoreClick(score)}
                >
                    {score}
                </button>
            ))}
        </div>
    );
};

export default BowlingButtons;
