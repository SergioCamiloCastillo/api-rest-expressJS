const express = require("express");
const validatorHandler = require("../middlewares/validatorHandler");
const { createProductSchema, updateProductSchema, getProductSchema } = require("../schemas/productSchema");
const ProductsService = require("../services/productService");
const router = express.Router();
const service = new ProductsService();



router.get("/filter", (req, res) => {
  res.send("soy un filter")
})

router.get("/", async (req, res) => {
  const products = await service.find();
  res.json(products);
});

router.get("/:id",
  validatorHandler(getProductSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }

  });

router.post("/",
  validatorHandler(createProductSchema, "body"),

  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct)
  });

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.json(product)

  } catch (error) {
    res.status(404).json({
      message: "No encontrado"
    })
  }


});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const rta = await service.delete(id);

  res.json(rta);
})
module.exports = router;
