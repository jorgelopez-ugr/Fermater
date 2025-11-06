/**
 * Representación de los gastos anuales.
 */
class Gastos{
    /**
     * Crea una nueva instancia Gastos.
     * @param {number} anio : Indica el año asociado a dichos gastos.
     * @param {number} importe : Indica el importe total de gastos.
     */
    constructor(anio, importe){
        this.anio = anio;
        this.importe = importe;
    }
}

module.exports = Gastos;