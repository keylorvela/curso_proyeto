const express = require('express');
const cors = require('cors');
const routes = require('./src/routes/apiRoute.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  const htmlResponse = `
    <html>
      <head>
        <title>HTML Response</title>
      </head>
      <body>
        <h1>Hola esto es una prueba</h1>
      </body>
    </html>
  `;
  return res.send(htmlResponse);
});


routes(app);


app.listen(port, () => {
  console.log(`Servidor Express en ejecución en el puerto ${port}`);
});
