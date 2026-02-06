const fs = require('fs');
const path = require('path');

const getProducts = (req, res) => {
    try {
        const filePath = path.join(__dirname, '../data/products.json');
        const fileData = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(fileData);
        console.log(data.products);
        res.status(200).json(data.products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const getProductById = (req, res) => {
    try {
        const filePath = path.join(__dirname, '../data/products.json');
        const fileData = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(fileData);
        const product = data.products.find(p => p.id === parseInt(req.params.id));
        console.log(product);

        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = {
    getProducts,
    getProductById
};
