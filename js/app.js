// variables y selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos-ul');


// eventos
eventListeners();
function eventListeners() {
    document.addEventListener('DOMContentLoader', preguntarPresupuesto);
}


// clases




// funciones
function preguntarPresupuesto() {
    const presupuestoUsuario = prompt('¿cuañ es tu presupuesto?');

    console.log(Number(presupuestoUsuario));

    if (presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0) {
        window.location.reload(); //recargamos si la condicion es falsa;
    }
}