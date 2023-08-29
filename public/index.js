// @ts-nocheck
let editingCardId = null;
let currentPageIndex = 0;
let paginatedCards = [];

// Agregar el evento para ocultar los puntos de ataque y su etiqueta
document
  .getElementById("card-type")
  .addEventListener("change", function (event) {
    const cardType = event.target.value;
    const cardBattlePointsInput = document.getElementById("card-battle-points");
    const battlePointsLabel = document.getElementById("battle-points-label");

    if (cardType === "mágica" || cardType === "trampa") {
      cardBattlePointsInput.style.display = "none";
      battlePointsLabel.style.display = "none";
      cardBattlePointsInput.value = "";
    } else {
      cardBattlePointsInput.style.display = "block";
      battlePointsLabel.style.display = "block";
    }
  });

// Evento para enviar el formulario de la carta
document
  .getElementById("card-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const cardType = document.getElementById("card-type").value;
    const cardName = document.getElementById("card-name").value;
    const cardDescription = document.getElementById("card-description").value;
    const cardBattlePoints =
      document.getElementById("card-battle-points").value;

    const formData = {
      cardType: cardType,
      cardName: cardName,
      cardDescription: cardDescription,
      cardBattlePoints: parseInt(cardBattlePoints),
    };

    if (editingCardId) {
      fetch(`/api/cards/${editingCardId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (updatedCard) {
          console.log("Carta actualizada exitosamente:", updatedCard);

          const tableRow = document.getElementById(editingCardId);
          tableRow.innerHTML =
            "<td>" +
            cardType +
            "</td>" +
            "<td>" +
            cardName +
            "</td>" +
            "<td>" +
            cardDescription +
            "</td>" +
            "<td data-battlePoints='" +
            cardBattlePoints +
            "'>" +
            cardBattlePoints +
            "</td>" +
            '<td class="actions"><button class="edit-btn">Editar</button><button class="delete-btn">Eliminar</button></td>';

          editingCardId = null;

          document.getElementById("card-form").reset();
        })
        .catch(function (error) {
          console.error("Error al actualizar la carta:", error);
        });
    } else {
      fetch("/api/cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (savedCard) {
          console.log("Carta guardada exitosamente:", savedCard);

          const newRow = document.createElement("tr");
          newRow.id = savedCard._id;
          newRow.innerHTML =
            "<td>" +
            cardType +
            "</td>" +
            "<td>" +
            cardName +
            "</td>" +
            "<td>" +
            cardDescription +
            "</td>" +
            "<td data-battlePoints='" +
            cardBattlePoints +
            "'>" +
            cardBattlePoints +
            "</td>" +
            '<td class="actions"><button class="edit-btn">Editar</button><button class="delete-btn">Eliminar</button></td>';

          document.getElementById("card-table-body").appendChild(newRow);

          document.getElementById("card-form").reset();
        })
        .catch(function (error) {
          console.error("Error al guardar la carta:", error);
        });
    }
  });

function fillFormWithCardDetails(card) {
  document.getElementById("card-type").value = card.cardType;
  document.getElementById("card-name").value = card.cardName;
  document.getElementById("card-description").value = card.cardDescription;
  document.getElementById("card-battle-points").value = card.cardBattlePoints;
  editingCardId = card._id;
}

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-btn")) {
    const row = event.target.parentNode.parentNode;
    const cardName = row.getElementsByTagName("td")[1].textContent;

    fetch(`/api/cards/search?term=${encodeURIComponent(cardName)}`, {
      method: "GET",
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (cards) {
        if (cards.length > 0) {
          const cardId = cards[0]._id;

          fetch(`/api/cards/${cardId}`, {
            method: "DELETE",
          })
            .then(function (response) {
              return response.json();
            })
            .then(function (removedCard) {
              console.log("Carta eliminada exitosamente:", removedCard);
              row.parentNode.removeChild(row);
            })
            .catch(function (error) {
              console.error("Error al eliminar la carta:", error);
            });
        } else {
          console.error("No se encontró la carta en la base de datos.");
        }
      })
      .catch(function (error) {
        console.error("Error al buscar las cartas en la base de datos:", error);
      });
  } else if (event.target.classList.contains("edit-btn")) {
    const row = event.target.parentNode.parentNode;
    const columns = row.getElementsByTagName("td");

    const cardType = columns[0].textContent;
    const cardName = columns[1].textContent;
    const cardDescription = columns[2].textContent;
    const cardBattlePoints = columns[3].textContent;

    const card = {
      _id: row.id,
      cardType,
      cardName,
      cardDescription,
      cardBattlePoints,
    };

    fillFormWithCardDetails(card);
  }
});

document
  .getElementById("sort-key")
  .addEventListener("change", function (event) {
    const sortKey = event.target.value;
    fetch(`/api/cards/sort/${sortKey}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (cards) {
        displayCards(cards);
      })
      .catch(function (error) {
        console.error("Error al obtener las cartas ordenadas", error);
      });
  });

