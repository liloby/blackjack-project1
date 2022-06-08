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
        betEl.innerHTML = `BETS: $ ${currentBet}`
    }
    // add else statement with a max-cap sound
}

clearEl.addEventListener('click', removeBet)

function removeBet() {
    currentBet = 0
    betEl.innerHTML = `BETS: $ ${currentBet}`
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
   betEl.innerHTML = `BETS: $ ${currentBet}`
    }
    render()
}

const resetEl = document.getElementById('reset-game')

resetEl.addEventListener('click', initGame)

function initGame() {
    currentBal = 200
    currentBet = 0
    betEl.innerHTML = `BETS: $ ${currentBet}`
    balEl.innerHTML = `BAL: $ ${currentBal}`
    totalBetsEl.innerHTML = ``
    createDeck()
    shuffleDeck()
    dealComputer()
}

let deck;

function createDeck() {
    const cardSuits = ['d', 'c', 'h', 's']
    const cardValues = ['02', '03', '04', '05', '06', '07', '08', '09', '10', "J", 'Q', 'K', 'A']
    deck = []

    for (let i = 0; i < cardSuits.length; i++) {
        for (let j = 0; j < cardValues.length; j++) {
            deck.push(`${cardSuits[i]}${cardValues[j]}`)
        }
    }
}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let randomizeNum = Math.floor(Math.random() * deck.length)
        let randomCard = deck[i]
        deck[i] = deck[randomizeNum]
        deck[randomizeNum] = randomCard
    }
    console.log(deck)
}

const playerDeck = document.getElementById('player-deck')
let computerSum = 0;
let playerSum = 0;

function dealComputer() {
    hidden = deck.pop()
    card = deck.pop()
    console.log("hidden: " + hidden)
    console.log("shown: " + card)
    computerSum += getValue(hidden) + getValue(card)
    console.log(computerSum)
}




function render(){
    // For Player
    if (playerSum < 22){
    card = deck.pop()
    playerSum += getValue(card)
    console.log(playerSum)
    }
}

function getValue(card) {
    let data = card.split('')
    console.log(data)
    let value = data[2]
    if (isNaN(value)) {
        if (value == 'A') {
            return 11
        }
        return 10
    }
    return parseInt(value)
}



let playerResult;
let dealerResult;




initGame()