import calculateFrameTotals from '../utilities/calculateFrameTotals';
import calculateGrandTotal from '../utilities/calculateGrandTotal';

const handleScoreClick = (gamePlayers, setGamePlayers, score) => {
    let tempGamePlayers = [...gamePlayers];
    let playerUpdated = false;

    for (let index = 0; index < tempGamePlayers.length; index++) {
        let player = tempGamePlayers[index];

        if (player.game.player_active === true) {
            for (let i = 1; i <= 10; i++) {

                if (player.game[`frame${i}`].active1 === true) {
                    player.game[`frame${i}`].active1 = false;
                    player.game[`frame${i}`].active2 = true;
                    player.game[`frame${i}`].score1 = score;
                    calculateFrameTotals(player.game, i);

                    if (score == "X" && i != 10) {
                        player.game[`frame${i}`].active2 = false;
                        player.game[`frame${i}`].score2 = " ";
                        player.game.player_active = false;

                        let nextPlayer;
                        if (tempGamePlayers[index + 1]) {
                            nextPlayer = tempGamePlayers[index + 1];
                        } else {
                            nextPlayer = tempGamePlayers[0];
                        }

                        if (nextPlayer) {
                            nextPlayer.game.player_active = true;
                            if (tempGamePlayers[index + 1]) {
                                nextPlayer.game[`frame${i}`].active1 = true;
                            } else if (nextPlayer.game[`frame${i + 1}`]) {
                                nextPlayer.game[`frame${i + 1}`].active1 = true;
                            }
                        }
                    }

                    playerUpdated = true;
                    break;
                } else if (
                    player.game[`frame${i}`].active2 === true &&
                    i == 10 &&
                    (
                        (parseInt(player.game[`frame${i}`].score1) + parseInt(score)) >= 10 ||
                        score == "X" ||
                        player.game[`frame${i}`].score1 == "X"
                    )
                ) {

                    player.game[`frame${i}`].active2 = false;
                    player.game[`frame${i}`].active3 = true;

                    if ((parseInt(player.game[`frame${i}`].score1) + parseInt(score)) >= 10) {
                        player.game[`frame${i}`].score2 = "/";
                    } else {
                        player.game[`frame${i}`].score2 = score;
                    }

                    calculateFrameTotals(player.game, i);

                    playerUpdated = true;
                    break;
                } else if (
                    player.game[`frame${i}`].active2 === true &&
                    (
                        i != 10 ||
                        !(
                            (parseInt(player.game[`frame${i}`].score1) + parseInt(score)) >= 10
                        )
                    )
                ) {
                    player.game[`frame${i}`].active2 = false;

                    if ((parseInt(player.game[`frame${i}`].score1) + parseInt(score)) >= 10) {
                        player.game[`frame${i}`].score2 = "/";
                    } else {
                        player.game[`frame${i}`].score2 = (score == "X" ? "/" : score);
                    }

                    player.game.player_active = false;
                    calculateFrameTotals(player.game, i);

                    let nextPlayer;
                    if (tempGamePlayers[index + 1]) {
                        nextPlayer = tempGamePlayers[index + 1];
                    } else {
                        nextPlayer = tempGamePlayers[0];
                    }

                    if (nextPlayer) {
                        nextPlayer.game.player_active = true;
                        if (tempGamePlayers[index + 1]) {
                            nextPlayer.game[`frame${i}`].active1 = true;
                        } else if (nextPlayer.game[`frame${i + 1}`]) {
                            nextPlayer.game[`frame${i + 1}`].active1 = true;
                        }
                    }
                    playerUpdated = true;
                    break;
                } else if (
                    i == 10 &&
                    player.game[`frame${i}`].active3 === true &&
                    (
                        ["/", "X"].includes(player.game[`frame${i}`].score2) ||
                        ["/", "X"].includes(player.game[`frame${i}`].score1)
                    )
                ) {

                    player.game[`frame${i}`].active3 = false;
                    player.game[`frame${i}`].score3 = score;
                    player.game.player_active = false;
                    calculateFrameTotals(player.game, i);

                    let nextPlayer;
                    if (tempGamePlayers[index + 1]) {
                        nextPlayer = tempGamePlayers[index + 1];
                    } else {
                        nextPlayer = tempGamePlayers[0];
                    }

                    if (nextPlayer) {
                        nextPlayer.game.player_active = true;
                        if (tempGamePlayers[index + 1]) {
                            nextPlayer.game[`frame${i}`].active1 = true;
                        } else if (nextPlayer.game[`frame${i + 1}`]) {
                            nextPlayer.game[`frame${i + 1}`].active1 = true;
                        }
                    }

                    playerUpdated = true;
                    break;
                }
            }

            calculateGrandTotal(player);

            if (playerUpdated) {
                break;
            }
        }
    }

    setGamePlayers(tempGamePlayers);
};

export default handleScoreClick;
