const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;
const FILE = "myfile.txt";

app.use(express.text());

// GET /
app.get("/", (req, res) => {
  fs.readFile(FILE, "utf8", (err, data) => {
    if (err) return res.status(404).send("File not found or empty");
    res.send(data || "Empty file");
  });
});

// POST /write
app.post("/write", (req, res) => {
  fs.writeFile(FILE, req.body, (err) => {
    if (err) return res.status(500).send("Error writing file");
    res.send("File written successfully");
  });
});

// PUT /update
app.put("/update", (req, res) => {
  fs.appendFile(FILE, "\n" + req.body, (err) => {
    if (err) return res.status(500).send("Error updating file");
    res.send("File updated successfully");
  });
});

// DELETE /remove
app.delete("/remove", (req, res) => {
  fs.unlink(FILE, (err) => {
    if (err) return res.status(404).send("File not found");
    res.send("File deleted successfully");
  });
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
});
