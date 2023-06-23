
// INICIO LOGIN

let welcome = document.getElementById("welcome");
let botonLogin = document.getElementById("botonLogin");
let botonLogout = document.getElementById("botonLogout");
let usuario;
let usuarioStorage = sessionStorage.getItem("usuario");

if (usuarioStorage) {
    usuario = usuarioStorage;
    botonLogin.style.display = 'none';
    botonLogout.style.display = 'block';
    welcome.innerHTML = `${usuario}`;
    welcome.style.display = 'block';
}

function funcLogin() {
   usuario = prompt("Ingrese el usuario");
    if (usuario == "") {
        Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'Debe ingresar su usuario!',
            footer: ''
        })
        return;
    }
    sessionStorage.setItem("usuario", usuario);
    botonLogin.style.display = 'none';
    botonLogout.style.display = 'block';
    welcome.innerHTML = `${usuario}`;
    welcome.style.display = 'block';
}

function funcLogout() {
    sessionStorage.clear();
    window.location.reload();
}


//BOTON FAVORITOS

let favoritos = [];
let botonFavoritos = document.getElementById("botonFavoritos");

function setearFavorito() {
    botonFavoritos.innerHTML = `${id}`;
    localStorage.setItem("usuario", usuario);
    
}


