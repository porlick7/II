const express = require("express");
const { Product } = require("./model")

const router = express.Router();

router.get('/products', (req, res) => {
    Product.find()
        .then(products => res.json(products))
        .catch(err => res.status(400).json("Error: " + err));
});

router.post('/products', async (req, res) => { 
    const { body } = req; 
    try {
        const products = await Product.create(body);
        res.json(products);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ error: "title must be unique" }); 
        }
        res.status(400).json({ error: err.message }); 
    }
});

router.get('/products/:id', async (req, res) => { 
    const { id } = req.params; //the same as req.params.id
    try {
        const check = await Product.exists({ _id: id });
        if (check) {
            const products = await Product.findById(id);
            res.json(products);
        }
        return res.status(404).end();
    } catch (err) {
        res.status(400).end(); 
    }
});

router.put('/products/:id', async (req, res, next) => { 
    const { id } = req.params;
    const { body } = req;
    try {
        let products = await Product.findById(id);
        if (!products)
            return res.status(404).end(); 
        await Product.findByIdAndUpdate({ _id: id }, body);
        res.json("products are updated")
    } catch (err) {
        res.status(res.status(400).json({ error: err.message })); 
    }
});

router.delete('/products/:id', async (req, res) => { 
    const { id } = req.params;

    await Product.findByIdAndDelete(id, (err, doc) => {
        if (err) return res.status(400).json({ error: err.message });
        if (!doc) return res.status(404).end(); 

        res.status(204).end();
    });
});


module.exports = router;