const express = require("express");
const dbConnect = require("./src/db/db");
const Note = require("./src/models/note.model");
const app = express();
app.use(express.json());

dbConnect();

app.post("/notes", async (req, res) => {
  const { title, content } = req.body;

  await Note.create({ title, content });

  res.json({
    message: "Note created successfully",
  });
});

app.get("/notes", async (req, res) => {
  const notes = await Note.find();

  res.json({
    message: "Notes fetched successfully",
    data: notes,
  });
});

app.delete("/notes/:id", async (req, res) => {
  const NoteId = req.params.id;
  await Note.findOneAndDelete({
    _id: NoteId,
  });
  res.json({
    message: "Note deleted successfully",
  });
});

app.patch("/notes/:id", async (req, res) => {
  const NoteId = req.params.id;
  const { title, content } = req.body;

  await Note.findOneAndUpdate(
    {
      _id: NoteId,
    },
    {
      title,
      content,
    }
  );

  res.json({
    message: "Note updated successfully",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
