const VARIEDADES = require('./Variedades');


class Precio{
    constructor(importe, variedad){
        
        // Comprueba si la variedad es válida dentro de las definidas
        if (!Object.values(VARIEDADES).includes(variedad)) {
            throw new Error(`Variedad no valida`);
        }

        this.importe = importe;
        this.variedad = variedad;
    }
}

module.exports = Precio;