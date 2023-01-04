const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const skin = $('#skin')
const table = $('table')
const boardCells = $$('td')
const boardRows = $$('tr') 
const startBtn = $('#start')
const clearBtn = $('#clear')
const countdown = $('#countdown')
const minutes = $('#m')
const seconds = $('#s')

const app = {
    turn: true,
    handleSkinChange() { 
        if (table.classList.contains('purple')) { 
            table.classList.remove('purple')
            table.classList.add('blue') 
            skin.style.backgroundColor = '#daa1da'
        } else {
            table.classList.add('purple')
            table.classList.remove('blue') 
            skin.style.backgroundColor = 'aqua'
        } 
    },
    handleClickBoard() {
        const ticHtml = `<div class="check" id="tic">X</div>`
        const toeHtml = `<div class="check" id="toe">O</div>`
        boardCells.forEach(function(cell, index) {
            cell.setAttribute('data-id', index)
            cell.setAttribute('player', -1)
            cell.addEventListener('click', function() {
                if (this.innerHTML.trim() == '') {
                    if (app.turn) {
                        this.innerHTML = ticHtml
                        this.setAttribute('player', 1) 
                        app.turn = false
                    } else { 
                        this.innerHTML = toeHtml
                        this.setAttribute('player', 0)
                        app.turn = true 
                    }
                    if (app.checkWin(this) == 1) { 
                        alert('tic win')
                    } else if (app.checkWin(this) == 2) {
                        alert('toe win')
                    }
                    
                }  
            })
        })
        
    },
    checkWin(component) { 
        function winHor() {
            let id = component.dataset.id 
            let winTicArr = []
            let winToeArr = []
            id = Math.trunc(Number(id) / 10)
            let length = Number(id + '9') 
            id = Number(id + '0')
            for (let i = id;i<= length;i++) {
                let player = boardCells[i].getAttribute('player')
                if (player == 0) {
                    winToeArr.push(boardCells[i].dataset.id) 
                } else if (player == 1) {
                    winTicArr.push(boardCells[i].dataset.id)
                }
            }   
            let countTie = 1
            for (let i = 0;i< winTicArr.length - 1;i++) {
                if (Number(winTicArr[i+1]) == Number(winTicArr[i]) + 1) {
                    countTie++   
                    if (countTie >= 5) {
                        return 1
                    }
                } else {
                    countTie = 1
                }
            } 
              
            let countToe = 1
            for (let i = 0;i< winToeArr.length - 1;i++) {
                if (Number(winToeArr[i+1]) == Number(winToeArr[i]) + 1) {
                    countToe++   
                    if (countToe >= 5) {
                        return 2
                    }
                } else {
                    countToe = 1
                }
            } 
        } 

        function winVert() {
            let id = component.dataset.id 
            let winTicArr = []
            let winToeArr = []
            id = Math.trunc(Number(id) % 10)
            let length = Number('8' + id) 
            for (let i = id;i <= length;i+=10) { 
                let player = boardCells[i].getAttribute('player')
                if (player == 0) {
                    winToeArr.push(boardCells[i].dataset.id) 
                } else if (player == 1) {
                    winTicArr.push(boardCells[i].dataset.id)
                }
            }    
            let countTie = 1
            for (let i = 0;i< winTicArr.length - 1;i++) {
                if (Number(winTicArr[i+1]) == Number(winTicArr[i]) + 10) {
                    countTie++   
                    if (countTie >= 5) {
                        return 1
                    }
                } else {
                    countTie = 1
                }
            } 
              
            let countToe = 1
            for (let i = 0;i< winToeArr.length - 1;i++) {
                if (Number(winToeArr[i+1]) == Number(winToeArr[i]) + 10) {
                    countToe++   
                    if (countToe >= 5) {
                        return 2
                    }
                } else {
                    countToe = 1
                }
            } 
        }

        function winCross1() {
            let id = Number(component.dataset.id)
            let row = Math.trunc(id / 10)
            let col = Math.trunc(id % 10)
            let winTicArr = []
            let winToeArr = []
            let length 
            if (row < col) {
                length = id + (9 - col) * 11
                id = id - (row) * 11 
            } else {
                length = id + (8 - row) * 11
                id = id - (col) * 11 
            } 
            for (let i = id;i <= length;i+=11) { 
                let player = boardCells[i].getAttribute('player')
                if (player == 0) {
                    winToeArr.push(boardCells[i].dataset.id) 
                } else if (player == 1) {
                    winTicArr.push(boardCells[i].dataset.id)
                }
            }    
            let countTie = 1
            for (let i = 0;i< winTicArr.length - 1;i++) {
                if (Number(winTicArr[i+1]) == Number(winTicArr[i]) + 11) {
                    countTie++   
                    if (countTie >= 5) {
                        return 1
                    }
                } else {
                    countTie = 1
                }
            } 
              
            let countToe = 1
            for (let i = 0;i< winToeArr.length - 1;i++) {
                if (Number(winToeArr[i+1]) == Number(winToeArr[i]) + 11) {
                    countToe++   
                    if (countToe >= 5) {
                        return 2
                    }
                } else {
                    countToe = 1
                }
            } 
        }

        function winCross2() {
            let id = Number(component.dataset.id)
            let row = Math.trunc(id / 10)
            let col = 9 - Math.trunc(id % 10)
            let winTicArr = []
            let winToeArr = []
            let length 
            if (row < col) {
                length = id + (9 - (col)) * 9
                id = id - (row) * 9 
            } else {
                length = id + (8 - row) * 9
                id = id - (col) * 9 
            }  
            for (let i = id;i <= length;i+=9) {  
                let player = boardCells[i].getAttribute('player')
                if (player == 0) {
                    winToeArr.push(boardCells[i].dataset.id) 
                } else if (player == 1) {
                    winTicArr.push(boardCells[i].dataset.id)
                }
            }    
            let countTie = 1
            for (let i = 0;i< winTicArr.length - 1;i++) {
                if (Number(winTicArr[i+1]) == Number(winTicArr[i]) + 9) {
                    countTie++   
                    if (countTie >= 5) {
                        return 1
                    }
                } else {
                    countTie = 1
                }
            } 
              
            let countToe = 1
            for (let i = 0;i< winToeArr.length - 1;i++) {
                if (Number(winToeArr[i+1]) == Number(winToeArr[i]) + 9) {
                    countToe++   
                    if (countToe >= 5) {
                        return 2
                    }
                } else {
                    countToe = 1
                }
            } 
        } 
        if (winHor() == 1 || winVert() == 1|| winCross1() ==1 || winCross2() ==1 ) {
            return 1
        } else if (winHor() == 2 || winVert() == 2|| winCross1() == 2 || winCross2() == 2 ) {
            return 2
        }
    },
    handleEvent() {
        // Start time
        let minuteInit = 1
        let secondsInit = 60
        const timer = setInterval(function(){
            secondsInit--
            if (secondsInit == 0) {
                if (minuteInit == 0) {
                    clearInterval(timer)
                    alert('Time over')
                } else { 
                    minuteInit--
                    secondsInit = 60
                }
            }  
            minutes.innerHTML = `0${minuteInit}`
            seconds.innerHTML = secondsInit < 10 ? `0${secondsInit}` : secondsInit
        }, 100)
    },
    clear() {
        boardCells.forEach(function(cell) {
            cell.innerHTML = ''
        })
    },
    start() {
        app.handleEvent() 
        app.handleClickBoard()
    } 
} 

// Start game
startBtn.addEventListener('click', app.start)

// Clear game 
clearBtn.addEventListener('click', app.clear) 

// Change skin
skin.addEventListener('click', app.handleSkinChange)

// Autoplay when click board
table.addEventListener('click', function(e){
    if (e.target.closest('td')) {
        app.start()
    } 
})