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
stayEl.addEventListener('click', compareResults)

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
    dealPlayer()
}


let deck;


function createDeck() {
    const suits = ['d', 'c', 'h', 's']
    const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', "J", 'Q', 'K', 'A']
    deck = []

    suits.forEach(function(suit) {
        ranks.forEach(function(rank) {
            deck.push({
                
                face: `${suit}${rank}`,

                value: Number(rank) || (rank === 'A' ? 11 : 10)

            })
        })
    })
    return deck
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
const computerDeck = document.getElementById('computer-deck')
const hiddenCardEl = document.getElementById('hidden-card')
let computerSum = 0;
let playerSum = 0;

function dealComputer() {
    hidden = deck.pop()
    hiddenCardEl.classList = (`card back-red large ${hidden.face}`)
    card = deck.pop()
    console.log("hidden: " + hidden.value)
    // console.log("shown: " + card.value)
    const newCardEl = document.createElement('div')
    newCardEl.classList = `card ${card.face} large`
    computerDeck.appendChild(newCardEl)
    computerSum += hidden.value + card.value
    console.log(computerSum)
}

function dealPlayer() {
    card = deck.pop()
    sumValue()
    hitPlayer()
    card = deck.pop()
    sumValue()
    hitPlayer()
}

function render(){
    // For Player
    if (playerSum < 21){
    card = deck.pop()
    aceCheck()
    // console.log("Card: " + card.face)
    playerSum += card.value
    // console.log(playerSum)
    hitPlayer()
    }
    if(playerSum > 21) {
        document.getElementById('card-counter').style.color = 'red' 
    }

}

function sumValue() {
    playerSum += card.value
}

function hitPlayer() {
    const newCardEl = document.createElement('div')
    newCardEl.classList = `card ${card.face} large`
    playerDeck.appendChild(newCardEl)
    document.getElementById('card-counter').innerHTML = playerSum
    playerResults()
}

const message = document.querySelector('h2')

function playerResults() {
    if (playerSum > 21) {
        console.log("busted")
        message.innerHTML = "BUSTED"
    }
}

function compareResults() {
    hiddenCardEl.classList.remove('back-red')
    while (computerSum <= playerSum && computerSum < 21 && playerSum < 22) {
        card = deck.pop()
        aceCheck()
        const newCardEl = document.createElement('div')
        newCardEl.classList = `card ${card.face} large`
        computerDeck.appendChild(newCardEl)
        computerSum += card.value
    }
    
        if (playerSum > computerSum && playerSum < 22 || computerSum < playerSum) {
            message.innerHTML ="Player Wins"
        } else if (computerSum === playerSum) {
            message.innerHTML = "Tie"
        } else if (computerSum > 21) {
            message.innerHTML = "Dealer BUSTED"
        } 
        else {
            message.innerHTML = "You Lose"
        }
        return
    } 
let computerAceCount = 0;
let playerAceCount = 0;

function aceCheck () {
    if (playerSum > 22 && aceCount > 0) {
        playerSum -= 10
        playerAceCount -= 1
    }
    if (computerSum > 22 && aceCount > 0) {
        computerSum -= 10
        computerAceCount -= 1
    }
    return
}


initGame()