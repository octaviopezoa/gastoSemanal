// variables y selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos-ul');


// eventos
eventListeners();
function eventListeners() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
}


// clases
class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }
}

class UI {
    insertarPresupuesto(cantidad) {
        // extraemos valor
        const { presupuesto, restante } = cantidad;

        // agregamos al html
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }
};

// instanciamos las clases
const ui = new UI();
let presupuesto; //variable global


// funciones
function preguntarPresupuesto() {
    const presupuestoUsuario = prompt('¿cuañ es tu presupuesto?');

    if (presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0) {
        window.location.reload(); //recargamos si la condicion es falsa;
    }

    // presupuesto valido
    presupuesto = new Presupuesto(presupuestoUsuario);

    // mostramos presupuesto en el html
    ui.insertarPresupuesto(presupuesto);
}