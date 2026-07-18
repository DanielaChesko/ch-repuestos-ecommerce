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

//--------------------------------------- FUNCIONES GLOBALES (carrito) -------------------------------------------

const contenedorRepuestos = document.getElementById("contenedor-repuestos");
const textoContadorCarrito = document.getElementById("contador-carrito");

//calculamos la cantidad de productos
function actualizarCantidad() {
    let carrito = JSON.parse(localStorage.getItem("productosCarrito")) || [];
    let totalItems = 0;
    for (let item of carrito) {
        totalItems += item.cantidad;    //cada producto tiene su cantidad propia
    }
    if (textoContadorCarrito) {
        textoContadorCarrito.innerText = totalItems;
    }
}

//llamamos al numero de productos
actualizarCantidad();


//--------------------------------------- PRODUCTOS (CATALOGO) -------------------------------------------

if(contenedorRepuestos) {
    fetch("productos.json")
        .then(respuesta => respuesta.json())
        .then(productos => {
            for(let producto of productos) {
                contenedorRepuestos.innerHTML += `
                    <article class="tarjeta-producto">
                        <img src="${producto.imagen}" alt="foto de ${producto.nombre}">
                        <h3>${producto.nombre}</h3>
                        <p>Marca: ${producto.marca}</p>
                        <p>Modelo: ${producto.modelo}</p>
                        <p class="precio">$${producto.precio}</p>
                        <button class="boton-agregar" id="${producto.id}">Agregar al carrito</button>
                    </article>
                `;
            }

            const botonesAgregar = document.querySelectorAll(".boton-agregar");
            for(let boton of botonesAgregar){
                boton.addEventListener("click", function(){
                    const IDBoton = parseInt(boton.id);
                    const productoElegido = productos.find(producto => producto.id === IDBoton);
                    let carrito = JSON.parse(localStorage.getItem("productosCarrito")) || [];
                    
                    //verificamos si el repuesto ya fue agregado antes
                    const indice = carrito.findIndex(p => p.id === IDBoton);

                    if (indice === -1) {
                        //si es nuevo, le creamos la propiedad cantidad en 1
                        productoElegido.cantidad = 1;
                        carrito.push(productoElegido);
                    } else {
                        //si ya existe, le sumamos 1 a su cantidad actual
                        carrito[indice].cantidad++;
                    }

                    localStorage.setItem("productosCarrito", JSON.stringify(carrito));  
                    actualizarCantidad();
                });
            }
        })
        .catch(error => console.log("Error: ", error));
}


//--------------------------------------- PAGINA CARRITO -------------------------------------------

const contenedorCarrito = document.getElementById("contenedor-carrito");

if(contenedorCarrito) {
    
    //funcion que muestra la pagina del carrito
function renderizarCarrito() {
    let carritoGuardado = JSON.parse(localStorage.getItem("productosCarrito")) || [];
    actualizarCantidad();

    //si esta vacio, mostramos el mensaje y cortamos
    if(carritoGuardado.length === 0){
        contenedorCarrito.innerHTML = "<h3>Tu carrito está vacío. ¡Andá a la sección de repuestos para sumar productos!</h3>";
        return; 
    }

    //limpiamos el HTML
    contenedorCarrito.innerHTML = "";

    //variable para ir sumando la plata
    let precioTotal = 0; 

    //cargamos todos los productos
    for(let producto of carritoGuardado) {
        if(producto) {
            //por cada producto, multiplicamos precio por cantidad y lo sumamos al total
            precioTotal += (producto.precio * producto.cantidad);

            contenedorCarrito.innerHTML += `
                <div class="fila-carrito">
                    <img src="${producto.imagen}" alt="foto de ${producto.nombre}">
                    <div class="info-carrito">
                        <h4>${producto.nombre}</h4>
                        <p class="precio-carrito">Precio unitario: $${producto.precio}</p>
                    </div>
                    <div class="controles-carrito">
                        <button class="btn-restar" data-id="${producto.id}">-</button>
                        <span class="cantidad-numero">${producto.cantidad}</span>
                        <button class="btn-sumar" data-id="${producto.id}">+</button>
                    </div>
                    <p class="subtotal-carrito">Subtotal: $${producto.precio * producto.cantidad}</p>
                    <button class="btn-eliminar" data-id="${producto.id}"><i class="fa-solid fa-trash"></i></button>
                </div>
            `;
        }
    }

    //agregamos el total y el boton para pagar
    contenedorCarrito.innerHTML += `
        <div class="resumen-carrito">
            <p class="total-compra">Total a pagar: $${precioTotal}</p>
            <button class="btn-pagar" id="boton-pagar">Proceder al Pago</button>
        </div>
    `;

    //boton SUMAR (+)
    const botonesSumar = document.querySelectorAll(".btn-sumar");
    for(let boton of botonesSumar) {
        boton.addEventListener("click", function() {
            const id = parseInt(this.getAttribute("data-id"));
            let carrito = JSON.parse(localStorage.getItem("productosCarrito"));
            const indice = carrito.findIndex(p => p.id === id);
            
            carrito[indice].cantidad++;
            localStorage.setItem("productosCarrito", JSON.stringify(carrito));
            renderizarCarrito();
        });
    }

    //boton RESTAR (-)
    const botonesRestar = document.querySelectorAll(".btn-restar");
    for(let boton of botonesRestar) {
        boton.addEventListener("click", function() {
            const id = parseInt(this.getAttribute("data-id"));
            let carrito = JSON.parse(localStorage.getItem("productosCarrito"));
            const indice = carrito.findIndex(p => p.id === id);
            
            //solo resta si hay mas de 1. Si hay 1, no hace nada
            if(carrito[indice].cantidad > 1) {
                carrito[indice].cantidad--;
                localStorage.setItem("productosCarrito", JSON.stringify(carrito));
                renderizarCarrito();
            }
        });
    }

    //boton ELIMINAR
    const botonesEliminar = document.querySelectorAll(".btn-eliminar");
    for(let boton of botonesEliminar) {
        boton.addEventListener("click", function() {
            const id = parseInt(this.getAttribute("data-id"));
            let carrito = JSON.parse(localStorage.getItem("productosCarrito"));
            
            //actualizamos la lista
            carrito = carrito.filter(p => p.id !== id);
            localStorage.setItem("productosCarrito", JSON.stringify(carrito));
            renderizarCarrito();
        });
    }

    //boton PAGAR
    const botonPagar = document.getElementById("boton-pagar");
    if(botonPagar) {
        botonPagar.addEventListener("click", function() {
            alert("Redirigiendo a la plataforma de pago...");
        });
    }
}
    //apenas entramos a la pagina
    renderizarCarrito();
}


// ----------------------------- MEDIA QUERY (HEADER) -----------------------------------------

const btnMenu = document.getElementById("abrir-menu");
const menuNavegacion = document.getElementById("menu-navegacion");

if(btnMenu && menuNavegacion) {
    btnMenu.addEventListener("click", function() {
        menuNavegacion.classList.toggle("menu-abierto");
    });
}