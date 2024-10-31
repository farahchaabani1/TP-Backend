module.exports = (produit) => {
  const ProductController = require("../controllers/prodController.js");

  produit.post("/create", ProductController.create);

  produit.get("/get-all", ProductController.findAll);

  produit.get("/produit/:productId", ProductController.findOne);

  produit.put("/produit/:productId", ProductController.update);

  produit.delete("/produit/:productId", ProductController.delete);
};
