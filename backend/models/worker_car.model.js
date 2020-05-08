const mysql = require('../connection');

class WorkerCar {
    constructor(workerid, carid, dateStart, dateEnd, ID){
        this.id = id;
        this.workerid = workerid;
        this.carid = carid;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
    }

    static list(){
        return mysql.execute("SELECT * FROM pojazd_kierowca")
    }

    static listFiltred(nr){
        return mysql.execute("SELECT pojazd_kierowca.ID, Pojazd_NumerRejestracyjny, RozpoczeciePracy, ZakonczeniePracy, pracownik.ID as workerID, Imie, Nazwisko, pracownik.Zdjecie FROM pojazd_kierowca, pracownik WHERE Pracownik_ID = pracownik.ID AND Pojazd_NumerRejestracyjny = ? AND ZakonczeniePracy is not null ORDER BY ZakonczeniePracy DESC", [nr])
    }

    static currentWorker(nr){
        return mysql.execute("SELECT pojazd_kierowca.ID, Pojazd_NumerRejestracyjny, RozpoczeciePracy, ZakonczeniePracy, pracownik.ID as workerID, Imie, Nazwisko, Zdjecie FROM pojazd_kierowca, pracownik WHERE Pracownik_ID = pracownik.ID AND Pojazd_NumerRejestracyjny = ? AND ZakonczeniePracy is null",[nr])
    }

    static delete(id){
        return mysql.execute("DELETE FROM pojazd_kierowca WHERE ID = ?",[id])
    }

    static end(id){
        var sql = `UPDATE pojazd_kierowca SET ZakonczeniePracy = CURDATE()
        WHERE ID = ? AND ZakonczeniePracy is null`;

        var data = [id];

        return mysql.query(sql, data);
    }

    static update(workerId, carId){
        var isEmpty = false
        var data = [[parseInt(workerId), carId, new Date()]];

        this.currentWorker(carId).then(([res, meta]) => {console.log(res.length); 
                                                            if(res.length = 0)
                                                                isEmpty = true})
                                                                
        return mysql.query("INSERT INTO pojazd_kierowca (Pracownik_ID, Pojazd_NumerRejestracyjny, RozpoczeciePracy) VALUES (?)", data);
    }
}


module.exports = WorkerCar;

/*let Worker = require('../models/worker.model');
let Car = require('../models/car.model');


let nextId = 1;
const WorkerCarExtent = [];

class WorkerCar {
    constructor(worker, car, dateStart,dateEnd, id) {
        this.id = id;
        this.worker = worker;
        this.car = car;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
    }

    static add(workerCar) {
        workerCar.id = nextId++;
        WorkerCarExtent.push(workerCar);

        return workerCar;
    }

    static update(carId, workerId){
        const car = Car.getCar(carId);
        const worker = Worker.getWorker(workerId);

        if(this.currentWorker(carId).find(wc => wc.worker === worker) === undefined){
            this.add(new WorkerCar(worker, car, new Date()))
        }else{
            return 'error';
        }

    }

    static end(id){
        console.log(id);
        const workercar = WorkerCarExtent.find(wc => wc.id === parseInt(id))
        workercar.dateEnd = new Date();

        return 'ended';
    }

    static list() {
        return WorkerCarExtent;
    }

    static listFiltred(nr){
        return WorkerCarExtent.filter(wc => wc.car.nr === nr).filter(wc => wc.dateEnd !== undefined);
    }

    static currentWorker(nr){
        return WorkerCarExtent.filter(wc => wc.car.nr === nr).filter(wc => wc.dateEnd === undefined);
    }

    static initData() {
        WorkerCarExtent.splice(0, WorkerCarExtent.length);

        WorkerCar.add(new WorkerCar(Worker.getWorker(1),Car.getCar('WSC1234'), new Date(), new Date()));
        WorkerCar.add(new WorkerCar(Worker.getWorker(3), Car.getCar('WSC1234'), new Date() ));

    }
}

WorkerCar.initData();

module.exports = WorkerCar;
*/