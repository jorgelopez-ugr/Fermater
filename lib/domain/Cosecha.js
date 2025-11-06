const VARIEDADES = require('./Variedades');

class Cosecha{
    constructor(anio, peso, variedad){

        // Comprueba si la variedad es válida dentro de las definidas
        if (!Object.values(VARIEDADES).includes(variedad)) {
            throw new Error(`Variedad no valida`);
        }

        this.anio = anio;
        this.peso = peso;
        this.variedad = variedad;
    }
}

module.exports = Cosecha;