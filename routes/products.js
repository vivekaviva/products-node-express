const express = require("express");

const router = express.Router();

const { products } = require("../data");
const common = require("../helpers/common");

//All Products
router.get("/api/products", (req, res, next) => {
  const newProducts = products.map((product) => {
    const { id, name, image, price } = product;
    // return { product };
    return { id, name, image, price };
  });

  // const message = newProducts ? "Success! " : " No Products Found";

  return common.sendResponse(newProducts, req, res);

  // res.status(200).json({ sucess: true, status: 200, data: newProducts });
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
    const message = "Product does not exist";

    return common.sendError(message, singleProduct, res);

    // return res.status(404).send("Product Does not exist");
  }

  // const { id, name, image, price } = singleProduct;
  // return res.json({ id, name, image, price });

  return common.sendResponse(singleProduct, req, res);
  // return res.json({ sucess: true, status: 200, data: singleProduct });
});

//Review with id
router.get("/api/products/:productID/reviews/:reviewID", (req, res) => {
  const { productID, reviewID } = req.params;
  console.log("ids", productID, reviewID);

  const product = products.find((product) => product.id === Number(productID));

  if (!product) {
    const message = "Product does not exist";
    return common.sendError(message, product, res);
    // return res.status(404).send("Product Does not exist");
  }

  const review = product.reviews.find(
    (review) => review.id === Number(reviewID)
  );

  if (!review) {
    return res.status(404).send("Review Does not exist");
  }

  return common.sendResponse(review, req, res);
  // return res.json({ sucess: true, status: 200, data: review });
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

  // if (reviews.length < 1) {
  //   return res.status(200).json({ sucess: true, data: [] });
  // }

  return res.json({ sucess: true, status: 200, data: reviews });
});

//Filter
//http://localhost:8080/api/filter?search=39.95
router.get("/api/filter", (req, res) => {
  //search ---> al
  const { search } = req.query;

  let sortedProducts = [...products];

  if (search) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.price.toString().startsWith(search);

      // return product.price.startsWith(search);
      //return product.name.startsWith(search);
      // return product.name.matchAll(search);
      // return product.name.match(search);
      // return product.name.includes(search);
    });
  }

  if (sortedProducts.length < 1) {
    return res.status(200).json({ sucess: true, data: [] });
  }
  res.status(200).json({ sucess: true, data: sortedProducts });
});

//limit
//http://localhost:8080/api/limit?limit=3
router.get("/api/limit", (req, res) => {
  const { limit } = req.query;
  let sortedProducts = [...products];

  if (limit) {
    //slice(1,3)
    sortedProducts = sortedProducts.slice(1, Number(limit));
  }

  if (sortedProducts.length < 1) {
    return res.status(200).json({ sucess: true, data: [] });
  }

  res.status(200).json({ sucess: true, data: sortedProducts });
});

//Limit and Search
//http://localhost:8080/api/query?limit=3&search=al
router.get("/api/query", (req, res) => {
  const { search, limit } = req.query;

  let sortedProducts = [...products];

  if (search) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.startsWith(search);
    });
  }

  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit));
  }

  if (sortedProducts.length < 1) {
    return res.status(200).json({ sucess: true, data: [] });
  }

  return res.status(200).json({ sucess: true, data: sortedProducts });
});

/**
 * create products api
 * Method - post
 */
router.post("/api/products", (req, res) => {
  const { id, name, image, price, desc, reviews } = req.body;

  //validation
  if (!id || !name || !image || !price || !desc) {
    return res.status(500).json({ error: "Please provide all the datas" });
  }

  const newProduct = { id, name, image, price, desc, reviews: reviews || [] };
  products.push(newProduct);

  res.status(200).json({ sucess: true, data: newProduct });
});

/**
 * Update the product details
 */
router.put("/api/products/:productID", (req, res) => {
  const { productID } = req.params;
  const { id, name, image, price, desc, reviews } = req.body;

  console.log("productID", productID);
  const product = products.find((p) => p.id === Number(productID));
  console.log("product", product);

  if (!product) {
    return res.status(404).json({ Error: "Product Not Found" });
  }

  if (id) {
    return res.status(500).json({ Error: "Id is unique element" });
  }

  // Update the product's properties only if they are provided in the request body
  if (name) product.name = name;
  if (image) product.image = image;
  if (price) product.price = price;
  if (desc) product.desc = desc;
  if (reviews) product.reviews = reviews;

  res.status(200).json({ success: true, data: product });
});

/**
 * Delete the product
 */
router.delete("/api/products/:productID", (req, res) => {
  const { productID } = req.params;

  const product = products.findIndex(
    (product) => product.id === Number(productID)
  );

  if (product === -1) {
    return res.status(404).json({ error: "product not found" });
  }

  const deletedProduct = products.splice(product, 1);

  // res.status(200).json(deletedProduct[0]);
  res.status(200).json(products);
});

module.exports = router;
