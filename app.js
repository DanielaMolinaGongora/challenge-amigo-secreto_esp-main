let listaAmigos = [];
let asignaciones = {};

function actualizar__boton__sortear() {
    let botonSortear = document.getElementById("button-draw");
    botonSortear.disabled = listaAmigos.length < 2;
}


function agregarAmigo() {
    let nombre = document.getElementById("amigo").value.trim();

    // Expresión para validar solo letras y espacios
    let regex = /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/;
    if (nombre === "") {
        alert("Por favor, ingresa un nombre");
        return;
    }

    if (!regex.test(nombre)) {
        alert("El nombre solo puede contener letras y espacios.");
        return;
    }

    let nombreNormalizado = nombre.toLowerCase(); // Convertir a minúsculas para evitar duplicados

    if (listaAmigos.some(amigo => amigo.toLowerCase() === nombreNormalizado)) {
        alert("Este nombre ya ha sido ingresado.");
        return;
    }

    listaAmigos.push(nombre);
    document.getElementById("amigo").value = "";
    document.getElementById("amigo").blur();
    actualizarListaAmigos();
    actualizar__boton__sortear();
}


function sortearAmigo() {
    if (listaAmigos.length < 2) {
        alert("Debe haber al menos dos participantes.");
        return;
    }

    let amigosDisponibles = [...listaAmigos]; // Copia de la lista original
    let asignacionesTemp = {}; // Objeto temporal para asignaciones

    for (let amigo of listaAmigos) {
        let posiblesAmigos = amigosDisponibles.filter(a => a.toLowerCase() !== amigo.toLowerCase());

        // Si solo queda un participante y es el mismo, reintentar el sorteo
        if (posiblesAmigos.length === 0) {
            alert("Hubo un error en la asignación. Inténtalo de nuevo.");
            return;
        }

        let indiceAleatorio = Math.floor(Math.random() * posiblesAmigos.length);
        let amigoSecreto = posiblesAmigos[indiceAleatorio];

        asignacionesTemp[amigo] = amigoSecreto;
        amigosDisponibles = amigosDisponibles.filter(a => a !== amigoSecreto);
    }

    // Si todo está correcto, asignamos los resultados
    asignaciones = asignacionesTemp;
    mostrarResultados();
}

function mostrarResultados() {
    let resultadosHTML = "";
    for (let amigo in asignaciones) {
        resultadosHTML += `
            <li class="result-item">
                <span class="amigo">${amigo}</span>
                <span class="separator">:</span>
                <span class="amigo-secreto">${asignaciones[amigo]}</span>
            </li>
        `;
    }

    // Mostrar resultados en la lista
    let resultadoLista = document.getElementById("resultado");
    resultadoLista.innerHTML = resultadosHTML;
    resultadoLista.classList.add("mostrar");

    // Limpiar lista de amigos visualmente
    listaAmigos = [];
    document.getElementById("listaAmigos").innerHTML = "";
    actualizar__boton__sortear(); 

    // Mostrar alert y refrescar la página después de 3 segundos
    setTimeout(() => {
        alert("El sorteo ha finalizado. La página se refrescará para un nuevo juego.");
        location.reload();
    }, 3000);
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
