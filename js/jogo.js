// Este arquivo contém o código JavaScript para a página de jogo
document.addEventListener("DOMContentLoaded", () => {
  // Elementos do DOM
  const cardElement = document.getElementById("current-card")
  const cardTextElement = document.getElementById("card-text")
  const cardTypeElement = document.getElementById("card-type")
  const nextCardButton = document.getElementById("next-card")
  const gameEndElement = document.getElementById("game-end")
  const playAgainButton = document.getElementById("play-again")
  const deckTitleElement = document.getElementById("deck-title")

  // Variáveis do jogo
  let currentDeck = []
  let currentCardIndex = 0
  let isCardFlipped = false
  let deckName = ""
  let deckTitle = ""
  let activeSpecialCards = {}

  // Obter o nome do baralho da URL
  const urlParams = new URLSearchParams(window.location.search)
  deckName = urlParams.get("deck") || "sensual"

  // Configurar o título e estilo do baralho
  switch (deckName) {
    case "sensual":
      deckTitle = "Baralho Sensual"
      document.body.classList.add("sensual-deck")
      break
    case "infantil":
      deckTitle = "Baralho Infantil"
      document.body.classList.add("infantil-deck")
      break
    case "quebra-gelo":
      deckTitle = "Baralho Quebra-gelo"
      document.body.classList.add("quebra-gelo-deck")
      break
    case "casal":
      deckTitle = "Baralho Casal"
      document.body.classList.add("casal-deck")
      break
    case "familia":
      deckTitle = "Baralho Família"
      document.body.classList.add("familia-deck")
      break
    default:
      deckTitle = "Baralho de Cartas"
  }

  deckTitleElement.textContent = deckTitle

  // Carregar o baralho
  loadDeck()

  // Event listeners
  cardElement.addEventListener("click", flipCard)
  nextCardButton.addEventListener("click", nextCard)
  playAgainButton.addEventListener("click", resetGame)

  // Funções
  function loadDeck() {
    fetch(`baralhos/${deckName}.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Baralho não encontrado")
        }
        return response.json()
      })
      .then((data) => {
        currentDeck = shuffleArray(data)
        resetGame()
      })
      .catch((error) => {
        console.error("Erro ao carregar o baralho:", error)
        // Carregar baralho de exemplo se o arquivo não for encontrado
        currentDeck = getExampleDeck()
        resetGame()
      })
  }

  function flipCard() {
    if (currentCardIndex >= currentDeck.length) return

    if (!isCardFlipped) {
      cardElement.classList.add("flipped")
      isCardFlipped = true

      const currentCard = currentDeck[currentCardIndex]
      cardTextElement.textContent = currentCard.texto

      // Configurar o tipo da carta
      cardTypeElement.textContent = currentCard.tipo === "especial" ? "Especial" : "Comum"
      cardTypeElement.className = `card-type ${currentCard.tipo}`

      // Gerenciar cartas especiais ativas
      if (currentCard.tipo === "especial") {
        activeSpecialCards[currentCardIndex] = true
      }
    }
  }

  function nextCard() {
    if (!isCardFlipped) {
      flipCard()
      return
    }

    currentCardIndex++

    if (currentCardIndex >= currentDeck.length) {
      showGameEnd()
      return
    }

    // Resetar a carta
    cardElement.classList.remove("flipped")
    isCardFlipped = false

    // Pequeno atraso para garantir que a animação seja visível
    setTimeout(() => {
      cardTextElement.textContent = "Clique para revelar"
      cardTypeElement.textContent = ""
      cardTypeElement.className = "card-type"
    }, 250)
  }

  function showGameEnd() {
    gameEndElement.classList.remove("hidden")
  }

  function resetGame() {
    currentCardIndex = 0
    isCardFlipped = false
    activeSpecialCards = {}

    cardElement.classList.remove("flipped")
    gameEndElement.classList.add("hidden")

    cardTextElement.textContent = "Clique para revelar"
    cardTypeElement.textContent = ""
    cardTypeElement.className = "card-type"

    // Embaralhar novamente
    currentDeck = shuffleArray(currentDeck)
  }

  function shuffleArray(array) {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }

  function getExampleDeck() {
    // Baralho de exemplo caso o arquivo JSON não seja encontrado
    const exampleDecks = {
      sensual: [
        { texto: "Tire uma peça de roupa", tipo: "comum" },
        { texto: "Beije o pescoço do parceiro por 30 segundos", tipo: "comum" },
        { texto: "Faça uma massagem por 2 minutos", tipo: "comum" },
        { texto: "Descreva uma fantasia sua", tipo: "comum" },
        { texto: "Todos tiram uma peça de roupa", tipo: "especial" },
        { texto: "Apague as luzes até a próxima carta especial", tipo: "especial" },
        { texto: "Escolha alguém para tirar uma peça de roupa", tipo: "comum" },
        { texto: "Conte uma experiência íntima", tipo: "comum" },
      ],
      infantil: [
        { texto: "Imite um animal", tipo: "comum" },
        { texto: "Pule como um sapo 5 vezes", tipo: "comum" },
        { texto: "Cante uma música infantil", tipo: "comum" },
        { texto: "Faça uma careta engraçada", tipo: "comum" },
        { texto: "Todos devem dançar até a próxima carta especial", tipo: "especial" },
        { texto: "Conte uma piada", tipo: "comum" },
        { texto: "Fale como um robô", tipo: "comum" },
        { texto: "Todos batem palmas", tipo: "especial" },
      ],
      "quebra-gelo": [
        { texto: "Conte algo sobre você que ninguém sabe", tipo: "comum" },
        { texto: "Qual seu maior sonho?", tipo: "comum" },
        { texto: "Se pudesse viajar para qualquer lugar, onde seria?", tipo: "comum" },
        { texto: "Qual sua comida favorita?", tipo: "comum" },
        { texto: "Todos devem contar uma curiosidade sobre si", tipo: "especial" },
        { texto: "Qual seu filme favorito?", tipo: "comum" },
        { texto: "Conte uma história engraçada da sua infância", tipo: "comum" },
        { texto: "Qual seu maior medo?", tipo: "comum" },
      ],
      casal: [
        { texto: "Diga o que mais gosta no seu parceiro", tipo: "comum" },
        { texto: "Conte como foi o primeiro encontro", tipo: "comum" },
        { texto: "Dê um elogio sincero", tipo: "comum" },
        { texto: "Qual foi o momento mais feliz do relacionamento?", tipo: "comum" },
        { texto: "Troquem uma massagem até a próxima carta especial", tipo: "especial" },
        { texto: "Conte um sonho para o futuro do casal", tipo: "comum" },
        { texto: "Dê um beijo carinhoso", tipo: "comum" },
        { texto: "Façam um brinde ao relacionamento", tipo: "especial" },
      ],
      familia: [
        { texto: "Conte uma história da família", tipo: "comum" },
        { texto: "Qual sua memória favorita de infância?", tipo: "comum" },
        { texto: "Dê um abraço em alguém", tipo: "comum" },
        { texto: "Faça um elogio para cada pessoa", tipo: "comum" },
        { texto: "Todos devem contar uma qualidade da família", tipo: "especial" },
        { texto: "Qual tradição familiar você mais gosta?", tipo: "comum" },
        { texto: "Conte uma piada", tipo: "comum" },
        { texto: "Tirem uma foto juntos", tipo: "especial" },
      ],
    }

    return exampleDecks[deckName] || exampleDecks["sensual"]
  }

  // Adicionar som de virar carta (opcional)
  function playCardFlipSound() {
    // Implementação futura
  }
})
