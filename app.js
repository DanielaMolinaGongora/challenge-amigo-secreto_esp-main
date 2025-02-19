let listaAmigos = [];
let asignaciones = {};

function actualizar__boton__sortear() {
    let botonSortear = document.getElementById("button-draw");
    if (listaAmigos.length >= 2) {
        botonSortear.disabled = false;
    } else {
        botonSortear.disabled = true;
    }
}

function agregarAmigo() {
    let nombre = document.getElementById("amigo").value.trim();
    if (nombre === "") {
        alert("Por favor, ingresa un nombre");
        return;
    }
    if (listaAmigos.includes(nombre)) {
        alert("Este nombre ya ha sido ingresado.");
        return;
    }
    listaAmigos.push(nombre);
    document.getElementById("amigo").value = "";
    actualizarListaAmigos();
    actualizar__boton__sortear();
}

function sortearAmigo() {
    if (listaAmigos.length < 2) {
        alert("Debe haber al menos dos participantes.");
        return;
    }

    let amigosDisponibles = [...listaAmigos];
    asignaciones = {};

    for (let amigo of listaAmigos) {
        let posiblesAmigos = amigosDisponibles.filter(a => a !== amigo);
        
        // Si no hay amigos disponibles para asignar, no hacer el sorteo
        if (posiblesAmigos.length === 0) {
            alert("Hubo un error en la asignación. Inténtalo de nuevo.");
            return; // Salir de la función sin realizar el sorteo
        }

        let indiceAleatorio = Math.floor(Math.random() * posiblesAmigos.length);
        let amigoSecreto = posiblesAmigos[indiceAleatorio];

        asignaciones[amigo] = amigoSecreto;
        amigosDisponibles = amigosDisponibles.filter(a => a !== amigoSecreto);
    }

    mostrarResultados();

    // Limpiar la lista de amigos y la interfaz visual después del sorteo
    listaAmigos = []; // Vaciar el arreglo
    actualizarListaAmigos(); // Limpiar la lista visualmente
}


function mostrarResultados() {
    let resultadosHTML = '';
    for (let amigo in asignaciones) {
        resultadosHTML += `
            <li class="result-item">
                <span class="amigo">${amigo}</span>
                <span class="separator">:</span>
                <span class="amigo-secreto">${asignaciones[amigo]}</span>
            </li>
        `;
    }

    let resultadoLista = document.getElementById("resultado");
    resultadoLista.innerHTML = resultadosHTML;
    resultadoLista.classList.add("mostrar");
}

function actualizarListaAmigos() {
    let ul = document.getElementById("listaAmigos");
    ul.innerHTML = "";

    for (let amigo of listaAmigos) {
        let li = document.createElement("li");
        li.textContent = amigo;
        ul.appendChild(li);
    }
}
