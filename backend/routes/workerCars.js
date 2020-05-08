const router = require('express').Router();
let workerCar = require('../models/worker_car.model');

router.route('/').get((req, res) => {
  workerCar.list().then(([cars, metadata]) => res.json(cars))
});

router.route('/:id').get((req, res) => {
  workerCar.listFiltred(req.params.id).then(([cars, metadata]) => res.json(cars))
  });

  router.route('/acctual/:id').get((req, res) => {
    workerCar.currentWorker(req.params.id).then(([cars, metadata]) => res.json(cars))
  });

router.route('/end/:id').post((req, res) => {
  workerCar.end(req.params.id).then(([cars, metadata]) => res.json(cars))
})

router.route('/delete/:id').post((req, res) => {
  workerCar.delete(req.params.id).then(([d, metadata]) => res.json(d))
})

router.route('/add').post((req, res) => {
    const worker = req.body.worker;
    const car = req.body.car;
    const date = req.body.date;

    const newWorkerCar = new workerCar(
        worker,
        car,
        date
    )
    
    res.json(workerCar.add(newWorkerCar));
})

router.route('/update/:id').post((req, res) => {
  workerCar.update(req.body.workerid, req.body.carid).then(([cars, metadata]) => res.json(cars))
})

module.exports = router;