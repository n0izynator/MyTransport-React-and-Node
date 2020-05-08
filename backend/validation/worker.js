const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateWorkerInput(data) {
    let errors = {};

  data.Password = !isEmpty(data.Password) ? data.Password : "";
  data.Imie = !isEmpty(data.Imie) ? data.Imie : "";
  data.Nazwisko = !isEmpty(data.Nazwisko) ? data.Nazwisko : "";
  data.AdresEmail = !isEmpty(data.AdresEmail) ? data.AdresEmail : "";

  if (Validator.isLength(data.Password, { min: 3})) {
    errors.Password = "Hasło musi miec min 3 znaki";
  }

  if (Validator.isEmpty(data.Imie)) {
    errors.Marka = "Marka jest wymagana";
  } 
  if (Validator.isEmpty(data.Nazwisko)) {
    errors.Nazwisko = "Nazwisko jest wymagane";
  } 
  if (Validator.isEmail(data.AdresEmail)) {
    errors.AdresEmail = "AdresEmail jest błędny";
  } 


return {
    errors,
    isValid: isEmpty(errors)
  };
};