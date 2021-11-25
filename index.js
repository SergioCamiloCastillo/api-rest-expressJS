const express = require("express");
const { errorHandler, logErrors, boomErrorHandler } = require("./middlewares/errorHandler");
const routerApi = require("./routes");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hola mi servidor el express");
});



app.get("/nueva-ruta", (req, res) => {
  res.send("Hola soy el nuevo endpoint");
});

app.get("/users", (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({
      limit: limit,
      offset: offset
    })
  } else {
    res.send("no hay parametros");
  }
});

app.get("/categories/:idCategory/products/:productId", (req, res) => {
  const { idCategory, productId } = req.params;
  res.json({
    idCategory: idCategory,
    productId: productId,
    name: "product2",
    price: "3000",

  })
})
app.listen(port, () => {
  console.log("esta corriendo en el puerto", port);
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
