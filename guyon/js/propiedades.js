// CREO LOS OBJETOS

let propiedades = [];
let container = document.getElementById("contenedorPropiedades");

// VARIABLES DEL LOGIN
let welcome = document.getElementById("welcome");
let botonLogin = document.getElementById("botonLogin");
let botonLogout = document.getElementById("botonLogout");
let botonFavoritos = document.getElementById("botonFavoritos");
let usuario;
let usuarioStorage = sessionStorage.getItem("usuario");

// VARIABLE DE LAS PROPIEDADES EN EL SESSION STAROGE
let propiedadesStorage = [];

// PARA BUSCAR UN INMUEBLE QUE ESTA EN EL ARRAY

let valorBusqueda = document.getElementById("valorBusqueda");
let botonBuscar = document.getElementById("botonBuscar");
let botonLimpiar = document.getElementById("botonLimpiar");

const jsonUrl = "./json/propiedades.json";

// TRAIGO EL CONTENEDOR CON LAS CARD Y LO ITERO CON EL "forEach"

const mostrarPropiedades = async () => {
    container.innerHTML = "";
    valorBusqueda.value = "";

    let htmlCode = "";

    try {
        const response = await fetch(jsonUrl);
        propiedades = await response.json();

        //PARA VERIFICAR SI LA PROPIEDAD ESTA EN FAVORITOS O NO
        propiedadesStorage = JSON.parse(sessionStorage.getItem("listProp"));
        if (propiedadesStorage == null) {
            propiedadesStorage = [];
        }

        propiedades.forEach((element) => {

            htmlCode = htmlCode + '<div class = "col" ><div class = "card h-100" > ' +
                '<img src="' + element.imagen + '" class="card-img-top" alt="casa">' +
                '<div class = ' + '"card-body"><h5 class = "card-title" >' + element.nombre + '</h5> <p class = "card-text" > ' + element.operacion + ' </p> <p class = ' + '"card-text" > ' + element.ubicacion + '</p>';

            if (propiedadesStorage.includes(parseInt(element.id))) {
                htmlCode = htmlCode + '<i class="fa-solid fa-star" title="Favorito" style="color: #f1e90e;"></i></div></div></div>';
            } else {
                htmlCode = htmlCode + '<a href="#" class="btn btn-warning" onclick="marcarFavorito(' + element.id + ')">' + 'Favorito</a></div></div></div>';
            }
        });

        htmlCode = htmlCode + '<div class="clearfix"></div>';

        container.innerHTML = htmlCode;


    } catch (error) {
        console.log(error);
    }
}

mostrarPropiedades();

// INICIO LOGIN - FAVORITOS

if (usuarioStorage) {
    usuario = usuarioStorage;
    botonLogin.style.display = 'none';
    botonLogout.style.display = 'block';
    welcome.innerHTML = `${usuario}`;
    welcome.style.display = 'block';
}

function marcarFavorito(id) {

    if (!usuarioStorage) {
        Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'Tiene que iniciar sesion para ingresar a favoritos',
            footer: ''
        });
        return;
    };

    propiedadesStorage = JSON.parse(sessionStorage.getItem("listProp"));

    if (propiedadesStorage == null) {
        propiedadesStorage = [];
    }

    if (propiedadesStorage.includes(id) == false) {
        propiedadesStorage.push(id);
        propiedadesStorage = sessionStorage.setItem("listProp", JSON.stringify(propiedadesStorage));
        mostrarPropiedades();
    } else {
        Swal.fire(
            'Buen trabajo!',
            'Ya está incluida la propiedad!',
            'OK'
        )
    }
}

function funcLogin() {
    usuario = prompt("Ingrese el usuario");
    if (usuario == "" || usuario == null) {
        Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'Debe ingresar su usuario!',
            footer: ''
        })
        return;
    }
    sessionStorage.setItem("usuario", usuario);
    usuarioStorage = usuario;
    botonLogin.style.display = 'none';
    botonLogout.style.display = 'block';
    welcome.innerHTML = `${usuario}`;
    welcome.style.display = 'block';

}

function funcLogout() {
    sessionStorage.clear();
    window.location.reload();
}


function buscarPropiedad(tipoDeBusqueda) {

    let encontrado = [];

    if (tipoDeBusqueda == 'nombre') {

        if (valorBusqueda.value == "") {
            alert("Debe ingresar un valor de busqueda");
            return;
        }

        encontrado = propiedades.filter((inmueble) => inmueble.nombre.toLowerCase().includes(valorBusqueda.value.toLowerCase()));

    } else if (tipoDeBusqueda == 'Alquiler' || tipoDeBusqueda == 'Venta') {

        encontrado = propiedades.filter((inmueble) => inmueble.operacion.toLowerCase().includes(tipoDeBusqueda.toLowerCase()));

    } else if (tipoDeBusqueda == 'Centro' || tipoDeBusqueda == 'Sur' || tipoDeBusqueda == 'Norte') {

        encontrado = propiedades.filter((inmueble) => inmueble.ubicacion.toLowerCase().includes(tipoDeBusqueda.toLowerCase()));

    }


    container.innerHTML = "";

    encontrado.forEach((element) => {
        container.innerHTML += '<div class = "col" ><div class = "card h-100" > ' +
            '<img src="./imagenes/casa.jpg" class="card-img-top" alt="casa">' +
            '<div class = ' + '"card-body"><h5 class = "card-title" >' + element.nombre + '</h5> <p class = "card-text" > ' + element.operacion + ' </p> <p class = ' + '"card-text" > ' + element.ubicacion + ' </p> <a href = "#"class = "btn btn-warning" onclick="marcarFavorito(' + element.id + ')" >  ' + 'Favorito </a> </div> </div> </div>';
    })
    container.innerHTML += '<div class="clearfix"></div>';

}

