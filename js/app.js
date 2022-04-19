// variables y selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');


// eventos
eventListeners();
function eventListeners() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);

    formulario.addEventListener('submit', agregarGasto);
}


// clases
class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }

    nuevoGasto(gasto) {
        this.gastos = [...this.gastos, gasto];
        console.log(this.gastos);
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

    imprimirAlerta(mensaje, tipo) {
        // crear div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');

        if (tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }

        // mensaje de error
        divMensaje.textContent = mensaje;

        // insertar html
        document.querySelector('.primario').insertBefore(divMensaje, formulario);

        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }

    agregarGastoListado(gastos) {
        this.limpiarHtml(); //limpia lista de gastos

        // iterar sobre los gastos
        gastos.forEach(gasto => {

            const { cantidad, nombre, id } = gasto;

            // crear un li
            const nuevoGasto = document.createElement('li');
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
            nuevoGasto.dataset.id = id;

            // agregar el html del gasto
            nuevoGasto.innerHTML = `${nombre} <span class="badge badge-primary badge-pill">${cantidad}</span>`

            // boton para borrar
            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
            btnBorrar.innerHTML = 'Borrar &times;';
            nuevoGasto.appendChild(btnBorrar)

            // agregar al html
            gastoListado.appendChild(nuevoGasto);

        })

    };

    limpiarHtml() {
        while (gastoListado.firstChild) {
            gastoListado.removeChild(gastoListado.firstChild);
        }
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

function agregarGasto(e) {
    e.preventDefault();

    // leer datos del formulario
    const nombre = document.querySelector('#gasto').value;
    const cantidad = Number(document.querySelector('#cantidad').value);

    // validar
    if (nombre === '' || cantidad === '') {
        ui.imprimirAlerta('Ambos campos son obligatorios', 'error');
        return;
    } else if (cantidad <= 0 || isNaN(cantidad)) {
        ui.imprimirAlerta('Cantidad no válida', 'error');
        return;
    }

    // generar un objeto tipo gasto
    const gasto = { nombre, cantidad, id: Date.now() }

    // añade un nuego gasto
    presupuesto.nuevoGasto(gasto);

    ui.imprimirAlerta('Tarea agregada correctamente', 'correcto');

    //imprimir gastos
    const { gastos } = presupuesto;
    ui.agregarGastoListado(gastos);

    // reinicia formulario
    formulario.reset();
}