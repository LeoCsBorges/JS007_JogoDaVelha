// GLOBAL VARIABLES
let firstPlayerDOM = document.querySelector('input#firstPlayer')
let secondPlayerDOM = document.querySelector('input#secondPlayer')
let playerToStartDOM = document.querySelector('select#start-player')
let timerDOM = document.querySelector('select#timer')
let cronometerDOM = document.getElementById('cronometerClock')
let playButton = document.getElementById('play')
let clearButton = document.getElementById('clear')
let replayButton = document.getElementById('replay')
let resultsDOM = document.getElementById('results')
let startingPlayer
let playerTurn
let timerID
let cronometerID
let numberOfMoves = 0

// [ BUTTONS ]
playButton.addEventListener('click', function() {
    if (inputNameToPlayerTag()) {
        playButton.style.pointerEvents = 'none'
        setPlayerToBegin(playerToStartDOM)
        setTimer()
        setCronometer()       
        gameStart(startingPlayer)
    }
})
    
clearButton.addEventListener('click', function() {
    window.location.reload();
})

replayButton.addEventListener('click', function() {
    //clear the spots and timer/cronometer
    resultsDOM.style.display = 'none'
    let spots = document.getElementsByClassName('spot')
    for (let spot of spots) {
        spot.innerHTML = ''
    }
    allBlackMarkup(spots)
    clearInterval(timerID)
    clearInterval(cronometerID)
    numberOfMoves = 0
    let p1Tag = document.getElementById('player1')
    let p2Tag = document.getElementById('player2')
        p1Tag.classList.remove('turn')
        p2Tag.classList.remove('turn')
    
    //start again    
    setPlayerToBegin(playerToStartDOM)
    setTimer()
    setCronometer()      
    activateSpots()
    gameStart(startingPlayer)
})


// FUNCTIONS
function gameStart() {
    let spots = document.getElementsByClassName('spot')
    let playerTags = document.getElementsByClassName('player-tag')

    for (let spot of spots) {   
        
        //player inicial
        for (let tag of playerTags) { 
            if (tag.classList.contains('turn')) {
                playerTurn = tag.id
            }
        }
        
        //clicando nos spots
        spot.addEventListener('click', function(){
            
            //pegando o simbolo do playerTurn
            let markup = document.getElementById(playerTurn)
            markup = markup.getElementsByClassName('player-symbol')
            markup = markup[0].innerHTML

            //fazendo a marcacao e contandos as jogadas
            if (spot.textContent == '') {                
                spot.textContent = markup
                numberOfMoves += 1

            } else {
                return
            }          

            //verificar vencedor e finalizar function se 'true'
            if (verifyWinner(numberOfMoves, spots, playerTurn)) {
                endGame()
                return

            } else {
                //alternando os players e o simbolo
                if (playerTurn == 'player1') {
                    document.getElementById(playerTurn).classList.remove('turn')
                    playerTurn = 'player2'
                    document.getElementById(playerTurn).classList.add('turn')

                } else {
                    document.getElementById(playerTurn).classList.remove('turn')
                    playerTurn = 'player1'
                    document.getElementById(playerTurn).classList.add('turn')
                }
            }
        })
    }
}

