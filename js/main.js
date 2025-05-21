// Este arquivo contém o código JavaScript para a página inicial
document.addEventListener("DOMContentLoaded", () => {
  // Adiciona efeito de hover nos cards de baralho
  const deckCards = document.querySelectorAll(".deck-card")

  deckCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })
  })
})
