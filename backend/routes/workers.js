const router = require('express').Router();
let Worker = require('../models/worker.model');

router.route('/').get((req, res) => {
  Worker.list().then(([workers, metadata]) => res.json(workers))
});

router.route('/drivers').get((req, res) => {
  Worker.driver().then(([drivers, metadata]) => res.json(drivers))
})


function createWorker(req){
  return new Worker(
    req.body.Imie,
    req.body.Nazwisko,
    req.body.AdresEmail,
    req.body.Stanowisko,
    req.body.Firma,
    req.body.DataZatrudnienia,
    req.body.Zdjecie,
    req.body.pass
  )

}

router.route('/add').post((req, res) => {
  Worker.add(createWorker(req)).then(res.json());
});

router.route('/update/:id').post((req, res) => {
  Worker.updateWorker(req.params.id, createWorker(req)).then(res.json());
});

router.route('/:id').get((req, res) => {
  Worker.getWorker(req.params.id).then(([worker, metadata]) => res.json(worker))
});

router.route('/:id').delete((req, res) => {
  res.json(Worker.deleteWorker(req.params.id));
});

module.exports = router;