function verifyWinner(moves, spots, player) {
    //verificando as possibilidades de vitoria e quantidade de jogadas
    if (moves <= 9) {
        
        //horizontais
        if ((spots[0].innerHTML == 'X' && spots[1].innerHTML == 'X' && spots[2].innerHTML == 'X') ||
            (spots[0].innerHTML == 'O' && spots[1].innerHTML == 'O' && spots[2].innerHTML == 'O')) {
                redMarkup(spots[0], spots[1], spots[2])
                showWinner(player, true)
                return true
        }

        if ((spots[3].innerHTML == 'X' && spots[4].innerHTML == 'X' && spots[5].innerHTML == 'X') ||
            (spots[3].innerHTML == 'O' && spots[4].innerHTML == 'O' && spots[5].innerHTML == 'O')) {
                redMarkup(spots[3], spots[4], spots[5])
                showWinner(player, true)
                return true
        }

        if ((spots[6].innerHTML == 'X' && spots[7].innerHTML == 'X' && spots[8].innerHTML == 'X') ||
            (spots[6].innerHTML == 'O' && spots[7].innerHTML == 'O' && spots[8].innerHTML == 'O')) {
                redMarkup(spots[6], spots[7], spots[8])
                showWinner(player, true)
                return true
        }

        //verticiais
        if ((spots[0].innerHTML == 'X' && spots[3].innerHTML == 'X' && spots[6].innerHTML == 'X') ||
            (spots[0].innerHTML == 'O' && spots[3].innerHTML == 'O' && spots[6].innerHTML == 'O')) {
                redMarkup(spots[0], spots[3], spots[6])
                showWinner(player, true)
                return true
        }

        if ((spots[1].innerHTML == 'X' && spots[4].innerHTML == 'X' && spots[7].innerHTML == 'X') ||
            (spots[1].innerHTML == 'O' && spots[4].innerHTML == 'O' && spots[7].innerHTML == 'O')) {
                redMarkup(spots[1], spots[4], spots[7])
                showWinner(player, true)
                return true
        }

        if ((spots[2].innerHTML == 'X' && spots[5].innerHTML == 'X' && spots[8].innerHTML == 'X') ||
            (spots[2].innerHTML == 'O' && spots[5].innerHTML == 'O' && spots[8].innerHTML == 'O')) {
                redMarkup(spots[2], spots[5], spots[8])
                showWinner(player, true)
                return true
        }

        //diagonais
        if ((spots[0].innerHTML == 'X' && spots[4].innerHTML == 'X' && spots[8].innerHTML == 'X') ||
            (spots[0].innerHTML == 'O' && spots[4].innerHTML == 'O' && spots[8].innerHTML == 'O')) {
                redMarkup(spots[0], spots[4], spots[8])
                showWinner(player, true)
                return true
        }

        if ((spots[2].innerHTML == 'X' && spots[4].innerHTML == 'X' && spots[6].innerHTML == 'X') ||
            (spots[2].innerHTML == 'O' && spots[4].innerHTML == 'O' && spots[6].innerHTML == 'O')) {
                redMarkup(spots[2], spots[4], spots[6])
                showWinner(player, true)
                return true
        }

        //velha
        if (moves == 9) {
            showWinner(player, false)
            return true
        }
    } 
}

function inputNameToPlayerTag() {
    //nome dos jogadores nas tags
    let firstPlayerTag = document.querySelector('#player1 .player-name')
    let secondPlayerTag = document.querySelector('#player2 .player-name')

    //verificar se campo vazio
    if (firstPlayerDOM.value == '' || secondPlayerDOM.value == '') {
        alert('Ops!: Digite o(s) nome(s) de jogador e tente novamente.')
        return false
    }

    firstPlayerTag.innerHTML = firstPlayerDOM.value.toUpperCase()
    secondPlayerTag.textContent = secondPlayerDOM.value.toUpperCase()
    firstPlayerDOM.value = ''
    secondPlayerDOM.value = ''
    return true
}

function setPlayerToBegin(player) {
    let p1Tag = document.getElementById('player1')
    let p2Tag = document.getElementById('player2')

    switch(player.value) {
        case 'player1':
            p1Tag.classList.add('turn')
            startingPlayer = 0
            break

        case 'player2':
            p2Tag.classList.add('turn')
            startingPlayer = 1
            break

        case 'random-player':
            let randomValue = Math.round(Math.random())
            if (randomValue == 0) {
                p1Tag.classList.add('turn')
                startingPlayer = 0
            } 
    
            if (randomValue == 1) {
                p2Tag.classList.add('turn')
                startingPlayer = 1
            }
            break

        default:
            alert('ERROR: jogador invalido!')
            break
    }
}

