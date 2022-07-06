/*----- app's state (variables) -----*/
let dealerSum = 0;
let playerSum = 0;
let computerRound = 0;
let dealerAceCount = 0;
let playerAceCount = 0;
let deck;
let canHit = true;
let currentBal = 0;
let currentBet = 0;
let totalBets = 0;

/*----- cached element references -----*/
const chipsEl = document.getElementById('money-chips')
const betEl = document.getElementById('bet-box')
const balEl = document.getElementById('balance-box')
const clearEl = document.getElementById('clear-btn')
const totalBetsEl = document.querySelector('div h3')
const hitEl = document.getElementById('hit-btn')
const stayEl = document.getElementById('stay-btn')
const resetEl = document.getElementById('reset-game')
const playerDeck = document.getElementById('player-deck')
const computerDeck = document.getElementById('computer-deck')
const hiddenCardEl = document.getElementById('hidden-card')
const message = document.querySelector('h2')
const counterEl = document.getElementById('card-counter')
const newCardEl = document.createElement('div')
const startEl = document.getElementById('start-btn')
const dealerCounterEl = document.getElementById('dealer-counter')
const againEl = document.getElementById('play-again')
const allInEl = document.getElementById('all-in')

/*----- event listeners -----*/
hitEl.addEventListener('click', hitMe)
startEl.addEventListener('click', startGame)
resetEl.addEventListener('click', renderResetGame)
stayEl.addEventListener('click', wrapUp)
againEl.addEventListener('click', renderPlayAgain)
chipsEl.addEventListener('click', addBet)
clearEl.addEventListener('click', removeBet)
allInEl.addEventListener('click', allIn)

/*----- functions -----*/
// when the window loads, the play again button is hidden and not clickable
window.onload = function() {
    hitEl.removeEventListener('click', hitMe)
    stayEl.removeEventListener('click', wrapUp)
    againEl.classList.add('hide')
    againEl.removeEventListener('click', renderPlayAgain)
    currentBal = 200;
}

// This function allow players to use the Betting system
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
     }  if (evt.target.innerHTML === '$25') {
        currentBet += 25
     }
        betEl.innerHTML = `BETS: $ ${currentBet}`
    }
    // add else statement with a max-cap sound
}

// This is part of the bet system that allow players to bet all of currentBal
function allIn() {
    currentBet = currentBal
    betEl.innerHTML = `BETS: $ ${currentBet}`

}

// Clear currentBet amount
function removeBet() {
    currentBet = 0
    betEl.innerHTML = `BETS: $ ${currentBet}`
}

// Store and clear currentBet
function storeBet() {
    totalBets += currentBet
    currentBal -= currentBet
    balEl.innerHTML = `BAL: $ ${currentBal}`
    currentBet -= currentBet
    betEl.innerHTML = `BETS: $ ${currentBet}`
    totalBetsEl.innerHTML = `$ ${totalBets}`

}

// This starts the game when the start button is pressed
function startGame() {
    if (currentBet > 0){
        hitEl.addEventListener('click', hitMe)
        stayEl.addEventListener('click', wrapUp)
        storeBet()
        startEl.removeEventListener('click', startGame)
        startEl.classList.add('hide')
        createDeck()
        shuffleDeck()
        startDealComputer()
        startDealPlayer()
    } 
}

// This function creates the deck with 52 cards
function createDeck() {
    const suits = ['d', 'c', 'h', 's']
    const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', "J", 'Q', 'K', 'A']
    deck = []
    
    suits.forEach(function(suit) {
        ranks.forEach(function(rank) {
            deck.push({
                
                face: `${suit}${rank}`,
                
                // if the rank is a number, then it is a number, if it is not a number, apply values accordingly.
                value: Number(rank) || (rank === 'A' ? 11 : 10)
                
            })
        })
    })
    return deck
}

// This function shuffles the deck that we created
function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        // Selects a random number between 0-51
        let randomizeNum = Math.floor(Math.random() * deck.length)
        // Apply randomCard to whatever the random number is to the deck
        let randomCard = deck[i]
        // This determine what the card is
        deck[i] = deck[randomizeNum]
        // This finalizes the random card
        deck[randomizeNum] = randomCard
    }
}

// This starts off the game by dealing two cards to the dealer
function startDealComputer() {
    // this keeps track and deal the hidden card for dealer
    while (computerRound < 1) {
        card = deck.pop()
        // Add fade in effect
        hiddenCardEl.classList = (`card back-red large ${card.face}`)
        dealerSum += card.value
        computerRound++
        dealerAceCount += checkAce(card)
    }
    dealAnotherComputer()
}

// This deals another card for dealer that is not the first card
function dealAnotherComputer() {
    if (dealerSum < 17) {
        card = deck.pop()
        dealerAceCount += checkAce(card)
        dealerAceDeduct()
        showDealerCards()
        dealerSum += card.value
        computerRound++
    } 
    dealerAceDeduct()
}

// this reveals dealer cards that is not the hidden card
function showDealerCards() {
    const newCardEl = document.createElement('div')
    newCardEl.classList = `card ${card.face} large`
    computerDeck.appendChild(newCardEl)
}

// this deals player's first two cards
function startDealPlayer() {
    for (let i = 0; i < 2; i++) {
        card = deck.pop()
        playerSum += card.value
        playerAceCount += checkAce(card)
        playerAceDeduct()
        showPlayerCards()
    }
}

// this shows the cards of the player on the DOM
function showPlayerCards() {
    const newCardEl = document.createElement('div')
    newCardEl.classList = `card ${card.face} large`
    playerDeck.appendChild(newCardEl)
    counterEl.innerHTML = playerSum
}

