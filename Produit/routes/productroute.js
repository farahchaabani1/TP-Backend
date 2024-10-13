module.exports = (app) => {
  const ProductController = require("../controllers/prodController.js");

  // Créer un produit
  app.post("/create", ProductController.create);

  // Récupérer tous les produits
  app.get("/get-all", ProductController.findAll);

  // Récupérer un produit par ID
  app.get("/produit/:productId", ProductController.findOne);

  // Mettre à jour un produit par ID
  app.put("/produit/:productId", ProductController.update);

  // Supprimer un produit par ID
  app.delete("/produit/:productId", ProductController.delete);
};
