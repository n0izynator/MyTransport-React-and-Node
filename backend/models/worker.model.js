const mysql = require('../connection');
var bcrypt = require('bcryptjs');
const validateWorkerInput = require('../validation/worker')

function hash(pass){
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(pass, salt);
    
    return hash;
}


class Worker {
    constructor(Imie, Nazwisko, AdresEmail, Stanowisko, Firma, DataZatrudnienia, Zdjecie, Password, ID){
        this.ID = ID;
        this.Imie = Imie;
        this.Nazwisko = Nazwisko;
        this.AdresEmail = AdresEmail;
        this.Stanowisko = Stanowisko;
        this.Firma = Firma;
        this.DataZatrudnienia = DataZatrudnienia;
        this.Zdjecie = Zdjecie;
        this.Password = Password;
    }

    static list() {
        return mysql.execute("SELECT * FROM pracownik");
    }

    static driver() {
        return mysql.execute("SELECT * FROM pracownik WHERE Stanowisko = 'Kierowca'");
    }

    static getWorker(ID) {
        return mysql.execute("SELECT * FROM pracownik WHERE ID = ?",[ID])
    }

    static add(worker) {

        if(validateWorkerInput(worker)){
            var values = [[worker.Imie, worker.Nazwisko, worker.AdresEmail, worker.Stanowisko, worker.Firma, worker.DataZatrudnienia.substring(0,10), worker.Zdjecie, hash(worker.Password)]]
            console.log(values);

            return mysql.query("INSERT INTO pracownik (Imie, Nazwisko, AdresEmail, Stanowisko, Firma_ID, DataZatrudnienia, Zdjecie, Password) VALUES (?)", values);
        }
    }

    static deleteWorker(id) {
        return mysql.execute("DELETE FROM pracownik WHERE ID = ?",[id])
    }

    static updateWorker(id, newWorker) {
        console.log(newWorker)
        if(validateWorkerInput(newWorker)){
            var sql = `UPDATE pracownik SET Imie = ?, Nazwisko = ?, AdresEmail = ?, Stanowisko = ?, DataZatrudnienia = ?, Zdjecie = ?, Password = ? WHERE ID = ?`;
            var data = [newWorker.Imie, newWorker.Nazwisko, newWorker.AdresEmail, newWorker.Stanowisko, newWorker.DataZatrudnienia.substring(0,10), newWorker.Zdjecie,hash(newWorker.Password), id];
            
            return mysql.query(sql, data);
        }
    }

    static login(logininfo){
        var email = logininfo.email;
        return mysql.query("SELECT ID, Password FROM pracownik WHERE AdresEmail = ?", email);
    }
}

module.exports = Worker;





/*let nextId = 1;
const WorkerExtent = [];

class Worker {
    constructor(firstName, lastName, job, email, pass, id) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.job = job;
        this.email = email;
        this.pass = pass;
    }

    static add(worker) {
        console.log(worker);

        worker.id = nextId++;
        WorkerExtent.push(worker);

        return worker;
    }

    static list() {
        return WorkerExtent;
    }

    static getWorker(id) {
        return WorkerExtent.find(w => w.id === parseInt(id));
    }

    static updateWorker(id, newWorker) {
        const worker = WorkerExtent.find(w => w.id === parseInt(id));

        worker.firstName = newWorker.firstName;
        worker.lastName = newWorker.lastName;
        worker.job = newWorker.job;
        worker.email = newWorker.email;
        worker.pass = newWorker.pass;

        return 'updated'+worker;
    }

    static deleteWorker(id) {
        WorkerExtent.splice(WorkerExtent.findIndex(w => w.id === parseInt(id)), 1)
        return 'delete';
    }

    static initData() {
        WorkerExtent.splice(0, WorkerExtent.length);

        nextId = 1;
        Worker.add(new Worker('Jan', 'Kowalski', 'KIEROWCA','mail@op.pl','123'));
        Worker.add(new Worker('Anna', 'Wisniewska', 'SPEDYTOR', 'ania@op.pl', '123456'));
        Worker.add(new Worker('Andrzej', 'Nowak', 'KIEROWCA', 'andrew@op.pl', 'scania500'));
    }
}

Worker.initData();
*/
