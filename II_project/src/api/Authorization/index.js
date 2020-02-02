const {sign} = require("../../services/jwt");
const { Router } = require('express');
const password = require('../../loginMiddleware/password');


const router = Router();

router.post('/', password, async (req, res, next) => {
        const user = req.user;
        const token = sign(user);
    
        return res.json({
            user: user.view(),
            token
        })
    });

module.exports = router;