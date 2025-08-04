let productosInventario = [];

// Función para agregar productos de ejemplo
function agregarEjemploProductos() {
    productosInventario = [
        { id: 1, nombre: "Apple", modelo: "iPhone 13", color: "Azul", almacenamiento: "128GB", procesador: "A15 Bionic" },
        { id: 2, nombre: "Samsung", modelo: "Galaxy S22", color: "Negro", almacenamiento: "256GB", procesador: "Exynos 2200" }
    ];
    mostrarProductos();
}

// Función para mostrar productos en la tabla
function mostrarProductos() {
    const tablaProductos = document.getElementById("productosLista");
    tablaProductos.innerHTML = ""; // Limpiar la tabla

    productosInventario.forEach(producto => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>${producto.modelo}</td>
            <td>${producto.color}</td>
            <td>${producto.almacenamiento}</td>
            <td>${producto.procesador}</td>
            <td>
                <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
            </td>
        `;
        tablaProductos.appendChild(fila);
    });
}

// Función para agregar un nuevo producto
function agregarProductoNuevo() {
    let nombre = document.getElementById("nombreProducto").value;
    let modelo = document.getElementById("modeloProducto").value;
    let color = document.getElementById("colorProducto").value;
    let almacenamiento = document.getElementById("almacenamientoProducto").value;
    let procesador = document.getElementById("procesadorProducto").value;

    if (!nombre || !modelo || !color || !almacenamiento || !procesador) {
        alert("Por favor completa todos los campos.");
        return;
    }

    let nuevoProducto = {
        id: productosInventario.length + 1,
        nombre: nombre,
        modelo: modelo,
        color: color,
        almacenamiento: almacenamiento,
        procesador: procesador
    };

    productosInventario.push(nuevoProducto);
    mostrarProductos();
}

// Función para buscar un producto por ID
function buscarProducto() {
    let idProducto = document.getElementById("idProducto").value;
    let productoEncontrado = productosInventario.find(producto => producto.id == idProducto);
    const resultadoBusqueda = document.getElementById("resultadoBusqueda");

    if (productoEncontrado) {
        document.getElementById("detalleId").innerText = productoEncontrado.id;
        document.getElementById("detalleNombre").innerText = productoEncontrado.nombre;
        document.getElementById("detalleModelo").innerText = productoEncontrado.modelo;
        document.getElementById("detalleColor").innerText = productoEncontrado.color;
        document.getElementById("detalleAlmacenamiento").innerText = productoEncontrado.almacenamiento;
        document.getElementById("detalleProcesador").innerText = productoEncontrado.procesador;
        resultadoBusqueda.style.display = "block";
    } else {
        alert("Producto no encontrado.");
        resultadoBusqueda.style.display = "none";
    }
}

// Función para eliminar un producto
function eliminarProducto(id) {
    productosInventario = productosInventario.filter(producto => producto.id !== id);
    mostrarProductos();
}

// Event listeners
document.getElementById("btnBuscar").addEventListener("click", buscarProducto);
document.getElementById("btnAgregar").addEventListener("click", agregarProductoNuevo);

// Inicializar con productos de ejemplo
agregarEjemploProductos();
