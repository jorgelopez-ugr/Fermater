# Análisis del dominio

A partir del análisis [HU001](HU001.md) se han identificado los siguientes elementos del dominio:

    - Cosecha: Se trata de una entidad de la cual se almacena el año, el cual actuará como identificador de la misma puesto que solo se guardará una cosecha por año, el peso almacenado de la misma, y la variedad de aceituna recolectada. Se identifica como una entidad ya que posee identidad única, a partir del año se pueden clasificar distintas cosechas. Además, se trata del núcleo del dominio.

    - Gastos: Se trata de una entidad directamente relacionada con la entidad "Cosecha", esta almacena el año del cual se están registrando los gastos y el importe de los mismos. Se identifica como una entidad ya que posee identidad única, a partir del año se pueden clasificar distintos gastos.

    - Precio: Se trata de un objeto valor, unicamente almacena el precio al que se vende la aceituna en el momento de la consulta, por ello solo posee como atributos la fecha y el importe. Se identifica como un objeto valor ya que no posee identidad única, si se crean dos objetos con los mismos atributos, serás iguales.

