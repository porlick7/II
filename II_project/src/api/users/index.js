const { Router } = require('express');
const token = require('../../loginMiddleware/token')
const router = Router();
const User = require('./model');
const { sign } = require("../../services/jwt");

router.post('/',
    async ({ body }, res, next) => {
        try {
            const user = await User.create(body);
            res.json({
                user: user.view(),
                token: sign(user)
            })
        } catch (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                return res.status(409).json({
                    message: 'Email or username already registered'
                })
            }
            next(err);
    }});

router.get('/',
    token,
    async ({ query }, res, next) => {
        let users = await User.find();
        // Staramy się NIGDY nie zwracac danych bezposrednio z bazy (bez filtracji pól), choc hasla za zaszyfrowane,
        // ich upubliczenienie to powazna luka bezpieczenstwa!
        users = users.map(user => user.view());
        res.json(users)
    });

router.get('/me', token, async (req, res, next) => {
        let { user } = req;      // w req znajduje sie tylko ID urzytkownika dolaczone przez middleware,
        // jesli potrzebujemy wiecej danych (email, username) mozemy je pobrac, albo w kontrolerze albo w middlewarze
        res.json(user);
    });

    
module.exports = router;
