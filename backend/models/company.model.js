const mysql = require('../connection');

class Company {
    constructor(Nazwa, SkroconaNazwa, NIP, Adres, Kraj, ID){
        this.ID = ID;
        this.Nazwa = Nazwa;
        this.SkroconaNazwa = SkroconaNazwa;
        this.NIP = NIP;
        this.Adres = Adres;
        this.Kraj = Kraj;
    }

    static list() {
        return mysql.execute("SELECT * FROM firma");
    }
}