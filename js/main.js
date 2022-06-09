// /*----- constants -----*/




// /*----- app's state (variables) -----*/
// let currentBal = 200;
// let currentBet = 0;
// let deck;
// let playerAceCount = 0;
// let computerAceCount = 0;
// let computerSum = 0;
// let playerSum = 0;
// let round = 0;
// let playerCardsArr = []
// let playerRound = 0;

// /*----- cached element references -----*/
// const chipsEl = document.getElementById('money-chips')
// const betEl = document.getElementById('bet-box')
// const balEl = document.getElementById('balance-box')
// const clearEl = document.getElementById('clear-btn')
// const totalBetsEl = document.querySelector('div h3')
// const hitEl = document.getElementById('hit-btn')
// const stayEl = document.getElementById('stay-btn')
// const resetEl = document.getElementById('reset-game')
// const playerDeck = document.getElementById('player-deck')
// const computerDeck = document.getElementById('computer-deck')
// const hiddenCardEl = document.getElementById('hidden-card')
// const message = document.querySelector('h2')



// /*----- event listeners -----*/
// chipsEl.addEventListener('click', addBet)
// clearEl.addEventListener('click', removeBet)
// hitEl.addEventListener('click', hitMe)
// stayEl.addEventListener('click', compareResults)


// resetEl.addEventListener('click', initGame)

// /*----- functions -----*/

// function addBet(evt) {
//     if (currentBal > currentBet) {
//         if (evt.target.innerHTML === '$1') {
//         currentBet += 1
//      }
//         if (evt.target.innerHTML === '$5') {
//         currentBet += 5
//         }
//         if (evt.target.innerHTML === '$10') {
//         currentBet += 10
//      }
//         console.log(currentBet)
//         betEl.innerHTML = `BETS: $ ${currentBet}`
//     }
//     // add else statement with a max-cap sound
// }


// function removeBet() {
//     currentBet = 0
//     betEl.innerHTML = `BETS: $ ${currentBet}`
// }

// function placeBet() {
    
// }

// function hitMe() {
//     if (currentBet > 0) {
//    currentBal = currentBal - currentBet
//    balEl.innerHTML = `BAL: $ ${currentBal}`
//    totalBetsEl.innerHTML = `$ ${currentBet}`
//    currentBet = 0
//    betEl.innerHTML = `BETS: $ ${currentBet}`
//     }
//     render()
// }


// function initGame() {
//     currentBal = 200
//     currentBet = 0
//     betEl.innerHTML = `BETS: $ ${currentBet}`
//     balEl.innerHTML = `BAL: $ ${currentBal}`
//     totalBetsEl.innerHTML = ``
//     createDeck()
//     shuffleDeck()
//     dealComputer()
//     dealPlayer()
// }

// function createDeck() {
//     const suits = ['d', 'c', 'h', 's']
//     const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', "J", 'Q', 'K', 'A']
//     deck = []

//     suits.forEach(function(suit) {
//         ranks.forEach(function(rank) {
//             deck.push({
                
//                 face: `${suit}${rank}`,

//                 value: Number(rank) || (rank === 'A' ? 11 : 10)

//             })
//         })
//     })
//     return deck
// }

// function shuffleDeck() {
//     for (let i = 0; i < deck.length; i++) {
//         let randomizeNum = Math.floor(Math.random() * deck.length)
//         let randomCard = deck[i]
//         deck[i] = deck[randomizeNum]
//         deck[randomizeNum] = randomCard
//     }
//     console.log(deck)
// }


// function dealComputer() {
//     if (round < 1) {
//     card = deck.pop()
//     computerAceCheck()
//     computerSum += card.value
//     hiddenCardEl.classList = (`card back-red large ${card.face}`)
//     round += 1
//     }
//     card = deck.pop()
//     computerAceCheck()
//     console.log("hidden: " + card.value)
//     // console.log("shown: " + card.value)
//     const newCardEl = document.createElement('div')
//     newCardEl.classList = `card ${card.face} large`
//     computerDeck.appendChild(newCardEl)
//     computerSum += card.value
//     console.log(computerSum)
// }


// // deal player's card twice, store card value in an array(for aceReduction), add value to playerSum and render
// function dealPlayer() {
//     let dealTwice = 2;
//     while (dealTwice > 0) {
//     card = deck.pop()
//     playerAceCheck()
//     sumValue()
//     aceReduce()
//     hitPlayer()
//     dealTwice -= 1
//     playerRound += 1
//     }
// }

// function render(){
    
//     // For Player
//     // this if statement makes it so ace will reduce if two aces are dealt on first two rounds
//     if (playerSum < 21) {
//     card = deck.pop()
//     playerRound += 1
//     playerAceCheck()
//     aceReduce()
//     // console.log("Card: " + card.face)
//     playerSum += card.value
//     // console.log(playerSum)
//     hitPlayer()
//     }
//     if(playerSum > 21) {
//         counterEl.style.color = 'red' 
//     }
// }

// function sumValue() {
//     playerSum += card.value
// }

// function hitPlayer() {
//     const newCardEl = document.createElement('div')
//     newCardEl.classList = `card ${card.face} large`
//     playerDeck.appendChild(newCardEl)
//     counterEl.innerHTML = playerSum
//     playerResults()
// }


