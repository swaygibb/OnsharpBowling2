const calculateFrameTotals = (game, currentFrame) => {
    let runningScore = 0;
    for (let i = 1; i <= 10; i++) {
        const score1 = game[`frame${i}`].score1;
        const score2 = game[`frame${i}`].score2;
        const score3 = game[`frame${i}`].score3;

        if (currentFrame == 10 && i == 10) {
            let total1 = ["X"].includes(score1) ? 10 : score1;
            let total2 = ["X"].includes(score2) ? 10 : score2;
            let total3 = ["X"].includes(score3) ? 10 : score3;
            if (total2 == "/") {
                total2 = 10 - total1;
            }

            runningScore += parseInt(total1) + parseInt(total2) + parseInt(total3);
            game[`frame${i}`].total = runningScore;
        } else if (score1 == "X") {
            let firstSingleScore = 0;
            if (game[`frame${i + 1}`]) {
                firstSingleScore = ["/", "X"].includes(game[`frame${i + 1}`].score1) ? 10 : parseInt(game[`frame${i + 1}`].score1);
            }

            let secondSingleScore = 0;
            if (game[`frame${i + 1}`] && game[`frame${i + 1}`].score2 != " " && game[`frame${i + 1}`].score2 != "/") {
                secondSingleScore = ["/", "X"].includes(game[`frame${i + 1}`].score2) ? 10 : parseInt(game[`frame${i + 1}`].score2);
            }

            if (game[`frame${i + 1}`] && game[`frame${i + 1}`].score2 != " " && game[`frame${i + 1}`].score2 == "/") {
                secondSingleScore = ["/", "X"].includes(game[`frame${i + 1}`].score2) ? 10 - parseInt(game[`frame${i + 1}`].score1) : parseInt(game[`frame${i + 1}`].score2);
            }

            if (parseInt(secondSingleScore) == 0 && game[`frame${i + 2}`]) {
                secondSingleScore = ["/", "X"].includes(game[`frame${i + 2}`].score1) ? 10 : parseInt(game[`frame${i + 2}`].score1);
            }
            let totalTwoShots = firstSingleScore + secondSingleScore;

            if (totalTwoShots > 0) {
                runningScore += totalTwoShots + 10;
                game[`frame${i}`].total = runningScore;
            } else {
                game[`frame${i}`].total = '-';
            }
        } else if (score2 == "X") {
            let firstSingleScore = 0;
            if (game[`frame${i + 1}`]) {
                firstSingleScore = ["/", "X"].includes(game[`frame${i + 1}`].score1) ? 10 : parseInt(game[`frame${i + 1}`].score1);
            }

            let secondSingleScore = 0;
            if (game[`frame${i + 1}`] && game[`frame${i + 1}`].score2 != " ") {
                secondSingleScore = ["/", "X"].includes(game[`frame${i + 1}`].score2) ? 10 : parseInt(game[`frame${i + 1}`].score2);
            }

            if (parseInt(secondSingleScore) == 0 && game[`frame${i + 2}`]) {
                secondSingleScore = ["/", "X"].includes(game[`frame${i + 2}`].score1) ? 10 : parseInt(game[`frame${i + 2}`].score1);
            }
            let totalTwoShots = firstSingleScore + secondSingleScore;

            if (totalTwoShots > 0) {
                runningScore += totalTwoShots + 10;
                game[`frame${i}`].total = runningScore;
            } else {
                game[`frame${i}`].total = '-';
            }
        } else if (score2 == "/") {

            let nextSingleScore = 0;
            if (game[`frame${i + 1}`]) {
                nextSingleScore = ["/", "X"].includes(game[`frame${i + 1}`].score1) ? 10 : parseInt(game[`frame${i + 1}`].score1);
            }

            if (nextSingleScore > 0) {
                runningScore += nextSingleScore + 10;
                if (i == 10 && score3) {
                    runningScore += parseInt(score3);
                }
                game[`frame${i}`].total = runningScore
            } else {
                game[`frame${i}`].total = "-";
                if (i == 10 && score3) {
                    runningScore += parseInt(score3);
                    game[`frame${i}`].total = runningScore + 10
                }
            }

        } else {
            if (parseInt(score1) > 0 || parseInt(score2) > 0) {
                runningScore += parseInt(score1) + parseInt(score2);
                if (i == 10 && score3) {
                    runningScore += parseInt(score3);
                }
                game[`frame${i}`].total = runningScore;
            }
        }
    }
};

export default calculateFrameTotals;