const chipsEl = document.getElementById('money-chips')
const betEl = document.getElementById('bet-box')
const balEl = document.getElementById('balance-box')
const clearEl = document.getElementById('clear-btn')
const totalBetsEl = document.querySelector('div h3')


chipsEl.addEventListener('click', addBet)
let currentBal = 200;
let currentBet = 0;

function addBet(evt) {
    if (currentBal > currentBet) {
        if (evt.target.innerHTML === '$1') {
        currentBet += 1
     }
        if (evt.target.innerHTML === '$5') {
        currentBet += 5
        }
        if (evt.target.innerHTML === '$10') {
        currentBet += 10
     }
        console.log(currentBet)
        betEl.innerHTML = `BET: $ ${currentBet}`
    }
}

clearEl.addEventListener('click', removeBet)

function removeBet() {
    currentBet = 0
    betEl.innerHTML = `BET: $ ${currentBet}`
}



const hitEl = document.getElementById('hit-btn')
const stayEl = document.getElementById('stay-btn')


hitEl.addEventListener('click', hitMe)

function hitMe() {
    if (currentBet > 0) {
   currentBal = currentBal - currentBet
   balEl.innerHTML = `BAL: $ ${currentBal}`
   totalBetsEl.innerHTML = `$ ${currentBet}`
   currentBet = 0
   betEl.innerHTML = `BET: $ ${currentBet}`
    }
}

const resetEl = document.getElementById('reset-game')

resetEl.addEventListener('click', resetGame)

function resetGame() {
    currentBal = 200
    currentBet = 0
    betEl.innerHTML = `BET: $ ${currentBet}`
    balEl.innerHTML = `BAL: $ ${currentBal}`
    totalBetsEl.innerHTML = ``
}

