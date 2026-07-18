Este proyecto consiste en el desarrollo de una página web funcional e interactiva pensada para un futuro emprendimiento de venta de repuestos de automotor.

El objetivo principal fue crear una experiencia de usuario fluida, desde la visualización del catálogo de piezas hasta la simulación del proceso de compra, integrando almacenamiento local para no perder el progreso del usuario.

Estructura y secciones:
    - Inicio: donde se presenta un video (video en bucle) como requerimiento.
    - Repuestos: un catálogo dinámico que muestra el stock disponible de autopartes, generado de forma automática mediante JavaScript.
    - Contacto: para que el cliente o interesado pueda hacer la pregunta que desee.
    - Preguntas frecuentes: sección informativa para resolver dudas comunes sobre envíos, pagos y modalidades de trabajo.
    - Icono carrito: donde el usuario puede gestionar los productos seleccionados, modificar cantidades y visualizar el costo total en tiempo real.

Tecnologías y herramientas utilizadas:
    - HTML5: estructuración semántica de todas las secciones del sitio.
    - CSS3: utilizado para el diseño responsive y la interfaz visual. Se implementó una hoja de estilos global (styless.css) optimizando la carga. Se utilizaron tecnologías modernas como CSS Grid para el catálogo de productos y Flexbox para la alineación del carrito.
    - JavaScript (Vanilla JS): el motor lógico del proyecto encargado de la interactividad, el manejo del DOM y la comunicación de datos.
    - JSON: se creó una API propia (productos.json) simulando una base de datos real con el inventario de repuestos debido a la falta de APIs públicas gratuitas del rubro automotor.

Funcionalidades técnicas destacadas:

    - Consumo de API Fetch: el catálogo de repuestos no está escrito de forma estática en el HTML. Se utiliza JavaScript asíncrono (Fetch) para leer el archivo `productos.json` y dibujar dinámicamente las tarjetas.
    - Carrito de compras con LocalStorage: 
        *   El carrito sobrevive a las recargas de página y a la navegación entre distintas secciones gracias al uso de `localStorage`.
        *   El sistema detecta si un producto ya existe en el carrito para sumar su cantidad en lugar de duplicarlo, y calcula el subtotal y el total a pagar en tiempo real.
        *   El contador en la barra de navegación (carrito) se actualiza automáticamente en todas las páginas del sitio.
    - El formulario de contacto cuenta con validaciones en el Front-End, para garantizar que el usuario ingrese un formato de correo electrónico válido antes de permitir el envío.