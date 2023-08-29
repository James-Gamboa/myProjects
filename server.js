// @ts-nocheck
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const port = 3000;
const mongoURI =
"";

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Conexión exitosa a MongoDB");
  })
  .catch((err) => {
    console.error("Error al conectar a MongoDB", err);
  });

const cardSchema = new mongoose.Schema({
  cardType: String,
  cardName: String,
  cardDescription: String,
  cardBattlePoints: Number,
});

const Card = mongoose.model("Card", cardSchema);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Registro de cartas
app.post("/api/cards", async (req, res) => {
  try {
    const { cardType, cardName, cardDescription, cardBattlePoints } = req.body;
    const newCard = new Card({
      cardType,
      cardName,
      cardDescription,
      cardBattlePoints,
    });

    const savedCard = await newCard.save();
    console.log("Card saved successfully:", savedCard);
    res.status(201).json(savedCard);
  } catch (err) {
    console.error("Error saving the card:", err);
    res
      .status(500)
      .json({ error: "Error al guardar la carta en la base de datos" });
  }
});

// Visualización de cartas con paginación
app.get("/api/cards", async (req, res) => {
  const limitPerPage = 10;
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * limitPerPage;

  try {
    const totalCards = await Card.countDocuments();
    const totalPages = Math.ceil(totalCards / limitPerPage);

    const cards = await Card.find().skip(offset).limit(limitPerPage).exec();

    res.json({
      cards,
      currentPage: page,
      totalPages,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error al obtener las cartas de la base de datos" });
  }
});

// Búsqueda de cartas
app.get("/api/cards/search", (req, res) => {
  let term = req.query.term;
  const regex = new RegExp(term, "i");
  Card.find({ $or: [{ cardName: regex }, { cardType: term }] })
    .then((cards) => {
      res.json(cards);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "Error al buscar las cartas en la base de datos" });
    });
});

// Edición de cartas
app.put("/api/cards/:id", (req, res) => {
  const { id } = req.params;
  const { cardType, cardName, cardDescription, cardBattlePoints } = req.body;

  Card.findByIdAndUpdate(
    id,
    {
      cardType,
      cardName,
      cardDescription,
      cardBattlePoints,
    },
    { new: true }
  )
    .then((updatedCard) => {
      if (updatedCard) {
        res.json(updatedCard);
      } else {
        res.status(404).json({ error: "Carta no encontrada" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "Error al actualizar la carta en la base de datos" });
    });
});

// Eliminación de cartas
app.delete("/api/cards/:id", (req, res) => {
  const { id } = req.params;

  Card.findByIdAndRemove(id)
    .then((removedCard) => {
      if (removedCard) {
        res.json(removedCard);
      } else {
        res.status(404).json({ error: "Carta no encontrada" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "Error al eliminar la carta de la base de datos" });
    });
});

// Ordenamiento de cartas
app.get("/api/cards/sort/:sortKey", (req, res) => {
  const { sortKey } = req.params;
  let sortOptions = {};
  if (sortKey === "name") {
    sortOptions = { cardName: 1 };
  } else if (sortKey === "battlePoints") {
    sortOptions = { cardBattlePoints: 1 };
  }

  Card.find()
    .sort(sortOptions)
    .then((cards) => {
      res.json(cards);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "Error al obtener las cartas de la base de datos" });
    });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});
