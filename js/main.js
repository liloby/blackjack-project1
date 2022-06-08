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

function placeBet() {
    
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

let round = 0;
function dealComputer() {
    if (round < 1) {
    card = deck.pop()
    computerAceCheck()
    computerSum += card.value
    hiddenCardEl.classList = (`card back-red large ${card.face}`)
    round += 1
    }
    card = deck.pop()
    computerAceCheck()
    console.log("hidden: " + card.value)
    // console.log("shown: " + card.value)
    const newCardEl = document.createElement('div')
    newCardEl.classList = `card ${card.face} large`
    computerDeck.appendChild(newCardEl)
    computerSum += card.value
    console.log(computerSum)
}

let playerCardsArr = []
let playerRound = 0;

// deal player's card twice, store card value in an array(for aceReduction), add value to playerSum and render
function dealPlayer() {
    let dealTwice = 2;
    while (dealTwice > 0) {
    card = deck.pop()
    playerAceCheck()
    sumValue()
    aceReduce()
    hitPlayer()
    dealTwice -= 1
    playerRound += 1
    }
}


function render(){
    
    // For Player
    // this if statement makes it so ace will reduce if two aces are dealt on first two rounds
    if (playerSum < 21) {
    card = deck.pop()
    playerRound += 1
    playerAceCheck()
    aceReduce()
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
        message.innerHTML = "You Lose!"
    } if (playerRound > 4 && playerSum < 21) {
        message.innerHTML = "You Win"
    }
}

function compareResults() {
    hiddenCardEl.classList.remove('back-red')
    while (computerSum <= playerSum && computerSum < 17 && playerSum < 22 || computerSum < 21 && computerSum < playerSum && computerAceCount > 0) {
        card = deck.pop()
        computerAceCheck()
        const newCardEl = document.createElement('div')
        newCardEl.classList = `card ${card.face} large`
        computerDeck.appendChild(newCardEl)
        computerSum += card.value
        computerAceCheck()
    }
        
        if (playerSum > computerSum && playerSum < 22 || computerSum < playerSum && playerSum < 22 || playerSum === 21 && playerRound === 2 || playerSum < 22 && playerRound > 4) {
            message.innerHTML ="You Win"
        } else if (computerSum === playerSum) {
            message.innerHTML = "Tie"
        } else if (computerSum > 21) {
            message.innerHTML = "You Win"
        } 
        else {
            message.innerHTML = "You Lose"
        }
    } 

let playerAceCount = 0;
let computerAceCount = 0;
function playerAceCheck() {
    if (card.value == '11' && playerSum !== 21) {
        playerAceCount += 1
        console.log("before reduction: " + playerAceCount)
    }
}

function computerAceCheck() {
    if (card.value == '11' && computerSum !== 21) {
        computerAceCount += 1
    } if (computerAceCount > 0) {
        aceReduce()
    }
}
// do one for computerAceCount

function aceReduce() {
    while (playerAceCount > 0 && playerSum !== 21) {
        playerSum -= 10
        playerAceCount -= 1
        console.log("after reduction: " + playerAceCount)
    }
    while (computerAceCount > 0 && computerSum !== 21 && computerSum < playerSum) {
        computerSum -= 10
        computerAceCount -= 1
        console.log("computer after reduction: " + computerAceCount)
    }
}

initGame()