const Product = require("../model/prodModel.js");

exports.create = (req, res) => {
    const product = new Product({
        nom: req.body.nom,
        description: req.body.description,
        prix: req.body.prix,
        images: req.body.images || []
    });

    product.save()
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Product.",
            });
        });
};

exports.findAll = (req, res) => {
    Product.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving products.",
            });
        });
};

exports.findOne = (req, res) => {
    Product.findById(req.params.productId)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.productId,
                });
            }
            res.send(data);
        })
        .catch(err => {
            if (err.kind === "ObjectId") {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.productId,
                });
            }
            return res.status(500).send({
                message: "Error retrieving message with id " + req.params.productId,
            });
        });
};

exports.update = (req, res) => {
    Product.findByIdAndUpdate(
        req.params.productId,
        {
            nom: req.body.nom,
            description: req.body.description,
            prix: req.body.prix,
            images: req.body.images || [] 
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
