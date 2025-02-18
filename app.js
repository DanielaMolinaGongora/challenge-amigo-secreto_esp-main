//Array
let listaAmigos = [];

function asignar__Texto__Elemento (elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function actualizar__boton__sortear (){
    let botonSortear = document.getElementById("button-draw");
    botonSortear.disabled = listaAmigos.length === 0;
}


function agregarAmigo() {
    let nombre;
    nombre = document.getElementById("amigo").value;
    if (nombre === "") {
        alert("Por favor, ingresa un nombre");
    } else {
        if (listaAmigos.includes(nombre)) {
            alert("Este nombre ya ha sido ingresado, agrega el nombre de otro amigo.");
        } else {
            listaAmigos.push(nombre);
            document.getElementById("amigo").value = "";
            actualizarListaAmigos(); // Usamos la nueva función para limpiar y actualizar la lista
            actualizar__boton__sortear();
        }
    }
}

function sortearAmigo() {
    if (listaAmigos.length === 0) {
        alert("No hay amigos para sortear.");
        return;
    }

    let amigoSorteado = listaAmigos[Math.floor(Math.random() * listaAmigos.length)];
    
    asignar__Texto__Elemento("#resultado", `El amigo secreto es ${amigoSorteado}`); // Mostramos en un <p> en lugar de <ul>
    
    listaAmigos = []; // Limpiar la lista después de sortear
    actualizarListaAmigos(); // Limpiar la lista en la UI
    actualizar__boton__sortear();
}

function actualizarListaAmigos() {
    let ul = document.getElementById("listaAmigos");
    ul.innerHTML = ""; // Limpiar la lista antes de actualizar

    for (let amigo of listaAmigos) {
        let li = document.createElement("li");
        li.textContent = amigo;
        ul.appendChild(li);
    }
}