// function playerResults() {
//     if (playerSum > 21) {
//         console.log("busted")
//         message.innerHTML = "You Lose!"
//     } if (playerRound > 4 && playerSum < 21) {
//         message.innerHTML = "You Win"
//     }
// }

// function compareResults() {
//     hiddenCardEl.classList.remove('back-red')
//     while (computerSum <= playerSum && computerSum < 17 && playerSum < 22 || computerSum < 21 && computerSum < playerSum && computerAceCount > 0) {
//         card = deck.pop()
//         computerAceCheck()
//         const newCardEl = document.createElement('div')
//         newCardEl.classList = `card ${card.face} large`
//         computerDeck.appendChild(newCardEl)
//         computerSum += card.value
//         computerAceCheck()
//     }
        
//         if (playerSum > computerSum && playerSum < 22 || computerSum < playerSum && playerSum < 22 || playerSum === 21 && playerRound === 2 || playerSum < 22 && playerRound > 4) {
//             message.innerHTML ="You Win"
//         } else if (computerSum === playerSum) {
//             message.innerHTML = "Tie"
//         } else if (computerSum > 21) {
//             message.innerHTML = "You Win"
//         } 
//         else {
//             message.innerHTML = "You Lose"
//         }
//     } 

// function playerAceCheck() {
//     if (card.value == 11 && playerSum !== 21) {
//         playerAceCount += 1
//         console.log("before reduction: " + playerAceCount)
//     }
// }

// function computerAceCheck() {
//     if (card.value == 11 && computerSum !== 21) {
//         computerAceCount += 1
//     } if (computerAceCount > 0) {
//         aceReduce()
//     }
// }
// // do one for computerAceCount

// function aceReduce() {
//     while (playerAceCount > 0 && playerSum !== 21) {
//         playerSum -= 10
//         playerAceCount -= 1
//         console.log("after reduction: " + playerAceCount)
//     }
//     while (computerAceCount > 0 && computerSum !== 21 && computerSum < playerSum) {
//         computerSum -= 10
//         computerAceCount -= 1
//         console.log("computer after reduction: " + computerAceCount)
//     }
// }

// initGame()


/*----- constants -----*/


/*----- app's state (variables) -----*/
let dealerSum = 0;
let playerSum = 0;
// refer to line 127
let computerRound = 0;
let dealerAceCount = 0;
let playerAceCount = 0;

let deck;

let canHit = true;


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

/*----- event listeners -----*/
//hitMe must go first
hitEl.addEventListener('click', hitMe)
startEl.addEventListener('click', startGame)
resetEl.addEventListener('click', resetGame)
stayEl.addEventListener('click', wrapUp)
/*----- functions -----*/
function resetGame() {
    message.innerHTML = ""
    startEl.addEventListener('click', startGame)
    startEl.classList.remove('hide-start')
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

function startGame() {
    startEl.removeEventListener('click', startGame)
    startEl.classList.add('hide-start')
    createDeck()
    shuffleDeck()
    startDealComputer()
    startDealPlayer()
}

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
    if (playerSum < 22) {
    card = deck.pop()
    dealerAceCount += checkAce(card)
    dealerAceDeduct()
    showDealerCards()
    dealerSum += card.value
    computerRound++
    }
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

    if (playerSum > 20) {
        canHit = false;
    }
}

//check if player got busted
function checkBusted() {
    if (playerSum > 21) {
        counterEl.style.color = 'red' 
        render()
    }
}

// when clicked on STAY this function executes
function wrapUp() {
    // stayEl.removeEventListener('click', wrapUp)
    while (dealerSum < playerSum && dealerSum < 17 && playerSum < 22) {
    dealAnotherComputer()
    }

    canHit = false
    render()
}
// This function compare results and display it
function render() {
    dealerCounterEl.innerHTML = dealerSum
    hiddenCardEl.classList.remove('back-red')
    if (playerSum > 21) {
        message.innerHTML = "Busted <br> You Lose"
        console.log("BUSTED You Lose!")
    }
    else if (dealerSum > 21) {
        //add bounty bonus
        dealerCounterEl.style.color = 'red' 
        message.innerHTML = "Dealer Busted <br> You Win"
        console.log("Dealer Busted. You Win")
    } else if (dealerSum == playerSum) {
        message.innerHTML = "Its a Tie"
        console.log("Its a Tie")
    } else if (playerSum > dealerSum) {
        message.innerHTML = "You Win"
        console.log("You Win")
    } else if (playerSum < dealerSum) {
        message.innerHTML = "You Lose"
        console.log("You Lose")
    }
}

// This checks the number of aces either player or dealer has
function checkAce(card) {
    if (card.value === 11) {
        return 1
    }
    return 0
}

function playerAceDeduct() {
    if (playerAceCount > 0 && playerSum > 21) {
        playerAceCount -= 1
        playerSum -= 10
    }
    return playerSum
}

function dealerAceDeduct() {
    if (dealerAceCount > 0 && dealerSum > 21) {
        dealerAceCount -= 1
        dealerSum -= 10
    }
    return dealerSum
}

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
playMusic()