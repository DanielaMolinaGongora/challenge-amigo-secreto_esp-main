//Array
let listaAmigos = [];

let nombre;

function asignar__Texto__Elemento (elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function actualizar__boton__sortear (){
    let botonSortear = document.getElementById("button-draw");
    botonSortear.disabled = listaAmigos.length === 0;
}


function agregarAmigo () {
    nombre = document.getElementById("amigo").value;
    if (nombre === "") {
        alert("Por favor, ingresa un nombre");}
    else{
        if (listaAmigos.includes(nombre)) {
            alert("Este nombre ya ha sido ingresado, agrega el nombre de otro amigo.");}
        else{
            listaAmigos.push(nombre);
            document.getElementById("amigo").value = "";
            let ul = document.getElementById("listaAmigos");
            let li =document.createElement("li");
            li.textContent = nombre;
            ul.appendChild(li);
            actualizar__boton__sortear();
            //console.log(nombre);
            
        }
        
    }
}

function sortearAmigo() {
    let amigoSorteado  = listaAmigos[Math.floor(Math.random() * listaAmigos.length)];

    if (listaAmigos.length === 0) {
        alert("No hay amigos para sortear.");
        return;
    } else {
    
    asignar__Texto__Elemento("ul",`El amigo secreto es ${amigoSorteado}`);
    listaAmigos = [];
    actualizar__boton__sortear();
    }

}