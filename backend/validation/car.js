const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateCarInput(data) {
    let errors = {};

  data.NumerRejestracyjny = !isEmpty(data.NumerRejestracyjny) ? data.NumerRejestracyjny : "";
  data.Marka = !isEmpty(data.Marka) ? data.Marka : "";
  data.Model = !isEmpty(data.Model) ? data.Model : "";
  data.VIN = !isEmpty(data.VIN) ? data.VIN : "";

  if (Validator.isLength(data.NumerRejestracyjny, { min: 3, max: 7 })) {
    errors.NumerRejestracyjny = "Numer rejestracyjny musi byc miedzy 3 a 7";
  }

  if (Validator.isEmpty(data.Marka)) {
    errors.Marka = "Marka jest wymagana";
  } 
  if (Validator.isEmpty(data.Model)) {
    errors.Model = "Model jest wymagany";
  } 
  if (Validator.isEmpty(data.VIN)) {
    errors.VIN = "VIN jest wymagany";
  } 


return {
    errors,
    isValid: isEmpty(errors)
  };
};