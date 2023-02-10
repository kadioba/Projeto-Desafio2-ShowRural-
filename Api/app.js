const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/server", (req, res) => {
  const image = req.body.image;

  // Verificar se a imagem é válida
  if (!image) {
    return res.json({ message: "Imagem inválida" });
  }

  // Salvar a imagem
  const imageBuffer = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ""), "base64");
  fs.writeFile("image.jpg", imageBuffer, (err) => {
    if (err) {
      return res.json({ message: "Erro ao salvar a imagem" });
    }

    // Executar o programa Python
    const imagePath = path.resolve("image.jpg");
    exec(`python process_image.py ${imagePath}`, (error, stdout, stderr) => {
      if (error) {
        return res.json({ message: "Erro ao processar a imagem" });
      }

      res.json({ message: "Imagem processada com sucesso!", result: stdout });
    });
  });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});