
// --- Lógica del Parser ---

function extraerFechaDeFila(fila) {

    if (typeof fila !== 'string') {
        throw new TypeError("El input debe ser una cadena de texto");
    }
    
    if (fila.trim() === '') {
        throw new Error("Input no puede estar vacío");
    }

    const regexFecha = /(\d{2}-\d{2}-\d{4})/;
    const match = fila.match(regexFecha);
    
    if (match && match[1]) {
        return match[1]; 
    }
    
    throw new Error("no fecha valida");
}

export { 
    extraerFechaDeFila,
};