const express = require("express");

const router = express.Router();

const { products } = require("../data");

router.get("/api/products", (req, res, next) => {
  const newProducts = products.map((product) => {
    const { id, name, image, price } = product;
    // return { product };
    return { id, name, image, price };
  });

  res.json(newProducts);
  //res.send(newProducts);
});

router.get("/api/products/:productID", (req, res) => {
  console.log(req.params);
  const { productID } = req.params;

  const singleProduct = products.find(
    (product) => product.id === Number(productID)
  );

  if (!singleProduct) {
    return res.status(404).send("Product Does not exist");
  }

  //   const { id, name, image, price } = singleProduct;
  //   return res.json({ id, name, image, price });

  return res.json(singleProduct);
});

module.exports = router;
