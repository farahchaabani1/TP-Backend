const Product = require("../model/prodModel.js");

// Créer et sauvegarder un nouveau produit
exports.create = (req, res) => {
    const product = new Product({
        nom: req.body.nom,
        description: req.body.description,
        prix: req.body.prix,
    });

    product.save()
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Une erreur s'est produite lors de la création du produit.",
            });
        });
};

// Récupérer tous les produits
exports.findAll = (req, res) => {
    Product.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Une erreur s'est produite lors de la récupération des produits.",
            });
        });
};

// Trouver un produit par ID
exports.findOne = (req, res) => {
    Product.findById(req.params.productId)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Produit non trouvé avec l'ID " + req.params.productId,
                });
            }
            res.send(data);
        })
        .catch(err => {
            if (err.kind === "ObjectId") {
                return res.status(404).send({
                    message: "Produit non trouvé avec l'ID " + req.params.productId,
                });
            }
            return res.status(500).send({
                message: "Erreur lors de la récupération du produit avec l'ID " + req.params.productId,
            });
        });
};

// Mettre à jour un produit par ID
exports.update = (req, res) => {
    Product.findByIdAndUpdate(
        req.params.productId,
        {
            nom: req.body.nom,
            description: req.body.description,
            prix: req.body.prix,
        },
        { new: true }
    )
    .then(data => {
        if (!data) {
            return res.status(404).send({
                message: "Produit non trouvé avec l'ID " + req.params.productId,
            });
        }
        res.send(data);
    })
    .catch(err => {
        if (err.kind === "ObjectId") {
            return res.status(404).send({
                message: "Produit non trouvé avec l'ID " + req.params.productId,
            });
        }
        return res.status(500).send({
            message: "Erreur lors de la mise à jour du produit avec l'ID " + req.params.productId,
        });
    });
};

// Supprimer un produit par ID
exports.delete = (req, res) => {
    Product.findByIdAndDelete(req.params.productId)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Produit non trouvé avec l'ID " + req.params.productId,
                });
            }
            res.send({ message: "Produit supprimé avec succès !" });
        })
        .catch(err => {
            if (err.kind === "ObjectId" || err.name === "NotFound") {
                return res.status(404).send({
                    message: "Produit non trouvé avec l'ID " + req.params.productId,
                });
            }
            return res.status(500).send({
                message: "Impossible de supprimer le produit avec l'ID " + req.params.productId,
            });
        });
};
