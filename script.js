'use strict';
let scores, currentScore, activePlayer, flag;
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const btnRestart = document.querySelector('.btn--new');
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');


const init = function()
{
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    flag = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    document.querySelector('.player--0').classList.remove('player--winner');
    document.querySelector('.player--1').classList.remove('player--winner');
    document.querySelector('.player--1').classList.remove('player-active');
    document.querySelector('.player--0').classList.add('player--active');
};


init();


const switchPlayer = function()
{
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};


btnRollDice.addEventListener('click', function () {
    if(flag) {
        const dice = Math.floor(Math.random() * 6) + 1;
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;
        if(dice !== 1)
        {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
})


btnHold.addEventListener('click', function() {
    if(flag) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        if(scores[activePlayer] >= 100) {
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            flag = false;
        } else {
            switchPlayer();
        }
    }
})


btnRestart.addEventListener('click', init);