//this deal another card for the player
function hitMe() {
    if (canHit == false) {
        return
    }
    card = deck.pop()
    playerSum += card.value
    playerAceCount += checkAce(card)
    playerAceDeduct()
    showPlayerCards()
    checkBusted()
    
    if (playerSum > 20 && dealerSum > 16) {
        canHit = false;
    }
}

// This function deals card to dealer even if player is busted
function finalDealerDeal() {
    while (dealerSum < 17 ) {
        dealAnotherComputer()
        dealerAceDeduct()
    }
    render()
}

//check if player got busted
function checkBusted() {
    if (playerSum > 21) {
        counterEl.style.color = 'red' 
        render()
    }
}

// This checks the number of aces either player or dealer has
function checkAce(card) {
    if (card.value === 11) {
        return 1
    }
    return 0
}

// This subtract playerSum value if player has any ace
function playerAceDeduct() {
    if (playerAceCount > 0 && playerSum > 21) {
        playerAceCount -= 1
        playerSum -= 10
    }
    return playerSum
}

// This subtract dealerSum value if dealer has any ace
function dealerAceDeduct() {
    if (dealerAceCount > 0 && dealerSum > 21) {
        dealerAceCount -= 1
        dealerSum -= 10
    }
    return dealerSum
}

// when clicked on STAY this function executes
function wrapUp() {
    while (dealerSum < 17) {
        dealAnotherComputer()
        dealerAceDeduct()
    }
    canHit = false
    render()
}

// This function compare results and display it
function render() {
    dealerCounterEl.innerHTML = dealerSum
    hiddenCardEl.classList.remove('back-red')
    if (dealerSum > 21 && playerSum > 21) {
        dealerCounterEl.style.color = 'red' 
        message.innerHTML = "Its a Tie"
        message.style.color = "darkgray"
        currentBal += totalBets
        totalBets = 0
    } else if (playerSum > 21) {
        message.innerHTML = "You Lose"
        message.style.color = "red"
        currentBal += 0
        totalBets = 0
    } else if (dealerSum > 21) {
        //add bounty bonus
        dealerCounterEl.style.color = 'red' 
        message.innerHTML = "You Won $ " + (totalBets)
        message.style.color = "green"
        currentBal += totalBets * 2
        totalBets = 0
    } else if (dealerSum == playerSum) {
        message.innerHTML = "Its a Tie"
        message.style.color = "darkgray"
        currentBal += totalBets
        totalBets = 0
    } else if (playerSum > dealerSum) {
        currentBal += totalBets * 2
        message.innerHTML = "You Won $ " + (totalBets)
        message.style.color = "green"
        totalBets = 0
    } else if (playerSum < dealerSum) {
        message.innerHTML = "You Lose"
        message.style.color = "red"
        currentBal += 0
        totalBets = 0
    }
    hitEl.removeEventListener('click', hitMe)
    stayEl.removeEventListener('click', wrapUp)
    againEl.classList.remove('hide')
    againEl.addEventListener('click', renderPlayAgain)
    balEl.innerHTML = `BAL: $ ${currentBal}`
    totalBetsEl.innerHTML = ""
}

// This saves current balance but reset everything else.
function renderPlayAgain() {
    renderNextRound()
    againEl.classList.add('hide')
    againEl.removeEventListener('click', renderPlayAgain)
}

// This saves current balance, and delete everything else
function renderNextRound() {
    message.innerHTML = ""
    startEl.addEventListener('click', startGame)
    startEl.classList.remove('hide')
    dealerSum = 0;
    playerSum = 0;
    computerRound = 0;
    dealerAceCount = 0;
    playerAceCount = 0;
    deck;
    canHit = true;
    dealerCounterEl.style.color = 'white' 
    counterEl.style.color = 'white'
    hiddenCardEl.classList.add('hidden')
    hiddenCardEl.classList.add('back-red')
    counterEl.innerHTML = ""
    dealerCounterEl.innerHTML = ""
    while (playerDeck.firstChild) {
        playerDeck.removeChild(playerDeck.lastChild)
    }
    while (computerDeck.lastChild.id !== 'hidden-card') {
        computerDeck.removeChild(computerDeck.lastChild)
    }
}

// This resets the game when the reset button is pressed
function renderResetGame() {
    againEl.classList.add('hide')
    againEl.removeEventListener('click', renderPlayAgain)
    currentBal = 200;
    totalBets = 0
    balEl.innerHTML = `BAL: $ ${currentBal}`
    totalBetsEl.innerHTML = ""
    message.innerHTML = ""
    startEl.addEventListener('click', startGame)
    startEl.classList.remove('hide')
    dealerSum = 0;
    playerSum = 0;
    computerRound = 0;
    dealerAceCount = 0;
    playerAceCount = 0;
    deck;
    canHit = true;
    dealerCounterEl.style.color = 'white' 
    counterEl.style.color = 'white'
    hiddenCardEl.classList.add('hidden')
    hiddenCardEl.classList.add('back-red')
    counterEl.innerHTML = ""
    dealerCounterEl.innerHTML = ""
    while (playerDeck.firstChild) {
        playerDeck.removeChild(playerDeck.lastChild)
    }
    while (computerDeck.lastChild.id !== 'hidden-card') {
        computerDeck.removeChild(computerDeck.lastChild)
    }
}

//This add sound when audio button is pressed
const musicEl = document.getElementById('audio')
musicEl.addEventListener('click', playMusic)
let musicCount = 0;
let music = new Audio('Jazz-Music.mp3')
function playMusic() {
    if (musicCount < 1) {
        musicCount += 1
        music.play()
    } else if (musicCount == 1) {
        music.pause()
        musicCount -= 1
    }
} 