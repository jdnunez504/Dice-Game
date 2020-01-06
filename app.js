/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/



var scores, roundScore, activePlayer, gamePlaying, prevRoll1, prevRoll2, winScore, playerRoll1, playerRoll2;

init();

document.querySelector('.btn-input').addEventListener('click', function() {

    winScore = document.getElementById('win-score').value;
    document.querySelector('.input-panel').style.display = 'none';
    gamePlaying = true;
    console.log('Score entered ' + winScore);
    
});

document.querySelector('.btn-roll').addEventListener('click', function() {

    if (gamePlaying) {
        //1. Create random number
        var dice1 = Math.floor(Math.random() * 6 + 1);
        var dice2 = Math.floor(Math.random() * 6 + 1);
        
        playerRoll1 = dice1;
        playerRoll2 = dice2;

        //2. Display the result
        var diceDOM1 = document.querySelector('.dice-1');
        diceDOM1.style.display = 'block';
        diceDOM1.src = 'dice-' + playerRoll1 + '.png';

        var diceDOM2 = document.querySelector('.dice-2');
        diceDOM2.style.display = 'block';
        diceDOM2.src = 'dice-' + playerRoll2 + '.png';

        //3. Update round score IF numbered rolled was NOT a 1
        if (playerRoll1 !== 1 && playerRoll2 !== 1) {
            roundScore += playerRoll1 + playerRoll2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            console.log('Rolled a 1!');
            nextPlayer();
        }
        
        if (playerRoll1 === 6 || playerRoll2 === 6) {
            if (prevRoll1 === 6 || prevRoll2 === 6) {
                console.log('Two 6s in a row!');
                nextPlayer();
            }
        }

        prevRoll1 = playerRoll1;
        prevRoll2 = playerRoll2;

    }

});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // 1. Add current score to player score
        scores[activePlayer] += roundScore;

        // 2. Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // 3. Check for winner
        if (scores[activePlayer] >= winScore) {
            // 3a. Update UI to show winner
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice-1').style.display = 'none';
            document.querySelector('.dice-2').style.display = 'none';

            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-0-panel').classList.remove('active');

            gamePlaying = false;
        } else {
            // 3b. Continue game giving the other player the turn
            nextPlayer();
        }
    }
    
});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    playerRoll1 = 0;
    playerRoll2 = 0;
    prevRoll1 = 0;
    prevRoll2 = 0;

    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice-1').style.display = 'none';
    document.querySelector('.dice-2').style.display = 'none';

}

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;

    prevRoll1 = 0;
    prevRoll2 = 0;
    winScore = 0;
    
    gamePlaying = false;

    document.querySelector('.dice-1').style.display = 'none';
    document.querySelector('.dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');

    document.querySelector('.input-panel').style.display = 'block';

    document.getElementById('input-panel').reset();

}