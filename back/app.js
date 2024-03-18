const express = require('express');
const cors = require('cors');
const routes = require('./src/routes/apiRoute.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


routes(app);


app.listen(port, () => {
  console.log(`Servidor Express en ejecución en el puerto ${port}`);
});
