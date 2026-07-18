//--------------------------------------- VALIDACION FORMULARIO -------------------------------------------

//capturamos el formulario, los inputs y los span de error
const formulario = document.getElementById("formulario-contacto");

const nombreInput = document.getElementById("nombre");
const emailInput = document.getElementById("email");
const mensajeInput = document.getElementById("mensaje");

const errorNombre = document.getElementById("error-nombre");
const errorEmail = document.getElementById("error-email");
const errorMensaje = document.getElementById("error-mensaje");

if(formulario) {
    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault(); // frenamos el envio del formulario

        //limpiamos mensajes de error
        errorNombre.innerText = "";
        errorEmail.innerText = "";
        errorMensaje.innerText = "";

        let formularioValido = true;

        //validamos el nombre
        if(nombreInput.value.trim() === "") {
            errorNombre.innerText = "Por favor, ingrese su nombre y apellido.";
            formularioValido = false;
        }

        //validamos el email
        if(emailInput.value.trim() === "") {
            errorEmail.innerText = "Por favor, ingrese su email.";
            formularioValido = false;
        }
        const reglaUniversalEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!reglaUniversalEmail.test(emailInput.value.trim())) {
            errorEmail.innerText = "Por favor, ingrese un email válido.";
            formularioValido = false;
        }

        //validamos mensaje
        if(mensajeInput.value.trim() === "") {
            errorMensaje.innerText = "No olvides escribir tu consulta.";
            formularioValido = false;
        }

        //si todo esta perfecto, enviamos el formulario
        if(formularioValido) {
            formulario.submit();
        }else {
            console.log("Validación fallida");
        }
    });
};



//--------------------------------------- PRODUCTOS Y CARRITO -------------------------------------------

//capturamos el contenedor vacio de productos
const contenedorRepuestos = document.getElementById("contenedor-repuestos");

//capturamos el numero de productos en el carrito
const textoContadorCarrito = document.getElementById("contador-carrito");

//leemos si hay datos
let cantidadEnCarrito = localStorage.getItem("cantidadCarrito");

if(cantidadEnCarrito === null || isNaN(cantidadEnCarrito) || cantidadEnCarrito === "null"){
    cantidadEnCarrito = 0;
}else{
    cantidadEnCarrito = parseInt(cantidadEnCarrito);
}

if(textoContadorCarrito){
    textoContadorCarrito.innerText = cantidadEnCarrito;
}

//verifivamos que el contenedor exista en la pagina
if(contenedorRepuestos) {
    //llamos al fetch
    fetch("productos.json")
        .then(function(respuesta) {
            return respuesta.json();
        })
        .then(function(productos) {
            //recorremos el array de productos
            for(let producto of productos) {
                contenedorRepuestos.innerHTML += `
                    <article class="tarjeta-producto">
                        <img src="${producto.imagen}" alt="${producto.nombre}">
                        <h3>${producto.nombre}</h3>
                        <p>Marca: ${producto.marca}</p>
                        <p>Modelo: ${producto.modelo}</p>
                        <p>Precio: $${producto.precio}</p>
                        <button class="boton-agregar" id="${producto.id}">Agregar al carrito</button>
                    </article>
                `;
            }

            //ahora que existen los botones de los productos, los capturamos
            const botonesAgregar = document.querySelectorAll(".boton-agregar");

            for(let boton of botonesAgregar){
                boton.addEventListener("click", function(){
                    cantidadEnCarrito ++;

                    textoContadorCarrito.innerText = cantidadEnCarrito;

                    localStorage.setItem("cantidadCarrito", cantidadEnCarrito);
                });
            }
        })

        .catch(function(error) {
            console.log("Error al cargar los productos: ", error);
        });

}