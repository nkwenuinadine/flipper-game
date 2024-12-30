import './style.css'

const gridContainer = document.getElementById('grid-container')

let cards = []
let firstCard, secondCard
let lockBoard = false
let score = 0

document.querySelector('#app').innerHTML = `
 <h1>Memory card</h1>
  <div class="grid-container"></div>
  <p>Score: <span class="score"></span></p>
  <div class="action">
    <button onclick="restart">Restart</button>
  </div>
`


document.querySelector('.score').textContent = score

fetch('./data/cards.json')
  .then((res) => res.json())
  .then(data => {
    cards = [...data, ...data]
})

function reshuffleCard (){
    let currentIndex = cards.length,
    randonIndex,
    temporaryValue
    while(currentIndex !==0){
        randonIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1
        temporaryValue = cards[currentIndex]
        cards[currentIndex] = cards[randonIndex]
        cards[randonIndex] = temporaryValue
    }
}

function generatecards(){
    const cardElement = document.createElement('div')
    for (let card of cards) {
        cardElement.classList.add('cards')
        cardElement.setAttribute('data-name', card.name)
        cardElement.innerHTML =`
        <div class="front">
          <img src="${card.image}" class="front-image">
        </div>
        <div class="back"></div>
       `
       gridContainer.appendChild(cardElement)
       cardElement.addEventListener('click',)
    }      
}

function flipcard() {
   if(lockBoard) return
   if(this === firstCard) return

   this.classList.add('flipped')

   if(!firstCard) {
    firstCard = this
    return
   }

   secondCard = this
   score++
   document.querySelector('.score').textContent = score
   lockBoard = true

   checkForMatch()
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name

    isMatch ? disableCards() : unflipCards()
}

function disableCards() {
    firstCard.removeEventListener('click', flipcard)
    secondCard.removeEventListener('click', flipcard)

    resetBoard()
}

function unflipCards() {
    setTimeout(() =>{
        firstCard.classList.remove('flipped')
        secondCard.classList.remove('flipped')
        resetBoard()
    }, 1000)
}

function resetBoard() {
    firstCard = null
    secondCard = null
    lockBoard = false
}

function restart() {
    resetBoard()
    shuffleCards()
    score = 0
    document.querySelector('.score').textContent = score
    gridContainer.innerHTML = ""
    generatecards()
}