function setTimer() {
    let seconds = timerDOM.value
    let timer = document.getElementById('timerClock')
    let spots = document.getElementsByClassName('spot')
    
    if (seconds == 'null') {
        timer.textContent = `-`
        return

    } else {
        timerID = setInterval(function() {
            if (seconds == 0) {
                timer.textContent = `00`
                allRedMarkup(spots)
                endGame()
                showLoser(playerTurn)
                return 
            } else {
                if (seconds < 10) {
                    timer.textContent = `0${seconds}`
                } else {
                    timer.textContent = `${seconds}`
                }
                seconds -= 1
            }
        }, 1000)
    }    
}

function setCronometer() {
    let seconds = 0
    let minutes = 0
    
    cronometerID = setInterval(function() {
        seconds += 1

        if (seconds == 60) {
            minutes += 1
            seconds = 0
        }

        //formatação do texto '00:00'
        if (minutes < 10 && seconds < 10) {
            cronometerDOM.textContent = `0${minutes}:0${seconds}`
        } else if (minutes < 10) {
            cronometerDOM.textContent = `0${minutes}:${seconds}`
        } else if (seconds < 10) {
            cronometerDOM.textContent = `${minutes}:0${seconds}`            
        } else {
            cronometerDOM.textContent = `${minutes}:${seconds}`
        }      
    }, 1000)
}

function showLoser(player) {
    let gameResults = document.getElementsByClassName('game-results')
    let status = resultsDOM.getElementsByClassName('result-status')
    let time = resultsDOM.getElementsByClassName('result-time')
    let playerDOM = document.getElementById(player)
        playerDOM = playerDOM.getElementsByClassName('player-name')
        playerDOM = playerDOM[0].innerHTML

    gameResults[0].style.display = 'flex'
    status[0].innerHTML = `Resultado: O(a) jogador(a) <strong>${playerDOM}</strong> perdeu!`
    time[0].innerHTML = `Tempo: ESGOTADO!`
}

function showWinner(player, boolean) {
    let gameResults = document.getElementsByClassName('game-results')
    let status = resultsDOM.getElementsByClassName('result-status')
    let cronometer = cronometerDOM.innerHTML
    let time = resultsDOM.getElementsByClassName('result-time')
    let playerDOM = document.getElementById(player)
        playerDOM = playerDOM.getElementsByClassName('player-name')
        playerDOM = playerDOM[0].innerHTML

    //algum vencedor
    if (boolean) {
        gameResults[0].style.display = 'flex'
        status[0].innerHTML = `Resultado: O(a) jogador(a) <strong>${playerDOM}</strong> venceu!`
        time[0].innerHTML = `Tempo: ${cronometer}`

    //velha
    } else {
        gameResults[0].style.display = 'flex'
        status[0].innerHTML = `Resultado: VELHA!`
        time[0].innerHTML = `Tempo: ${cronometer}`
    }
}

function redMarkup(spot1, spot2, spot3) {
    spot1.style.color = 'red'
    spot2.style.color = 'red'
    spot3.style.color = 'red'
}

function allRedMarkup(spots){
    for (let spot of spots) {
        spot.style.color = 'red'
    }
}

function allBlackMarkup(spots){
    for (let spot of spots) {
        spot.style.color = 'black'
    }
}

function endGame() {

    deactivateSpots()
    stopCronometer()
    stopTimer()


    function stopTimer() {
        clearInterval(timerID)
    }

    function stopCronometer() {
        clearInterval(cronometerID)
        cronometerDOM.textContent = `00:00`
    }
    
    function deactivateSpots() {
        let gameWrapper = document.getElementsByClassName('game-wrapper')
        gameWrapper[0].style.pointerEvents = 'none'
    }
}

function activateSpots() {
    let gameWrapper = document.getElementsByClassName('game-wrapper')
    gameWrapper[0].style.pointerEvents = 'all'
}