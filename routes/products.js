const express = require("express");

const router = express.Router();

const { products } = require("../data");

//All Products
router.get("/api/products", (req, res, next) => {
  const newProducts = products.map((product) => {
    const { id, name, image, price } = product;
    // return { product };
    return { id, name, image, price };
  });

  res.status(200).json({ products: newProducts });
  //res.send(newProducts);
});

//Single Product
router.get("/api/products/:productID", (req, res) => {
  console.log(req.params);
  const { productID } = req.params;

  console.log(productID);

  const singleProduct = products.find(
    (product) => product.id === Number(productID)
  );

  if (!singleProduct) {
    return res.status(404).send("Product Does not exist");
  }

  // const { id, name, image, price } = singleProduct;
  // return res.json({ id, name, image, price });

  return res.json(singleProduct);
});

//Review with id
router.get("/api/products/:productID/reviews/:reviewID", (req, res) => {
  const { productID, reviewID } = req.params;
  console.log("ids", productID, reviewID);

  const product = products.find((product) => product.id === Number(productID));
  if (!product) {
    return res.status(404).send("Product Does not exist");
  }

  const review = product.reviews.find(
    (review) => review.id === Number(reviewID)
  );

  if (!review) {
    return res.status(404).send("Review Does not exist");
  }

  return res.json(review);
});

//Review
router.get("/api/products/reviews/:productID", (req, res) => {
  console.log(req.params);
  const { productID } = req.params;

  console.log(productID);

  const singleProductReview = products.find(
    (product) => product.id === Number(productID)
  );

  if (!singleProductReview) {
    return res.status(404).send("Review Does not exist");
  }

  const { reviews } = singleProductReview;
  return res.json({ reviews });
});

//Filter
router.get("/api/filter", (req, res) => {
  const { search } = req.query;

  let sortedProducts = [...products];

  if (search) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.startsWith(search);
      // return product.name.matchAll(search);
      // return product.name.match(search);
      // return product.name.includes(search);
    });
  }

  if (sortedProducts.length < 1) {
    return res.status(200).json({ sucess: true, data: [] });
  }
  res.status(200).json(sortedProducts);
});

//limit
router.get("/api/limit", (req, res) => {
  const { limit } = req.query;
  let sortedProducts = [...products];

  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit));
  }

  if (sortedProducts.length < 1) {
    return res.status(200).json({ sucess: true, data: [] });
  }

  res.status(200).json(sortedProducts);
});

module.exports = router;
