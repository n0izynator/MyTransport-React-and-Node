const router = require('express').Router();
let Car = require('../models/car.model');

router.route('/').get((req, res) => {
  Car.list().then(([cars, metadata]) => res.json(cars))
  
});

router.route('/add').post((req, res) => {

  const NumerRejestracyjny = req.body.NumerRejestracyjny;
  const Marka = req.body.Marka;
  const Model = req.body.Model;
  const Firma = 1;
  const Rodzaj = 1;
  const VIN = req.body.VIN;
  const RokProducji = req.body.RokProducji;
  const Zdjecie = req.body.Zdjecie;

  var re = /[A-Z][A-Z0-9][A-Z]{0,1}[A-Z0-9]{3,5}/;
  var re1 = /[0-9A-Z]{17}/;
  var re2 = /^[A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]+$/;
  var re3 = /^[A-Za-z0-9.-]+$/;

  if(re.test(String(NumerRejestracyjny)) && re1.test(String(VIN)) && re2.test(String(Marka)) && re3.test(String(Model))){
    const newCar = new Car(
      NumerRejestracyjny,
      Marka,
      Model,
      Firma,
      Rodzaj,
      VIN,
      RokProducji,
      Zdjecie
    );
    
    Car.add(newCar).then(err => res.json(err));
  }
});

router.route('/update/:id').post((req, res) => {

  const NumerRejestracyjny = req.body.NumerRejestracyjny;
  const Marka = req.body.Marka;
  const Model = req.body.Model;
  const Firma = 1;
  const Rodzaj = 1;
  const VIN = req.body.VIN;
  const RokProducji = req.body.RokProducji;
  const Zdjecie = req.body.Zdjecie;

  var re = /[A-Z][A-Z0-9][A-Z]{0,1}[A-Z0-9]{3,5}/;
  var re1 = /[0-9A-Z]{17}/;
  var re2 = /^[A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]+$/;
  var re3 = /^[A-Za-z0-9.-]+$/;

  if(re.test(String(NumerRejestracyjny)) && re1.test(String(VIN)) && re2.test(String(Marka)) && re3.test(String(Model))){
    const newCar = new Car(
      NumerRejestracyjny,
      Marka,
      Model,
      Firma,
      Rodzaj,
      VIN,
      RokProducji,
      Zdjecie
    );
  
  Car.updateCar(req.params.id, newCar).then(res.json('car updated'));
    }
});

router.route('/:id').get((req, res) => {
  Car.getCar(req.params.id).then(([cars, metadata]) => res.json(cars));
});

router.route('/array/:id').get((req, res) => {
  res.json(Car.getCarArray(req.params.id));
});

router.route('/:id').delete((req, res) => {
  Car.deleteCar(req.params.id).then(res.json('delete car'));
});

module.exports = router;