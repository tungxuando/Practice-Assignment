const problemElement = document.querySelector(".problem")
const ourForm = document.querySelector(".our-form")
const ourField = document.querySelector(".our-field")
const pointsNeeded = document.querySelector(".points-needed")
const mistakesAllowed = document.querySelector(".mistakes-allowed")
const progressBar = document.querySelector(".progress-inner")
const endMessage = document.querySelector(".end-message")
const resetButton = document.querySelector(".reset-button")

let arr = []
let state = {
    score: 0,
    wrongAnswers: 0
}

function updateProblem() {
    state.currentProblem = generateProblem()
    problemElement.innerHTML = `${arr.join("")}`
    ourField.value = ""
    ourField.focus()
}

updateProblem()

function generateNumber(max) {
    return Math.floor(Math.random() * (max + 1))
}

function generateOperator(max){
    let ops = ['+', '-', '*', '/']
    let opIndex = generateNumber(3)
    let operator = ops[opIndex]
    return operator
}

function generateProblem() {
    arr = []
    for(let i = 0; i < generateNumber(5) + 1; i++)
    {
        arr.push((generateNumber(10)+1).toString(),generateOperator(3),(generateNumber(10)+1).toString(),generateOperator(3))
    }
    arr.push(generateNumber(9)+1).toString()
   return arr
}

ourForm.addEventListener("submit", handleSubmit)

function handleSubmit(e) {
    e.preventDefault()
    //Check answer
    let correctAnswer
    let problem = arr.join("")
    correctAnswer = Math.round(eval(problem))
    const p = state.currentProblem

    if (parseInt(ourField.value, 10) === correctAnswer) {
        state.score++
        pointsNeeded.textContent = 10 - state.score
        updateProblem()
        renderProgressBar()
    } else {
        state.wrongAnswers++
        mistakesAllowed.textContent = 2 - state.wrongAnswers
        problemElement.classList.add("animate-wrong")
        setTimeout(() => problemElement.classList.remove("animate-wrong"), 451)
    }
    checkLogic()
}

function checkLogic() {
    // if you won
    if (state.score === 10) {
        endMessage.textContent = "Congrats! You won."
        document.body.classList.add("overlay-is-open")
        setTimeout(() => resetButton.focus(), 331)
    }

    // if you lost
    if (state.wrongAnswers === 3) {
        endMessage.textContent = "Sorry! You lost."
        document.body.classList.add("overlay-is-open")
        setTimeout(() => resetButton.focus(), 331)
    }
}

resetButton.addEventListener("click", resetGame)

function resetGame() {
    document.body.classList.remove("overlay-is-open")
    updateProblem()
    state.score = 0
    state.wrongAnswers = 0
    pointsNeeded.textContent = 10
    mistakesAllowed.textContent = 2
    renderProgressBar()
}

function renderProgressBar() {
    progressBar.style.transform = `scaleX(${state.score / 10})`
}