document
  .getElementById("filter-key")
  .addEventListener("change", function (event) {
    const filterKey = event.target.value;
    if (filterKey === "") {
      fetch("/api/cards")
        .then(function (response) {
          return response.json();
        })
        .then(function (cards) {
          displayCards(cards);
        })
        .catch(function (error) {
          console.error("Error al obtener las cartas", error);
        });
    } else {
      fetch(`/api/cards/search?term=${encodeURIComponent(filterKey)}`)
        .then(function (response) {
          return response.json();
        })
        .then(function (cards) {
          displayCards(cards);
        })
        .catch(function (error) {
          console.error("Error al obtener las cartas filtradas", error);
        });
    }
  });

document
  .getElementById("search-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const searchTerm = document
      .getElementById("search-term")
      .value.toLowerCase();
    fetch("/api/cards/search?term=" + encodeURIComponent(searchTerm))
      .then(function (response) {
        return response.json();
      })
      .then(function (cards) {
        displayCards(cards);
      })
      .catch(function (error) {
        console.error("Error al realizar la búsqueda", error);
      });
  });

// Función para mostrar las cartas en la tabla
function displayCards(cards) {
  const limitPerPage = 10;
  paginatedCards = paginateCards(cards, limitPerPage);
  displayPaginatedCards(currentPageIndex, paginatedCards);
  displayPagination(paginatedCards);
  updatePageInfo(currentPageIndex + 1, paginatedCards.length);
}

function paginateCards(cards, limit) {
  const paginated = [];
  for (let i = 0; i < cards.length; i += limit) {
    paginated.push(cards.slice(i, i + limit));
  }
  return paginated;
}

function displayPagination(paginatedCards) {
  const prevButton = document.getElementById("prev-table");
  const nextButton = document.getElementById("next-table");

  prevButton.style.display = paginatedCards.length > 1 ? "block" : "none";
  nextButton.style.display = paginatedCards.length > 1 ? "block" : "none";
}

function displayPaginatedCards(index, paginatedCards) {
  const cardTableBody = document.getElementById("card-table-body");
  cardTableBody.innerHTML = "";

  if (
    paginatedCards.length > 0 &&
    index >= 0 &&
    index < paginatedCards.length
  ) {
    for (const card of paginatedCards[index]) {
      const newRow = document.createElement("tr");
      newRow.id = card._id;
      newRow.innerHTML =
        "<td>" +
        card.cardType +
        "</td>" +
        "<td>" +
        card.cardName +
        "</td>" +
        "<td>" +
        card.cardDescription +
        "</td>" +
        "<td data-battlePoints='" +
        card.cardBattlePoints +
        "'>" +
        card.cardBattlePoints +
        "</td>" +
        '<td class="actions"><button class="edit-btn">Editar</button><button class="delete-btn">Eliminar</button></td>';
      cardTableBody.appendChild(newRow);
    }
  } else {
    cardTableBody.innerHTML = "";
  }
}

updatePageInfo(currentPageIndex + 1, paginatedCards.length);

function updatePageInfo(currentPage, totalPages) {
  const pageInfo = document.getElementById("page-info");
  pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
}

// Evento para mostrar la página anterior de la tabla
document.getElementById("prev-table").addEventListener("click", function () {
  currentPageIndex = Math.max(0, currentPageIndex - 1);
  displayPaginatedCards(currentPageIndex, paginatedCards);
  updatePageInfo(currentPageIndex + 1, paginatedCards.length);
});

// Evento para mostrar la página siguiente de la tabla
document.getElementById("next-table").addEventListener("click", function () {
  currentPageIndex = Math.min(paginatedCards.length - 1, currentPageIndex + 1);
  displayPaginatedCards(currentPageIndex, paginatedCards);
  updatePageInfo(currentPageIndex + 1, paginatedCards.length);
});

// Obtener las cartas al cargar la página
fetch("/api/cards")
  .then(function (response) {
    return response.json();
  })
  .then(function (cards) {
    displayCards(cards);
  })
  .catch(function (error) {
    console.error("Error al obtener las cartas", error);
  });
