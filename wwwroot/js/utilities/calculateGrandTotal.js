const calculateGrandTotal = (player) => {
    let total = 0;
    for (let i = 1; i <= 10; i++) {
        const frame = player.game[`frame${i}`];
        const score1 = frame.score1;
        const score2 = frame.score2;
        const score3 = frame.score3

        if (i == 10 && score3) {

            let total1 = ["X"].includes(score1) ? 10 : score1;
            let total2 = ["X"].includes(score2) ? 10 : score2;
            let total3 = ["X"].includes(score3) ? 10 : score3;
            if (total2 == "/") {
                total1 = 0;
                total2 = 10;
            }

            total += parseInt(total1) + parseInt(total2) + parseInt(total3);

        } else if (score1 == "X") {

            let firstSingleScore = 0;
            if (player.game[`frame${i + 1}`]) {
                firstSingleScore = ["/", "X"].includes(player.game[`frame${i + 1}`].score1) ? 10 : parseInt(player.game[`frame${i + 1}`].score1);
            }

            let secondSingleScore = 0;
            if (player.game[`frame${i + 1}`] && player.game[`frame${i + 1}`].score2 != " " && player.game[`frame${i + 1}`].score2 != "/") {
                secondSingleScore = ["/", "X"].includes(player.game[`frame${i + 1}`].score2) ? 10 : parseInt(player.game[`frame${i + 1}`].score2);
            }

            if (player.game[`frame${i + 1}`] && player.game[`frame${i + 1}`].score2 != " " && player.game[`frame${i + 1}`].score2 == "/") {
                secondSingleScore = ["/", "X"].includes(player.game[`frame${i + 1}`].score2) ? 10 - parseInt(player.game[`frame${i + 1}`].score1) : parseInt(player.game[`frame${i + 1}`].score2);
            }

            if (parseInt(secondSingleScore) == 0 && player.game[`frame${i + 2}`]) {
                secondSingleScore = ["/", "X"].includes(player.game[`frame${i + 2}`].score1) ? 10 : parseInt(player.game[`frame${i + 2}`].score1);
            }
            let totalTwoShots = firstSingleScore + secondSingleScore;

            if (totalTwoShots > 0) {
                total += totalTwoShots + 10;
            }

        } else if (score2 == "/") {

            let nextSingleScore = 0;
            if (player.game[`frame${i + 1}`]) {
                nextSingleScore = ["/", "X"].includes(player.game[`frame${i + 1}`].score1) ? 10 : parseInt(player.game[`frame${i + 1}`].score1);
            }

            if (nextSingleScore > 0) {
                total += nextSingleScore + 10
            } else {
                if (i == 10 && score3) {
                    total += parseInt(score3) + 10;
                }
            }

        } else {

            total += parseInt(score1) + parseInt(score2);
            if (i == 10 && score3) {
                total += parseInt(score3);
            }

        }
    }
    player.game.grand_total = total;
}

export default calculateGrandTotal;