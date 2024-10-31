const mongoose = require('mongoose');

const CommandeSchema = new mongoose.Schema({
    date: { 
        type: Date, 
        default: Date.now 
    },
    client: { 
        type: String, 
        required: true 
    },
    produits: 
    [{
        produit: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Produit', 
            required: true 
        },
        quantite: { 
            type: Number, 
            required: true, 
            min: 1 
        } 
    }]
});

const Commande = mongoose.model('Commande', CommandeSchema);

module.exports = Commande;