const mysql = require('../connection');
const validateCarInput = require('../validation/car')

class Car{
    constructor(NumerRejestracyjny, Marka, Model, Firma, Rodzaj, VIN, RokProducji, Zdjecie) {
        this.NumerRejestracyjny = NumerRejestracyjny;
        this.Marka = Marka;
        this.Model = Model;
        this.Firma = Firma;
        this.Rodzaj = Rodzaj;
        this.VIN = VIN;
        this.RokProducji = RokProducji;
        this.Zdjecie = Zdjecie;
    }

    static list() {
        return mysql.execute("SELECT * FROM pojazd")
    }

    static getCar(NumerRejestracyjny) {
        return mysql.execute("SELECT * FROM pojazd WHERE NumerRejestracyjny = ?",[NumerRejestracyjny])
    }


    static add(car) {

        if(validateCarInput(car)){

            var values = [[car.NumerRejestracyjny, car.Marka, car.Model, car.Firma, car.Rodzaj, car.VIN, car.RokProducji.substring(0,10), car.Zdjecie]];
            console.log(values);
    
    
            return mysql.query("INSERT INTO pojazd VALUES (?)", values);
        }

    }

    static deleteCar(NumerRejestracyjny) {
        return mysql.execute("DELETE FROM pojazd WHERE NumerRejestracyjny = ?",[NumerRejestracyjny])
    }

    static updateCar(NumerRejestracyjny, car) {

        if(validateCarInput(car)){
            var sql = `UPDATE pojazd
                        SET Marka = ?, Model = ?, VIN = ?, RokProducji = ?, Zdjecie = ?
                        WHERE NumerRejestracyjny = ?`;

            var data = [car.Marka, car.Model,car.VIN, car.RokProducji.substring(0,10),car.Zdjecie,NumerRejestracyjny];
            console.log(data);

            return mysql.query(sql, data);
        }else{
            return validateCarInput(car).errors
        }
    }
}

module.exports = Car;



/*const CarExtent = [];

class Car {
    constructor(nr, manufacturer, model, VIN, year, image) {
        this.nr = nr;
        this.manufacturer = manufacturer;
        this.model = model;
        this.VIN = VIN;
        this.year = year;
        this.image = image;
    }

    static add(car) {
        CarExtent.push(car);

        return car;
    }

    static getCar(nr) {
        return CarExtent.find(c => c.nr === nr);
    }

    static getCarArray(nr) {
        return CarExtent.filter(c => c.nr === nr);
    }

    static list() {
        return CarExtent;
    }

    static updateCar(nr, newCar) {
        const car = CarExtent.find(c => c.nr === nr);
        car.nr = newCar.nr;
        car.manufacturer = newCar.manufacturer;
        car.model = newCar.model;
        car.VIN = newCar.VIN;
        car.year = newCar.year;

        return 'updated'+car;
    }

    static deleteCar(nr) {
        CarExtent.splice(CarExtent.findIndex(c => c.nr === nr), 1)
        return 'deleted car '+nr;
    }

    static initData() {
        CarExtent.splice(0, CarExtent.length);

        Car.add(new Car('WSC1234', 'MAN', 'TGX440', 'JH4KA4531KC033525', new Date(), 'mantgx.png'));
        Car.add(new Car('WG493TC', 'SCHMITZ', 'PLANDEKA', '1FTRW08L13KB17454', new Date(), 'schmitz.png'));
    }
}

Car.initData();

module.exports = Car;
*/