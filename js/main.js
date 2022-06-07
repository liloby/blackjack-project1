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
}

let deck;

function createDeck() {
    const cardValues = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', "J", 'Q', 'K']
    const cardSuits = ['D', 'C', 'H', 'S']
    deck = []

    for (let i = 0; i < cardValues.length; i++) {
        for (let j = 0; j < cardSuits.length; j++) {
            deck.push(`${cardValues[i]} - ${cardSuits[j]}`)
        }
    }
}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let randomizeDeck = Math.floor(Math.random() * deck.length)
        let randomCard = deck[i]
        deck[i] = deck[randomizeDeck]
        deck[randomizeDeck] = randomCard
    }
    console.log(deck)
}

function render(){
    let card = deck[deck.length - 1]
    deck.pop()
    console.log(card)

    
}

let player;
let computer;




initGame()