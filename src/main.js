

import './style.css'

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#app').innerHTML = `
        <h1>Memory card</h1>
        <div id="grid-container"></div>
        <p>Score: <span class="score"></span></p>
         <div class="action">
            <button id="restart-btn">Restart</button>
        </div>
    `

  let cards = [
    { name: 'card1', image: 'image/apple.png' },
    { name: 'card2', image: 'image/banana.png' },
    { name: 'card3', image: 'image/mellong.png' },
    { name: 'card4', image: 'image/peper.png' },
    { name: 'card5', image: 'image/onion.png' },
    { name: 'card6', image: 'image/tomat.png' },
    { name: 'card7', image: 'image/series.png' },
    { name: 'card8', image: 'image/orange.png' },
    { name: 'card9', image: 'image/corn.png' }
    
  ].flatMap(card => [card, {...card}])

  let firstCard, secondCard
  let lockBoard = false
  let score = 0

  document.querySelector('.score').textContent = score

  function reshuffleCards() {
      let currentIndex = cards.length
      let randomIndex, temporaryValue
      while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex)
          currentIndex -= 1
          temporaryValue = cards[currentIndex]
          cards[currentIndex] = cards[randomIndex]
          cards[randomIndex] = temporaryValue
      }
  }

  function generateCards() {
      const gridContainer = document.getElementById('grid-container')
      gridContainer.innerHTML = ''

      for (const card of cards) {
          const cardElement = document.createElement('div')
          gridContainer.appendChild(cardElement)

          cardElement.classList.add('cards')
          cardElement.setAttribute('data-name', card.name)
          cardElement.innerHTML = `
                <div class="front">
                    <img src="${card.image}" class="front-image">
                </div>
                <div class="back"></div>
            `

          cardElement.addEventListener('click', flipCard)
      }
  }

  function flipCard() {
      if (lockBoard) return
      if (this === firstCard) return

      this.classList.add('flipped')

      if (!firstCard) {
          firstCard = this
          return
      }

      secondCard = this
      lockBoard = true

      checkForMatch()
  }

  function checkForMatch() {
      const isMatch = firstCard.dataset.name === secondCard.dataset.name
      if (isMatch) {
          disableCards()
          score++
          document.querySelector('.score').textContent = score
      } else {
          unflipCards()
      }
  }

  function disableCards() {
      firstCard.removeEventListener('click', flipCard)
      secondCard.removeEventListener('click', flipCard)
      resetBoard()
  }

  function unflipCards() {
      setTimeout(() => {
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
      reshuffleCards()
      score = 0
      document.querySelector('.score').textContent = score
      const gridContainer = document.getElementById('grid-container')
      gridContainer.innerHTML = ''
      generateCards()
  }

  document.querySelector('#restart-btn').addEventListener('click', restart)

  generateCards()
})
