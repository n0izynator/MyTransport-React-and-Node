const router = require('express').Router();
let Worker = require('../models/worker.model');
var bcrypt = require('bcryptjs');

function check(pass, hash){
    return bcrypt.compareSync(pass, hash)
}


router.route('/').post((req, res) => {

    const login = {
        email: req.body.email,
    }

    Worker.login(login).then(([log, meta]) => {
        const auth = {
            auth: check(req.body.pass, log[0].Password),
            ID: log[0].ID
        }

        res.json(auth);
    });
  });

module.exports = router;