const timeLeft = document.getElementById('time-left')
const score = document.getElementById('score')
const startPauseButton  = document.getElementById('pause-play')

const grid = document.getElementsByClassName('grid')
const squares = document.querySelectorAll('.grid div')
const frog = document.getElementsByClassName('frog')

const logLeft = document.querySelectorAll('.log-left')
const logRight = document.querySelectorAll('.log-right')
const cartleft = document.querySelectorAll('.cart-left')
const cartRight = document.querySelectorAll('.cart-right')

let timerId = 0
let outcomeTimerId = 0
let curentTime = 20

let currentIndex = 76
const width = 9


function moveFrog(e) {
    squares[currentIndex].classList.remove('frog')

    switch(e.key) {
        case 'ArrowLeft' :
             if (currentIndex % width !== 0) currentIndex -= 1
            break
        case 'ArrowRight' :
            if (currentIndex % width < width - 1) currentIndex += 1
            break
        case 'ArrowUp' :
            if (currentIndex - width >=0 ) currentIndex -= width
            break
        case 'ArrowDown' :
            if (currentIndex + width < width * width) currentIndex += width
            break
    }
    squares[currentIndex].classList.add('frog')
}

document.addEventListener('keyup', moveFrog)

function autoMoveElements(){
    logLeft.forEach(logs => moveLogLeft(logs))
    logRight.forEach(logs => moveLogRight(logs))
    cartleft.forEach(logs => moveCarLeft(logs))
    cartRight.forEach(logs => moveCarRight(logs))
}

function checkOutComes() {
    lose()
    win()
}

function moveLogLeft(logLeft) {
    switch(true) {
        case logLeft.classList.contains('l1') :
            logLeft.classList.remove('l1')
            logLeft.classList.add('l2')
            break
        case logLeft.classList.contains('l2') :
            logLeft.classList.remove('l2')
            logLeft.classList.add('l3')
            break
        case logLeft.classList.contains('l3') :
            logLeft.classList.remove('l3')
            logLeft.classList.add('l4')
            break
        case logLeft.classList.contains('l4') :
            logLeft.classList.remove('l4')
            logLeft.classList.add('l5')
            break
        case logLeft.classList.contains('l5') :
            logLeft.classList.remove('l5')
            logLeft.classList.add('l1')
            break
    }
}

function moveLogRight(logRight) {
    switch(true) {
        case logRight.classList.contains('l1') :
            logRight.classList.remove('l1')
            logRight.classList.add('l5')
            break
        case logRight.classList.contains('l2') :
            logRight.classList.remove('l2')
            logRight.classList.add('l1')
            break
        case logRight.classList.contains('l3') :
            logRight.classList.remove('l3')
            logRight.classList.add('l2')
            break
        case logRight.classList.contains('l4') :
            logRight.classList.remove('l4')
            logRight.classList.add('l3')
            break
        case logRight.classList.contains('l5') :
            logRight.classList.remove('l5')
            logRight.classList.add('l4')
            break
    }
}
function moveCarLeft(carLeft) {
    switch(true) {
        case carLeft.classList.contains('c1') :
            carLeft.classList.remove('c1')
            carLeft.classList.add('c2')
            break
        case carLeft.classList.contains('c2') :
            carLeft.classList.remove('c2')
            carLeft.classList.add('c3')
            break
        case carLeft.classList.contains('c3') :
            carLeft.classList.remove('c3')
            carLeft.classList.add('c1')
            break
    }
}

function moveCarRight(carRight) {
    switch(true) {
        case carRight.classList.contains('c1') :
            carRight.classList.remove('c1')
            carRight.classList.add('c3')
            break
        case carRight.classList.contains('c2') :
            carRight.classList.remove('c2')
            carRight.classList.add('c1')
            break
        case carRight.classList.contains('c3') :
            carRight.classList.remove('c3')
            carRight.classList.add('c2')
            break
    }
}

timerId = setInterval(autoMoveElements, 1000)

function lose() {
    if (
        squares[currentIndex].classList.contains('c1') || 
        squares[currentIndex].classList.contains('l4') || 
        squares[currentIndex].classList.contains('l5') || 
        curentTime <= 0 // Spelling corrected for 'curentTime' -> 'currentTime'
    ) {
        score.textContent = 'you lose';
        clearInterval(timerId);
        squares[currentIndex].classList.remove('frog');
        document.removeEventListener('keyup', moveFrog);
    }
}

function win(){
    if (squares[currentIndex].classList.contains('ending-block')){
        score.textContent = "you win"
        clearInterval(timerId)
        document.removeEventListener('keyup', moveFrog)
    }
}

outcomeTimerId = setInterval(checkOutComes, 50)
